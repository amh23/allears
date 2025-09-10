import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { getDbConnection  } from '../util/db.js';

export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async(req, res) => {
        const { name, email, password } = req.body;

        const db = await getDbConnection(process.env.MONGODB_DB_NAME);
        if(!db){
            return res.status(500).json({ message: 'Database connection failed.' });
        }
        const user = await db.collection('users').findOne({ email });

        if(user){
            return res.status(409).json({ message: 'User already exists.'});
        }

        const salt = await bcrypt.genSalt(10);
        const pepper = process.env.PEPPER_STRING;

        const passwordHash = await bcrypt.hash(password + pepper, salt);

        const result = await db.collection('users').insertOne({
            name,
            email,
            passwordHash,
            salt,
            isVerfied: false,
        });

        const { insertedId } = result;

        jwt.sign({
            id: insertedId,
            name,
            email,
            isVerfied: false,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
        },
        (err, token) => {
            if(err) {
                return res.status(500).send(err);
            }
            res.status(200).json({ token });
        });
    }
}