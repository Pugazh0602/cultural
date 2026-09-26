import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDatabase, getProducts, createProduct, deleteProduct, getDbStatus } from './src/server/db';
import { askGroqAI } from './src/server/groq';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize MongoDB
initDatabase().catch(() => {});


// API Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    database: getDbStatus(),
    groqConfigured: Boolean(process.env.GROQ_API_KEY),
  });
});

// Get all items/products from MongoDB
app.get('/api/items', async (req: Request, res: Response) => {
  try {
    const items = await getProducts();
    res.json({ success: true, count: items.length, items });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch items' });
  }
});

// Store new item in MongoDB
app.post('/api/items', async (req: Request, res: Response) => {
  try {
    const itemData = req.body;
    if (!itemData.title || typeof itemData.price !== 'number') {
      return res.status(400).json({ success: false, error: 'Title and numeric price are required.' });
    }
    const created = await createProduct(itemData);
    res.status(201).json({ success: true, item: created });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ success: false, error: 'Failed to create item' });
  }
});

// Delete item
app.delete('/api/items/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deleteProduct(id);
    res.json({ success: deleted });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ success: false, error: 'Failed to delete item' });
  }
});

// Groq API AI Chatbot for sports and events
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ success: false, error: 'Messages array is required' });
    }
    const reply = await askGroqAI(messages);
    res.json({ success: true, reply });
  } catch (error) {
    console.error('Error in Groq chat:', error);
    res.status(500).json({ success: false, error: 'Failed to generate response' });
  }
});

// Serve frontend in Dev vs Production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('[Server] Vite middleware mounted for development.');
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Quantum² backend running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
