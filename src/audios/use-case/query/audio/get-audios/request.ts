export class GetAudiosRequest {
  constructor(
    public page: number,
    public limit: number,
    public categoryId?: string,
    public userId?: string,
    public key?: string,
  ) {}
}
