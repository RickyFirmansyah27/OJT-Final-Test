import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// export const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASS,
//     }
// });

export const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5578a4ddc024a1",
      pass: "522543e39b185f"
    }
  });

export const approvedOvertime = 
`<p>Dear User,</p>
    <p>Your overtime request has been <strong>Approved</strong>.</p>
    <p>Best regards,</p>
<p>The MiniApp</p>`

export const rejectedOvertime = 
`<p>Dear User,</p>
    <p>Your overtime request has been <strong>Reject</strong>.</p>
    <p>Best regards,</p>
<p>The MiniApp</p>`

export const approvedReimburst = 
`<p>Dear User,</p>
    <p>Your Reimburstment request has been <strong>Approved</strong>.</p>
    <p>Best regards,</p>
<p>The MiniApp</p>`

export const rejectedReimburst = 
`<p>Dear User,</p>
    <p>Your overtime request has been <strong>Reject</strong>.</p>
    <p>Best regards,</p>
<p>The MiniApp</p>`

export const OvertimeRequest = 
`<p>Dear HR Department,</p>
    <p>An overtime request has been submitted.</p>
    <p>Please take appropriate action and let the employee know the status of the request.</p>
<p>Best regards,</p>
<p>The MiniApp</p>`

export const ReimburstRequest = 
`<p>Dear HR Department,</p>
    <p>An Reimburst request has been submitted.</p>
    <p>Please take appropriate action and let the employee know the status of the request.</p>
<p>Best regards,</p>
<p>The MiniApp</p>`
