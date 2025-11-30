import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Avatar,
  Container,
  Grid,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Info as AboutIcon,
  ContactMail as ContactIcon,
  Event as EventIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LocationOn as LocationOnIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';

const PublicLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'About', icon: <AboutIcon />, path: '/about' },
    { text: 'Events', icon: <EventIcon />, path: '/events' },
    { text: 'Members', icon: <GroupIcon />, path: '/members' },
    { text: 'Contact', icon: <ContactIcon />, path: '/contact' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box
        sx={{
          p: 3,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #D81B60 0%, #FF7043 100%)',
          color: 'white',
        }}
      >
        <Avatar
          src={'/images/logo.jpg'}
          alt="Aarya Club Logo"
          sx={{
            width: 56,
            height: 56,
            mx: 'auto',
            mb: 2,
            bgcolor: 'transparent',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}
        />
        <Typography variant="h6" fontWeight="bold">
          Aarya Club
        </Typography>
      </Box>

      <List sx={{ pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                setMobileOpen(false);
              }}
              sx={{
                mx: 2,
                borderRadius: 2,
                mb: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? 'white' : 'text.secondary',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar position="sticky" sx={{ backgroundColor: 'background.paper', color: 'text.primary', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            display="flex"
            alignItems="center"
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer', flexGrow: 1 }}
          >
            <Avatar
              src={'/images/logo.jpg'}
              alt="Aarya Club Logo"
              sx={{
                width: 40,
                height: 40,
                mr: 2,
                bgcolor: 'transparent',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
            />
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#D81B60' }}>
              Aarya Club
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2, display: { xs: 'none', sm: 'block' } }}>
              CSE Cultural Club
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                onClick={() => navigate(item.path)}
                sx={{
                  color: location.pathname === item.path ? '#D81B60' : 'text.primary',
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, backgroundColor: 'background.default' }}>
        <Outlet />
      </Box>

      {/* Enhanced Footer */}
      <Box
        component="footer"
        sx={{
          background: 'linear-gradient(135deg, #D81B60 0%, #FF7043 100%)',
          color: 'white',
          py: 6,
          mt: 'auto',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box display="flex" alignItems="center" mb={2}>
                <SchoolIcon sx={{ fontSize: 40, mr: 2, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
                <Box>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Aarya Club
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500 }}>
                    CSE Department Cultural Club
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                Empowering students through cultural activities, events, and community building. 
                We celebrate diversity and foster creativity in the CSE department.
              </Typography>
              <Box display="flex" gap={2} mt={3}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <FacebookIcon />
                </Box>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <InstagramIcon />
                </Box>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <TwitterIcon />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                Quick Links
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                {[
                  { to: '/', label: 'Home' },
                  { to: '/about', label: 'About Us' },
                  { to: '/events', label: 'Events' },
                  { to: '/members', label: 'Members' },
                  { to: '/contact', label: 'Contact' },
                ].map((link) => (
                  <Button
                    key={link.to}
                    onClick={() => navigate(link.to)}
                    sx={{
                      color: 'white',
                      textDecoration: 'none',
                      opacity: 0.9,
                      transition: 'all 0.3s ease',
                      padding: '4px 0',
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      '&:hover': {
                        opacity: 1,
                        transform: 'translateX(8px)',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                Contact Information
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Box display="flex" alignItems="center">
                  <LocationOnIcon sx={{ mr: 2, opacity: 0.8 }} />
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    CSE Department, MMU<br />
                    Mullana, Ambala, Haryana
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <EmailIcon sx={{ mr: 2, opacity: 0.8 }} />
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    aaryaclub@mmumullana.org
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <PhoneIcon sx={{ mr: 2, opacity: 0.8 }} />
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    +91 9931483545
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              mt: 5,
              pt: 4,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.9rem' }}>
              © 2024 Aarya Club - CSE Department Cultural Club. All rights reserved. | 
              Designed with ❤️ for our amazing community
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default PublicLayout;
