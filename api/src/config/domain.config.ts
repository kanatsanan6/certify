import { registerAs } from '@nestjs/config';

export default registerAs('domain', () => ({
  timeout: 500,
}));
