import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import User from './UserModel.js';
import Gaji from './GajiModel.js';

const { DataTypes } = Sequelize;

const Lembur = db.define('lembur', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  keterangan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  jamMasuk: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  jamKeluar: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  gajilembur: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pending',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
}, {
  freezeTableName: true,
  timestamps: false,
});

Lembur.belongsTo(User, { foreignKey: 'userId' });

Lembur.afterUpdate(async (lembur) => {
  const { status, userId, gajilembur } = lembur.get();
  if (status === 'Approved') {
    const user = await User.findOne({ where: { id: userId } });
    console.log(user)
    
    const gaji = await Gaji.findOne({ where: { userId: user.id } });
    console.log(gaji)
    if (gaji) {
      gaji.gajilembur = gaji.gajilembur + gajilembur;
      await gaji.save();
    }
  }
});

(async()=>{
  await db.sync();
})();

export default Lembur;
