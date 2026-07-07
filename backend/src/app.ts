import express from 'express';
import cors from 'cors';
import courseRoutes from './routes/course.routes';
import studentRoutes from './routes/student.routes';
import allocationRoutes from './routes/allocation.routes';
import dashboardRoutes from './routes/dashboard.routes';
import aiRoutes from './routes/ai.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/allocate', allocationRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ai', aiRoutes);

// Base error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
