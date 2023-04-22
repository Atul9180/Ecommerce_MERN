import bcrypt from 'bcrypt';

//@desc: to hash pswd
export const hashPassword = async (password) => {
    try {
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    catch (err) {
        console.log(err);
    }
};


//@desc: to decrypt hashed pswd
export const comparePassword = async (password, hashedPassword) => {
    try {
        // const decryptedPassword = await bcrypt.compare(password, hashedPassword);
        return bcrypt.compare(password, hashedPassword);
    }
    catch (err) {
        console.log(err);
    }
};