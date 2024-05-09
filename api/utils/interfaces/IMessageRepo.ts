export interface IMessageRepo<M> {
  getAllMessages(sender: number, receiver: number): Promise<M[] | unknown>
  createMessage(text : string, users: Array<number>, sender: number): Promise<M | unknown>
}
