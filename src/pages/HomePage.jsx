import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Signup from '../components/authentication/Signup';
import Login from '../components/authentication/Login';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container
      maxW='xl'
      centerContent
    >
      <Box
        display='flex'
        justifyContent='center'
        p={2}
        bg={'white'}
        w='100%'
        m=' 40px 0 15px 0'
        borderRadius='lg'
        borderWidth='1px'
      >
        <Text
          m='0 auto'
          fontSize='3xl'
        >
          Conversa
        </Text>
      </Box>
      <Box
        bg='white'
        w='100%'
        p={2}
        borderRadius='lg'
        borderWidth='1px'
      >
        <Tabs variant='soft-rounded'>
          <TabList mb='1em'>
            <Tab width='50%'>Log In</Tab>
            <Tab width='50%'>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
