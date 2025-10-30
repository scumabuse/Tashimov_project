import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import categoryRoutes from './routes/categories.js';
import modelRoutes from './routes/models.js';
import likeRoutes from './routes/likes.js';
import userRoutes from './routes/users.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/users', userRoutes);

// DB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tashimov')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Port
const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;