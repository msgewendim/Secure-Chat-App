export interface IMessageRepo<M> {
  getAllMessages(sender: string, receiver: string): Promise<M[] | unknown>
  createMessage(text : string, users: Array<string>, sender: string): Promise<M | unknown>
}
