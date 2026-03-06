# Real-Time Chat Application (Industry-Grade)

## 🚀 Overview
A production-style real-time chat backend built with:
- Node.js
- Express
- MongoDB
- JWT Authentication (Access + Refresh)
- Session-based refresh token rotation
- Dockerized infrastructure

## 🔐 Authentication Features
- User signup/login
- Bcrypt password hashing
- Access & Refresh tokens
- Session tracking
- Token rotation
- Logout (single device)
- Protected route middleware

## 🐳 DevOps
- Dockerized backend & Mongo
- Custom bridge network
- Volume persistence
- Dev environment separation

## 🛠 Running (Dev)

```bash
docker compose -f docker/docker-compose.dev.yml up --build