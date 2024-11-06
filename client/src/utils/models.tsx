type User = {
  _id: string;
  username: string;
  email: string;
  image: string;
}
type Message = {
  fromSelf: boolean,
  message: string
}

type PasswordType = {
  password: string;
  _doc: {
    _id: string,
    userID: number,
    name: string,
    password: string
  },
}


export type {
  User, Message, PasswordType
}