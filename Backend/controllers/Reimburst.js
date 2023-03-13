import User from "../models/UserModel.js";
import {Op} from "sequelize";
import Reimburst from "../models/ReimburstModel.js";

export const getReimburst = async (req, res) =>{
    try {
        let response;
        if(req.role === "HR" || req.role === "admin"){
            response = await Reimburst.findAll({
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Reimburst.findAll({
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

export const getReimburstById = async(req, res) =>{
    try {
        const reimburst = await Reimburst.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!reimburst) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "HR"){
            response = await Reimburst.findOne({
                where:{
                    id: reimburst.id
                },
                include:[{
                    model: User,
                    attributes:['name']
                }]
            });
        }else{
            response = await Reimburst.findOne({
                where:{
                    [Op.and]:[{id: reimburst.id}, {userId: req.userId}]
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

export const createReimburst = async(req, res) =>{
    const {keterangan,kategori,jumlahBiaya,date} = req.body;
    try {
        await Reimburst.create({
            keterangan: keterangan,
            kategori: kategori,
            jumlahBiaya: jumlahBiaya,
            date: date,
            userId: req.userId
        });
        res.status(201).json({msg: "Form Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateReimburst = async(req, res) =>{
    try {
        const reimburst = await Reimburst.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!reimburst) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {keterangan,kategori,jumlahBiaya,date, status} = req.body;
        if(req.role === "HR" || req.role === "admin"){
            await Reimburst.update({keterangan,kategori,jumlahBiaya,date, status} ,{
                where:{
                    id: reimburst.id
                }
            });
        }else{
            if(req.userId !== reimburst.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Reimburst.update({keterangan,kategori,jumlahBiaya,date, status} ,{
                where:{
                    [Op.and]:[{id: reimburst.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Form updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteReimburst = async(req, res) =>{
    try {
        const reimburst = await Reimburst.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!reimburst) return res.status(404).json({msg: "Data tidak ditemukan"});
        if(req.role === "HR" || req.role === "admin"){
            await Reimburst.destroy({
                where:{
                    id: reimburst.id
                }
            });
        }else{
            if(req.userId !== reimburst.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Reimburst.destroy({
                where:{
                    [Op.and]:[{id: reimburst.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Form deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}