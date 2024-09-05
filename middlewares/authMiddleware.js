import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//protected routes token base
export const requireSignIn= async (req, res , next)=>{
    try {
        const decode=JWT.verify(req.headers.authorization  , process.env.JWT_SECRET);
        req.user=decode;// passing decode to user , so that we can get the _id
        next();  // to go to next middleware / next step
    } catch (error) {
        console.log(error);
    }

}

//admin access ( role : 1 )
export const isAdmin= async ( req , res , next)=>{
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !==1) {
            return res.status(401).send({
                success:false,
                message:"UnAuthorized access",
            });

        }
        else{
            next();  // to go to next middleware / next step
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message: "Error in admin middleware "
        })
    }
}


/*
JWT.verify():

    Purpose: This function is used to verify the authenticity of a JSON Web Token (JWT).
    How it works: The JWT.verify() method decodes the token passed in the Authorization header and checks if it has been tampered with or if it has expired. It does this using the secret key (process.env.JWT_SECRET) stored on the server. If the token is valid, it returns the decoded token payload, which can then be used to identify the user or perform other tasks. If the token is invalid (e.g., expired or altered), it throws an error.


next():

    Purpose: The next() function is used to pass control to the next middleware function in the stack.
    How it works: Middleware functions in Express.js are executed in sequence. When next() is called, it tells Express to move on to the next middleware function or route handler. If you don't call next() (or send a response), the request will hang, and the client will not receive any response.

*/