import { serverConfig } from "../config";
import logger from "../config/logger.config";
import transport from "../config/mailer.config";
import { InternalServerError } from "../utils/errors/app.error";

export async function sendEmail(to: string , subject: string , body: string){

  try {
    await transport.sendMail({
      from: serverConfig.USER,
      to,
      subject,
      html: body
    });
    logger.info(`Email send to: ${to} with subject: ${subject}`);
  } catch (error) {
    throw new InternalServerError('Failed to dend email');
  }
}