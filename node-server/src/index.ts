import 'dotenv/config';
import express, { Request, Response } from 'express';
import { dbConnect } from './db/mongo';
import cron from 'node-cron';
import moment from 'moment-timezone';
import pricesRoutes from './routes/prices';
import { getBTC } from './services/crypto';
import { getSavedPricesService } from './services/prices';
import { sendBuyingEmail, sendSellingEmail } from './services/mailer';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/prices', pricesRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Crypto-signals');
});

cron.schedule('*/59 * * * *', async () => {
    let hour = moment().tz("America/Argentina/Buenos_Aires").format('MMMM Do YYYY, h:mm:ss a');
    //console.log(hour);
    let prices = await getSavedPricesService();
    //console.log(prices);
    if (!prices.active) return;
    const btc = await getBTC();
    //console.log(btc);
    if (btc > prices.sell) await sendSellingEmail(prices.sell, btc, hour);
    if (btc < prices.buy) await sendBuyingEmail(prices.buy, btc, hour);
    //console.log('running every 1 h');
});

dbConnect().then(() => console.log('mongodb connected'));

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));