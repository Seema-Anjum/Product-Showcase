### Product Showcase & Enquiry

A full-stack web application to display products, view details, and submit enquiries. Built with React on the frontend, Node.js + Express backend, and SQLite database.

### Features

Product listing with search, category filters, and pagination

Product details page with images and price

Enquiry form with validation

RESTful API integration

### Tech Stack

Frontend: React, React Router, Axios, CSS

Backend: Node.js, Express, SQLite

Database: SQLite

Folder Structure
backend/
  ├─ db/
  │   └─ database.js
  ├─ routes/
  │   ├─ productRoutes.js
  │   └─ enquiryRoutes.js
  └─ server.js

frontend/
  ├─ components/
  │   ├─ ProductList.jsx
  │   ├─ ProductDetails.jsx
  │   └─ EnquiryForm.jsx
  ├─ styles/
  │   ├─ ProductList.css
  │   ├─ ProductDetails.css
  │   └─ Enquiry.css
  └─ App.jsx


### Backend setup:

cd backend
npm install
node server.js


### Frontend setup:

cd frontend
npm install
npm start 
npm run dev


Open http://localhost:3000 (backend) and http://localhost:3001 or the frontend port for React.

### API Endpoints
Products

GET /api/products – Fetch all products

GET /api/products/:id – Fetch product by ID

Enquiries

POST /api/enquiries – Submit an enquiry

GET /api/enquiries – Fetch all enquiries

### Usage

Browse products on the home page

Use search and category filters

Click “View Details” to see full product info

Submit enquiry via the modal form

Notes

Ensure backend port matches Axios requests in React (http://localhost:3000)

Images served from /images folder in backend

