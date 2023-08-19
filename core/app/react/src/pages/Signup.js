import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import { Container, Typography, TextField, Button } from '@mui/material';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password, name);
      navigate('/Home');
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '16px', textAlign: 'center' }}>
      <Typography variant="h4" component="h1" fontFamily="Times New Roman">
        Sign up for a free account
      </Typography>
      <Typography variant="body1" sx={{ marginTop: '8px' }}>
        Already have an account?{' '}
        <Link to="/" className="underline">
          Sign in.
        </Link>
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
        <TextField
          label="Preferred Name"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '16px' }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default Signup;
