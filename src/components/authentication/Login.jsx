import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../../contexts/ChatProvider';

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!username || !password) {
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
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post('/api/user/login', { username, password }, config);

      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setUser(data);
      navigate('/');
      setLoading(false);
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
      <Button
        colorScheme='blue'
        width='100%'
        mt='15'
        onClick={submitHandler}
        isLoading={loading}
      >
        Log In
      </Button>
      <Button
        colorScheme='red'
        width='100%'
        mt='15'
        onClick={() => {
          setUsername('guest');
          setPassword('1234');
        }}
      >
        Guest Credentials
      </Button>
    </VStack>
  );
};

export default Login;
