import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import BoringAvatars from './BoringAvatars';

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor='pointer'
      bg='#E8E8E8'
      _hover={{
        background: '#38B2AC',
        color: 'white',
      }}
      w='100%'
      px='3'
      py='2'
      mb='2'
      borderRadius='lg'
      display='flex'
      alignItems='center'
      gap='3'
    >
      <BoringAvatars name={user.username} />
      <Text>{user.username}</Text>
    </Box>
  );
};

export default UserListItem;
