import Info from '../models/InfoModel.js';
import multer from 'multer';
import path from 'path';
import Excel from 'exceljs';

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), 'uploads'),
  filename: (req, file, cb) => {
    cb(null, 'announcements.xlsx');
  },
});

const upload = multer({ storage });



export const createInfo = async (req, res) => {
  try {
    const { judul, konten, date } = req.body;
    let response;
    if (req.role === "HR") {
      response = await Info.create({
        judul: judul,
        konten: konten,
        date: date,
      });
      res.status(201).json({ msg: "Data Created Successfuly" });
    } else {
      res.status(403).json({ msg: "Akses terlarang" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const getInfo = async (req, res) => {
  try {
    const response = await Info.findAll({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }

};

export const getInfoById = async (req, res) => {
  try {
    const response = await Info.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json(response);
} catch (error) {
    res.status(500).json({msg: error.message});
}
}

export const addAnnouncements = async (req, res) => {
  try {
    upload.single('file')(req, res, async function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ msg: err.message });
      } else {
        const filePath = path.join(process.cwd(), 'uploads', 'announcements.xlsx');
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(1);
        const announcements = [];
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber > 1) {
            const announcement = {
              judul: row.getCell(1).value,
              konten: row.getCell(2).value,
              date: row.getCell(3).value,
            };
            announcements.push(announcement);
          }
        });

        const result = await Info.bulkCreate(announcements);
        console.log(`${result.length} announcements added to the database.`);
        res.status(200).json({ msg: `${announcements.length} announcements added to the database.` });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

export const deleteInfo = async (req, res) => {
  try {
    const info = await Info.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!info) return res.status(404).json({ msg: "Data tidak ditemukan" });

    if (req.role === "HR") {
      await Info.destroy({
        where: {
          id: info.id
        }
      });
    } else {
      if (req.userId !== info.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Gaji.destroy({
        where: {
          [Op.and]: [{ id: info.id }, { userId: req.userId }]
        }
      });
    }
    res.status(200).json({ msg: "Data deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}

export const updateInfo = async (req, res) => {
  try {
    const info = await Info.findOne({
      where: {
        id: req.params.id
      }
    });
    if (!info) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { judul, konten, date } = req.body;
    if (req.role === "HR") {
      await Info.update({ judul, konten, date }, {
        where: {
          id: info.id
        }
      });
    } else {
      if (req.userId !== info.userId) return res.status(403).json({ msg: "Akses terlarang" });
      await Info.update({ judul, konten, date }, {
        where: {
          [Op.and]: [{ id: info.id }, { userId: req.userId }]
        }
      });
    }
    res.status(200).json({ msg: "Data updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}
