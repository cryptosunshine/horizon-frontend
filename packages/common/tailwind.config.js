import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const tailwindConfig = require('tailwind-config/tailwind.config.cjs');

export default tailwindConfig;