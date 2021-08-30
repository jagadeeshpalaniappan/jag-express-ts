export interface AppConfig {
  express: {
    port: string | number;
  };
  mongoose: {
    url: string;
  };
  winston: {
    logLevel: string;
  };
}
