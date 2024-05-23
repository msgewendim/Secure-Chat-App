import { useEffect, useState } from 'react';
import { User } from '../utils/models'
import styled from 'styled-components';
import logo from '../assets/logo-header.png';
import Logout from './Logout';
import { Socket } from 'socket.io-client';
import { Link } from 'react-router-dom';
import { TbPasswordUser } from 'react-icons/tb'
const Contacts = ({ contacts, currentUser, changeChat, socket }: { contacts: User[], currentUser: User, changeChat: (user: User) => void, socket: React.MutableRefObject<Socket | undefined> }) => {
  const [currentUserName, setCurrentUserName] = useState('');   // set current user name
  const [currentUserImage, setCurrentUserImage] = useState(''); // set current user image
  const [selectedContact, setSelectedContact] = useState<number | null>(null);  // set selected contact

  useEffect(() => {   // set current user name and image based on current user 
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.image);
    }
  }, [currentUser]);
  console.table(contacts);
  const handleContactClick = (contact: User, index: number) => {  // handle contact click
    setSelectedContact(index);
    changeChat(contact);
    if (index === 0) {  // if first contact is clicked => set current user to first contact and vice versa
      setCurrentUserImage(contact.image);
      setCurrentUserName(contact.username);
    } else {  // else set current user to previous contact and vice versa
      setCurrentUserImage(contacts[index - 1].image);
      setCurrentUserName(contacts[index - 1].username);
    }
  }
  return (
    <>
      {
        currentUserImage && currentUserName && (
          <Container>
            <div className="brand">
              <img src={logo} alt="logo" />
              <h3>Whisper</h3>
              <Link to="/passwords" className="passwords">
                <TbPasswordUser size={34} />
              </Link>
            </div>
            <div className="contacts">
              {
                contacts.length > 0 ? contacts.map((contact, index) => (
                  <div
                    key={index}
                    className={`contact ${index === selectedContact ? 'selected' : ''}`}
                    onClick={() => handleContactClick(contact, index)}
                  >
                    <div className="contact-img">
                      <img
                        src={`data:image/svg+xml;base64,${contact.image!}`}
                        alt={`${contact.username}`}
                      />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                )) : <div className="error">
                  <h3>No Contacts</h3>
                  <p>You have no contacts yet</p>
                </div>
              }
            </div>
            <div className="current-user">
              <Logout socket={socket} />
              <div className="currentUser-img">
                <img src={`data:image/svg+xml;base64,${currentUser.image}`} alt="avatar" />
              </div>
              <div className="username">
                <h3>{currentUser.username}</h3>
              </div>
            </div>
          </Container>
        )
      }
    </>
  )
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #075e54;
  border-right: 0.1rem solid #ffffff39;
  border-radius: 1rem 0 0 1rem;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-bottom: 0.1rem solid #ffffff39;
    border-radius: 1rem;
    position: relative;
    top: 0;
    
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
    .passwords {
      color: red;
      cursor: pointer;
      position: absolute;
      right: 0.7rem;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: transparent;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .contact-img {
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
    .selected {
      background-color: #248c95;
    }
  }
  .error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 4rem 1rem 0.5rem;
    h3 {
      color: white;
    }
    p {
      color: white;
    }
  }
  .current-user {
    border-top: 0.1rem solid #ffffff39;
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 2rem;
    .currentUser-img {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h3 {
        color: white;
        text-transform: capitalize; 
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h3 {
          font-size: 1rem;
        }
      }
    }
  }

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

`;
export default Contacts;