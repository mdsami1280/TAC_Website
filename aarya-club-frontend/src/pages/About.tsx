import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  School as SchoolIcon,
  Groups as GroupsIcon,
  EmojiEvents as TrophyIcon,
  Psychology as BrainIcon,
  Favorite as HeartIcon,
  Public as GlobeIcon,
  Star as StarIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsiveCarousel = {
  mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 601 }, items: 2 },
};

const About: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Colors from the first code (#D81B60 pink, #FF7043 orange, and complementary shades)
  const pinkMain = '#D81B60';
  const orangeMain = '#FF7043';
  const pinkShadow = 'rgba(216,27,96,0.25)';
  const orangeShadow = 'rgba(255,112,67,0.25)';

  const values = [
    {
      icon: <GroupsIcon />,
      title: 'Inclusivity',
      description: 'We welcome students from all backgrounds and celebrate diversity',
      color: pinkMain,
    },
    {
      icon: <BrainIcon />,
      title: 'Innovation',
      description: 'Fostering creativity and innovative thinking through cultural activities',
      color: orangeMain,
    },
    {
      icon: <HeartIcon />,
      title: 'Community',
      description: 'Building strong bonds and lasting friendships among CSE students',
      color: pinkMain,
    },
    {
      icon: <GlobeIcon />,
      title: 'Cultural Awareness',
      description: 'Promoting understanding and appreciation of different cultures',
      color: orangeMain,
    },
  ];

  const achievements = [
    'Organized 15+ successful cultural events',
    'Built a community of 50+ active members',
    'Collaborated with other university clubs',
    'Received recognition from CSE department',
    'Created lasting impact on student life',
  ];

  const objectives = [
    'Promote cultural diversity and inclusion in CSE department',
    'Organize engaging cultural events and activities',
    'Provide a platform for students to showcase their talents',
    'Foster collaboration and teamwork among students',
    'Create awareness about different cultures and traditions',
    'Develop leadership and organizational skills in members',
  ];

  // Styled card for Mission & Vision with gradient and shadows
  const missionCard = (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        background: `linear-gradient(135deg, ${pinkMain}cc 0%, ${orangeMain}cc 100%)`,
        boxShadow: `0 14px 34px ${pinkShadow}`,
        color: 'white',
        transition: 'transform 0.3s ease',
        cursor: 'default',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: `0 20px 40px ${orangeShadow}`,
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Avatar
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.25)',
            mb: 3,
            width: 60,
            height: 60,
            color: 'white',
            border: '2px solid white',
            boxShadow: '0 0 8px rgba(255,255,255,0.3)',
          }}
        >
          <StarIcon sx={{ fontSize: 32 }} />
        </Avatar>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Our Mission
        </Typography>
        <Typography sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          To create a vibrant cultural community within the CSE department that promotes diversity,
          inclusivity, and creative expression. We aim to provide a platform where students can
          celebrate their cultural heritage while learning about others.
        </Typography>
      </CardContent>
    </Card>
  );

  const visionCard = (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        background: `linear-gradient(135deg, ${orangeMain}cc 0%, ${pinkMain}cc 100%)`,
        boxShadow: `0 14px 34px ${orangeShadow}`,
        color: 'white',
        transition: 'transform 0.3s ease',
        cursor: 'default',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: `0 20px 40px ${pinkShadow}`,
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Avatar
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.25)',
            mb: 3,
            width: 60,
            height: 60,
            color: 'white',
            border: '2px solid white',
            boxShadow: '0 0 8px rgba(255,255,255,0.3)',
          }}
        >
          <TrophyIcon sx={{ fontSize: 32 }} />
        </Avatar>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Our Vision
        </Typography>
        <Typography sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          To be the leading cultural club in the university, known for organizing exceptional
          events, fostering cross-cultural understanding, and creating an environment where
          every student feels valued and included.
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {/* Hero Section with team picture */}
      <Box
        sx={{
          position: 'relative',
          background: `linear-gradient(135deg, ${pinkMain} 0%, ${orangeMain} 100%)`,
          color: 'white',
          py: { xs: 6, md: 10 },
          overflow: 'hidden',
          minHeight: 320,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage:
              'url("https://i.postimg.cc/L8rQZcTG/Whats-App-Image-2025-10-13-at-23-43-30-6bcea176.jpg")', // Update this URL
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.38,
            filter: 'blur(3px)',
            zIndex: 0,
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box textAlign="center">
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 3,
                bgcolor: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                boxShadow: `0 0 20px ${pinkShadow}`,
              }}
            >
              <SchoolIcon sx={{ fontSize: 40, color: 'white' }} />
            </Avatar>
            <Typography
              variant="h2"
              fontWeight="extraBold"
              gutterBottom
              sx={{ letterSpacing: 1.2, textShadow: `0 0 10px ${pinkShadow}` }}
            >
              About Aarya Club
            </Typography>
            <Typography
              variant="h5"
              sx={{
                opacity: 0.9,
                maxWidth: '700px',
                mx: 'auto',
                fontStyle: 'italic',
                textShadow: `0 0 6px ${orangeShadow}`,
              }}
            >
              Celebrating culture, fostering creativity, and building community in the CSE department
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Mobile Heading for Mission & Vision */}
      {isMobile && (
        <Box sx={{ maxWidth: 360, mx: 'auto', mt: 6, mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" textAlign="center" color={pinkMain}>
            Mission & Vision
          </Typography>
        </Box>
      )}

      {/* Mission & Vision container */}
      <Container maxWidth="lg" sx={{ py: 0 }}>
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
            {[missionCard, visionCard].map((card, idx) => (
              <Box key={idx} sx={{ px: 2 }}>
                {card}
              </Box>
            ))}
          </Carousel>
        ) : (
          <Grid container spacing={6} sx={{ mt: 3 }}>
            <Grid item xs={12} md={6}>
              {missionCard}
            </Grid>
            <Grid item xs={12} md={6}>
              {visionCard}
            </Grid>
          </Grid>
        )}
      </Container>

      {/* Core Values */}
      <Box sx={{ backgroundColor: 'background.paper', py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" fontWeight="bold" textAlign="center" gutterBottom>
            Our Core Values
          </Typography>
          <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
            The principles that guide everything we do
          </Typography>

          <Grid container spacing={4}>
            {values.map(({ icon, title, description, color }, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={6}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '100%',
                    borderRadius: 4,
                    border: `2px solid ${color}`,
                    boxShadow: `0 12px 28px ${color}44`,
                    transition: 'all 0.35s ease',
                    cursor: 'default',
                    '&:hover': {
                      boxShadow: `0 16px 40px ${color}88`,
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: color,
                      mx: 'auto',
                      mb: 3,
                      width: 64,
                      height: 64,
                      boxShadow: `0 4px 12px ${color}aa`,
                    }}
                  >
                    {icon}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
                    {description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Objectives & Achievements */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: pinkMain }}>
              Our Objectives
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
              We strive to achieve the following goals:
            </Typography>
            <List>
              {objectives.map((objective, idx) => (
                <ListItem key={idx} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CheckIcon sx={{ color: pinkMain }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={objective}
                    primaryTypographyProps={{ color: 'text.secondary' }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: orangeMain }}>
              Our Achievements
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
              Some of our proud accomplishments:
            </Typography>
            <List>
              {achievements.map((achievement, idx) => (
                <ListItem key={idx} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <StarIcon sx={{ color: orangeMain }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={achievement}
                    primaryTypographyProps={{ color: 'text.secondary' }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>

      {/* Join Us Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${pinkMain} 0%, ${orangeMain} 100%)`,
          color: 'white',
          py: 10,
          boxShadow: `0 -10px 30px ${pinkShadow}`,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ textShadow: `0 0 10px ${pinkShadow}` }}>
            Join Our Community
          </Typography>
          <Typography variant="h6" sx={{ mb: 5, opacity: 0.95, fontStyle: 'italic', fontWeight: 'medium' }}>
            Be part of something meaningful and make lasting memories
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.85, fontSize: '1.2rem', maxWidth: 600, mx: 'auto' }}>
            Whether you're passionate about cultural events, want to develop leadership skills,
            or simply looking to make new friends, Aarya Club has a place for you.
            Join us in creating a more inclusive and culturally rich CSE community.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
