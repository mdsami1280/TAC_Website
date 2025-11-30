import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Avatar,
  Chip,
  Alert,
  CircularProgress,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Event as EventIcon,
  CalendarToday as CalendarIcon,
  Description as DescriptionIcon,
  AccessTime as TimeIcon,
  Assignment as AssignmentIcon,
  PhotoLibrary as PhotoLibraryIcon,
  Close as CloseIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { eventService, Event } from '../services/eventService';

const responsive = {
  mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 601 }, items: 2 },
};

const PublicEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [photoDialogOpen, setPhotoDialogOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventService.getEvents();
      setEvents(data);
    } catch (error) {
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
    });

  const formatTime = (dateString: string) =>
    new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit',
    });

  const isUpcoming = (dateString: string) =>
    new Date(dateString) > new Date();

  const upcomingEvents = events.filter(e => isUpcoming(e.date));
  const pastEvents = events.filter(e => !isUpcoming(e.date));

  const handleRegisterEvent = (event: Event) => {
    window.open(event.registrationFormUrl || 'https://forms.gle/your-default-form-id', '_blank');
  };

  const handleViewPhotos = (event: Event) => {
    setSelectedEvent(event);
    setPhotoDialogOpen(true);
  };

  const handleClosePhotoDialog = () => {
    setPhotoDialogOpen(false);
    setSelectedEvent(null);
  };

  const renderEventCard = (event: Event, isUpcomingCard = true) => (
    <Card
      key={event.id}
      sx={{
        position: 'relative',
        borderRadius: '24px',
        boxShadow: '0 14px 34px rgba(216,27,96,0.14)',
        border: `2px solid ${isUpcomingCard ? '#1976d2' : '#757575'}`,
        background: 'white',
        minHeight: 440,
        maxHeight: 500,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow: '0 20px 40px rgba(216,27,96,0.19)',
        },
      }}
    >
      <Box
        component="img"
        src={event.imageUrl}
        alt={event.title}
        sx={{
          width: '100%',
          height: 280,
          objectFit: 'cover',
          borderRadius: '24px 24px 0 0',
          background: !event.imageUrl ? '#f8bbd0' : undefined,
          borderBottom: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          py: 2,
          px: 1,
          background: isUpcomingCard
            ? 'linear-gradient(90deg, #D81B60 70%, #FF7043 100%)'
            : 'linear-gradient(90deg, #757575 25%, #e0e0e0 100%)',
          color: 'white',
          fontWeight: 'bold',
          borderBottomLeftRadius: '24px',
          borderBottomRightRadius: '24px',
          fontSize: '1.12rem',
          backdropFilter: 'blur(6px)',
          boxShadow: '0 -7px 21px -8px #D81B60',
          textAlign: 'left',
        }}
      >
        <Typography sx={{fontWeight:"bold", fontSize:"1.2rem"}}>
          {event.title}
        </Typography>
        <Box display="flex" alignItems="center" gap={1} sx={{ mt: 1 }}>
          <CalendarIcon fontSize="small" />
          <Typography variant="body2" sx={{ fontWeight: 'normal', opacity: 0.97 }}>
            {formatDate(event.date)}
          </Typography>
          <TimeIcon fontSize="small" sx={{ ml: 1 }} />
          <Typography variant="body2">{formatTime(event.date)}</Typography>
        </Box>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.93 }}>
          {event.description}
        </Typography>
        <Box display="flex" gap={1} sx={{ mt: 2 }}>
          {isUpcomingCard ? (
            <Button
              variant="contained"
              size="small"
              color="primary"
              startIcon={<AssignmentIcon />}
              onClick={() => handleRegisterEvent(event)}
            >
              Register
            </Button>
          ) : (
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              startIcon={<PhotoLibraryIcon />}
              onClick={() => handleViewPhotos(event)}
            >
              Photo Gallery
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', background: '#fff' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: '#fff', pb: 6 }}>
      {/* Hero Section with pink gradient */}
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, #D81B60 0%, #FF7043 100%)',
          color: 'white',
          py: { xs: 7, md: 10 },
          overflow: 'visible',
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
              'url("https://i.postimg.cc/L8rQZcTG/Whats-App-Image-2025-10-13-at-23-43-30-6bcea176.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.52,
            zIndex: 0,
            pointerEvents: 'none',
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
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <EventIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              Club Events
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: '600px', mx: 'auto' }}>
              Join us for exciting events and activities throughout the year
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Stats Section with fixed design */}
      <Container
        maxWidth="md"
        sx={{
          mt: { xs: 4, md: 5 },
          mb: { xs: 1, md: 2 },
          background: '#fff',
          borderRadius: '0 0 36px 36px',
          boxShadow: '0 8px 32px rgba(216,27,96,0.06)',
          pt: 1.5,
          pb: 0.5,
          zIndex: 2,
          position: 'relative',
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Paper elevation={0} sx={{
              p: 3,
              textAlign: 'center',
              borderRadius: 4,
              border: '2.5px solid #42a5f5',
              boxShadow: 'none',
              minWidth: 170,
            }}>
              <Typography variant="h4" fontWeight="bold" sx={{ color: '#1976d2' }}>
                {upcomingEvents.length}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Upcoming Events
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={0} sx={{
              p: 3,
              textAlign: 'center',
              borderRadius: 4,
              border: '2.5px solid #FF7043',
              boxShadow: 'none',
              minWidth: 170,
            }}>
              <Typography variant="h4" fontWeight="bold" sx={{ color: '#FF7043' }}>
                {pastEvents.length}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Past Events
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={0} sx={{
              p: 3,
              textAlign: 'center',
              borderRadius: 4,
              border: '2.5px solid #43a047',
              boxShadow: 'none',
              minWidth: 170,
            }}>
              <Typography variant="h4" fontWeight="bold" sx={{ color: '#43a047' }}>
                {events.length}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total Events
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Main Events Content with margin fix */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          py: 4,
          borderRadius: 3,
          backgroundColor: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(8px)',
          zIndex: 2,
          mt: { xs: 2, md: 4 },
          boxShadow: '0 0 20px rgb(0 0 0 / 0.10)',
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>
        )}

        {events.length === 0 ? (
          <Box textAlign="center" py={8}>
            <EventIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No events scheduled yet
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Check back soon for upcoming events!
            </Typography>
          </Box>
        ) : (
          <>
            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <>
                <Typography variant="h3" fontWeight="bold" gutterBottom color="primary.main" textAlign="center">
                  Upcoming Events
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4, textAlign:'center' }}>
                  Don't miss these exciting events
                </Typography>
                {isMobile ? (
                  <Box sx={{ mb: 6 }}>
                    <Carousel
                      autoPlay
                      autoPlaySpeed={3400}
                      infinite
                      swipeable
                      draggable
                      showDots
                      arrows={false}
                      responsive={responsive}
                      containerClass="carousel-container"
                    >
                      {upcomingEvents.map(event => renderEventCard(event, true))}
                    </Carousel>
                  </Box>
                ) : (
                  <Grid container spacing={3}>
                    {upcomingEvents.map(event => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
                        {renderEventCard(event, true)}
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <>
                <Typography variant="h3" fontWeight="bold" gutterBottom color="text.secondary" textAlign="center">
                  Past Events
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 4, textAlign:'center' }}>
                  A look back at our successful events
                </Typography>
                {isMobile ? (
                  <Box sx={{ mb: 6 }}>
                    <Carousel
                      autoPlay
                      autoPlaySpeed={3400}
                      infinite
                      swipeable
                      draggable
                      showDots
                      arrows={false}
                      responsive={responsive}
                      containerClass="carousel-container"
                    >
                      {pastEvents.map(event => renderEventCard(event, false))}
                    </Carousel>
                  </Box>
                ) : (
                  <Grid container spacing={3}>
                    {pastEvents.map(event => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={event.id}>
                        {renderEventCard(event, false)}
                      </Grid>
                    ))}
                  </Grid>
                )}
              </>
            )}
          </>
        )}
      </Container>

      {/* Footer Section with pink gradient */}
      <Box sx={{ background: 'linear-gradient(135deg, #ff6b35 0%, #ff9a6b 100%)', color: 'white', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Want to Stay Updated?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Follow us for the latest event announcements and club news
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8, fontSize: '1.1rem' }}>
            Don't miss out on our events. Check this page regularly for updates or contact us to be added to our event notification list.
          </Typography>
        </Container>
      </Box>

      {/* Photo Gallery Dialog */}
      <Dialog
        open={photoDialogOpen}
        onClose={handleClosePhotoDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            backgroundColor: 'background.paper',
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <PhotoLibraryIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h5" fontWeight="bold">
              {selectedEvent?.title} - Photo Gallery
            </Typography>
          </Box>
          <IconButton onClick={handleClosePhotoDialog} size="large">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Relive the memories from this event! Click on any photo to view it in full size.
              </Typography>
              {selectedEvent.photoGalleryUrl ? (
                <Box textAlign="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<OpenInNewIcon />}
                    onClick={() => window.open(selectedEvent.photoGalleryUrl, '_blank')}
                    sx={{
                      px: 4,
                      py: 2,
                      fontSize: '1.1rem',
                      borderRadius: 3,
                      boxShadow: '0 8px 32px rgba(25, 118, 210, 0.3)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 12px 40px rgba(25, 118, 210, 0.4)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Open Photo Gallery
                  </Button>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    This will open the gallery in a new tab
                  </Typography>
                </Box>
              ) : (
                <Box textAlign="center" py={4}>
                  <PhotoLibraryIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Photo Gallery Coming Soon
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Photos for this event will be available soon.
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClosePhotoDialog} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PublicEvents;
