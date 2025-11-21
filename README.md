# TinyLink – URL Shortener (Bit.ly Clone)

TinyLink is a full-stack URL shortening web application inspired by Bit.ly.  
It allows users to create short links, view click analytics, delete links, and manage everything through a clean, modern UI.

This project is built as part of a take-home assignment and follows **all required specs**, including URL conventions, API behavior, health checks, and UI expectations.

---

## 🚀 Live Demo

### 🔗 Frontend (Vercel)
https://YOUR-FRONTEND-URL.vercel.app

### 🔗 Backend API (Render)
https://YOUR-BACKEND-URL.onrender.com

### 🔗 Example Short URL
https://YOUR-BACKEND-URL.onrender.com/abc123

---

## 📦 Features

### 🔧 Core Functionality
- Create short links with:
  - Auto-generated short codes
  - Custom short codes (globally unique)
- Delete existing links
- 302 redirect using `/:code`
- Track:
  - Total clicks
  - Last clicked time
- Dedicated stats page per link (`/code/:code`)
- Health check route `/healthz`

### 🖥️ UI Features
- Add link form with inline validation
- Table with:
  - Short code
  - Target URL
  - Total clicks
  - Last clicked
  - Copy-to-clipboard button
- Search/filter
- Loading, empty, error states
- Fully responsive layout
- Clean TailwindCSS styling

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- TailwindCSS
- Axios
- React Router

### Backend
- Node.js + Express
- PostgreSQL (Neon)
- CORS
- Render for deployment

### Dev Tools
- Git & GitHub
- Vercel for frontend hosting

---

## 🔌 API Documentation

Base URL:

https://tinylink-backend-uu47.onrender.com


### **POST /api/links**
Create a new short link  
**Body:**
```json
{
  "url": "https://google.com",
  "code": "optional"
}
```
### **GET /api/links**

Returns all links

### **GET /api/links/:code**

Returns stats for one link
404 if not found

### **DELETE /api/links/:code**

Deletes link
After deletion /code must return 404

### **GET /healthz**

Health check
**Response:**
```json
{ "ok": true, "version": "1.0" }
```
**Project Structure:**
```lua
tinylink/
 ├── backend/
 │    ├── src/
 │    │     ├── routes/
 │    │     ├── controllers/
 │    │     ├── config/
 │    │     ├── app.js
 │    │     └── server.js
 │    ├── package.json
 │    ├── .env.example
 │
 ├── frontend/
 │    ├── src/
 │    │     ├── components/
 │    │     ├── pages/
 │    │     ├── App.jsx
 │    │     └── main.jsx
 │    ├── index.html
 │    ├── tailwind.config.js
 │    └── package.json
 └── README.md
```
***Environment Variables:***
Backend (.env)
```ini
DATABASE_URL=postgres://...
PORT=4000
```
Frontend (.env)
```ini
VITE_API_BASE_URL=https://YOUR-BACKEND-URL.onrender.com
VITE_BASE_URL=https://YOUR-BACKEND-URL.onrender.com
```
***Running Locally:***
Clone repo:
```bash
git clone https://github.com/YOUR_USERNAME/tinylink.git
cd tinylink
```
Backend:
```bash
cd backend
npm install
npm run dev
```
**Backend runs at:** 
https://tinylink-backend-uu47.onrender.com

Frontend:
```bash
cd frontend
npm install
npm run dev
```
**Frontend runs at:**
https://tinylink-tan.vercel.app/
