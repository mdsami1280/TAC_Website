import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
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
  AdminPanelSettings as AdminIcon,
  School as SchoolIcon,
  Security as SecurityIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.username, formData.password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.response?.data || 'Login failed. Please try again.');
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
                <AdminIcon sx={{ fontSize: 60 }} />
              </Avatar>
              
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Admin Access
              </Typography>
              
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Aarya Club Management System
              </Typography>
              
              <Grid container spacing={3} justifyContent="center">
                <Grid item>
                  <Box textAlign="center">
                    <SettingsIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1">Manage Events</Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box textAlign="center">
                    <SecurityIcon sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1">Admin Controls</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Right side - Login form */}
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
                  <AdminIcon />
                </Avatar>
                <Typography variant="h4" fontWeight="bold" color="secondary">
                  Admin Login
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Access the club management dashboard
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
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  margin="normal"
                  required
                  variant="outlined"
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                >
                  {loading ? 'Signing In...' : 'Access Admin Panel'}
                </Button>

                <Box textAlign="center">
                  <Typography variant="body2">
                    <Button
                      component={RouterLink}
                      to="/"
                      variant="text"
                      color="primary"
                    >
                      ← Back to Public Site
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

export default AdminLogin;
