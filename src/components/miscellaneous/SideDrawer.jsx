import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import React, { useState } from 'react';
import { SearchIcon, BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ChatState } from '../../contexts/ChatProvider';
import BoringAvatars from './BoringAvatars';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import UserListItem from './UserListItem';
import { getSender } from '../../utils/ChatLogics';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';

const SideDrawer = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const navigate = useNavigate();
  const { user, setUser, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const logoutHandler = () => {
    setUser({});
    navigate('/');
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: 'Please Enter something in search',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the Search Results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          'Context-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post('/api/chat', { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
    } catch (err) {
      toast({
        title: 'Error creating chat',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  return (
    <>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        bg='#fff'
        w='100%'
        p='5px 10px'
        borderWidth='5px'
      >
        <Tooltip
          label='Search user'
          hasArrow
          placement='bottom-end'
        >
          <Button
            variant='ghost'
            onClick={onOpen}
          >
            <SearchIcon />
            <Text
              display={{ base: 'none', md: 'flex' }}
              px='4'
            >
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize='2xl'>Conversa</Text>
        <Box
          display='flex'
          gap='2'
        >
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon
                fontSize='2xl'
                m={1}
              />
            </MenuButton>
            <MenuList>
              {!notification.length ? (
                <MenuItem>No messages!</MenuItem>
              ) : (
                notification.map((noti) => (
                  <MenuItem
                    key={noti._id}
                    onClick={() => {
                      setSelectedChat(noti.chat);
                      setNotification(notification.filter((no) => no !== noti));
                    }}
                  >
                    {noti.chat.isGroupChat ? `New Message: ${noti.chat.chatName}` : `New Message: ${getSender(user, noti.chat.users)}`}
                  </MenuItem>
                ))
              )}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              p='1'
              as={Button}
              rightIcon={<ChevronDownIcon />}
            >
              <BoringAvatars
                name={user.username}
                size={35}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Drawer
        placement='left'
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1'>Search Users</DrawerHeader>
          <DrawerBody>
            <Box
              display='flex'
              pb='2'
            >
              <Input
                placeholder='Search username'
                mr='2'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => {
                    accessChat(user._id);
                    onClose();
                  }}
                />
              ))
            )}
            {loadingChat && (
              <Spinner
                ml='auto'
                display='flex'
                justifyContent='center'
                alignItems='center'
              />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
