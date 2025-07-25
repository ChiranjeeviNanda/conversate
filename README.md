# Conversate

[![Live Site](https://img.shields.io/badge/Live-Demo-blue)](https://conversate-fi27.onrender.com/)
![Last Commit](https://img.shields.io/github/last-commit/ChiranjeeviNanda/conversate)
![License](https://img.shields.io/badge/license-MIT-green)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-19.0+-blue)

<div align="center">
  <img src="https://raw.githubusercontent.com/ChiranjeeviNanda/conversate/199021887063e918136f9bf705620d1db85e4025/frontend/public/app-logo.svg" alt="Conversate Logo" width="120" height="120">
  
  <h3>Connect. Chat. Learn. Grow.</h3>
  <p>A modern language exchange platform connecting global learners through real-time conversations and AI-powered assistance.</p>
</div>

---

## 🌟 Overview

**Conversate** is a comprehensive language exchange platform built with the MERN stack, designed to connect language learners worldwide. Whether you're looking to practice conversation skills, learn from native speakers, or get AI-powered language assistance, Conversate provides the tools you need for effective language learning.

### 🎯 Key Highlights

- **Global Community**: Connect with language partners from around the world
- **Real-Time Communication**: Seamless messaging and video calling experience
- **AI-Powered Learning**: Integrated Gemini AI assistant for enhanced learning
- **Modern Architecture**: Built with scalable, production-ready technologies
- **Responsive Design**: Optimized for both desktop and mobile experiences

---

## ✨ Features

### 🌐 **Language Exchange**
- **Smart Matching**: Connect with native speakers of your target language
- **Profile System**: Showcase your languages and learning goals
- **Global Reach**: Practice with users from different countries and cultures

### 💬 **Real-Time Communication**
- **Instant Messaging**: Powered by Stream Chat SDK for reliable messaging
- **Video Calls**: High-quality 1:1 video conversations using Stream Video SDK
- **File Sharing**: Share images, documents, and learning materials
- **Message History**: Access previous conversations and track your progress

### 🤖 **AI Assistant**
- **Gemini Integration**: Get instant help with translations and grammar
- **Conversation Analysis**: Receive feedback on your language usage
- **Learning Suggestions**: Personalized recommendations for improvement

### 🔐 **Security & Authentication**
- **JWT-Based Auth**: Secure user authentication and session management
- **Email Verification**: Verified user accounts for trusted interactions
- **Privacy Controls**: Manage your visibility and communication preferences

### 🎨 **User Experience**
- **Responsive Design**: Seamless experience across all devices
- **Smooth Animations**: Enhanced with Framer Motion for fluid interactions
- **Modern UI**: Clean, intuitive interface built with DaisyUI
- **20 Unique Themes**: Customizable themes for comfortable usage

---

## 🛠️ Tech Stack

### **Frontend**
- ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) **React 19** - Modern UI library
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) **Tailwind CSS** - Utility-first CSS framework
- ![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=flat&logo=daisyui&logoColor=white) **DaisyUI** - Tailwind CSS components
- ![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat&logo=framer&logoColor=blue) **Framer Motion** - Animation library
- Framer Motion - Animation library
- Lucide React - Icon library
- React Hot Toast - Notifications
- Axios - HTTP client

### **State Management**
- **Zustand** - Lightweight state management
- **TanStack Query v5** - Server state management and caching

### **Backend**
- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) **Node.js** - JavaScript runtime
- ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat) **Express.js** - Web framework
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) **MongoDB** - NoSQL database with Mongoose ODM
- bcryptjs - Password hashing
- cookie-parser - Cookie handling middleware
- cors - Cross-origin resource sharing

### **Third-Party Services**
- **Stream Chat & Video SDK** - Real-time communication infrastructure
- **Gemini API** - AI-powered language assistance
- **JWT** - Secure authentication tokens

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (Atlas or local instance)

### Required API Keys

