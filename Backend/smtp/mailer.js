import { approvedOvertime, approvedReimburst, OvertimeRequest, ReimburstRequest, rejectedOvertime, rejectedReimburst, transporter  } from './config.js';

export const OvertimeMailApproved = (email) => {
    transporter
    const  mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Overtime - Notification",
        html: approvedOvertime,
      };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
};

export const OvertimeMailReject = (email) => {
    transporter
    const  mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Overtime - Notification",
        html: rejectedOvertime,
      };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
};

export const ReimburstMailApproved = (email) => {
    transporter
    const  mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reimburstment - Notification",
        html: approvedReimburst,
      };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
};

export const ReimburstMailReject = (email) => {
    transporter
    const  mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reimburstment - Notification",
        html: rejectedReimburst,
      };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
};

export const OvertimeMailRequest = (email) => {
    transporter
    const  mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Overtime - Request",
        html: OvertimeRequest,
      };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
};

export const ReimburstMailRequest = (email) => {
    transporter
    const  mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reimburstment - Request",
        html: ReimburstRequest,
      };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
};