import User from "../models/UserModel.js";
import Lembur from "../models/LemburModel.js"
import Gaji from "../models/GajiModel.js"
import client from '../redis/redisCache.js';

export const getDataUser = async (req, res) => {
    const redisKey = 'user';
    client.get(redisKey, async (err, cachedData) => {
        if (err) {
            console.error(err);
        }
        if (cachedData) {
            console.log('Using Cache Redis - Data Pengguna')
            res.status(200).json(JSON.parse(cachedData));

        } else {
            try {
                const data = await User.findAll({
                    attributes: ['uuid', 'name', 'email', 'gender', 'role']
                });
                if (!data) {
                    return res.status(404).json({ msg: 'Terdapat kesalahan' });
                }
                client.setex(redisKey, 3600, JSON.stringify(data));
                console.log('Using Database')
                return res.status(200).json(data);

            } catch (error) {
                console.error(error);

            }

        }
    });
};


export const getDataGaji = async (req, res) => {
    const redisKey = 'gaji';
    client.get(redisKey, async (err, cachedData) => {
        if (err) {
            console.error(err);
        }
        if (cachedData) {
            console.log('Using Cache Redis - Data Gaji')
            res.status(200).json(JSON.parse(cachedData));

        } else {
            try {
                let data;
                if (req.role === "HR" || req.role === "admin") {
                    data = await Gaji.findAll({
                        attributes: ['uuid', 'gajipokok', 'gajilembur', 'userId'],
                        include: [{
                            model: User,
                            attributes: ['name']
                        }]
                    });
                } else {
                    data = await Gaji.findAll({
                        attributes: ['uuid', 'gajipokok', 'gajilembur', 'userId'],
                        where: {
                            userId: req.userId
                        },
                        include: [{
                            model: User,
                            attributes: ['name']
                        }]
                    });
                }
                if (!data) {
                    return res.status(404).json({ msg: 'Terdapat kesalahan' });
                }
                client.setex(redisKey, 3600, JSON.stringify(data));
                console.log('Using Database')
                return res.status(200).json(data);

            } catch (error) {
                console.error(error);

            }

        }
    });
};

export const getDataLembur = async (req, res) => {
    const redisKey = 'lembur';
    client.get(redisKey, async (err, cachedData) => {
        if (err) {
            console.error(err);
        }
        if (cachedData) {
            console.log('Using Cache Redis - Pengajuan Lembur')
            res.status(200).json(JSON.parse(cachedData));

        } else {
            try {
                let data;
                if (req.role === "HR" || req.role === "admin") {
                    data = await Lembur.findAll({
                        attributes: ['uuid', 'keterangan', 'jamMasuk', 'jamKeluar', 'gajilembur', 'status', 'userId'],
                        include: [{
                            model: User,
                            attributes: ['name']
                        }]
                    });
                } else {
                    data = await Lembur.findAll({
                        attributes: ['uuid', 'keterangan', 'jamMasuk', 'jamKeluar', 'gajilembur', 'status', 'userId'],
                        where: {
                            userId: req.userId
                        },
                        include: [{
                            model: User,
                            attributes: ['name']
                        }]
                    });
                }
                if (!data) {
                    return res.status(404).json({ msg: 'Terdapat kesalahan' });
                }
                client.setex(redisKey, 3600, JSON.stringify(data));
                console.log('Using Database')
                return res.status(200).json(data);

            } catch (error) {
                console.error(error);

            }

        }
    });
};


