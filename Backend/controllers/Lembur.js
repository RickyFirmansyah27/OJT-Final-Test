import User from "../models/UserModel.js";
import {Op} from "sequelize";
import Lembur from "../models/LemburModel.js";

export const getLembur = async (req, res) =>{
    try {
        let response;
        if(req.role === "HR" || req.role === "admin"){
            response = await Lembur.findAll({
                attributes:['uuid','keterangan','jamMasuk','jamKeluar','gajilembur','status','userId'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Lembur.findAll({
                attributes:['uuid','keterangan','jamMasuk','jamKeluar','gajilembur','status','userId'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getLemburById = async(req, res) =>{
    try {
        const lembur = await Lembur.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!lembur) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "HR"){
            response = await Lembur.findOne({
                attributes:['uuid','keterangan','jamMasuk','jamKeluar','gajilembur','status','userId'],
                where:{
                    id: lembur.id
                },
                include:[{
                    model: User,
                    attributes:['name']
                }]
            });
        }else{
            response = await Lembur.findOne({
                attributes:['uuid','keterangan','jamMasuk','jamKeluar','gajilembur','status','userId'],
                where:{
                    [Op.and]:[{id: lembur.id}, {userId: req.userId}]
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

export const createLembur = async(req, res) =>{
    const {keterangan,jamMasuk,jamKeluar,gajilembur} = req.body;
    try {
        await Lembur.create({
            keterangan: keterangan,
            jamMasuk: jamMasuk,
            jamKeluar: jamKeluar,
            gajilembur: gajilembur,
            userId: req.userId
        });
        res.status(201).json({msg: "Form Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateLembur = async(req, res) =>{
    try {
        const lembur = await Lembur.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!lembur) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {keterangan,jamMasuk,jamKeluar,gajilembur,status} = req.body;
        if(req.role === "HR" || req.role === "admin"){
            await Lembur.update({keterangan,jamMasuk,jamKeluar,gajilembur,status} ,{
                where:{
                    id: lembur.id
                }
            });
        }else{
            if(req.userId !== lembur.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Lembur.update({keterangan,jamMasuk,jamKeluar,gajilembur,status} ,{
                where:{
                    [Op.and]:[{id: lembur.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Form updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteLembur = async(req, res) =>{
    try {
        const lembur = await Lembur.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!lembur) return res.status(404).json({msg: "Data tidak ditemukan"});
        if(req.role === "HR" || req.role === "admin"){
            await Lembur.destroy({
                where:{
                    id: lembur.id
                }
            });
        }else{
            if(req.userId !== lembur.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Lembur.destroy({
                where:{
                    [Op.and]:[{id: lembur.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Form deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}