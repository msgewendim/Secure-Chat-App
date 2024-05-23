import styled from "styled-components"
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { PasswordType, User } from "../utils/models";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../utils/providers";

const PasswordList = () => {
  const currentUser = JSON.parse(localStorage.getItem("chat-user")!) as User
  const [passwords, setPasswords] = useState<PasswordType[]>([])
  const [password, setPassword] = useState({})
  const [page, setPage] = useState(1)
  const getPassword = async () => {
    if (currentUser) {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/password/getAll/${currentUser._id}?page=${page}`)
        const { passwords } = data
        setPasswords(passwords)
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    getPassword()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])
  // const currentUser: User = JSON.parse(localStorage.getItem("chat-user")!) as User
  useEffect(() => {
    setPassword({ ...password, userID: currentUser._id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e: ChangeEvent) => {
    const name = (e.target as HTMLInputElement).name
    const value = (e.target as HTMLInputElement).value
    setPassword({ ...password, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (currentUser) {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/password`,
          { ...password }
        )
        const { message } = data
        toast.success(message, toastOptions)

        // Clear form
        e.currentTarget && (e.target as HTMLFormElement).reset()  
      } catch (error) {
        toast.error(error as string, toastOptions)
      }
    }
    // REFRESH PASSWORDS  
    getPassword()
  }
  const decryptPassword = async (encryptedPassword: PasswordType) => {
    try {
      const { _doc } = encryptedPassword
      const { data }: AxiosResponse = await axios.post(`${import.meta.env.VITE_API_URL}/password/decrypt`, {
        password: _doc.password,
      })
      const newPassword = passwords.map((value) => {
        if (value._doc._id === _doc._id) {
          return { ...value, _doc: { ...value._doc, name: data.password } }
        }
        return value
      })
      setPasswords(newPassword)
    } catch (error) {
      toast.error(error as string, toastOptions)
    }
  }
  return (
    <Container>
      {
        !passwords || !passwords.length ? (
          <div className="noPasswords">
            <h1>No Passwords Added</h1>
          </div>
        ) :
          (
            <div className="passwords">
              <h1>Passwords</h1>
              {
                passwords && passwords.map((password: PasswordType) => {
                  const { _doc } = password
                  return (
                    <div className="password" key={_doc._id} onClick={() => {
                      decryptPassword({
                        ...password
                      })
                    }}>
                      <h3 >{_doc.name}</h3>
                    </div>
                  )
                })
              }
              <button onClick={() => setPage(page + 1)}>Reload More</button>
            </div>
          )}
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <h1>Add Password</h1>
        <div className="input">
          <input type="text" placeholder="Name" name="name" required onChange={(e) => handleChange(e)} />
          <input type="text" placeholder="Password" name="password" onChange={(e) => handleChange(e)} />
        </div>
        <button type="submit">Add Password</button>
      </form>
      <ToastContainer />
    </Container >
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  gap: 5rem;
  background: linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.15) 100%), radial-gradient(at top center, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.40) 120%) #989898;
  background-blend-mode: multiply,multiply;

  .passwords {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: #131324;
    color: white;
    width: 500px;
    height: 600px;
    position: relative;

    h1 {
      text-align: center;
      top: 0;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    .password {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      background-color: #9a86f3;
      padding: 1rem;
      border-radius: 1rem;
      text-align: center;
      cursor: pointer;
    }

    button {
      position: absolute;
      bottom: 20px;
      left: 200px;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border-radius: 1rem;
    background-color: #131324;
    color: white;
    width: 500px;
    height: 600px;
    position: relative;

    .input {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      border-radius: 1rem;
      text-align: center;

      input {
        width: 100%;
        padding: 1rem;
        background-color: transparent;
        color: white;
        border: 1px solid white;
        border-radius: 0.5rem;
        outline: none;
      }
    }

    h1 {
      text-align: center;
      top: 0;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }

    button {
      left: 180px;  
      size: 1rem;
      font-size: 1rem;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      position: absolute;
      bottom: 300px;
    }
  }
  button {
    background-color: red;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  
`
export default PasswordList