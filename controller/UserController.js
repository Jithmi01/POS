const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
const JWT_SECRET=process.env.JWT_SECRET;


const signup = async (req,resp)=>{
    const {username, password,fullName, role}= req.body;
    const userExists = await User.findOne({username});
    if(userExists){
        return resp.status(400).json({message:"already exists",data:null});
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hash(password,salt);
        const createdUser = new User({
            username,
            password:hashedPassword,
            fullName,
            role,
            isActive:true
        });
        await createdUser.save();
        resp.status(201).json({message:"User saved",data:null});
    }catch(e){
        resp.status(500).json({error:e.message});
    }
}
const login = async (req,resp)=>{
    const {username, password}=req.body;
    
    const userExists = await User.findOne({username});
    if(!userExists){
        return resp.status(404).json({message:"not found",data:null});
    }

    const isMatch = await bcrypt.compare(password,userExists.password);
    if(!isMatch){
        return resp.status(403).json({message:"wrong password",data:null});
    }

    const payload ={userId:userExists._id, username:userExists.username, role:userExists.role};
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn:'1h'});
    return resp.status(200).json({message:"success",data:{token:token}});
}

module.exports={
    signup,login
};