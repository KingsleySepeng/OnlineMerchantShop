export class User {

  constructor(
    private _id: number = 0,
    private _userName: string = '',
    private _firstName: string = '',
    private _lastName: string='',
    private _email: string='',
    private _password: string='',
    private _role:string='',
    private _phone: string='',
  ) { }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get userName(): string {
    return this._userName;
  }

  set userName(value: string) {
    this._userName = value;
  }


  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }


  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }
}
