export class User {
  constructor(
    public id: number,
    public ssn: number,
    public email: string,
    public firstName: string,
    public lastName: string,
    public isAdmin: boolean) {}
}
