import dotenv, { DotenvParseOutput } from 'dotenv';

export const initEnvVariables = async (): Promise<DotenvParseOutput> => {
  try {
    console.log('## ENV:INTIALIZATION::START');
    const { error, parsed } = dotenv.config({ path: '.env' });
    if (error) throw error;
    console.log('## ENV:INTIALIZATION::END');
    return parsed;
  } catch (error) {
    console.error('## ENV:INTIALIZATION::FAILED');
    console.error('⚠️  .env file not found  ⚠️');
    console.error(error);
    process.exit(1);
  }
};
