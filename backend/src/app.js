const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const friendsRoutes = require('./routes/friends.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/friends', friendsRoutes);

app.use((req, res, next) => {
  const error = new Error('Route not found.');
  error.status = 404;
  next(error);
});

app.use(errorHandler);

module.exports = app;
