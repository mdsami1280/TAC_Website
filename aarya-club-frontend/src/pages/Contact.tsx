import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Alert,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Send as SendIcon,
  ContactMail as ContactIcon,
} from '@mui/icons-material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsiveCarousel = {
  mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 601 }, items: 2 },
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const contactInfo = [
    {
      icon: <EmailIcon />,
      title: 'Email Us',
      details: 'aaryaclub@university.edu',
      description: 'Send us an email anytime',
    },
    {
      icon: <PhoneIcon />,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 9am to 5pm',
    },
    {
      icon: <LocationIcon />,
      title: 'Visit Us',
      details: 'CSE Department, Room 201',
      description: 'Computer Science Building',
    },
    {
      icon: <ScheduleIcon />,
      title: 'Office Hours',
      details: 'Monday - Friday',
      description: '9:00 AM - 5:00 PM',
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  // Colors for styling
  const primaryColor = '#D81B60'; // pink 
  const secondaryColor = '#FF7043'; // orange
  const bgImageUrl = 'https://i.postimg.cc/L8rQZcTG/Whats-App-Image-2025-10-13-at-23-43-30-6bcea176.jpg';

  return (
    <Box>
      {/* Hero Section with background image */}
      <Box
        sx={{
          position: 'relative',
          backgroundImage: `url(${bgImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: { xs: 6, md: 10 },
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mx: 'auto',
              mb: 3,
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <ContactIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '600px', mx: 'auto' }}>
            Get in touch with Aarya Club. We'd love to hear from you!
          </Typography>
        </Container>
      </Box>

      {/* Get In Touch Section with slides for Mobile */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          fontWeight="bold"
          align="center"
          gutterBottom
          sx={{ color: primaryColor }}
        >
          Get In Touch
        </Typography>
        {isMobile ? (
          <Carousel
            responsive={responsiveCarousel}
            swipeable
            draggable
            showDots
            arrows={false}
            infinite
            autoPlay
            autoPlaySpeed={3500}
            containerClass="carousel-container"
          >
            {contactInfo.map((info, index) => (
              <Box key={index} sx={{ px: 2 }}>
                <Card
                  sx={{
                    px: 3,
                    py: 4,
                    borderRadius: 2,
                    bgcolor: 'white',
                    boxShadow: `0 6px 20px rgba(0, 0, 0, 0.1)`,
                    minWidth: 250,
                    minHeight: 200,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: primaryColor,
                      mx: 'auto',
                      mb: 2,
                      width: 60,
                      height: 60,
                    }}
                  >
                    {info.icon}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold" gutterBottom textAlign="center" color={primaryColor}>
                    {info.title}
                  </Typography>
                  <Typography variant="body1" fontWeight="medium" color={primaryColor} textAlign="center">
                    {info.details}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
                    {info.description}
                  </Typography>
                </Card>
              </Box>
            ))}
          </Carousel>
        ) : (
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {contactInfo.map((info, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    px: 3,
                    py: 4,
                    borderRadius: 3,
                    bgcolor: 'white',
                    boxShadow: `0 8px 24px ${primaryColor}33`,
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: `0 12px 30px rgba(0,0,0,0.2)`,
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: primaryColor,
                      mx: 'auto',
                      mb: 2,
                      width: 60,
                      height: 60,
                    }}
                  >
                    {info.icon}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold" gutterBottom textAlign="center" color={primaryColor}>
                    {info.title}
                  </Typography>
                  <Typography variant="body1" fontWeight="medium" color={primaryColor} textAlign="center">
                    {info.details}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
                    {info.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Contact Form */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                borderRadius: 3,
                border: `2px solid ${primaryColor}`,
                boxShadow: `0 6px 20px rgba(216, 27, 96, 0.2)`,
                transition: 'all 0.3s ease',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom color={primaryColor}>
                  Send Us a Message
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Have a question, suggestion, or want to join our club? We'd love to hear from you!
                </Typography>
                {submitted && (
                  <Alert severity="success" sx={{ mb: 3 }}>
                    Thank you for your message! We'll get back to you soon.
                  </Alert>
                )}
                <Box component="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Your Message"
                        name="message"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        placeholder="Tell us what's on your mind..."
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<SendIcon />}
                        sx={{
                          bgcolor: secondaryColor,
                          px: 4,
                          py: 1.5,
                          fontSize: '1.1rem',
                          '&:hover': { bgcolor: '#e64a19' },
                        }}
                      >
                        Send Message
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  mb: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)',
                }}
              >
                <Typography variant="h5" fontWeight="bold" gutterBottom color={primaryColor}>
                  Quick Response
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  We typically respond to all inquiries within 24 hours during business days.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  For urgent matters, please call us directly.
                </Typography>
              </Paper>

              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                }}
              >
                <Typography variant="h5" fontWeight="bold" gutterBottom color={primaryColor}>
                  Join Our Club
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Interested in becoming a member? We welcome students from all backgrounds!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Send us a message or visit us during office hours.
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* FAQ Section with slides for mobile */}
      <Box sx={{ backgroundColor: 'background.default', py: 8, mt: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            fontWeight="bold"
            align="center"
            gutterBottom
            sx={{ color: primaryColor }}
          >
            {isMobile ? 'FAQs' : 'Frequently Asked Questions'}
          </Typography>
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 6 }}
          >
            Common questions about Aarya Club
          </Typography>

          {isMobile ? (
            <Carousel
              responsive={responsiveCarousel}
              swipeable
              draggable
              showDots
              arrows={false}
              infinite
              autoPlay
              autoPlaySpeed={3500}
            >
              {[
                {
                  q: 'How can I join Aarya Club?',
                  a: "Simply visit us during office hours, send us an email, or attend one of our events. We welcome all CSE students who are interested in cultural activities.",
                },
                {
                  q: 'What kind of events do you organize?',
                  a: 'We organize various cultural events including festivals, talent shows, cultural awareness programs, and community activities throughout the year.',
                },
                {
                  q: 'Is there a membership fee?',
                  a: 'No, membership to Aarya Club is completely free! We believe cultural activities should be accessible to all students.',
                },
                {
                  q: 'How often do you have meetings?',
                  a: 'We have regular meetings every two weeks, plus special meetings for event planning. All members are welcome.',
                },
              ].map((item, index) => (
                <Box key={index} sx={{ px: 2, mb: 4 }}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 4,
                      borderRadius: 3,
                      bgcolor: 'white',
                      boxShadow: `0 8px 20px rgba(0,0,0,0.1)`,
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2, color: primaryColor }}>
                      {item.q}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.a}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Carousel>
          ) : (
            <Grid container spacing={4}>
              {[
                {
                  q: 'How can I join Aarya Club?',
                  a: "Simply visit us during office hours, send us an email, or attend one of our events. We welcome all CSE students interested in cultural activities.",
                },
                {
                  q: 'What kind of events do you organize?',
                  a: 'We organize festivals, talent shows, cultural awareness programs, and community activities.',
                },
                {
                  q: 'Is there a membership fee?',
                  a: 'No, membership is free! We believe cultural activities should be accessible to all.',
                },
                {
                  q: 'How often do you have meetings?',
                  a: 'Every two weeks, plus special planning meetings.',
                },
              ].map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 4,
                      borderRadius: 3,
                      bgcolor: 'white',
                      boxShadow: `0 8px 20px rgba(0,0,0,0.1)`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: `0 12px 30px rgba(0,0,0,0.15)`,
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2, color: primaryColor }}>
                      {item.q}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.a}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default Contact;
