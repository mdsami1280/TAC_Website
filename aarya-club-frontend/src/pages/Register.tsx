import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  Paper,
  Avatar,
  Grid,
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  School as SchoolIcon,
  Group as GroupIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await register({
        username: formData.username,
        email: formData.email,
        fullName: formData.fullName,
        password: formData.password,
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ff6b35 0%, #ff9a6b 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          {/* Left side - Welcome content */}
          <Grid item xs={12} md={6}>
            <Box textAlign="center" color="white">
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 3,
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <SchoolIcon sx={{ fontSize: 60 }} />
              </Avatar>
              
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Join Aarya Club
              </Typography>
              
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Become an Admin for CSE Cultural Club
              </Typography>
              
              <Grid container spacing={3} justifyContent="center">
                <Grid item>
                  <Box textAlign="center">
                    <GroupIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1">Manage Members</Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box textAlign="center">
                    <EventIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1">Organize Events</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Right side - Register form */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={10}
              sx={{
                p: 4,
                borderRadius: 3,
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
              }}
            >
              <Box textAlign="center" mb={3}>
                <Avatar sx={{ bgcolor: 'secondary.main', mx: 'auto', mb: 2 }}>
                  <PersonAddIcon />
                </Avatar>
                <Typography variant="h4" fontWeight="bold" color="secondary">
                  Admin Registration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create your admin account
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  margin="normal"
                  required
                  variant="outlined"
                />
                
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  margin="normal"
                  required
                  variant="outlined"
                  autoComplete="username"
                />
                
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  margin="normal"
                  required
                  variant="outlined"
                  autoComplete="email"
                />
                
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                  variant="outlined"
                  autoComplete="new-password"
                />
                
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  margin="normal"
                  required
                  variant="outlined"
                  autoComplete="new-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>

                <Box textAlign="center">
                  <Typography variant="body2">
                    Already have an account?{' '}
                    <Button
                      component={RouterLink}
                      to="/login"
                      variant="text"
                      color="primary"
                    >
                      Login here
                    </Button>
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Register;
