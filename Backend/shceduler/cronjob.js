import cron from 'cron';
import axios from 'axios';
export const job = new cron.CronJob('0 0 * * *', async function () {
// export const job = new cron.CronJob('*/5 * * * *', async () => {
    try {
        const [lemburResponse, reimburstResponse, response] = await Promise.all([
            axios.get('http://localhost:5000/overtimeCheck/Pending'),
            axios.get('http://localhost:5000/reimburstCheck/Pending'),
            axios.get('http://localhost:5000/role/HR'),
        ]);
        const email = response.data.email;
        console.log(email);

        if (reimburstResponse.data.length > 0) {
            console.log('Cron Job Execute - Reimburst Request');
            await axios.post('http://localhost:5000/reimburst-request', { email });
        }
        if (lemburResponse.data.length > 0) {
            console.log('Cron Job Execute - Overtime Request');
            await axios.post('http://localhost:5000/overtime-request', { email });
        }
    } catch (error) {
        console.error(error);
    }
});


