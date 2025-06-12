import nodemailer from 'nodemailer';
import { serverConfig } from '.';


const transport = nodemailer.createTransport({
    service: 'gmail', // which smtp service u goona use
    auth: {
        user: serverConfig.USER,
        pass: serverConfig.PASSWORD
    }
});

export default transport;