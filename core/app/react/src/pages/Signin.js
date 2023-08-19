import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import { Container, Typography, TextField, Button } from '@mui/material';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signIn(email, password);
      navigate('/Home');
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '16px', textAlign: 'center' }}>
      <div>
        <Typography variant="h4" component="h1" fontWeight="bold" sx={{ marginBottom: '2rem' }}>
          Sign in to your account
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
          Don't have an account yet?{' '}
          <Link to="/signup" className="underline">
            Sign up.
          </Link>
        </Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          margin="normal"
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
          sx={{ marginTop: '16px' }}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Signin;
