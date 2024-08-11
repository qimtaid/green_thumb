import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  useColorModeValue
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const color = useColorModeValue('black', 'white');

  const[email, setEmail]= useState("")
  const[password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleloginUser = (e)=>{
    e.preventDefault()

    const userDetails = {
      email: email,
      password: password
    }
    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails)
    })
    .then((response) => {
      console.log("Server response status:", response.status);
      if (!response.ok) {
        console.error("Login failed");
        throw new Error("Login failed");
      }
      return response.json();
    })
    .then((result) => {
      const accessToken = result.access_token;
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        console.log("Login Successful");
        navigate("/");
    })
    .catch((err)=>{
      console.error(err);
    })
  }

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={8}
      borderWidth={1}
      borderRadius="lg"
      bg={bgColor}
      color={color}
      boxShadow="lg"
    >
      <Heading mb={6} textAlign="center">Login</Heading>
      <form onSubmit={handleloginUser}>
        <FormControl mb={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter your email" />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter your password" />
        </FormControl>
        <Button colorScheme="teal" type="submit" width="full" mt={4}>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
