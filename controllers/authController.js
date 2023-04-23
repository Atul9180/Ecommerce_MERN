
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';




//@desc: to register and hash password
//@endpoint: /api/v1/auth/register
//@method: POST
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        if (!name) {
            return res.send({ message: "Name is required!" })
        }
        if (!email) {
            return res.send({ message: "Email is required!" })
        }
        if (!password) {
            return res.send({ message: "Password is required!" })
        }
        if (!phone) {
            return res.send({ message: "Phone is required!" })
        }
        if (!address) {
            return res.send({ message: "Address is required!" })
        }

        //check user's existance:
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send({ success: true, message: "Email Id already registered. Please Login" })
        }

        //hash Password and save data:
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({ name, email, password: hashedPassword, phone, address }).save();
        res.status(201).send({
            success: true,
            message: 'User Registered Successfully',
            user
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            err
        })
    }
};



//@desc: to login and  send JWT
//@endpoint: /api/v1/auth/login
//@method: POST
export const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).send({ success: false, message: "Invalid  email or password" })
        }

        //check if user exists:
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({ success: false, message: "email not registered.!" })
        }
        //compare password
        const matchPassword = await comparePassword(password, user.password);
        if (!matchPassword) {
            return res.status(401).send({ success: false, message: "Password Incorrect!" })
        }

        //Create JWT:
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(200).send({
            success: true,
            message: 'User Login Successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            err
        })
    }
};


//@desc: protected route testing:
//@endpoint: /api/v1/auth/test
export const testController = async (req, res) => {
    try {
        res.status(200).send("Protected Route")
    }
    catch (err) {
        console.log(err)
    }
}



