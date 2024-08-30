const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../../../src/models/User.js');
const db = require('../util/db.test.js');

const userData = {
    name: 'John Smith',
    email: 'sontsont+test3@gmail.com',
    password: 'John@12345',
};

beforeAll(async () => {
    await db.setUp();
});

afterEach(async () => {
    await db.dropCollections();
});

afterAll(async () => {
    await db.dropDatabase();
});


/**
 * User Model
 */
describe('User Model', () => {
    it('create & save user successfully', async () => {
        const validUser   = new User(userData)

        const salt = uuid();
        const pepper = process.env.PEPPER_STRING;

        const passwordHash = bcrypt.hash(salt + userData.password + pepper, 10);

        const savedUser = await validUser.save();
        //Object Id should be defined when successfully saved to MongoDB.
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
        //expect(savedUser.salt).toBeDefined();
    });
});

