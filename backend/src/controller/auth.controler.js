import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req,res) =>{

const { fullName, email, password} = req.body;

try{
    if (!fullName || !email || !password){
        return res.status(400).json({message: "All fields are required"});
    }

    if(password.length < 6){
        return res.status(400).json({ message: "Password must be less than 6 charactres"});
    }

    const user =  await User.findOne({email})
    
    if (user) return res.status(400).json({ message: "Email alreadt exist......!" });

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

    const newUser = new User({
        fullName,
        email,
        password:hashPassword
    })

    if(newUser) {

        //generete jwt token here
        generateToken(newUser._id,res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });


    } else{
        res.status(400).json({
            message: "Invalide user data"
        });
    }


} catch (error){

    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error"});

}
};

export const login  = async (req,res)=>{
   const { email, password} = req.body;
   try{
    const user = await User.findOne({ email});
    
    if (!user){
        return res.status(400).json({
            message:"Invalide Credentials"
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        return res.status(400).json({
            message: "Invalide Credentials"
        })
    }
    generateToken(user._id,res);

    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
    });


   } catch (error){
    console.log("Error in Login COntroller", error.message);
    res.status(500).json({
        message:"Internal server error"
    })
   }
};

export const logout  = (req,res)=>{
    try{
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({
            message:"Logout Successfully"
        });

    }catch(error){
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
};


export const updateProfile = async (req,res)=>{
    try{
        const { profilePic} = req.body;
        const userId = req.user._id;

        if (!profilePic){
            return res.status(400).json({
                message:"Profile pic is required....!"
            });
        }
        const uploadResponses = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
        { profilePic: uploadResponses.secure_url },
        {new: true }
        );

        res.status(200).json(updatedUser);


    }catch(error){
        console.log("error in update profile", error);
        res.status(500).json({
            message:"Internal server error"
        });
    }

};

export const checkAuth = (req,res)=>{
    try{
        res.status(200).json(req.user);
        
    }catch(error){
        console.log("Error in check auth controller", error.message);
        res.status(500).json({
            message:"Internal Server Error"
        });
    }
};