import fs from 'fs/promises';
import path from 'path';
import Handlebars from 'handlebars';
import { InternalServerError } from '../utils/errors/app.error';

export async function renderMailTemplate(templateId: string , params: Record<string , any>): Promise<any> {

 let templatePath = path.join(__dirname , 'mailers' , `${templateId}.hbs`);  // this will create the path

 try {
  const content = await fs.readFile(templatePath , 'utf-8');
  const FinalTemplate = Handlebars.compile(content);

  return FinalTemplate(params);

 } catch (error) {
  throw new InternalServerError(`Template not found :${templateId}`);
 }


}