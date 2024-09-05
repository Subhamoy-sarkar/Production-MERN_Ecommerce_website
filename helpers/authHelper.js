import bcrypt from 'bcrypt'

export const hashPassword=async (password)=>{
    try{
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    }catch(error){
        console.log(error);
    }
};

export const comparePassword=async (password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
};


/*
hashPassword Function:
Purpose: This function is used to securely hash a user's password before storing it in the database. Hashing ensures that even if someone gains access to the database, they cannot easily retrieve the original passwords.
How It Works:
saltRounds: The number 10 represents the cost factor, which controls how much time is needed to calculate a single BCrypt hash. The higher the number, the more secure but slower the hashing process becomes.
bcrypt.hash(password, saltRounds): This function takes the plain text password and the salt rounds, then generates a hashed version of the password.
Error Handling: If there's an error during the hashing process, it is caught and logged.



comparePassword Function:
Purpose: This function is used to compare a plain text password with a hashed password (typically stored in the database) to verify if they match. This is essential during the login process.



*/