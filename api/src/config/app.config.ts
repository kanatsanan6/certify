import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  salt: parseInt(process.env.SALT),
}));
