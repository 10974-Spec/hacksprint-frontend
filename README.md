# Hackathon Platform Frontend

A beautiful, production-ready frontend for a one-day physical hackathon platform.

## Features

- Modern, responsive UI with Tailwind CSS
- Real-time team chat with Socket.io
- GitHub integration for repository analytics
- Role-based dashboards (Admin, Developer, Judge)
- Event phase-aware UI components
- Project submission and judging system
- Interactive leaderboard with personal highlights

## Setup

1. Clone repository
2. Run `npm install`
3. Copy `.env.example` to `.env` and configure values
4. Start backend server on port 5000
5. Run `npm run dev` for development

## Tech Stack

- React 18 with Vite
- Redux Toolkit for state management
- Socket.io-client for real-time features
- React Hook Form + Zod for validation
- Cloudinary for image uploads
- React Router v6 for routing

## Backend Integration

This frontend requires the hackathon backend to be running. All API calls, authentication, and real-time features are integrated with the backend API.