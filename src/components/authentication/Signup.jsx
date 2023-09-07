import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [username, setUsername] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);

    if (!username || !password || !confirmPassword) {
      toast({
        title: 'Please Fill all the Feilds',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords Do Not Match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/user/signup',
        {
          username,
          password,
        },
        config
      );
      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/chats');
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response?.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing='5px'>
      <FormControl
        id='username'
        isRequired
      >
        <FormLabel>Username</FormLabel>
        <Input
          placeholder='Enter Username'
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl
        id='password'
        isRequired
      >
        <FormLabel>Password</FormLabel>
        <InputGroup size='md'>
          <Input
            type={show ? 'text' : 'password'}
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width='4.5rem'>
            <Button
              h='1.75rem'
              size='sm'
              onClick={handleClick}
            >
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl
        id='password'
        isRequired
      >
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type={show ? 'text' : 'password'}
          placeholder='Confirm password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme='blue'
        width='100%'
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
