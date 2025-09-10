import jwt from 'jsonwebtoken';
import { getDbConnection } from '../util/db.js';
import { ObjectId } from 'mongodb';

export const userProfileRoute = {
    path: '/api/user/profile',
    method: 'get',
    handler: async (req, res) => {
        try {
            // Get the authorization header
            const authHeader = req.headers.authorization;
            
            // Check if authorization header exists and has the correct format
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'No token provided or invalid format' });
            }

            // Extract the token from the authorization header
            const token = authHeader.substring(7); // Remove 'Bearer ' prefix

            // Verify the JWT token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;

            // Connect to database
            const db = await getDbConnection(process.env.MONGODB_DB_NAME);
            if (!db) {
                return res.status(500).json({ message: 'Database connection failed.' });
            }

            // Find user by ID and exclude sensitive information
            const user = await db.collection('users').findOne(
                { _id: new ObjectId(userId) },
                { 
                    projection: { 
                        name: 1, 
                        email: 1, 
                        createdAt: 1,
                        // Exclude password-related fields
                        passwordHash: 0,
                        salt: 0
                    } 
                }
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Return user profile information
            res.status(200).json({
                success: true,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt
                }
            });

        } catch (error) {
            // Handle JWT verification errors
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid token' });
            } else if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            }
            
            // Handle other errors
            console.error('Error fetching user profile:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}