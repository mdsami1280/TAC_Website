import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Group as GroupIcon,
  Email as EmailIcon,
} from "@mui/icons-material";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { memberService, Member } from "../services/memberService";

const responsive = {
  mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 601 }, items: 2 },
};

const PublicMembers: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMember, setModalMember] = useState<Member | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const data = await memberService.getMembers();
      setMembers(data);
    } catch {
      setError("Failed to load members. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const activeMembers = members.filter((m) => m.active);
  const leadershipRoles = [
    "President",
    "Vice President",
    "Secretary",
    "Treasurer",
    "Coordinator",
    "Head",
  ];
  const leadershipMembers = activeMembers.filter((member) =>
    leadershipRoles.some((role) =>
      member.position.toLowerCase().includes(role.toLowerCase())
    )
  );
  const regularMembers = activeMembers.filter(
    (member) =>
      !leadershipRoles.some((role) =>
        member.position.toLowerCase().includes(role.toLowerCase())
      )
  );

  const hasProfilePhoto = (member: Member) =>
    member.imageUrl && member.imageUrl.trim() !== "";

  const membersWithoutPhotos = activeMembers.filter(
    (member) => !hasProfilePhoto(member)
  );

  // Modal handlers
  const openMemberModal = (member: Member) => {
    setModalMember(member);
    setModalOpen(true);
  };

  const closeMemberModal = () => {
    setModalOpen(false);
    setModalMember(null);
  };

  // Member card for carousel/grid
  const renderMemberCard = (member: Member) => (
    <Card
      key={member.id}
      sx={{
        position: "relative",
        borderRadius: "24px",
        background:
          "linear-gradient(135deg, #ffd6e8 20%, #ffe0d6 100%)",
        backdropFilter: "blur(12px)",
        boxShadow:
          "0 12px 20px rgba(216,27,96,0.24), 0 8px 15px rgba(255,112,67,0.22)",
        border: "2px solid transparent",
        minHeight: 380,
        textAlign: "center",
        cursor: "pointer",
        transition:
          "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, backdrop-filter 0.3s ease",
        fontFamily: "'Poppins', sans-serif",
        "&:hover": {
          transform: "scale(1.05) translateY(-6px)",
          borderColor: "#D81B60",
          boxShadow:
            "0 20px 30px rgba(216,27,96,0.4), 0 15px 25px rgba(255,112,67,0.35)",
          background: "linear-gradient(135deg, #ff90b3 20%, #ffbc9a 100%)",
          backdropFilter: "blur(15px)",
        },
      }}
      onClick={() => openMemberModal(member)}
    >
      <Box
        component="img"
        src={hasProfilePhoto(member) ? member.imageUrl : undefined}
        alt={member.name}
        sx={{
          width: "100%",
          height: 320,
          objectFit: hasProfilePhoto(member) ? "cover" : "contain",
          borderRadius: "24px 24px 0 0",
          background: !hasProfilePhoto(member) ? "#f8bbd0" : undefined,
          borderBottom: "none",
        }}
      />
      {!hasProfilePhoto(member) && (
        <Box
          sx={{
            position: "absolute",
            top: 40,
            left: 0,
            width: "100%",
            textAlign: "center",
            fontSize: 72,
            fontWeight: "bold",
            color: "#D81B60",
            opacity: 0.3,
            userSelect: "none",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {getInitials(member.name)}
        </Box>
      )}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          py: 2,
          px: 1,
          background: "linear-gradient(90deg, #D81B60 65%, #FF7043 100%)",
          color: "white",
          fontWeight: "700",
          borderBottomLeftRadius: "24px",
          borderBottomRightRadius: "24px",
          fontSize: "1.15rem",
          backdropFilter: "blur(8px)",
          boxShadow: "0 -7px 21px -8px #D81B60",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {member.name}
        <Typography
          variant="body2"
          sx={{ fontWeight: "normal", opacity: 0.9, mt: 0.3, fontFamily: "'Poppins', sans-serif" }}
        >
          {member.position}
        </Typography>
      </Box>
    </Card>
  );

  const renderSection = (title: string, membersToRender: Member[]) => (
    <>
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        sx={{
          color: "#D81B60",
          textAlign: "center",
          mt: 6,
          mb: 1,
          fontFamily: "'Poppins', sans-serif",
          letterSpacing: "1.5px",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 4, textAlign: "center", fontFamily: "'Poppins', sans-serif" }}
      >
        {title === "Leadership Team"
          ? "Meet our dedicated leaders who guide Aarya Club"
          : "Our wonderful members who make our community special"}
      </Typography>

      {isMobile ? (
        <Box sx={{ mb: 6 }}>
          <Carousel
            autoPlay
            autoPlaySpeed={3500}
            infinite
            swipeable
            draggable
            showDots
            arrows={false}
            responsive={responsive}
            containerClass="carousel-container"
          >
            {membersToRender.map(renderMemberCard)}
          </Carousel>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {membersToRender.map((member) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={member.id}>
              {renderMemberCard(member)}
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );

  return (
    <>
      {/* Hero Section with faint team photo */}
      <Box
        sx={{
          position: "relative",
          background:
            "linear-gradient(135deg, #D81B60 0%, #FF7043 100%)",
          color: "white",
          py: { xs: 7, md: 10 },
          overflow: "visible",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* Team photo overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              'url("https://i.postimg.cc/L8QrQDj4/Whats-App-Image-2025-10-15-at-22-58-22-2cdb8eff.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.45,
            filter: "brightness(0.85)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box textAlign="center">
            <GroupIcon sx={{ fontSize: 84, mb: 2, color: "#fff" }} />
            <Typography variant="h2" fontWeight="bold" gutterBottom>
              Our Members
            </Typography>
            <Typography
              variant="h5"
              sx={{
                opacity: 0.95,
                maxWidth: "600px",
                mx: "auto",
                letterSpacing: "0.5px",
                lineHeight: 1.4,
              }}
            >
              Meet the amazing people who make Aarya Club a vibrant community
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Members main content with gradient bg */}
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          py: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #fff0f5 30%, #ffebe0 100%)",
          boxShadow: "inset 0 0 40px rgba(255,112,67,0.15)",
          backdropFilter: "blur(8px)",
          zIndex: 2,
          mt: { xs: 2, md: -8 },
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {membersWithoutPhotos.length > 0 && (
          <Alert
            severity="info"
            sx={{
              mb: 4,
              borderRadius: 3,
              backgroundColor: "info.light",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Profile Photo Required
            </Typography>
            <Typography variant="body2">
              {membersWithoutPhotos.length} member(s) need to upload their
              profile photos.
            </Typography>
          </Alert>
        )}

        {activeMembers.length === 0 ? (
          <Box textAlign="center" py={8}>
            <GroupIcon
              sx={{ fontSize: 80, color: "text.secondary", mb: 2 }}
            />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No members yet
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Check back soon to meet our amazing club members!
            </Typography>
          </Box>
        ) : (
          <>
            {leadershipMembers.length > 0 &&
              renderSection("Leadership Team", leadershipMembers)}
            {regularMembers.length > 0 && renderSection("Club Members", regularMembers)}
          </>
        )}
      </Container>

      {/* Member Details Modal */}
      <Dialog open={modalOpen} onClose={closeMemberModal} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold", color: "#D81B60" }}
        >
          {modalMember?.name}
        </DialogTitle>
        <DialogContent dividers sx={{ fontFamily: "'Poppins', sans-serif" }}>
          {modalMember?.imageUrl && (
            <Box
              component="img"
              src={modalMember.imageUrl}
              alt={modalMember.name}
              sx={{ width: "100%", borderRadius: 2, mb: 2, objectFit: "cover" }}
            />
          )}
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Position: {modalMember?.position}
          </Typography>
          {modalMember?.description && (
            <Typography variant="body2" color="text.secondary" mb={1}>
              {modalMember.description}
            </Typography>
          )}
          <Box display="flex" alignItems="center" gap={1}>
            <EmailIcon fontSize="small" />
            <Typography variant="body2">{modalMember?.email}</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeMemberModal} color="primary" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PublicMembers;
