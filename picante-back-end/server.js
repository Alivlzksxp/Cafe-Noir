require('dotenv').config();
const express = require('express');
const cors = require('cors');  // only once here
const path = require('path');

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const articleRoutes = require('./routes/articleRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup - only allow your frontend domain
const allowedOrigins = ['https://cafe-noir.onrender.com'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like curl, Postman, server-side requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/articles', articleRoutes);

// REMOVE React static file serving if frontend is deployed separately
// if (process.env.NODE_ENV === 'production') {
//   const root = path.join(__dirname, '../picante-front-end/dist');
//   app.use(express.static(root));

//   app.get(/.*/, (req, res) => {
//     res.sendFile(path.join(root, 'index.html'));
//   });
// }

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
