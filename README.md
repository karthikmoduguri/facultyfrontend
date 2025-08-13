# 🎓 Faculty–Student Cabin Booking System — Frontend

A role-based **real-time cabin booking system** where **students** can book faculty slots, **faculty** can manage bookings, and **admins** can control the overall user base.  
Built using **React.js** with **Socket.IO** for instant notifications.

---

## 📜 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Frontend Architecture](#frontend-architecture)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Key Implementation Details](#key-implementation-details)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

---

## 📖 About the Project

This is the **frontend** part of the Faculty–Student Cabin Booking System.

- **Student portal:** Check availability and request bookings.
- **Faculty dashboard:** Manage and approve/reject requests.
- **Admin panel:** Manage faculty and student accounts.
- **Real-time notification system:** Instant updates for all roles.

The application is **responsive**, supports **role-based routing**, and ensures instant updates via **websockets**.

---

## ✨ Features

### 🎯 Common

- 🔒 Secure login (role-based access control)
- 📱 Responsive UI for desktop and mobile

### 🧑‍🎓 Student

- 👀 View faculty slots in real time
- 📝 Book available slots instantly
- 🔔 Receive booking status notifications instantly

### 👨‍🏫 Faculty

- ✅ Approve/reject student booking requests
- 🕒 Manage time slots dynamically
- 🔔 Get notified when students book or cancel slots

### 🛠 Admin

- ➕ Add/update/remove users
- 📥 Bulk upload users using CSV
- 📊 Monitor system usage

### 🔔 Notifications

- ⚡ Real-time socket-based updates
- 🗂 Sidebar to display latest events
- 🍞 Toast popups for instant alerts

---

## 🛠 Tech Stack

**Frontend:**

- React.js (Vite)
- React Router DOM
- Context API (AuthContext, SocketContext, NotificationsContext)
- Tailwind CSS (for styling)
- Socket.IO Client
- React Hot Toast (toast notifications)

**Development Tools:**

- Git & GitHub
- ESLint + Prettier
- Vercel (deployment)

---

## 🏗 Frontend Architecture

The app is organized using **Context API** for state management:

- **AuthContext:** Handles authentication, stores user data
- **SocketContext:** Manages WebSocket connection and emits join events after login
- **NotificationsContext:** Stores and updates notifications in real time

**Routing** is role-based:

- `/student-dashboard` → Student view
- `/faculty-dashboard` → Faculty view
- `/admin-dashboard` → Admin view

**Socket Lifecycle:**

1. After login, `user.id` is passed to `SocketProvider`
2. On `connect`, the socket emits `joinStudent` or `joinFaculty` event
3. Backend sends relevant notifications via events like `new-notification`
4. Notifications are displayed in the sidebar and as toast alerts

---

## 📂 Folder Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── student/
│   │   ├── faculty/
│   │   ├── admin/
│   │   ├── notifications/
│   │   │   ├── NotificationSidebar.jsx
│   │   │   └── NotificationHandler.jsx
│   │   └── common/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── SocketContext.jsx
│   │   └── NotificationsContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── FacultyDashboard.jsx
│   │   └── AdminDashboard.jsx
│   ├── socket.js
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

## 🛠 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/faculty-front.git
   cd faculty-front
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## 📝 Key Implementation Details

- **Role-based routing:** Ensures users see only their relevant dashboard
- **Socket.IO integration:** Real-time updates for bookings and notifications
- **Context API:** Centralized state management for authentication and notifications
- **Responsive design:** Works seamlessly on desktop and mobile devices

---

## 🚀 Future Enhancements

- 🌙 Dark mode theme
- 📱 Push notifications for mobile
- 📊 Advanced analytics for admin dashboard

---

## 👨‍💻 Author

**Karthik Moduguri**
# 🎓 Faculty–Student Cabin Booking & Notification System — Frontend

A role-based **real-time cabin booking system** where **students** can book faculty slots, **faculty** can manage bookings, and **admins** can control the overall user base.  
Built using **React.js** with **Socket.IO** for instant notifications.

---

## 📜 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Frontend Architecture](#frontend-architecture)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Key Implementation Details](#key-implementation-details)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

---

## 📖 About the Project

This is the **frontend** part of the Faculty–Student Cabin Booking System.

- **Student portal:** Check availability and request bookings.
- **Faculty dashboard:** Manage and approve/reject requests.
- **Admin panel:** Manage faculty and student accounts.
- **Real-time notification system:** Instant updates for all roles.

The application is **responsive**, supports **role-based routing**, and ensures instant updates via **websockets**.

---

## ✨ Features

### 🎯 Common

- 🔒 Secure login (role-based access control)
- 📱 Responsive UI for desktop and mobile

### 🧑‍🎓 Student

- 👀 View faculty slots in real time
- 📝 Book available slots instantly
- 🔔 Receive booking status notifications instantly

### 👨‍🏫 Faculty

- ✅ Approve/reject student booking requests
- 🕒 Manage time slots dynamically
- 🔔 Get notified when students book or cancel slots

### 🛠 Admin

- ➕ Add/update/remove users
- 📥 Bulk upload users using CSV
- 📊 Monitor system usage

### 🔔 Notifications

- ⚡ Real-time socket-based updates
- 🗂 Sidebar to display latest events
- 🍞 Toast popups for instant alerts

---

## 🛠 Tech Stack

**Frontend:**

- React.js (Vite)
- React Router DOM
- Context API (AuthContext, SocketContext, NotificationsContext)
- Tailwind CSS (for styling)
- Socket.IO Client
- React Hot Toast (toast notifications)

**Development Tools:**

- Git & GitHub
- ESLint + Prettier
- Vercel (deployment)

---

## 🏗 Frontend Architecture

The app is organized using **Context API** for state management:

- **AuthContext:** Handles authentication, stores user data
- **SocketContext:** Manages WebSocket connection and emits join events after login
- **NotificationsContext:** Stores and updates notifications in real time

**Routing** is role-based:

- `/student-dashboard` → Student view
- `/faculty-dashboard` → Faculty view
- `/admin-dashboard` → Admin view

**Socket Lifecycle:**

1. After login, `user.id` is passed to `SocketProvider`
2. On `connect`, the socket emits `joinStudent` or `joinFaculty` event
3. Backend sends relevant notifications via events like `new-notification`
4. Notifications are displayed in the sidebar and as toast alerts

---

## 📂 Folder Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── student/
│   │   ├── faculty/
│   │   ├── admin/
│   │   ├── notifications/
│   │   │   ├── NotificationSidebar.jsx
│   │   │   └── NotificationHandler.jsx
│   │   └── common/
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── SocketContext.jsx
│   │   └── NotificationsContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── FacultyDashboard.jsx
│   │   └── AdminDashboard.jsx
│   ├── socket.js
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

## 🛠 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/faculty-front.git
   cd faculty-front
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## 📝 Key Implementation Details

- **Role-based routing:** Ensures users see only their relevant dashboard
- **Socket.IO integration:** Real-time updates for bookings and notifications
- **Context API:** Centralized state management for authentication and notifications
- **Responsive design:** Works seamlessly on desktop and mobile devices

---

## 🚀 Future Enhancements

- 🌙 Dark mode theme
- 📱 Push notifications for mobile
- 📊 Advanced analytics for admin dashboard

---

## 👨‍💻 Author

**Karthik Moduguri**
