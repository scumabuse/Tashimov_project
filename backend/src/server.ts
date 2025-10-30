import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.ts';
import categoryRoutes from './routes/categories.ts';
import modelRoutes from './routes/models.ts';
import likeRoutes from './routes/likes.ts';
import userRoutes from './routes/users.ts';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // ← ОСТАВЬ, но теперь не используется
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/models', modelRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tashimov')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;