import User from "../models/UserModel.js";
import {Op} from "sequelize";
import Absensi from "../models/AbsensiModel.js";

export const getAbsensi = async (req, res) =>{
    try {
        let response;
        response = await Absensi.findAll({
            attributes:['uuid','jamMasuk','jamKeluar','date','status','userId'],
            where:{
                userId: req.userId
            },
            include:[{
                model: User,
                attributes:['name']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getAbsensiById = async(req, res) =>{
    try {
        const absensi = await Absensi.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!absensi) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        response = await Absensi.findOne({
            attributes:['uuid','jamMasuk','jamKeluar','date','status','userId'],
            where:{
                [Op.and]:[{id: absensi.id}, {userId: req.userId}]
            },
            include:[{
                model: User,
                attributes:['name']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createAbsensi = async(req, res) =>{
    const {jamMasuk,jamKeluar,date} = req.body;
    try {
        await Absensi.create({
            jamMasuk: jamMasuk,
            jamKeluar: jamKeluar,
            date: date,
            userId: req.userId
        });
        res.status(201).json({msg: "Form Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateAbsensi = async(req, res) =>{
    try {
        const absensi = await Absensi.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!absensi) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {jamMasuk,jamKeluar,date,status} = req.body;
        if(req.userId !== absensi.userId) return res.status(403).json({msg: "Akses terlarang"});
        await Absensi.update({jamMasuk,jamKeluar,date,status} ,{
            where:{
                [Op.and]:[{id: absensi.id}, {userId: req.userId}]
            }
        });
        res.status(200).json({msg: "Form updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteAbsensi = async(req, res) =>{
    try {
        const absensi = await Absensi.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!absensi) return res.status(404).json({msg: "Data tidak ditemukan"});
        if(req.userId !== absensi.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Absensi.destroy({
                where:{
                    [Op.and]:[{id: absensi.id}, {userId: req.userId}]
                }
            });status(200).json({msg: "Form deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}