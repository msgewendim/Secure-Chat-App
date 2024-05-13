// import axios, { AxiosResponse } from "axios";
// import { Buffer } from "buffer";
// import { createContext, useState } from "react"
// import { toast } from "react-toastify";
// import { toastOptions } from "../providers";

// const ChatContext = createContext({})
// const ChatProvider = ({ children } : { children: JSX.Element | JSX.Element[]}) => {
//   const API_URL = import.meta.env.VITE_API_URL;
//   const [isLoading, setIsLoading] = useState(true);
//   const [avatars, setAvatars] = useState<string[]>([]);
//   // fetch data from server

//   // GET AVATARS
//   const getAvatars = async () => {
//     const avatarsList = [];
//     try {
//       for (let i = 0; i < 4; i++) {
//         const image = await axios.get(`
//           ${import.meta.env.VITE_AVATAR_PROVIDER_API}${Math.floor(Math.random() * 1000)}?apikey=${import.meta.env.VITE_AVATARS_API_KEY}`);
//         const buffer = new Buffer(image.data);    // convert image string to base64 string
//         avatarsList.push(buffer.toString("base64"));
//       }
//       console.log(avatarsList.length);
//       setAvatars(avatarsList);
//       setIsLoading(false);
//     } catch (error) {
//       toast.error("Error while fetching avatars", toastOptions);
//     }
//   };

//   // GET MESSAGES
//   const getMessages = async () => {
//     if (currentChat) {  
//       const response : AxiosResponse = await axios.post(`${import.meta.env.VITE_API_URL}/message/getMessages`, {
//         sender: currentUser.id,
//         receiver: currentChat.id
//       })
//       const {data} = response
//       setMessages(data.messages)
//     }   
//   }
  
//   const values = {
//     getAvatars,
//     avatars,
//     isLoading,
//     API_URL,
//   }
//   return (
    
//     <ChatContext.Provider value={values}>
//       {children}
//     </ChatContext.Provider>
//   )
// }

// export default ChatProvider