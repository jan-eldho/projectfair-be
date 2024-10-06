const users = require('../Models/userSchema');
const bcrypt = require('bcryptjs'); // Use bcrypt to hash passwords
const jwt = require('jsonwebtoken');
//control method for user register

exports.register = async (req, res) => {
    try {
        console.log("inside user register controller");
        const { username, email, password } = req.body;

        // Check if the email already exists
        const existingUser = await users.findOne({ email: email});
        if (existingUser) {
            return res.status(400).json({ message: "Account already exists" });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user and save to DB
        const newUser = new users({
            username:username,
            email:email,
            password: hashedPassword, // Store hashed password
            github: "",
            linkedin: "",
            profile: ""
        });
        await newUser.save();

        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ message: "Registration failed", error: error.message });

    }
};

exports.login=async(req,res)=>{
    console.log("inside the login Controller");
    const {email,password} =req.body;
    try{

        const existingUser =await users.findOne({email:email})
    
        if (!existingUser) {
            return res.status(400).json({ message: "User not found" });
        }
     
        // Compare the plain-text password with the hashed password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token= jwt.sign({userId:existingUser._id},"userpwd123")
        console.log(token);
        
        res.status(200).json({ message: "Login successful",existData:existingUser,token:token})
    }catch(error){

        console.error("Internal Server Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });

    }
   
}

// Get user details (Example, modify based on your requirement)
exports.getUserdetail = (req, res) => {
    res.status(200).json({ message: "Get user details" });
};
