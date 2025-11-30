import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Paper,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  Event as EventIcon,
  Group as GroupIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { eventService, Event } from '../services/eventService';
import { memberService, Member } from '../services/memberService';
import AuthDebug from '../components/AuthDebug';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [eventsData, membersData] = await Promise.all([
          eventService.getEvents(),
          memberService.getMembers(),
        ]);
        
        setEvents(eventsData);
        setMembers(membersData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <LinearProgress />;
  }

  const upcomingEvents = events
    .filter(event => new Date(event.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const activeMembers = members.filter(member => member.active);

  const stats = [
    {
      title: 'Total Events',
      value: events.length,
      icon: <EventIcon />,
      color: 'primary',
      action: () => navigate('/events'),
    },
    {
      title: 'Active Members',
      value: activeMembers.length,
      icon: <GroupIcon />,
      color: 'secondary',
      action: () => navigate('/members'),
    },
    {
      title: 'Upcoming Events',
      value: upcomingEvents.length,
      icon: <TrendingUpIcon />,
      color: 'success',
      action: () => navigate('/events'),
    },
    {
      title: 'Club Founded',
      value: '2024',
      icon: <SchoolIcon />,
      color: 'info',
      action: null,
    },
  ];

  return (
    <Box>
      {/* Debug Section - Remove this after fixing */}
      <AuthDebug />
      
      {/* Welcome Section */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
          borderRadius: 3,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Welcome to Aarya Club Dashboard
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Manage your CSE Cultural Club activities and members
            </Typography>
          </Box>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <SchoolIcon sx={{ fontSize: 40 }} />
          </Avatar>
        </Box>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              className="card-hover"
              sx={{
                height: '100%',
                cursor: stat.action ? 'pointer' : 'default',
                border: '1px solid',
                borderColor: `${stat.color}.light`,
              }}
              onClick={stat.action || undefined}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: `${stat.color}.main`,
                    mx: 'auto',
                    mb: 2,
                    width: 60,
                    height: 60,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Typography variant="h3" fontWeight="bold" color={`${stat.color}.main`}>
                  {stat.value}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3}>
        {/* Upcoming Events */}
        <Grid item xs={12} lg={8}>
          <Card className="card-hover" sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight="bold">
                  Upcoming Events
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/events')}
                >
                  Manage Events
                </Button>
              </Box>

              {upcomingEvents.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <EventIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No upcoming events
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/events')}
                  >
                    Create First Event
                  </Button>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {upcomingEvents.map((event) => (
                    <Grid item xs={12} sm={6} key={event.id}>
                      <Paper
                        sx={{
                          p: 2,
                          border: '1px solid',
                          borderColor: 'primary.light',
                          borderRadius: 2,
                          height: '100%',
                        }}
                      >
                        <Box display="flex" alignItems="center" mb={1}>
                          <EventIcon sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="h6" fontWeight="bold">
                            {event.title}
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" mb={1}>
                          {new Date(event.date).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body2" noWrap>
                          {event.description}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Members */}
        <Grid item xs={12} lg={4}>
          <Card className="card-hover" sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" fontWeight="bold">
                  Club Members
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/members')}
                  size="small"
                >
                  Manage
                </Button>
              </Box>

              {activeMembers.length === 0 ? (
                <Box textAlign="center" py={4}>
                  <GroupIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    No members yet
                  </Typography>
                  <Button
                    variant="outlined"
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/members')}
                  >
                    Add First Member
                  </Button>
                </Box>
              ) : (
                <Box>
                  {activeMembers.slice(0, 5).map((member) => (
                    <Box
                      key={member.id}
                      display="flex"
                      alignItems="center"
                      mb={2}
                      p={1}
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 40,
                          height: 40,
                          mr: 2,
                          bgcolor: 'primary.main',
                        }}
                      >
                        {member.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box flexGrow={1}>
                        <Typography variant="body1" fontWeight="medium">
                          {member.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {member.position}
                        </Typography>
                      </Box>
                      <Chip
                        label="Active"
                        color="success"
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  ))}
                  
                  {activeMembers.length > 5 && (
                    <Button
                      fullWidth
                      variant="text"
                      onClick={() => navigate('/members')}
                      sx={{ mt: 2 }}
                    >
                      View All Members ({activeMembers.length})
                    </Button>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
