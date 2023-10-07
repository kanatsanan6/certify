import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  salt: process.env.SALT,
}));
