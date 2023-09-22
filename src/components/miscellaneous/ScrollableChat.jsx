import { Box, Tooltip } from '@chakra-ui/react';
import ScrollableFeed from 'react-scrollable-feed';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../utils/ChatLogics';
import { ChatState } from '../../contexts/ChatProvider';
import BoringAvatars from './BoringAvatars';

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      <Box marginBottom='1'>
        {messages &&
          messages.map((m, i) => (
            <div
              style={{ display: 'flex' }}
              key={m._id}
            >
              {(isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
                <Box
                  mt='1'
                  mr='1'
                >
                  <Tooltip
                    label={m.sender.username}
                    placement='bottom-start'
                    hasArrow
                  >
                    <BoringAvatars
                      name={m.sender.username}
                      size={30}
                    />
                  </Tooltip>
                </Box>
              )}

              <span
                style={{
                  backgroundColor: `${m.sender._id === user._id ? '#BEE3F8' : '#B9F5D0'}`,
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  // marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                  marginTop: '3px',
                  borderRadius: '20px',
                  padding: '5px 15px',
                  maxWidth: '75%',
                }}
              >
                {m.content}
              </span>
            </div>
          ))}
      </Box>
    </ScrollableFeed>
  );
};

export default ScrollableChat;
