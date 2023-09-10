import React from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import BoringAvatars from './BoringAvatars';

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: 'flex' }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize='25'
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            Profile
          </ModalHeader>
          <ModalCloseButton
            mt='2'
            mr='2'
          />
          <ModalBody
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDir='column'
            gap='3'
            mb='2'
          >
            <BoringAvatars
              name={user.username}
              size={80}
            />
            <Text>{user.username}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
