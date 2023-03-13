import User from "../models/UserModel.js";
import client from '../redis/redisCache.js';
import argon2 from "argon2";


export const getHR = async(req, res) =>{
  try {
      const response = await User.findOne({
          attributes:['name','email','role'],
          where: {
              role: req.params.role
          }
      });
      res.status(200).json(response);
  } catch (error) {
      res.status(500).json({msg: error.message});
  }
}


export const Login = async (req, res) =>{
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Wrong Password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const gender = user.gender;
    const role = user.role;
    res.status(200).json({uuid, name, email, gender, role});
}

export const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await User.findOne({
        attributes:['uuid','name','email','gender','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(user);
}



export const logOut = (req, res) => {
  const redisKey = ['auth'];
  client.del(redisKey, (err, response) => {
    if (err || !response) {
      console.error(err || `Redis key ${redisKey} not found`);
      return res.status(500).json({ msg: 'Gagal logout' });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Gagal logout' });
      }
      return res.status(200).json({ msg: 'Anda telah logout' });
    });
  });
};
