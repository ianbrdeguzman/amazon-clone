import express from 'express';
import User from '../models/userModel.js';
import { data } from '../data.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        // await User.deleteMany({});
        const createdUsers = await User.insertMany(data.users);
        res.send({ createdUsers });
    })
);

userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                });
                return;
            }
        } else if (!user) {
            res.status(401).send({
                message: 'We cannot find an account with that e-mail address.',
            });
        }
        res.status(401).send({
            message: 'You might have entered a wrong password.',
        });
    })
);

export default userRouter;
