import app from '../index.js';

export default async (req, res) => {
  try {
    console.log('Incoming request:', req.method, req.url);
    await app(req, res);
  } catch (error) {
    console.error('Error in Vercel handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};