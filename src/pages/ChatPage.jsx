import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import { ChatState } from '../contexts/ChatProvider';
import Chats from '../components/Chats';
import ChatBox from '../components/ChatBox';
import { useState } from 'react';

const ChatPage = () => {
  const { user } = ChatState();

  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: '100%' }}>
      <SideDrawer />
      <Box
        display='flex'
        justifyContent='space-between'
        h='91.6vh'
        w='100%'
        p='10px'
      >
        <Chats fetchAgain={fetchAgain} />
        <ChatBox
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
        />
      </Box>
    </div>
  );
};

export default ChatPage;
