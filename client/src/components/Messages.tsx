import styled from "styled-components"
import { Message } from "../utils/models";
import { v4 as uuidv4 } from 'uuid';

const Messages = ({messages, scrollRef}: {messages: Message[], scrollRef: React.RefObject<HTMLDivElement>}) => {
  return (
    <Container>
      {
        messages.map((message) => (
          <div key={uuidv4()} ref={scrollRef} className={`message ${message.fromSelf ? "sended" : "received"}`}>
            <div className="content">
              <p>{message.message}</p>
            </div>
          </div>
        ))
      }
    </Container>
  )
}

const Container = styled.div`
  overflow-y: scroll;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  overflow : scroll;

  .message {
    display: flex;
    align-items: center;
    
    .content {
      max-width: 80%;
      overflow-wrap: break-word;  // it will break the word if it is too long
      padding: 0.5rem 1rem;   // padding: top right bottom left
      text-align: justify;
      background-color: #080420;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        max-width: 70%;
      } 
    }
  }
  .sended {
    justify-content: flex-end;
    .content {
      border-radius: 1.5rem 1.5rem 0 1.5rem;  // top-left top-right bottom-right bottom-left
    }
  }
  .received {
    justify-content: flex-start;
    .content {
      border-radius: 1.5rem 1.5rem 1.5rem 0;  // top-left top-right bottom-right bottom-left
      background-color: black;
    }
  }}

  // hide scrollbar 
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 10px;
  }
`
export default Messages;