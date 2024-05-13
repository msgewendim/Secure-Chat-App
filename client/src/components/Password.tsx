// import styled from "styled-components"
// import { FaRegCopy } from "react-icons/fa";
// import { BiHide } from "react-icons/bi";
// import { PasswordType } from "../utils/models"
// const Password = ({ password, _doc }: PasswordType) => {
//   return (
//     password && _doc &&
//     <Container>
//       <div className="password">
//         <h4>{_doc.name}</h4>
//         <input type="password" placeholder="Password" value={password} />
//         <div className="span">

//           <span className="hide">{
//             <BiHide />
//           } </span>
//           <span className="copy">{
//             <FaRegCopy />
//           }</span>
//         </div>
//       </div>
//     </Container>
//   )
// }

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   background-color: #d1d1d1;
//   padding: 1rem;
//   width: 1024px;
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     width: 50vw;  
//   }

//   .password {
//     display: grid;
//     grid-template-columns: 1fr 1fr 1fr;  
//     justify-content: space-around;    
//     align-items: center;
//     gap: 1rem;
//     padding: 0 1rem;
//     border-radius: 10px;
//     width: 100%;
    
//     h4 {
//       color: black;
//       font-size: 1.5rem;
//       text-transform: capitalize;

//     }

//     input {
//       border: 1px solid black;
//       border-radius: 10px;
//       padding: 0.5rem 1rem;
//       outline: none;
//       background-color: transparent;
//       color: black;
//       font-size: 1.5rem;
//     }

//     span {
//       cursor: pointer;
//     }
//   }
  

// `
// export default Password