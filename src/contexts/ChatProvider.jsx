import { createContext, useContext, useEffect, useState } from 'react';
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem('user') === null ? {} : JSON.parse(localStorage.getItem('user')));
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>{children}</ChatContext.Provider>;
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
