export interface AppConfig {
  port: number;
  db: {
    url: string;
  };
  baseUrls: {
    courseManagementService: string;
    authService: string;
    notificationsService: string;
  };
}
