# CourseLink

**CourseLink** is a comprehensive platform designed to seamlessly connect university students with ideal study partners. By matching students based on their current courses, study goals, and academic preferences, CourseLink bridges the gap between students and facilitates academic collaboration and social connection on campus.

## 🎯 The Vision

Studying in university can be difficult, especially when you learn best with others, and need to find classmates who share similar academic goals, schedules, and learning styles. CourseLink is designed to solve this by offering a centralized, intelligent matching platform where students can discover, connect, and collaborate with classmates.

## 🌟 Key Features

- **Intelligent Matching Engine**: A custom symmetric similarity algorithm that computes detailed match scores based on overlapping courses, goals (e.g., exam prep, homework), and categorical preferences (e.g., interactivity levels, meeting types).
- **User-First Discovery**: A familiar and intuitive interface designed with common systems in mind to help users focus on finding the right study partner, not fighting with UI.
- **Real-Time Communication**: A built-in messaging ecosystem that creates secure conversation threads once connections are mutually accepted.
- **Comprehensive Onboarding**: A smooth user signup to introduce the user to the systems and capture their study preferences, current course enrollments, and academic habits.
- **Integrated Scheduling**: A calendar built right into the app to integrate seemlessly with scheduling sessions right in the messages. One platform for all study sessions.

## 🏗️ Project Architecture & Tech Stack

CourseLink is structured as a monorepo containing three core components and underlying cloud infrastructure:

### 1. Main Web Application (`frontend/`)
The core application where users manage profiles, discover partners, and communicate.
- **Framework**: React 19 (Built with Vite & TypeScript)
- **Styling & UI**: Tailwind CSS, Radix UI, Framer Motion
- **State & Routing**: React Router
- **Backend Integration**: Firebase Auth for secure login and Firestore for real-time data syncing.

### 2. Matching Engine & Cloud Functions (`backend/`)
The computational powerhouse handling complex background tasks and matching logic.
- **Environment**: Python 3.12, Firebase Admin SDK
- **Algorithms**: Implements Jaccard similarity and exact matching criteria to generate a normalized match score `[0, 1]` between users.
- **Event-Driven**: Uses Firestore triggers to listen for user updates and automatically recompute optimal match feeds in real-time.
- **Security**: Securely manages the creation of conversation channels only after requests are reciprocated, alongside handling push notification logic.

### 3. Marketing Landing Page (`landing/`)
A lightweight, public-facing portal to capture interest and explain the apps intentions.
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS & Framer Motion for modern, scroll-triggered animations.
- **Features**: Whitelist requests for expanding to new universities and a streamlined support form.

### 4. Cloud Infrastructure & CI/CD
Fully serverless and scalable infrastructure leveraging Google Cloud and Firebase.
- **Database**: Firebase Firestore (NoSQL) protected by stringent `firestore.rules` for data privacy.
- **Hosting**: Firebase Hosting mapping different targets to the monolithic frontend and landing applications.
- **Deployment Pipeline**: CI/CD workflows via GitHub Actions automating build workflows and deployment processes directly to Firebase upon merges.

## 🔒 Confidentiality & Security

Maintaining user privacy and data security is the absolute priority, bar-none. The platform uses strict database security rules ensuring that users can only access their own data and authorized conversation threads. We assume any request is a malicious actor first, only allowing them after proper vetting and strict data compliance.
