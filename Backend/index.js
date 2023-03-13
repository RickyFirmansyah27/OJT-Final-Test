import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from 'body-parser';
import SequelizeStore from "connect-session-sequelize";
import dotenv from "dotenv";

import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import FormRoute from "./routes/FormRoute.js";
import ReimburstRoute from "./routes/ReimburstRoute.js";
import GajiRoute from "./routes/GajiRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import InfoRoute from "./routes/InfoRoute.js";
import AbsensiRoute from "./routes/AbsensiRoute.js";
import smtpRoute from "./smtp/smtpRoute.js"
import cronRoute from "./shceduler/cronRoute.js"

import { job } from "./shceduler/cronjob.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

(async()=>{
    await db.sync();
})();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(UserRoute);
app.use(FormRoute);
app.use(GajiRoute);
app.use(AuthRoute);
app.use(ReimburstRoute);
app.use(InfoRoute);
app.use(AbsensiRoute);
app.use(smtpRoute);
app.use(cronRoute);

job.start();
store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...');
});
