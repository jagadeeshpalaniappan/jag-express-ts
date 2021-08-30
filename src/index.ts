import { initEnvVariables } from './modules/init/dotenv';
initEnvVariables(); // This required - before we do any initialization

import { initApp } from './modules/init';
initApp();
