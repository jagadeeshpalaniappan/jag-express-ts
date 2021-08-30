import dotenv, { DotenvParseOutput } from 'dotenv';
// NOTE: do not import anything here (not even logger/winson), this needs to be loaded first
export const initEnvVariables = async (): Promise<DotenvParseOutput> => {
  try {
    console.log('## ENV:INTIALIZATION::START');
    const { error, parsed } = dotenv.config({ path: '.env' });
    if (error) throw error;
    console.log('## ENV:INTIALIZATION::END');
    return parsed;
  } catch (error) {
    console.error('## ENV:INTIALIZATION::FAILED');
    console.error(error);
    process.exit(1);
  }
};
