export interface AppConfig {
  express: {
    port: string | number;
  };
  mongoose: {
    url: string;
  };
}

export const appConfig: AppConfig = {
  express: {
    port: process.env.PORT || 3000,
  },
  mongoose: {
    url: process.env.MONGODB_URI,
  },
};
