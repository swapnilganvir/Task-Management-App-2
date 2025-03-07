import React, { useContext, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';

const SignIn = ({ setSignedIn, setTab }) => {
  const { URL, setUserID } = useContext(StoreContext);

  const [access, setAccess] = useState('Login');
  const [alertText, setAlertText] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function submit() {
    let response = {};
    if (access == 'Login') {
      response = await axios.post(`${URL}/api/user/login`, userData);
    } else {
      response = await axios.post(`${URL}/api/user/register`, userData);
    }

    if (response.data.success) {
      setUserID(response.data.data.id);
      localStorage.setItem('token', [
        response.data.data.id,
        response.data.data.name,
      ]);
      setSignedIn(true);
      setTab(0);

      if (access == 'Login') {
        console.log('Logged In');
      } else {
        console.log('User Registered');
      }
    } else {
      setAlertText(response.data.message);
    }
  }

  return (
    <Box component="form" sx={{ width: '280px' }}>
      <Typography variant="h6">Welcome to To-do app</Typography>

      {access == 'Register' && (
        <TextField
          variant="outlined"
          name="name"
          label="Your name"
          value={userData.name}
          onChange={handleChange}
          fullWidth={true}
          sx={{ marginBottom: '15px' }}
        />
      )}

      <TextField
        variant="outlined"
        name="email"
        label="Your email"
        value={userData.email}
        onChange={handleChange}
        fullWidth={true}
        sx={{ marginBottom: '15px' }}
      />

      <TextField
        variant="outlined"
        name="password"
        label="Password"
        type="password"
        value={userData.password}
        onChange={handleChange}
        fullWidth={true}
        sx={{ marginBottom: '15px' }}
      />

      <Typography variant="caption" sx={{ color: 'red' }}>
        {alertText}
      </Typography>

      <Button variant="contained" onClick={submit} fullWidth={true}>
        {access == 'Login' ? 'Sign in to continue' : 'Register to continue'}
      </Button>

      {access == 'Login' ? (
        <Typography variant="h7">
          Create a new account?
          <span>
            <Button onClick={() => setAccess('Register')}>Click here</Button>
          </span>
        </Typography>
      ) : (
        <Typography variant="h7">
          Already have an account?
          <span>
            <Button onClick={() => setAccess('Login')}>Login here</Button>
          </span>
        </Typography>
      )}
    </Box>
  );
};

export default SignIn;
