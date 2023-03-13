import express from "express";
import { OvertimeMailApproved, OvertimeMailReject, OvertimeMailRequest, ReimburstMailApproved, ReimburstMailReject, ReimburstMailRequest } from "./mailer.js";

const router = express.Router();

router.post("/overtime-request", async (req, res) => {
    const { email } = req.body;

    try {
        await OvertimeMailRequest(email);
        console.log("Email sent successfully - Overtime Request");
        res.status(201).json({ status: 201 });
    } catch (error) {
        console.log("Error: " + error);
        res.status(401).json({ status: 401, error });
    }
});

router.post("/reimburst-request", async (req, res) => {
    const { email } = req.body;

    try {
        await ReimburstMailRequest(email);
        console.log("Email sent successfully - Reimburstment Request");
        res.status(201).json({ status: 201 });
    } catch (error) {
        console.log("Error: " + error);
        res.status(401).json({ status: 401, error });
    }
});


router.post("/overtime-approved", async (req, res) => {
    const { email } = req.body;

    try {
        await OvertimeMailApproved(email);
        console.log("Email sent successfully - Overtime");
        res.status(201).json({ status: 201 });
    } catch (error) {
        console.log("Error: " + error);
        res.status(401).json({ status: 401, error });
    }
});

router.post("/overtime-rejected", async (req, res) => {
    const { email } = req.body;

    try {
        await OvertimeMailReject(email);
        console.log("Email sent successfully - Overtime");
        res.status(201).json({ status: 201 });
    } catch (error) {
        console.log("Error: " + error);
        res.status(401).json({ status: 401, error });
    }
});

router.post("/reimburst-approved", async (req, res) => {
    const { email } = req.body;

    try {
        await ReimburstMailApproved(email);
        console.log("Email sent successfully - Reimburstment");
        res.status(201).json({ status: 201 });
    } catch (error) {
        console.log("Error: " + error);
        res.status(401).json({ status: 401, error });
    }
});

router.post("/reimburst-rejected", async (req, res) => {
    const { email } = req.body;

    try {
        await ReimburstMailReject(email);
        console.log("Email sent successfully - Reimburstment");
        res.status(201).json({ status: 201 });
    } catch (error) {
        console.log("Error: " + error);
        res.status(401).json({ status: 401, error });
    }
});

export default router;
