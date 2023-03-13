import { Sequelize } from 'sequelize';
import db from '../config/database.js';
import User from './UserModel.js';

const { DataTypes } = Sequelize;

const Gaji = db.define('Gaji', {
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  gajipokok: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 2100000
  },
  gajilembur: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  claimbiaya: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
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

Gaji.belongsTo(User, { foreignKey: 'userId' });

(async () => {
  await db.sync();
})();

export default Gaji;
