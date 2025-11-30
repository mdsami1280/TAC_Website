import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Box, Paper, Typography, Button, Alert } from '@mui/material';

const AuthDebug: React.FC = () => {
  const { user, token, logout } = useAuth();

  const testAPI = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/events', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('API Success:', data);
        alert('API call successful! Check console for data.');
      } else {
        console.error('API Error:', response.status, response.statusText);
        alert(`API call failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert(`Network error: ${error}`);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Authentication Debug Info
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'Not logged in'}
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>Token:</strong> {token ? `${token.substring(0, 50)}...` : 'No token'}
        </Typography>
        
        <Typography variant="body2" sx={{ mb: 2 }}>
          <strong>Token in localStorage:</strong> {localStorage.getItem('token') ? 'Yes' : 'No'}
        </Typography>
        
        <Button variant="contained" onClick={testAPI} sx={{ mr: 2 }}>
          Test API Call
        </Button>
        
        <Button variant="outlined" onClick={logout}>
          Logout
        </Button>
      </Paper>
      
      <Alert severity="info">
        If the API test fails, check your browser console for detailed error information.
      </Alert>
    </Box>
  );
};

export default AuthDebug;