You'll need accounts and API keys for:
- [Stream](https://getstream.io/) - For chat and video functionality
- [Google AI Studio](https://makersuite.google.com/app/apikey) - For Gemini API
- [MongoDB Atlas](https://www.mongodb.com/atlas) - For database (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ChiranjeeviNanda/conversate.git
   cd conversate
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies (both frontend and backend)
   npm run build
   ```

3. **Set up environment variables**
   
   Create `backend/.env`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret_key
   STREAM_API_KEY=your_stream_api_key
   STREAM_API_SECRET=your_stream_api_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

   Create `frontend/.env`:
   ```env
   VITE_STREAM_API_KEY=your_stream_api_key
   ```
   > ⚠️ **Important**: All Vite environment variables must be prefixed with `VITE_` to be accessible in the frontend.

### Running the Application

#### Development Mode (Recommended)

1. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend (in a new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

#### Production Mode

```bash
npm start
```

The application will be available at `http://localhost:5000`

---

## 📁 Project Structure

```
conversate/
├── 📁 backend/
│   ├── 📁 src/
│   │   ├── 📁 agent/           # AI agent configurations
│   │   ├── 📁 controllers/     # Route handlers
│   │   ├── 📁 lib/             # Utility libraries and helpers
│   │   ├── 📁 middleware/      # Authentication & validation
│   │   ├── 📁 models/          # MongoDB schemas
│   │   ├── 📁 routes/          # API routes
│   │   └── server.js           # Entry point
│   ├── .env                    # Environment variables
│   └── package.json
├── 📁 frontend/
│   ├── 📁 public/              # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/      # React components
│   │   ├── 📁 constants/       # App constants and configuration
│   │   ├── 📁 hooks/           # Custom hooks
│   │   ├── 📁 lib/             # Frontend utility libraries
│   │   ├── 📁 pages/           # Page components
│   │   └── 📁 store/           # Zustand stores
│   ├── .env                    # Vite environment variables
│   └── package.json
├── package.json                # Root package.json
└── README.md
```

---

## 🎯 Usage Guide

### Getting Started as a User

1. **Sign Up**: Create your account with email and password
2. **Complete Profile**: Add your native language and languages you want to learn
3. **Find Partners**: Browse and connect with language exchange partners
4. **Start Chatting**: Send messages and practice your target language
5. **Video Calls**: Engage in real-time conversations with voice and video
6. **AI Assistance**: Use the AI assistant for translations and grammar help

### For Developers

#### Available Scripts

```bash
# Root level
npm run build        # Install dependencies and build frontend
npm start           # Start production server

# Backend (cd backend)
npm run dev         # Start backend in development mode
npm start          # Start backend in production mode

# Frontend (cd frontend)
npm run dev        # Start frontend development server
npm run build      # Build frontend for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

#### API Endpoints

```
AI Agent:
GET  /api/agent                    # Get AI agent status
POST /api/agent/start-ai-agent     # Start AI agent
POST /api/agent/stop-ai-agent      # Stop AI agent

Authentication:
POST /api/auth/signup              # User registration
POST /api/auth/login               # User login
POST /api/auth/logout              # User logout
POST /api/auth/onboarding          # Complete user onboarding
PUT  /api/auth/update              # Update user profile
GET  /api/auth/me                  # Get current user info

Stream Integration:
GET  /api/auth/token               # Get Stream chat token

Users & Friends:
GET  /api/users                    # Get recommended users
GET  /api/users/friends            # Get user's friends
POST /api/users/friend-request/:id # Send friend request
PUT  /api/users/friend-request/:id/accept # Accept friend request
PUT  /api/users/friend-request/:id/reject # Reject friend request
GET  /api/users/friend-requests    # Get incoming friend requests
GET  /api/users/outgoing-friend-requests # Get outgoing friend requests
```

---

## 🖼️ Screenshots

<details>
<summary>🖥️ Desktop Experience</summary>

### 🏠 Landing Page
*Clean, professional landing page with clear call-to-action*
<img width="2880" height="2160" alt="Conversate Landing Page" src="https://github.com/user-attachments/assets/5229f47d-081b-40b0-9def-86e46dcfb0b1" />

### 👥 Making Friends & Language Partner Discovery
*Smart matching system to find language exchange partners*
<div align="center">
  <img width="49%" alt="Language Partner Discovery" src="https://github.com/user-attachments/assets/2a3f60ca-2f2a-4a4a-9c84-5ccf5c05c994" />
  <img width="49%" alt="Friend Connection Interface" src="https://github.com/user-attachments/assets/a0ee7c4a-ed5e-4b49-8ec3-7e5e18d35660" />
</div>

### 💬 Real-Time Chat Interface
*Stream-powered messaging with modern UI design*
<img width="2880" height="2160" alt="Chat Interface with Real-time Messaging" src="https://github.com/user-attachments/assets/234d13cd-16cb-428c-b720-89dafe1cc76a" />

### 🎥 High-Quality Video Calls
*Crystal clear video conversations for immersive language practice*
<img width="2880" height="2160" alt="HD Video Call Interface" src="https://github.com/user-attachments/assets/0947c923-6da9-446b-b827-64f47acab080" />

</details>

<details>
<summary>📱 Mobile Experience</summary>

### 📱 Fully Responsive Design
*Optimized for mobile devices with touch-friendly interfaces*

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/d22fa5e9-c15c-4c6d-a923-46f22a8ab91d" width="200" alt="Mobile Landing" />
        <br />
        <sub><b>Landing Page</b></sub>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/da5670c4-a00b-475d-80c1-df3d799f91c2" width="200" alt="Mobile Login" />
        <br />
        <sub><b>Login Interface</b></sub>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/6544e211-483e-4166-bc0d-cde905f18e69" width="200" alt="Mobile Friends" />
        <br />
        <sub><b>Friend Discovery</b></sub>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/c371f270-0c5a-415d-97c1-99ce9fffb8a5" width="200" alt="Mobile Chat" />
        <br />
        <sub><b>Chat Interface</b></sub>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/a342cb77-2f1c-46d5-9c9c-c1a331e33153" width="200" alt="Mobile Video" />
        <br />
        <sub><b>Video Calling</b></sub>
      </td>
      <td align="center">
        <img src="https://github.com/user-attachments/assets/4542914c-5888-48c2-b5fc-42d35da9ffd7" width="200" alt="Mobile Profile" />
        <br />
        <sub><b>User Profile</b></sub>
      </td>
    </tr>
  </table>
</div>

> 📱 **Testing Viewport**: All mobile screenshots captured using Samsung Galaxy S20 Ultra viewport for optimal display quality

### ✨ Key Mobile Features
- **Responsive Layout**: Adapts seamlessly to different screen sizes
- **Touch Gestures**: Intuitive swipe and tap interactions
- **Mobile-First Design**: Optimized user experience on smaller screens
- **Fast Loading**: Efficient rendering for mobile networks

</details>

<details>
<summary>🎨 Theme Showcase</summary>

### 🍂 Seasonal & Custom Themes
*Choose from 20 beautiful themes to personalize your experience*

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img width="400" alt="Autumn Theme" src="https://github.com/user-attachments/assets/81891309-cd1d-4afb-a772-05730f8fa189" />
        <br />
        <sub><b>🍂 Autumn Theme</b></sub>
      </td>
      <td align="center">
        <img width="400" alt="Halloween Theme" src="https://github.com/user-attachments/assets/6978329d-e335-45aa-86e5-c33edb3d7ca9" />
        <br />
        <sub><b>🎃 Halloween Theme</b></sub>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img width="400" alt="Lemonade Theme" src="https://github.com/user-attachments/assets/291f040a-918d-4429-8e79-64d0f975b185" />
        <br />
        <sub><b>🍋 Lemonade Theme</b></sub>
      </td>
      <td align="center">
        <div style="padding: 50px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white;">
          <h3>🌈 And 17 More!</h3>
          <p>Bumblebe • Caramellatte • Coffee</br>Corporate • Dark • Dim</br>Dracula • Emerald • Fantasy</br>Forest • Light • Lofi<br/>Neonite • Night • Nord<br/>Silk • Sunset</p>
        </div>
        <br />
        <sub><b>🎨 Complete Theme Collection</b></sub>
      </td>
    </tr>
  </table>
</div>

### 🎭 Theme Features
- **🎨 Custom Color Schemes**: Professionally designed palettes
- **🔄 Real-time Switching**: Instant theme changes without refresh
- **💾 Persistent Settings**: Your theme choice is remembered
- **📱 Mobile Optimized**: All themes work perfectly on mobile

> 🎨 **Pro Tip**: Themes are powered by DaisyUI and provide consistent styling across all components while maintaining accessibility standards.

</details>

---

## 🤝 Contributing

Contributions from the community are welcomed! Here's how you can help:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Write clear, concise commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

### Ways to Contribute
- 🐛 Report bugs and issues
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Fix existing issues
- 🎨 Enhance UI/UX

---

## 📋 Roadmap

### Upcoming Features
- [ ] **Group Conversations** - Multi-user chat rooms
- [ ] **Language Learning Games** - Interactive vocabulary and grammar exercises
- [ ] **Progress Tracking** - Analytics and learning metrics
- [ ] **Mobile App** - Native iOS and Android applications
- [ ] **Voice Messages** - Audio message support
- [ ] **Translation Tools** - Real-time message translation
- [ ] **Study Materials** - Integrated learning resources

### Long-term Goals
- [ ] **Advanced AI Tutor** - Personalized learning paths
- [ ] **Community Features** - Forums and discussion boards
- [ ] **Certification System** - Language proficiency assessments
- [ ] **Offline Mode** - Download conversations for offline study

---

## 🐛 Known Issues

- Video call quality may vary based on internet connection
- AI responses may occasionally be delayed during high traffic
- Some older browsers may not support all features

---

## 🔧 Troubleshooting

### Common Issues

**Cannot connect to MongoDB:**
- Ensure your MongoDB URI is correct in the `.env` file
- Check if your IP address is whitelisted in MongoDB Atlas

**Stream SDK errors:**
- Verify your Stream API key and secret are correct
- Ensure you're using the same API key in both frontend and backend

**Build failures:**
- Clear node_modules and reinstall dependencies
- Check Node.js version compatibility

### Getting Help

If you encounter issues:
1. Check the [Issues](https://github.com/ChiranjeeviNanda/conversate/issues) page
2. Search existing issues or create a new one
3. Provide detailed error messages and steps to reproduce

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌐 Live Demo

**Try Conversate now:** [https://conversate-fi27.onrender.com](https://conversate-fi27.onrender.com)

*Note: The live demo may take a moment to load as it's hosted on Render's free tier.*

---

## 🙏 Acknowledgments

- **Stream** - For providing excellent real-time communication infrastructure
- **Google** - For the powerful Gemini AI API
- **MongoDB** - For reliable database solutions
- **Render** - For hosting and deployment platform
- **Open Source Community** - For the amazing tools and libraries

Special thanks to [burakorkmez/streamify-video-calls](https://github.com/burakorkmez/streamify-video-calls) for backend architecture inspiration.

---

## 📞 Contact

**Developer:** Chiranjevi Nanda Kumar  
**Email:** chiranjeevinanda23@gmail.com  
**GitHub:** [@ChiranjeeviNanda](https://github.com/ChiranjeeviNanda)  
**LinkedIn:** [Chiranjeevi Nanda Kumar](https://www.linkedin.com/in/chiranjeevi-nanda-kumar/)
