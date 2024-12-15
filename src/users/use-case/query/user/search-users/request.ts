export class SearchUsersRequest {
  constructor(
    public page: number,
    public limit: number,
    public key: string,
  ) {}
}
