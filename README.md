

# 🎓 JS App – Student Management System

JS App is a web-based Student Management System designed to streamline user access and data handling for educational institutions. It supports role-based access for **Admins**, **Teachers**, and **Students**, and ensures secure authentication using **tokens and cookies**.

🖥️ **Frontend Hosted on Vercel**  
🔗 Live site: [js-app-sepia.vercel.app](https://js-app-sepia.vercel.app/)  

🌐 **Backend Hosted on Render**

---

## 🚀 Features

- Role-based user access: Admin, Teacher, Student
- Clean and intuitive navbar: Home, About, Services, Login
- Secure authentication with tokens and cookies
- Modular project structure with `client` and `server` folders

---

## 📁 Project Structure

### 🖥️ `client/` – Frontend

- `public/`: Static files and HTML templates
- `src/`
  - `assets/`: Images, stylesheets, fonts
  - `components/`: Reusable UI elements
  - `pages/`: Views like Home, About, etc.

### 🌐 `server/` – Backend

- `controller/`: Business logic for each route
- `middleware/`: Auth, request handlers
- `model/`: Database models
- `routes/`: API endpoints
- `utils/`: Utility functions

---

## 🛠️ Getting Started

Make sure you have [pnpm](https://pnpm.io/) installed.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/js-app.git
cd js-app
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run the development servers

Start the backend:

```bash
cd server
pnpm run dev
```

Then run the frontend:

```bash
cd client
pnpm run dev
```

---

## 🌱 Future Improvements

Coming soon to elevate the app’s capabilities:

- 📋 Student List Management
- 📝 Exam Creation Module
- 📆 Attendance Tracking
- 📊 Results Calculation and Processing

---

## 💬 Contributions & Feedback

Open to ideas and contributions—fork, pull, suggest!  
Let’s build a better JS App, together. 💡

---

