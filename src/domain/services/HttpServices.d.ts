interface IHttpServices {
  get<T>(params: TRequestConfig): Promise<T>
  post<T>(params: TRequestConfig): Promise<T>
  put<T>(params: TRequestConfig): Promise<T>
  delete<T>(params: TRequestConfig): Promise<T>
  patch<T>(params: TRequestConfig): Promise<T>
}
