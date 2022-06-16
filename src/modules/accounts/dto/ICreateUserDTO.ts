interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
  avatar: null | string;
}

export { ICreateUserDTO };