import { User } from "../utils/models";
import robot from '../assets/robot.gif';
import styled from "styled-components";
const Welcome = ({currentUser} : {currentUser: User}) => {
  return (
    <Container>
      <img src={robot} alt="welcome robot" />
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
  }
`;
export default Welcome; 