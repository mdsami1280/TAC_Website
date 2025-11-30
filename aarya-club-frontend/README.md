# Aarya Club Frontend

A modern React frontend for the Aarya Club - CSE Department Cultural Club management system.

## 🎨 Features

- **Modern UI/UX**: Built with Material-UI for a professional look
- **Authentication**: JWT-based login/register system
- **Responsive Design**: Works perfectly on desktop and mobile
- **Real-time Updates**: Automatic data refresh after CRUD operations
- **Event Management**: Create, edit, and manage cultural events
- **Member Management**: Add and manage club members with roles
- **Dashboard**: Overview of club statistics and activities
- **Image Support**: Display images for events and member profiles

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Running Aarya Club backend API

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

## 📱 Pages & Features

### 🔐 Authentication
- **Login Page**: Beautiful gradient design with club branding
- **Register Page**: Admin account creation with validation
- **Protected Routes**: Automatic redirect to login if not authenticated

### 📊 Dashboard
- **Club Statistics**: Total events, active members, upcoming events
- **Quick Actions**: Direct access to create events/members
- **Recent Activity**: Overview of latest events and members

### 🎉 Events Management
- **Event Creation**: Add new cultural events with images
- **Event Editing**: Update event details
- **Event Deletion**: Remove events with confirmation
- **Visual Cards**: Beautiful event cards with status indicators
- **Date Sorting**: Separate upcoming and past events

### 👥 Members Management
- **Member Profiles**: Add members with roles and descriptions
- **Status Management**: Active/inactive member toggle
- **Image Support**: Profile pictures for members
- **Role Assignment**: Position-based member organization

## 🎨 Design Features

- **Club Branding**: Custom color scheme for university club
- **Responsive Layout**: Mobile-first design approach
- **Smooth Animations**: Hover effects and transitions
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Clear error messages and validation
- **Success Feedback**: Confirmation messages for actions

## 🛠️ Technology Stack

- **React 18** with TypeScript
- **Material-UI (MUI)** for components
- **React Router** for navigation
- **Axios** for API calls
- **Context API** for state management

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout.tsx      # Main layout with navigation
│   └── ProtectedRoute.tsx
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── pages/              # Main pages
│   ├── Dashboard.tsx   # Dashboard page
│   ├── Events.tsx      # Events management
│   ├── Members.tsx     # Members management
│   ├── Login.tsx       # Login page
│   └── Register.tsx    # Registration page
├── services/           # API services
│   ├── api.ts         # Axios configuration
│   ├── authService.ts # Authentication API
│   ├── eventService.ts # Events API
│   └── memberService.ts # Members API
└── App.tsx            # Main app component
```

## 🎯 Key Features for University Club

### 🏫 Student-Friendly Design
- Clean, modern interface suitable for university environment
- Easy navigation for quick access to features
- Mobile-responsive for students on-the-go

### 🎭 Cultural Club Focus
- Event management specifically for cultural activities
- Member role management (President, Vice President, etc.)
- Image support for showcasing events and member photos

### 🔒 Admin-Only Access
- Secure authentication system
- Role-based access control
- Protected routes for sensitive operations

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify/Vercel
1. Build the project
2. Upload the `build` folder
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions, please contact the development team or create an issue in the repository.

---

**Aarya Club** - Empowering CSE students through cultural activities and community building! 🎓✨
