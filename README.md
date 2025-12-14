# 🧠 Habit Tracker – Full Stack Productivity App

A modern **full-stack habit tracking application** built with **React, Node.js, Express, SQLite, and Tailwind CSS**.
The app helps users track daily habits, visualize progress with analytics, receive AI-style feedback, and export reports — all with a clean UI and dark mode support.

---

## 🚀 Features

### ✅ Core Habit Tracking

* Daily habit checklist
* Date-based tracking (new day unlocks automatically)
* Completion progress bar
* Persistent data storage

### 📊 Analytics & Insights

* Line chart for daily completion trend
* Bar chart for habit-wise completion
* Pie chart for overall completed vs missed habits

### 🤖 AI Feedback

* Compares today vs yesterday
* Highlights improvements or declines
* Gives actionable suggestions based on history

### 📤 Export & Reports

* Export **daily reports as PDF** (includes charts + AI feedback)
* Export **Excel (.xlsx)** files
* Access raw data locally

### 🎨 UI / UX

* Light & Dark mode (persistent)
* Fixed sidebar layout
* Smooth animations and micro-interactions
* Friendly empty states for first-time users
* Toast notifications for feedback

---

## 🧩 Tech Stack

### Frontend

* React
* Tailwind CSS
* React Router
* Axios
* Chart.js
* Framer Motion
* Lucide Icons

### Backend

* Node.js
* Express
* SQLite (local database)
* PDFKit (PDF export)
* ChartJS Node Canvas
* ExcelJS

---

## 🏗️ Architecture Overview

```
habit-tracker/
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Dashboard, History, Analytics, AI
│   │   ├── App.js
│   │   └── index.js
│   └── tailwind.config.js
│
├── backend/
│   ├── routes/           # API routes
│   ├── db/               # SQLite database logic
│   ├── server.js
│   └── database.sqlite
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js
* npm
* Git

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/habit-tracker.git
cd habit-tracker
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend runs at:

```
http://localhost:5000
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

## 🖥️ Usage

1. Open the app in the browser
2. Track daily habits using checkboxes
3. View progress in **Analytics**
4. Read suggestions in **AI Feedback**
5. Export reports as PDF or Excel
6. Toggle dark mode from sidebar

---

## 📌 Project Highlights (Resume-Ready)

* Designed and built a **full-stack habit tracker** using React and Node.js
* Implemented **data analytics with charts** for habit insights
* Built **AI-style feedback logic** comparing user performance over time
* Added **PDF and Excel export functionality** with visual reports
* Designed a **responsive, dark-mode enabled UI** with Tailwind CSS
* Managed project with Git and GitHub following best practices

---

## 🔮 Future Enhancements

* User authentication & cloud sync
* Push / browser notifications
* Mobile-first responsive sidebar
* Habit customization
* Real AI (LLM-based) feedback

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 🙌 Acknowledgements

Built as a learning + portfolio project to practice:

* Full-stack development
* Clean UI/UX
* Real-world debugging
* Git & GitHub workflows
