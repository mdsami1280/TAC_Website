import React from 'react';
import Tilt from 'react-parallax-tilt';
import { Box, Container, Typography, Button, Grid, Card, CardContent, Avatar, Paper, Fade } from '@mui/material';
import {
  Event as EventIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  ArrowForward as ArrowForwardIcon,
  PhotoLibrary as PhotoLibraryIcon,
  Assignment as AssignmentIcon,
  Star as StarIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { keyframes } from '@mui/system';

const glow = keyframes`
  0% { box-shadow: 0 0 12px 0 #ffd700; }
  50% { box-shadow: 0 0 32px 8px #ffec80; }
  100% { box-shadow: 0 0 12px 0 #ffd700; }
`;

const spin3D = keyframes`
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
`;

const teamAvatars = [
  'https://i.postimg.cc/50XMGPqc/my-photo.jpg',
  'https://i.postimg.cc/3wSkmcxh/Whats-App-Image-2025-10-14-at-12-50-26-9192fcf4.jpg',
  'https://i.postimg.cc/ZnkKLtkG/Whats-App-Image-2025-10-14-at-12-50-27-da0b7ca8.jpg',
  'https://i.postimg.cc/c40d1csq/Whats-App-Image-2025-10-14-at-12-50-27-e5f51cce.jpg',
  'https://i.postimg.cc/J7cWFBj4/Whats-App-Image-2025-10-14-at-12-50-28-44486b60.jpg',
  'https://i.postimg.cc/BnvLb3Jd/Whats-App-Image-2025-10-14-at-12-57-10-a1824cd7.jpg',
];

const stats = [
  { label: 'Active Members', value: '20+', icon: '👥' },
  { label: 'Events This Year', value: '12', icon: '🎉' },
  { label: 'Years Active', value: '3', icon: '🏆' },
];

const features = [
  {
    icon: <EventIcon sx={{ fontSize: 32 }} />,
    title: 'Cultural Events',
    description: 'Festivals, workshops, and performances run throughout the year.',
  },
  {
    icon: <GroupIcon sx={{ fontSize: 32 }} />,
    title: 'Vibrant Community',
    description: 'Meet passionate CSE students who value culture and creativity.',
  },
  {
    icon: <PhotoLibraryIcon sx={{ fontSize: 32 }} />,
    title: 'Memory Gallery',
    description: 'Beautiful photos capturing our lively cultural spirit.',
  },
  {
    icon: <AssignmentIcon sx={{ fontSize: 32 }} />,
    title: 'Effortless Registration',
    description: 'Quick sign-ups for all events with simple, clear forms.',
  },
  {
    icon: <TrophyIcon sx={{ fontSize: 32 }} />,
    title: 'Achievements',
    description: 'Honoring our milestones and member successes.',
  },
  {
    icon: <StarIcon sx={{ fontSize: 32 }} />,
    title: 'Leadership',
    description: 'Meet the inspiring leaders shaping our cultural journey.',
  },
];

const Home: React.FC = () => {
  return (
    <Box sx={{ overflowX: 'hidden', backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      {/* Transparent hero with team photo and mini 3D stats */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '75vh', md: '90vh' },
          color: '#F6E27A',
          background: `
            linear-gradient(to bottom, rgba(10, 25, 47, 0.42), rgba(10,25,47,0.10) 100%),
            url('https://i.postimg.cc/L8rQZcTG/Whats-App-Image-2025-10-13-at-23-43-30-6bcea176.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', pt: 10, textAlign: 'center', zIndex: 2 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: '900',
              fontSize: { xs: '2rem', md: '3rem' },
              fontFamily: "'Pacifico', cursive",
              textShadow: '2px 2px 12px #121212',
              mb: 2,
            }}
          >
            Aarya Cultural Club
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Raleway', sans-serif",
              color: "white",
              mb: 5,
              textShadow: '0 2px 8px #333',
              fontWeight: 400,
            }}
          >
            Celebrating the vibrant cultural spirit of the CSE Department
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 1 }}>
            {stats.map((stat, idx) => (
              <Tilt
                key={stat.label}
                scale={1.09}
                tiltReverse
                glareEnable
                glareMaxOpacity={0.18}
                style={{ borderRadius: 18 }}
                perspective={800}
                gyroscope
              >
                <Paper
                  elevation={4}
                  sx={{
                    minWidth: 92,
                    px: 2,
                    py: 1.3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 3,
                    border: '2px solid #FFD600',
                    background: "rgba(255,255,255,0.22)",
                    color: "#252525",
                    boxShadow: "0 4px 30px rgba(40,40,40,0.313)",
                    animation: `${glow} 2.6s ${idx * 0.3 + 0.5}s infinite cubic-bezier(0.76, 0, 0.24, 1)`,
                  }}
                >
                  <Typography fontSize={30} mb={-0.3} sx={{ filter: "drop-shadow(1px 1px 2px #ffd70099)" }}>
                    {stat.icon}
                  </Typography>
                  <Typography
                    fontWeight="700"
                    fontSize={18}
                    sx={{
                      color: "#FFD600",
                      mt: 0.5,
                      mb: 0.3,
                      textShadow: "0 1px 7px #fff280b0, 0 1px 12px #2e2e2e80",
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography fontSize={12} fontWeight="600" color="#383838" sx={{ opacity: 0.88 }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Tilt>
            ))}
          </Box>
          
          {/* Team avatars below stats */}
          <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            {teamAvatars.map((src, idx) => (
              <Tilt scale={1.08} key={idx}>
                <Avatar
                  src={src}
                  alt={`Team Member ${idx + 1}`}
                  sx={{
                    width: { xs: 60, sm: 70, md: 85 },
                    height: { xs: 60, sm: 70, md: 85 },
                    border: "3px solid #FFD600",
                    boxShadow: "0 0 10px 3px #FFD60088",
                    transition: "transform 0.3s ease",
                    filter: "brightness(1)",
                    bgcolor: "white",
                    '&:hover': {
                      transform: 'scale(1.11)',
                      boxShadow: '0 0 25px 8px #FFD600',
                      zIndex: 2,
                    },
                  }}
                />
              </Tilt>
            ))}
          </Box>
          
          {/* Hero CTA */}
          <Button
            variant="contained"
            sx={{
              mt: 6,
              bgcolor: '#FFD600',
              color: '#131d36',
              minWidth: 160,
              fontWeight: 600,
              fontSize: "1.1rem",
              borderRadius: '23px',
              boxShadow: '0px 0px 28px 2px #FFD60099',
              '&:hover': { bgcolor: '#fff380', color: '#131d36', boxShadow: "0 0 35px #ffd600" }
            }}
            endIcon={<ArrowForwardIcon />}
          >Explore Events</Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ backgroundColor: '#f5f7fa', py: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            textAlign="center"
            fontWeight="900"
            sx={{ mb: 3, fontFamily: "'Pacifico', cursive", color: "#0a1931" }}
          >
            What We Offer
          </Typography>
          <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 8, maxWidth: 720, mx: 'auto' }}>
            Join our vibrant community and experience cultural creativity at its best.
          </Typography>
          <Grid container spacing={5}>
            {features.map((feature, i) => (
              <Grid item xs={12} sm={6} md={4} key={feature.title}>
                <Tilt scale={1.12} glareEnable glareMaxOpacity={0.22} perspective={900}>
                  <Card
                    elevation={6}
                    sx={{
                      height: '100%',
                      borderRadius: 6,
                      border: `2px solid #FFD600`,
                      boxShadow: `0 15px 35px #FFEB3B55`,
                      cursor: 'pointer',
                      transition: 'transform 0.5s ease, box-shadow 0.5s ease',
                      '&:hover': {
                        transform: 'scale(1.09)',
                        boxShadow: `0 25px 80px #FFD600cc`,
                      },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 4,
                      bgcolor: "#fffde6",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "#FFD600",
                        width: 56,
                        height: 56,
                        mb: 2,
                        boxShadow: `0 6px 14px #FFD60090`,
                        color: "#131d36",
                        animation: `${spin3D} 11s linear infinite, ${glow} 3.8s ease-in-out infinite`,
                        fontSize: 32,
                      }}
                    >
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold" mb={1} color="#0a1931">
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="#484848" textAlign="center" sx={{ flexGrow: 1 }}>
                      {feature.description}
                    </Typography>
                  </Card>
                </Tilt>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final Call to Action */}
      <Box
        sx={{
          background: '#FFD600',
          py: 8,
          textAlign: 'center',
          color: '#131d36',
          fontFamily: "'Raleway', sans-serif",
          boxShadow: `0 -8px 24px #FFD60060`,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
            Ready to Join Our Community?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Explore events, connect with members, and celebrate culture in the CSE department.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#0a1931",
              color: "#FFD600",
              px: 7,
              py: 1.7,
              fontWeight: '700',
              fontSize: { xs: '1.1rem', md: '1.2rem' },
              borderRadius: 6,
              boxShadow: '0 0 28px #0a1931dd',
              '&:hover': {
                bgcolor: "#182c56",
                boxShadow: '0 0 40px #0a1931cc',
              },
            }}
            endIcon={<ArrowForwardIcon />}
          >
            Get Involved
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
