import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../contexts/AuthContext';
import { Container, Typography, TextField, Button, Card, CardContent } from '@mui/material';
import '../styles/Category.css';


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
      <div className="container">
        <Container maxWidth="sm" sx={{ marginTop: '16px', textAlign: 'center' }}>
          <Card variant="outlined" sx={{backgroundColor: '#edebe6',
            paddingRight: '100px',
            paddingLeft: '100px',
            paddingBottom: '60px',
            paddingTop: '60px',}}>
            <CardContent>
              <div>
                <Typography
                    sx={{ fontSize: '36px', fontFamily: 'times new roman', fontWeight: '500' }}
                >
                  Sign in to your account
                </Typography>
                <Typography variant="body1" sx={{ margin: '10px'}}>
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
                    fullwidth
                    sx={{ marginTop: '16px', fontFamily: "times new roman", backgroundColor:"#6D712E", color:"#FFFFFF",}}
                    onClick={handleSubmit}
                >
                  Sign In
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </div>
  );
};

export default Signin;
