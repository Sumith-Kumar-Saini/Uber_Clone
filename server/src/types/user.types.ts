export interface IUser {
  email: string;
  password: string;
  fullname: {
    firstName: string;
    lastName: string;
  };
  socketID: string;
  createAt: Date;
  updateAt: Date;
}
