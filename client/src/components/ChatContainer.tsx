import {  Message, User } from "../utils/models"
import styled from "styled-components"
import ChatInput from "./ChatInput";
import axios, { AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";
import Messages from "./Messages";
import { Socket } from "socket.io-client";

const ChatContainer = ({ currentChat, currentUser, socket }: { currentChat: User, currentUser: User, socket: React.MutableRefObject<Socket | undefined> }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [arrivedMessage, setArrivedMessage] = useState<Message>()
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat) {  
        const response : AxiosResponse = await axios.post(`${import.meta.env.VITE_API_URL}/message/getMessages`, {
          sender: currentUser.id,
          receiver: currentChat.id
        })
        const {data} = response
        setMessages(data.messages)
      }   
    }
    getMessages()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat]);

  const sendMsg = async (message : string) => {
    await axios.post(`${import.meta.env.VITE_API_URL}/message/addMsg`, {
      sender: currentUser.id,
      receiver: currentChat.id,
      message,
    });

    // console.log(data.result.message.text); // added message text
    if(socket.current) {
      socket.current.emit("send-message",{
        sender: currentUser.id,
        receiver: currentChat.id,
        message,
      });   // send message to socket server
      
    }
    const newMessages = [...messages]  // create new array
    newMessages.push({
      fromSelf: true,
      message: message 
    })  // add attributes to message obj

    setMessages(newMessages)  // set messages
  }

  useEffect(() => {
    if(socket.current) {
      socket.current.on("receive-message", (data : string) => {
        setArrivedMessage({fromSelf: false, message : data})
      })
    }
  }, [arrivedMessage, socket]); // set arrived message 

  useEffect(() => {
    arrivedMessage && setMessages((prev) => [...prev, arrivedMessage])
  }, [arrivedMessage]);   // set messages with arrived message from socket server

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  },[messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.image}`}
              alt={currentChat.username}
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
      </div>
      <Messages messages={messages} scrollRef={scrollRef}/>
      <ChatInput handleSendingMessage={sendMsg}/>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #898f9;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;  
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
          text-transform: capitalize;
        }
      }
    }
  }

`;
export default ChatContainer