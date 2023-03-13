import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const { DataTypes } = Sequelize;

const Info = db.define('info', {
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  konten: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false,
});



(async () => {
  await db.sync();
})();

export default Info;
