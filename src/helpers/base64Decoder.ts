import { Readable } from 'typeorm/platform/PlatformTools';
import { Buffer } from 'buffer';

export const base64Decoder = (base64Image: string) => {
  const imageBuffer = Buffer.from(getBase64Code(base64Image), 'base64');

  const file: Express.Multer.File = {
    fieldname: 'petimage',
    originalname: 'petimage',
    encoding: '7bit',
    mimetype: getMimeTypeFromBase64(base64Image),
    buffer: imageBuffer,
    size: imageBuffer.length,
    stream: new Readable(),
    destination: '',
    filename: '',
    path: '',
  };

  return file;
};

const getBase64Code = (base64String: string): string => {
  const index = base64String.indexOf(',');
  if (index === -1) {
    return base64String;
  }
  return base64String.slice(index + 1);
};

const getMimeTypeFromBase64 = (base64String: string): string => {
  const match = base64String.match(
    /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/,
  );
  if (match && match[1]) {
    return match[1];
  }
  return '';
};
