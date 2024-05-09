import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import loader from "../assets/loader.gif"
import axios from "axios";
import { Buffer } from "buffer";
import { toastOptions } from '../utils/providers';

const SetAvatar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [avatars, setAvatars] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<number>(NaN);  // index of selected avatar
  const currentUser = JSON.parse(localStorage.getItem("chat-user")!);
  const setProfilePic = async () => {
    if (isNaN(selectedAvatar)) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/users/setAvatar/${currentUser.id}`, {
        image: avatars[selectedAvatar],
      });
      if (!data) {
        toast.error("Error while setting avatar try again", toastOptions);
        return;
      }
      toast.success("Avatar set successfully", toastOptions);
      localStorage.setItem("chat-user", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      toast.error("Error while setting avatar try again", toastOptions);
    }
  };

  useEffect(() => {     // check if user is logged-in => redirect to home else redirect to login
    if (!currentUser) {
      navigate("/login");
    } else if (currentUser.image === null || currentUser.image === "") {
      navigate("/setAvatar");
    } else {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getAvatars();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getAvatars = async () => {
    const avatarsList = [];
    try {
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(`
          ${import.meta.env.VITE_AVATAR_PROVIDER_API}${Math.floor(Math.random() * 1000)}?apikey=${import.meta.env.VITE_AVATARS_API_KEY}`);
        const buffer = new Buffer(image.data);    // convert image string to base64 string
        avatarsList.push(buffer.toString("base64"));
      }
      console.log(avatarsList.length);
      setAvatars(avatarsList);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error while fetching avatars", toastOptions);
    }

  };

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title">
            <h1>Pick an Avatar for your profile</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={avatar}
                  className={`avatar ${selectedAvatar === index ? "selected" : ""
                    }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit-btn" onClick={setProfilePic}>Set as Profile Picture</button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }
  .title {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
export default SetAvatar;