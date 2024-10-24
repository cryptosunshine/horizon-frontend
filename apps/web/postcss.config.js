import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const tailwindConfig = require('../../packages/tailwind-config/postcss.config.js');

export default tailwindConfig;