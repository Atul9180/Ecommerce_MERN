import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//protected routes token based:
export const requireSignIn = async (req, res, next) => {
    try {
        const decodedToken = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
    }
    catch (err) {
        return res.status(401).send("User Login Required")
    }
}


//admin access :
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false, message: "Unauthorized Access.."
            })
        }
        next();
    }
    catch (err) {
        return res.status(401).send({ success: false, err });
    }
}