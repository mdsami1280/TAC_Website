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
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Work as WorkIcon,
  Description as DescriptionIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { memberService, Member, CreateMemberRequest } from '../services/memberService';

const Members: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState<CreateMemberRequest>({
    name: '',
    position: '',
    email: '',
    imageUrl: '',
    description: '',
    active: true,
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await memberService.getMembers();
      setMembers(data);
    } catch (error) {
      setError('Failed to fetch members');
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (member?: Member) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        position: member.position,
        email: member.email,
        imageUrl: member.imageUrl || '',
        description: member.description || '',
        active: member.active,
      });
    } else {
      setEditingMember(null);
      setFormData({
        name: '',
        position: '',
        email: '',
        imageUrl: '',
        description: '',
        active: true,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingMember(null);
    setFormData({
      name: '',
      position: '',
      email: '',
      imageUrl: '',
      description: '',
      active: true,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingMember) {
        await memberService.updateMember(editingMember.id!, formData);
        setSuccess('Member updated successfully!');
      } else {
        await memberService.createMember(formData);
        setSuccess('Member created successfully!');
      }
      
      fetchMembers();
      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (error: any) {
      setError(error.response?.data || 'Operation failed');
    }
  };

  const handleDelete = async (memberId: number) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await memberService.deleteMember(memberId);
        setSuccess('Member deleted successfully!');
        fetchMembers();
        handleMenuClose();
      } catch (error: any) {
        setError(error.response?.data || 'Failed to delete member');
      }
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, memberData: Member) => {
    setAnchorEl(event.currentTarget);
    setSelectedMember(memberData);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMember(null);
  };

  const activeMembers = members.filter(member => member.active);
  const inactiveMembers = members.filter(member => !member.active);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Members Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage club members and their roles
          </Typography>
        </Box>
        
        <Box display="flex" gap={2}>
          <Chip
            label={`${activeMembers.length} Active`}
            color="success"
            variant="outlined"
          />
          <Chip
            label={`${inactiveMembers.length} Inactive`}
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

      {/* Members Grid */}
      {loading ? (
        <Box textAlign="center" py={8}>
          <Typography>Loading members...</Typography>
        </Box>
      ) : members.length === 0 ? (
        <Card className="card-hover">
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <GroupIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No members yet
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              Start by adding the first member to your club
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpen()}
              size="large"
            >
              Add First Member
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {/* Active Members */}
          {activeMembers.length > 0 && (
            <>
              <Grid item xs={12}>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                  Active Members
                </Typography>
              </Grid>
              {activeMembers.map((member) => (
                <Grid item xs={12} sm={6} md={4} key={member.id}>
                  <Card className="card-hover" sx={{ height: '100%' }}>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Box display="flex" alignItems="center">
                          <Avatar
                            src={member.imageUrl}
                            sx={{ 
                              bgcolor: 'primary.main', 
                              mr: 2,
                              width: 50,
                              height: 50,
                            }}
                          >
                            {getInitials(member.name)}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight="bold" noWrap>
                              {member.name}
                            </Typography>
                            <Chip
                              label="Active"
                              color="success"
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, member)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>

                      <Box display="flex" alignItems="center" mb={1}>
                        <WorkIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {member.position}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" mb={1}>
                        <EmailIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {member.email}
                        </Typography>
                      </Box>

                      {member.description && (
                        <Box display="flex" alignItems="flex-start">
                          <DescriptionIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary', mt: 0.5 }} />
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {member.description}
                          </Typography>
                        </Box>
                      )}

                      {member.imageUrl && (
                        <Box mt={2}>
                          <Box
                            component="img"
                            src={member.imageUrl}
                            alt={member.name}
                            sx={{
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

          {/* Inactive Members */}
          {inactiveMembers.length > 0 && (
            <>
              <Grid item xs={12}>
                <Typography variant="h5" fontWeight="bold" mb={2} mt={4}>
                  Inactive Members
                </Typography>
              </Grid>
              {inactiveMembers.map((member) => (
                <Grid item xs={12} sm={6} md={4} key={member.id}>
                  <Card className="card-hover" sx={{ height: '100%', opacity: 0.7 }}>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Box display="flex" alignItems="center">
                          <Avatar
                            src={member.imageUrl}
                            sx={{ 
                              bgcolor: 'text.secondary', 
                              mr: 2,
                              width: 50,
                              height: 50,
                            }}
                          >
                            {getInitials(member.name)}
                          </Avatar>
                          <Box>
                            <Typography variant="h6" fontWeight="bold" noWrap>
                              {member.name}
                            </Typography>
                            <Chip
                              label="Inactive"
                              color="default"
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, member)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>

                      <Box display="flex" alignItems="center" mb={1}>
                        <WorkIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {member.position}
                        </Typography>
                      </Box>

                      <Box display="flex" alignItems="center" mb={1}>
                        <EmailIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {member.email}
                        </Typography>
                      </Box>

                      {member.description && (
                        <Box display="flex" alignItems="flex-start">
                          <DescriptionIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary', mt: 0.5 }} />
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {member.description}
                          </Typography>
                        </Box>
                      )}

                      {member.imageUrl && (
                        <Box mt={2}>
                          <Box
                            component="img"
                            src={member.imageUrl}
                            alt={member.name}
                            sx={{
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
        aria-label="add member"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={() => handleOpen()}
      >
        <AddIcon />
      </Fab>

      {/* Member Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => { handleOpen(selectedMember!); handleMenuClose(); }}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleDelete(selectedMember!.id!)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* Member Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingMember ? 'Edit Member' : 'Add New Member'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Full Name"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Position/Role"
              fullWidth
              variant="outlined"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              required
              placeholder="e.g., President, Vice President, Member"
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <TextField
              margin="dense"
              label="Description (Optional)"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description about the member"
            />
            <TextField
              margin="dense"
              label="Profile Image URL (Optional)"
              fullWidth
              variant="outlined"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/profile.jpg"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                />
              }
              label="Active Member"
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingMember ? 'Update Member' : 'Add Member'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Members;
