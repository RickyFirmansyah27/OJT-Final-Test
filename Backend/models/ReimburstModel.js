import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import User from './UserModel.js';

const { DataTypes } = Sequelize;

const Reimburst = db.define('reimburst', {
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
  kategori: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Transport',
  },
  jumlahBiaya: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
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

Reimburst.belongsTo(User, { foreignKey: 'userId' });

(async()=>{
  await db.sync();
})();

export default Reimburst;
