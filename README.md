# 🚀 RECONNECT

🔗 Live Deployment:[https://reconnect01.vercel.app](https://reconnect01.vercel.app)
**RECONNECT** is an AI-powered rehabilitation and reintegration platform designed to bridge the critical gap between individuals seeking to rebuild their lives (Participants) and the groups providing help (Organizations). 

Built for our hackathon submission, this platform combats the isolation of recovery by combining personalized journey tracking, real-world community support, and 24/7 AI-driven empathy into a single, beautifully designed ecosystem.

## 🛑 The Problem
Reintegrating into society after life-altering events (like incarceration, addiction, social disconnect or severe trauma) is incredibly difficult. People face fragmented support systems, lack of continuous guidance, and overwhelming feelings of isolation. Meanwhile, organizations lack unified tools to track participant progress, communicate effectively, and manage resources, leading to high drop-out rates and repeated cycles of failure.

## 💡 Our Solution
RECONNECT solves this by providing a unified platform with a dual-role architecture:
* **For Organizations:** A powerful dashboard to track engagement, analyze participant data, and manage support programs and sessions.
* **For Participants:** A deeply empathetic, consumer-grade dashboard that tracks their personal journey, connects them to real-world support groups (Cohorts), and provides a 24/7 Personal AI Companion that understands their specific barriers and goals.

---

## ⭐ Key Features

### 1. Dual-Role Architecture
A seamless experience for both **Participants** (focused on empathetic progress) and **Organizations** (focused on data, analytics, and management). The system automatically routes users to their respective dashboards based on their chosen role during registration.

### 2. AI-Powered "Check-Ins"
Instead of boring clinical forms, participants complete interactive check-ins to log their current Goals, Barriers, and Support Needs. This data actively shapes their journey and informs the AI.

### 3. Personal AI Companion (RECONNECT Guide)
A 24/7 AI companion powered by the **Groq API (Llama 3.1)**. 
* It reads the user's latest check-in data and injects their personal goals and barriers into its system prompt.
* It provides hyper-personalized, context-aware advice whenever the participant feels stuck or overwhelmed.

### 4. The Support Hub & Community Cohorts
A centralized space where participants can combat isolation:
* **Cohorts:** Reddit-style forums where users can join specific groups (e.g., "Employment Confidence Cohort") to connect with peers.
* **Courses & Sessions:** Organizations can list physical or virtual skill-building sessions, and participants can instantly RSVP.

### 5. Real-Time Direct Messaging
Instant, private communication between participants and their supporting organizations for real-time help.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS
* **Backend / Database:** Supabase (PostgreSQL, Row Level Security, Auth, Realtime)
* **AI Engine:** Groq API (Llama-3.1-8b-instant model)
* **UI Components:** Radix UI, Lucide Icons, Recharts (for organization analytics)

---

## 🚀 Running Locally

If you'd like to run RECONNECT on your own machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/Anmol2627/RECONNECT.git
cd RECONNECT
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables
Create a `.env.local` file in the root of the project and add the following keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

### 4. Database Setup (Supabase)
Run the provided SQL schemas in your Supabase SQL Editor to create the necessary tables:
* `supabase_schema.md` (Core Profiles & Auth)
* `supabase_ai_schema.md` (AI Conversations)
* `supabase_messaging_schema.md` (Direct Messaging)
* `supabase_org_schema.md` (Check-ins & Sessions)

### 5. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🎨 Design Philosophy
We utilized a "Glassmorphism" aesthetic and a calming "Sage/Forest Green" color palette. Our goal was to reduce cognitive load and anxiety for participants, ensuring the platform feels like a welcoming community rather than a clinical tool.
