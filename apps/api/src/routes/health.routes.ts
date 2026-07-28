import { Router } from 'express';
import prisma from '@licarl/database';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      success: true,
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0',
      },
    });
  } catch {
    res.status(503).json({
      success: false,
      error: { code: 'UNHEALTHY', message: 'Database connection failed' },
    });
  }
});

export default router;
