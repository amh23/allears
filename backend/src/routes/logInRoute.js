import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../util/db.js';

export const logInRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;
        
        const db = await getDbConnection(process.env.MONGODB_DB_NAME);
        if(!db){
            return res.status(500).json({ message: 'Database connection failed.' });
        }
        const user = await db.collection('users').findOne({ email });

        if(!user) return res.sendStatus(401);

        const { _id: id, name, passwordHash, isVerified, salt } = user;

        const pepper = process.env.PEPPER_STRING;

        const isCorrect = await bcrypt.compare(password + pepper, passwordHash);

        if(isCorrect){
            jwt.sign({ id, name, isVerified, email },
                     process.env.JWT_SECRET,
                     { expiresIn: '2d'},
                    (err, token) => {
                        if(err){
                            res.sendStatus(500);
                        }
                        res.status(200).json({ token });
                    });
        } else {
            res.sendStatus(401);
        }
    }
}