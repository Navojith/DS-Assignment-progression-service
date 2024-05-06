export interface HttpHeaders {
  [key: string]: string | undefined;
}

export interface HttpResponse {
  data: any;
  statusCode: number;
}
