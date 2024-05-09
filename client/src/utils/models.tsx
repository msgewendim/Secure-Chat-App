type User = {
  id: string;
  username: string;
  email: string;
  image: string;
}
type Message ={
  fromSelf : boolean,
  message : string
}
export type {
  User, Message
}