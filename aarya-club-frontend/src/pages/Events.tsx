import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Alert,
  Chip,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Fab,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Event as EventIcon,
  CalendarToday as CalendarIcon,
  Description as DescriptionIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { eventService, Event, CreateEventRequest } from '../services/eventService';

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState<CreateEventRequest>({
    title: '',
    date: '',
    description: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventService.getEvents();
      setEvents(data);
    } catch (error) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (event?: Event) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        date: event.date,
        description: event.description,
        imageUrl: event.imageUrl || '',
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        date: '',
        description: '',
        imageUrl: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingEvent(null);
    setFormData({
      title: '',
      date: '',
      description: '',
      imageUrl: '',
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingEvent) {
        await eventService.updateEvent(editingEvent.id!, formData);
        setSuccess('Event updated successfully!');
      } else {
        await eventService.createEvent(formData);
        setSuccess('Event created successfully!');
      }
      
      fetchEvents();
      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (error: any) {
      setError(error.response?.data || 'Operation failed');
    }
  };

  const handleDelete = async (eventId: number) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.deleteEvent(eventId);
        setSuccess('Event deleted successfully!');
        fetchEvents();
        handleMenuClose();
      } catch (error: any) {
        setError(error.response?.data || 'Failed to delete event');
      }
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, eventData: Event) => {
    setAnchorEl(event.currentTarget);
    setSelectedEvent(eventData);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEvent(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  const upcomingEvents = events.filter(event => isUpcoming(event.date));
  const pastEvents = events.filter(event => !isUpcoming(event.date));

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Events Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage cultural events and activities for Aarya Club
          </Typography>
        </Box>
        
        <Box display="flex" gap={2}>
          <Chip
            label={`${upcomingEvents.length} Upcoming`}
            color="primary"
            variant="outlined"
          />
          <Chip
            label={`${pastEvents.length} Past`}
            color="default"
            variant="outlined"
          />
        </Box>
      </Box>

      {/* Success/Error Messages */}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Events Grid */}
      {loading ? (
        <Box textAlign="center" py={8}>
          <Typography>Loading events...</Typography>
        </Box>
      ) : events.length === 0 ? (
        <Card className="card-hover">
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <EventIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No events yet
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Start by creating your first cultural event
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpen()}
              size="large"
            >
              Create First Event
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <>
              <Grid item xs={12}>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                  Upcoming Events
                </Typography>
              </Grid>
              {upcomingEvents.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <Card className="card-hover" sx={{ height: '100%' }}>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Box display="flex" alignItems="center">
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                            <EventIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight="bold" noWrap>
                              {event.title}
                            </Typography>
                            <Chip
                              label="Upcoming"
                              color="primary"
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, event)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>

                      <Box display="flex" alignItems="center" mb={1}>
                        <CalendarIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(event.date)}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="flex-start">
                        <DescriptionIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary', mt: 0.5 }} />
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {event.description}
                        </Typography>
                      </Box>

                      {event.imageUrl && (
                        <Box mt={2}>
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            style={{
                              width: '100%',
                              height: '120px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                            }}
                          />
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <>
              <Grid item xs={12}>
                <Typography variant="h5" fontWeight="bold" mb={2} mt={4}>
                  Past Events
                </Typography>
              </Grid>
              {pastEvents.map((event) => (
                <Grid item xs={12} sm={6} md={4} key={event.id}>
                  <Card className="card-hover" sx={{ height: '100%', opacity: 0.8 }}>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Box display="flex" alignItems="center">
                          <Avatar sx={{ bgcolor: 'text.secondary', mr: 2 }}>
                            <EventIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight="bold" noWrap>
                              {event.title}
                            </Typography>
                            <Chip
                              label="Completed"
                              color="default"
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, event)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>

                      <Box display="flex" alignItems="center" mb={1}>
                        <CalendarIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(event.date)}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="flex-start">
                        <DescriptionIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary', mt: 0.5 }} />
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {event.description}
                        </Typography>
                      </Box>

                      {event.imageUrl && (
                        <Box mt={2}>
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            style={{
                              width: '100%',
                              height: '120px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              filter: 'grayscale(100%)',
                            }}
                          />
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      )}

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add event"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={() => handleOpen()}
      >
        <AddIcon />
      </Fab>

      {/* Event Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { handleOpen(selectedEvent!); handleMenuClose(); }}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleDelete(selectedEvent!.id!)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Event Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingEvent ? 'Edit Event' : 'Create New Event'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Event Title"
              fullWidth
              variant="outlined"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Event Date"
              type="date"
              fullWidth
              variant="outlined"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              margin="dense"
              label="Event Description"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Image URL (Optional)"
              fullWidth
              variant="outlined"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingEvent ? 'Update Event' : 'Create Event'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Events;
