import { Address } from './address';

export interface User {
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    passConfirm : string,
    address : Address
  }