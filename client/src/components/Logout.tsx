import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { TbLogout2 } from "react-icons/tb";
const Logout = ({ socket }: { socket: React.MutableRefObject<Socket | undefined> }) => {
  const navigate = useNavigate()
  const handleLogout = () => {
    socket.current?.emit("logout")   // emit disconnect to socket server
    localStorage.clear()         // clear local storage
    navigate("/login")

  }
  return (
    <Button onClick={handleLogout}>
      {/* <BiPowerOff /> */}
      <TbLogout2 />
    </Button>
  )
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #f52529;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`

export default Logout