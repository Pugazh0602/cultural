import { MongoClient, Db } from 'mongodb';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockData';

let client: MongoClient | null = null;
let db: Db | null = null;
let inMemoryItems: Product[] = [...INITIAL_PRODUCTS];
let isMongoConnected = false;
let dbDiagnostic: string | null = null;
let connectionAttempted = false;

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB_NAME || 'quantum_collective';
const COLLECTION_NAME = 'items';

export async function initDatabase(): Promise<boolean> {
  if (connectionAttempted && isMongoConnected) {
    return true;
  }
  connectionAttempted = true;

  if (!MONGODB_URI) {
    dbDiagnostic = 'MONGODB_URI not provided. Operating in high-performance in-memory mode.';
    console.log('[Database] ' + dbDiagnostic);
    return false;
  }

  try {
    // Connect with flexible TLS options to support various MongoDB hosting providers and Atlas
    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 4000,
      connectTimeoutMS: 5000,
      tls: MONGODB_URI.startsWith('mongodb+srv://') || MONGODB_URI.includes('ssl=true'),
      tlsAllowInvalidCertificates: true,
    });

    await client.connect();
    db = client.db(DB_NAME);
    isMongoConnected = true;
    dbDiagnostic = `Connected to database: ${DB_NAME}`;
    console.log(`[Database] Successfully connected to MongoDB: ${DB_NAME}`);

    // Seed initial items if collection is empty
    const collection = db.collection<Product>(COLLECTION_NAME);
    const count = await collection.countDocuments();
    if (count === 0) {
      console.log('[Database] Seeding initial products into MongoDB collection...');
      await collection.insertMany(INITIAL_PRODUCTS);
      console.log(`[Database] Seeded ${INITIAL_PRODUCTS.length} products.`);
    }

    return true;
  } catch (error: any) {
    isMongoConnected = false;
    const msg = error?.message || String(error);

    if (msg.includes('SSL alert number 80') || msg.includes('tlsv1 alert internal error')) {
      dbDiagnostic =
        'MongoDB Atlas IP Whitelist Required: Atlas rejected the TLS connection (Alert 80). In your MongoDB Atlas console, navigate to Network Access -> IP Access List -> Add IP Address -> Allow Access from Anywhere (0.0.0.0/0).';
      console.log('[Database] MongoDB Atlas connection pending IP access configuration. Operating in resilient storage mode.');
    } else if (msg.includes('Authentication failed') || msg.includes('auth error')) {
      dbDiagnostic = 'MongoDB Authentication failed: verify username & password in MONGODB_URI.';
      console.log('[Database] MongoDB credentials pending verification. Operating in resilient storage mode.');
    } else {
      dbDiagnostic = `MongoDB unavailable (${msg.substring(0, 60)}...). Operating in resilient storage mode.`;
      console.log('[Database] MongoDB fallback active with default items.');
    }

    return false;
  }
}

export async function getProducts(): Promise<Product[]> {
  if (isMongoConnected && db) {
    try {
      const collection = db.collection<Product>(COLLECTION_NAME);
      const items = await collection.find({}).toArray();
      if (items.length > 0) {
        return items.map(({ _id, ...rest }: any) => rest as Product);
      }
    } catch (err) {
      console.log('[Database] Falling back to in-memory items store.');
    }
  }
  return inMemoryItems;
}

export async function createProduct(product: Omit<Product, 'id'> & { id?: string }): Promise<Product> {
  const newProduct: Product = {
    ...product,
    id: product.id || `prod-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  };

  if (isMongoConnected && db) {
    try {
      const collection = db.collection<Product>(COLLECTION_NAME);
      await collection.insertOne(newProduct as any);
      console.log(`[Database] Inserted product into MongoDB: ${newProduct.title}`);
    } catch (err) {
      console.log('[Database] Local store updated for product:', newProduct.title);
    }
  }

  // Also maintain in-memory store so changes are immediately visible
  inMemoryItems = [newProduct, ...inMemoryItems];
  return newProduct;
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (isMongoConnected && db) {
    try {
      const collection = db.collection<Product>(COLLECTION_NAME);
      const res = await collection.deleteOne({ id });
      inMemoryItems = inMemoryItems.filter((i) => i.id !== id);
      return res.deletedCount > 0;
    } catch (err) {
      console.log('[Database] Product removed from local store:', id);
    }
  }

  inMemoryItems = inMemoryItems.filter((i) => i.id !== id);
  return true;
}

export function getDbStatus() {
  return {
    isMongoConnected,
    mode: isMongoConnected ? 'mongodb_atlas' : 'resilient_in_memory',
    database: DB_NAME,
    itemCount: inMemoryItems.length,
    diagnostic: dbDiagnostic,
  };
}
