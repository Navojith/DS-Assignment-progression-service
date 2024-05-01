export interface AppConfig {
  port: number;
  db: {
    url: string;
  };
  rabbitMQ: {
    urls: string[];
    queue: string;
    queueOptions: {
      durable: boolean;
    };
  };
}
