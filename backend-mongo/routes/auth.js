import express from "express";
import User from "../models/User.js";
import fetchuser  from '../middleware/fetchuser.js'
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';

var token = 'SpecialToken123';

export const loginValidator = [
  body('name', 'Enter Valid name').isLength({ min: 10 }),
  body('email','Invalid email').isEmail(),
  body('password','minimum characters use').isLength({ min: 5 }),
];

//route=1 : create a user using : POST "/api/auth". No login required.
router.post("/createUser", loginValidator , async (req, res) => {
  //If there are errors return bad request and the errors.
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  //check whether the user with email exists already or not.
  try {
  let users = await User.findOne({email: req.body.email});
  if(users){
    let success = false;
    return res.status(400).json({success, error:"sorry ! User with this email already exists."})
  }
   const salt = await bcrypt.genSalt(10);
   const secPass = await bcrypt.hash(req.body.password, salt)
   users = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: secPass //req.body.password
  })
  const data = {
    user:{
      id: users.id
    }
  }
  const authToken = jwt.sign(data, token);
  let success = true;
  res.json({success, authToken});
} catch (error) {
    console.error(error.message)
}
});

//route=2 : Authenticate a user using: post "api/auth/login". No login required.
router.post("/login", [
  body('email','enter a valid email').isEmail(),
  body('password','Password can not be blank').exists(),
] , async (req, res) => {
  let success = false;
  //If there are errors return bad request and the errors.
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array()})
  }
  const {email, password} = req.body;
  try {
    let user1 = await User.findOne({email});
    if(!user1){
      return res.status(400).json({success, error: "Please try to login with correct creditials"})
    }
    const passwordCompare = await bcrypt.compare(password, user1.password);
    if(!passwordCompare){
      return res.status(400).json({success, error: "Please try to login with correct password"})
    }
    const data = {
      user:{
        id: user1.id
      }
    }
    const authToken = jwt.sign(data, token);
    //console.log(authToken);
    success = true;
    res.json({success, authToken});
  } catch (error) {
    console.log(error.message)
    res.status(500).send("some error occured.");
  }
});

//route=3 : To Get User Login Details for get "api/auth/getUser"
router.post("/getUser", fetchuser,async (req, res) => {
try {
  const userId = req.user.id;
  const user2 = await User.findById(userId).select("-password");
  res.send(user2);
} catch (error) {
  console.log(error.message)
  res.status(500).send("some error occured.");
}
})
export default router;