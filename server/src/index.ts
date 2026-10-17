import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { getDatabase } from './db';
import appointmentsRouter from './routes/appointments';
import contactRouter from './routes/contact';
import infoRouter from './routes/info';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Lightweight rate limiting / spam protection for appointment & contact posts
const requestCounts = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_POST_REQUESTS_PER_MINUTE = 20;

function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'POST') {
    const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
    const now = Date.now();
    const clientData = requestCounts.get(ip) || { count: 0, lastReset: now };

    if (now - clientData.lastReset > RATE_LIMIT_WINDOW_MS) {
      clientData.count = 1;
      clientData.lastReset = now;
    } else {
      clientData.count += 1;
    }

    requestCounts.set(ip, clientData);

    if (clientData.count > MAX_POST_REQUESTS_PER_MINUTE) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please wait a moment before submitting another request.'
      });
    }
  }
  next();
}

app.use(rateLimitMiddleware);

// Request logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    hospital: 'AR Hospital API',
    database: 'SQLite',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/appointments', appointmentsRouter);
app.use('/api/contact', contactRouter);
app.use('/api', infoRouter);

// Serve static frontend build in production if available
const clientBuildPath = path.resolve(__dirname, '../../client/dist');
app.use(express.static(clientBuildPath));

// Fallback for non-API routes (SPA routing in production)
app.use((req: Request, res: Response) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, error: 'API route not found' });
  }
  const indexPath = path.join(clientBuildPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send('AR Hospital API Server is running. Client dev server is at http://localhost:5173');
    }
  });
});

// Centralized error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    error: 'An unexpected server error occurred. Please try again later.'
  });
});

// Initialize database and start listening
async function startServer() {
  try {
    await getDatabase();
    app.listen(PORT, () => {
      console.log(`
==============================================================
🏥 AR HOSPITAL BACKEND SERVER RUNNING
🌐 Server URL: http://localhost:${PORT}
⚡ Health Check: http://localhost:${PORT}/api/health
🗄️ Database: SQLite (Persistent File: data/ar_hospital.sqlite)
==============================================================
      `);
    });
  } catch (error) {
    console.error('Failed to initialize AR Hospital server database:', error);
    process.exit(1);
  }
}

startServer();
