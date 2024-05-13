import { User } from "../utils/models";
import welcome from '../assets/welcome-robot.gif';
import styled from "styled-components";
const Welcome = ({currentUser} : {currentUser: User}) => {
  return (
    <Container>
      <img src={welcome} alt="welcome robot" />
      <h1>Welcome, <span>{currentUser.username}</span></h1>
      <h3>Please select a chat to Start messaging</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #fffc00; 
    font-size: 2rem;
    text-transform: capitalize; 
  }
`;
export default Welcome; 