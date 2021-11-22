import type ICustomer from '../interfaces/ICustomer';

export default class Customer implements ICustomer {
  id: string;

  name: string;

  birthday: string;

  constructor({ id, name, birthday }: Customer) {
    this.id = id;
    this.name = name;
    this.birthday = birthday;
  }

  // getCurrentAge(): number {
  //   const currentDate = new Date();
  //   const customerBirthday = new Date(this.birthday);
  //   // const age =  currentDate.getFullYear() - customerBirthday
  //   return 0;
  // }
}
