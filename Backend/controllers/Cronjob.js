import Lembur from "../models/LemburModel.js";
import Reimburst from "../models/ReimburstModel.js";


export const getLemburByStatus = async(req, res) =>{
    try {
        const lembur = await Lembur.findAll({
            where:{
                status: req.params.status
            }
        });
        if(!lembur) return res.status(404).json({msg: "Data tidak ditemukan"});
        res.status(200).json(lembur);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getReimburstByStatus = async(req, res) =>{
    try {
        const reimburst = await Reimburst.findAll({
            where:{
                status: req.params.status
            }
        });
        if(!reimburst) return res.status(404).json({msg: "Data tidak ditemukan"});
        res.status(200).json(reimburst);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}