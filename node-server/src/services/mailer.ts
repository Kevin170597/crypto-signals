import nodemailer from 'nodemailer';

const appPass = 'hcbhkvahsuqggcav';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'kevin170597@gmail.com',
        pass: appPass
    }
});

export const sendBuyingEmail = async (purchasePrice: number, btcPrice: number, hour: string) => {
    await transporter.sendMail({
        from: '"Kevin Mendoza" <kevin170597@gmail.com>',
        to: 'kevin170597@gmail.com',
        subject: 'Buy',
        text: `BTC is lower than $ ${purchasePrice}. The price is $ ${btcPrice}. You should buy. ${hour}`
    });
};

export const sendSellingEmail = async (salePrice: number, btcPrice: number, hour: string) => {
    await transporter.sendMail({
        from: '"Kevin Mendoza" <kevin170597@gmail.com>',
        to: 'kevin170597@gmail.com',
        subject: 'Sell',
        text: `BTC is higher than $ ${salePrice}. The price is $ ${btcPrice}. You should sell. ${hour}`
    });
}