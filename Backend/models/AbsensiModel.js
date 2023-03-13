import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import User from './UserModel.js';


const { DataTypes } = Sequelize;

const Absensi = db.define('Absensi', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  jamMasuk: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  jamKeluar: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '-',
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

Absensi.belongsTo(User, { foreignKey: 'userId' });



(async()=>{
  await db.sync();
})();

export default Absensi;
