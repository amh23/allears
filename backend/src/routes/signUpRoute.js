import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { getDbConnection  } from '../db.js';

export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async(req, res) => {
        const { email, password } = req.body;

        const db = getDbConnection('all-ears');
        const user = await db.collection('users').findOne({ email });

        if(user){
            res.status(409).json({ message: 'User already exists.'});
        }

        const salt = uuid();
        const pepper = process.env.PEPPER_STRING;

        const passwordHash = await bcrypt.hash(salt + password + pepper, 10);

        const result = await db.collection('users').insertOne({
            email,
            passwordHash,
            salt,
            isVerfied: false,
        });

        const { insertedId } = result;

        jwt.sign({
            id: insertedId,
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