import Gaji from "../models/GajiModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getGaji = async (req, res) =>{
    try {
        let response;
        if(req.role === "HR" || req.role ==="admin"){
            response = await Gaji.findAll({
                attributes:['uuid','gajipokok','gajilembur','claimbiaya','userId'],
                include:[{
                    model: User,
                    attributes:['name']
                }]
            });
        }else{
            response = await Gaji.findAll({
                attributes:['uuid','gajipokok','gajilembur','claimbiaya','userId'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getGajiById = async(req, res) =>{
    try {
        const gaji = await Gaji.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!gaji) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "HR" || req.role === "admin"){
            response = await Gaji.findOne({
                attributes:['uuid','gajipokok','gajilembur','claimbiaya','userId'],
                where:{
                    uuid: gaji.uuid
                },
                include:[{
                    model: User,
                    attributes:['name']
                }]
            });
        }else{
            response = await Gaji.findOne({
                attributes:['uuid','gajipokok','gajilembur','claimbiaya','userId'],
                where:{
                    [Op.and]:[{id: gaji.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createGaji = async(req, res) =>{
    const {gajipokok, gajilembur, claimbiaya} = req.body;
    try {
        await Gaji.create({
            gajipokok: gajipokok,
            gajilembur: gajilembur,
            claimbiaya: claimbiaya,
            userId: req.userId
        });
        res.status(201).json({msg: "Data Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateGaji = async(req, res) =>{
    try {
        const gaji = await Gaji.findOne({
            where:{
                userId: req.params.id
            }
        });
        if(!gaji) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {gajipokok, gajilembur, claimbiaya} = req.body;
        if(req.role === "HR" || req.role === "admin"){
            await Gaji.update({gajipokok, gajilembur, claimbiaya},{
                where:{
                    uuid: gaji.uuid
                }
            });
        }else{
            if(req.userId !== gaji.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Gaji.update({gajipokok, gajilembur, claimbiaya},{
                where:{
                    [Op.and]:[{id: gaji.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Data updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteGaji = async(req, res) =>{
    try {
        const gaji = await Gaji.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!gaji) return res.status(404).json({msg: "Data tidak ditemukan"});
        
        if(req.role === "HR" || req.role === "admin"){
            await Gaji.destroy({
                where:{
                    id: gaji.id
                }
            });
        }else{
            if(req.userId !== gaji.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Gaji.destroy({
                where:{
                    [Op.and]:[{id: gaji.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Data deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}