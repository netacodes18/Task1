# 🎓 AI-Powered Student Course Allocation System

![Project Banner](https://img.shields.io/badge/Status-Completed-success) ![Tech Stack](https://img.shields.io/badge/Stack-MERN%20%7C%20Tailwind-blue) ![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)

An enterprise-grade full-stack web application designed to simulate a highly dynamic and strict university admission process. This system intelligently allocates students to their preferred courses based on merit, category reservations, and tie-breakers, completely automating a complex administrative task.

## 🚀 Project Overview

The core of this system is a high-performance **O(N * M) Optimized Allocation Algorithm**. It dynamically processes student applications and allocates seats according to strict business rules. 

If a student cannot be allocated to their first choice due to capacity limits, the algorithm cascades to their second and third preferences. If all preferred courses are full, the system gracefully handles the scarcity by placing the student on an intelligent waitlist.

### 🛡️ Strict Business Rules Implemented
- **Merit-Based Priority:** Students are sorted and evaluated strictly by their marks (highest first).
- **Category Reservations:** Independent and mathematically sound seat counters for General, OBC, SC, and ST quotas.
- **Date Tie-Breakers:** If two students share the exact same marks, the algorithm prioritizes the earliest application timestamp.
- **Single Allocation Guarantee:** Transaction logic ensures a student can only consume a single seat across the entire system.

---

## ⭐ New Features Added

During development, we went above and beyond the standard CRUD requirements by implementing several advanced, real-world engineering features:

### 1. 🤖 AI Analytics Assistant (Google Gemini 2.5 Flash)
We integrated Google's Gemini AI directly into the admin dashboard. The AI has real-time context of the MongoDB database, allowing admins to ask natural language questions like:
> *"How many SC category students are currently unallocated?"* or *"Who is first on the waitlist for Computer Science?"*

### 2. ⏳ Intelligent Waitlist System
In the real world, students don't just disappear if a course is full. We implemented a dynamic waitlist. If a student is completely unallocated, they are automatically assigned a **Waitlist Queue Number** for their top-priority course, complete with UI badges tracking their position.

### 3. ✨ Premium Glassmorphic UI & Animations
The entire frontend was overhauled to act as a pitch deck. We implemented enterprise SaaS-level aesthetics using Tailwind CSS, featuring frosted glass (glassmorphism) cards, dynamic fading background grids, micro-interactions, and glowing hover states.

### 4. 🔄 CI/CD Pipeline (Continuous Integration / Deployment)
Configured a robust GitHub Actions CI/CD pipeline ensuring that any pushes to the `main` branch are automatically linted, built using Node 22, and seamlessly deployed to Vercel (Frontend) and Render (Backend).

---

## 🔮 Future Features Roadmap

While the system is fully functional and feature-rich, here are some highly recommended features for future iterations:

- [ ] **Role-Based Authentication (RBAC):** Implement JWT authentication so Students can log in to view their specific allocation status, while Admins get access to the dashboard and algorithm controls.
- [ ] **Waitlist Auto-Clearance:** If a student cancels or withdraws their admission, the system should automatically allocate that newly opened seat to `Waitlist #1`.
- [ ] **Automated Email Notifications (Nodemailer/Resend):** Automatically send an email to students when their allocation status changes or when they clear the waitlist.
- [ ] **Data Export (CSV/PDF):** Add a feature for admins to export the final admitted student lists and waitlists into a downloadable Excel or PDF report.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Lucide React Icons, Vite.
- **Backend:** Node.js, Express, TypeScript, Mongoose.
- **Database:** MongoDB.
- **AI Integration:** `@google/genai` (Gemini 2.5 Flash).
- **Deployment:** Vercel (Frontend), Render (Backend), GitHub Actions.

---

## 💻 Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd Task_1
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   ```
   Run the backend:
   ```bash
   npm run dev
   ```

3. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
   Run the frontend:
   ```bash
   npm run dev
   ```

4. **Open Application:**
   Visit `http://localhost:5173/` in your browser.
