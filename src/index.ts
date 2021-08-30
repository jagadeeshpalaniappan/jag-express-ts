import { initEnvVariables } from './modules/app/external/dotenv';
initEnvVariables(); // This required - before we do any initialization

import { initApp } from './modules/app/init';
initApp();
