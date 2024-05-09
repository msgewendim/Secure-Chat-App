import styled from "styled-components"  // for styling 
import Picker ,{Theme} from "emoji-picker-react";   // fro picking an emoji in dark mode
import { IoMdSend } from "react-icons/io"   // for sending message
import { BsEmojiSmileFill } from "react-icons/bs";  // for showing emoji picker
import { FormEvent, useState } from "react";  // for handling form submission

const ChatInput = ({ handleSendingMessage }: { handleSendingMessage: (message: string) => void }) => {

  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [message, setMessage] = useState("")

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiClick = (emoji: { emoji: string }) => {
    let messageValue = message
    messageValue += emoji.emoji
    setMessage(messageValue)
  }

  const sendMsg = (event: FormEvent) => {
    event.preventDefault()
    if (message.length > 0) {
      handleSendingMessage(message);
      setMessage("")
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}  />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} className="emoji-picker-react"  theme={Theme.DARK} height={"400px"} width={"300px"}/>}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendMsg(event)}>
        <input type="text" placeholder="Type your message here..." onChange={(e) => setMessage(e.target.value)} value={message} />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  padding : 0 2rem;
  padding-bottom : 0.3rem;
  
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    
    .emoji { // This is the emoji button
      position: relative;
      
      svg {  // This is the emoji icon
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      
      .emoji-picker-react {   // This is the emoji picker
        position: absolute;
        top: -410px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }

  .input-container {
    width: 95%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #020f0c;
    
    input {
      width: 90%;
      height: 80%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 2rem;   // padding: top right bottom left
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #34f7b1;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        cursor: pointer;
        font-size: 2rem;
        color: white;
      }
    }
  }        
`
export default ChatInput