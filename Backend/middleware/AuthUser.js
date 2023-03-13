import User from "../models/UserModel.js";

import client from '../redis/redisCache.js';

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
      return res.status(401).json({ msg: 'Mohon login ke akun Anda!' });
    }
  
    const redisKey = 'auth';
    client.get(redisKey, async (err, cachedData) => {
      if (err) {
        console.error(err);
      }
      if (cachedData) {
        console.log('Using Cache Redis - Verifikasi Akun')
        const { userId, role } = JSON.parse(cachedData);
        req.userId = userId;
        req.role = role;
        return next();
      }else{
        try {
          const data = await User.findOne({
            where: {
              uuid: req.session.userId,
            },
          });
          if (!data) {
            return res.status(404).json({ msg: 'User tidak ditemukan' });
          }
          req.userId = data.id;
          req.role = data.role;
          const userData = { userId: req.userId, role: req.role };
          client.setex(redisKey, 3600, JSON.stringify(userData)); 
          console.log('Using Database')
          return next();
        } catch (error) {
          console.error(error);
        
        }
      }
  
      
    });
  };



// export const verifyUser = async (req, res, next) =>{
//     if(!req.session.userId){
//         return res.status(401).json({msg: "Mohon login ke akun Anda!"});
//     }
//     const user = await User.findOne({
//         where: {
//             uuid: req.session.userId
//         }
//     });
//     if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
//     req.userId = user.id;
//     req.role = user.role; 
//     console.log(req.userId)
//     console.log(req.role)
//     next();
// }



