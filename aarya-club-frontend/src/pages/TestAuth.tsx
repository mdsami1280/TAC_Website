import React, { useState } from 'react';
import { Box, Container, Paper, Typography, Button, TextField, Alert } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const TestAuth: React.FC = () => {
  const { login, user, token } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async () => {
    try {
      setError('');
      setSuccess('');
      await login(credentials.username, credentials.password);
      setSuccess('Login successful!');
    } catch (err: any) {
      setError(err.response?.data || err.message || 'Login failed');
    }
  };

  const testAPI = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/events', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('API Success:', data);
        setSuccess('API call successful! Check console.');
      } else {
        setError(`API call failed: ${response.status} ${response.statusText}`);
      }
    } catch (error: any) {
      setError(`Network error: ${error.message}`);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Authentication Test Page
        </Typography>
        
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Current Status:</Typography>
          <Typography>User: {user ? JSON.stringify(user) : 'Not logged in'}</Typography>
          <Typography>Token: {token ? `${token.substring(0, 50)}...` : 'No token'}</Typography>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>Test Login:</Typography>
          <TextField
            label="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </Box>
        
        <Box>
          <Typography variant="h6" gutterBottom>Test API:</Typography>
          <Button variant="outlined" onClick={testAPI}>
            Test Events API
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default TestAuth;
