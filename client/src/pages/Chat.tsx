import styled from "styled-components"
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../utils/models";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { Socket, io } from "socket.io-client";
const Chat = () => {
  const [contacts, setContacts] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [currentChat, setCurrentChat] = useState<User | undefined>();
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const socket = useRef<Socket>();

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:8000");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser])
  
  useEffect(() => {
    if (!localStorage.getItem("chat-user")) {
      navigate("/login")
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-user")!))
      setIsLoaded(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChatChange = (chat: User) => {
    setCurrentChat(chat)
  }
  const getContacts = async () => {
    if (currentUser) {
      if (currentUser.image !== "" || currentUser.image !== null || currentUser.image !== undefined) {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/users/contacts/${currentUser._id}`)
        setContacts(data);
      } else {
        navigate("/setAvatar")
      }
    }
  }
  useEffect(() => {
    getContacts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, ])
  return (
    <Container>
      <div className="container">
        {   // show contacts if currentUser is defined else login
          currentUser && <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} socket={socket} />
        }
        {   // show welcome screen if currentChat is undefined else show chat container
          isLoaded &&
            currentChat === undefined ?
            currentUser && <Welcome currentUser={currentUser} /> :
            currentChat && currentUser && <ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket} />
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
  background-blend-mode: multiply,multiply;
  
  .container {
    height: 85vh;
    width: 75vw;
    background-color: #084d44;
    display: grid;
    grid-template-columns: 25% 75%;
    border-radius: 10px;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }

`
export default Chat