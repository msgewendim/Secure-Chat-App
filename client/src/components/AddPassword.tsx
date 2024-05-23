// import axios from "axios"
// import { ChangeEvent, FormEvent, useEffect, useState } from "react"
// import styled from "styled-components"
// import { User } from "../utils/models"
// import { toastOptions } from "../utils/providers"
// import { ToastContainer, toast } from "react-toastify"

// const AddPassword = () => {
//   const currentUser: User = JSON.parse(localStorage.getItem("chat-user")!) as User
//   const [password, setPassword] = useState({})
//   useEffect(() => {
//     setPassword({ ...password, userID: currentUser._id })
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   const handleChange = (e: ChangeEvent) => {
//     const name = (e.target as HTMLInputElement).name
//     const value = (e.target as HTMLInputElement).value
//     setPassword({ ...password, [name]: value })
//     console.log(password);
//   }

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault()
//     if (currentUser) {
//       try {
//         const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/password`,
//           { ...password }
//         )
//         const {message} = data
//         toast.success(message, toastOptions)
//       } catch (error ) {
//         toast.error(error as string, toastOptions)
//       }
//     }
//   }

//   return (
//     <Container>
//       <form className="form" onSubmit={(e) => handleSubmit(e)}>
//         <h1>Add Password</h1>
//         <input type="text" placeholder="Name" name="name" required onChange={(e) => handleChange(e)} />
//         <input type="text" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
//         <button type="submit">Add Password</button>
//       </form>
//       <ToastContainer />
//     </Container>
//   )
// }
// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #284c95;
//   width: 100vw;
//   height: 100vh;

//   .form {
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//   }
//   input {
//     width: 20rem;
//     height: 3rem;
//     border: 1px solid black;
//     border-radius: 10px;
//     padding: 0.5rem 1rem;
//     outline: none;
//   }
//   h1 {
//     font-size: 2rem;
//     text-transform: capitalize;
//     color: white;
//     text-align: center;
//   }
//   button {
//     padding: 0.5rem 1rem;
//     border-radius: 10px;
//     border: none;
//     background-color: #f52529;
//     color: white;
//     cursor: pointer;
//   }
// `
// export default AddPassword