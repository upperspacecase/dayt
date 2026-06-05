import { MongoClient, type Collection } from "mongodb";
import { type Concept } from "./dates";

// Cached connection (survives hot reloads in dev, reused across serverless invocations).
let clientPromise: Promise<MongoClient> | null = null;

function client(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  const g = globalThis as unknown as { _dkMongo?: Promise<MongoClient> };
  if (!g._dkMongo) g._dkMongo = new MongoClient(uri).connect();
  clientPromise = g._dkMongo;
  return clientPromise;
}

export type StoredConcept = Concept & { createdAt?: Date };

export async function conceptsCol(): Promise<Collection<StoredConcept>> {
  const c = await client();
  return c.db(process.env.MONGODB_DB || "daytknight").collection<StoredConcept>("concepts");
}

// Stored creator/editorial inspiration the nightly engine cron generates from.
export async function inspirationCol(): Promise<Collection<{ name: string; url: string; credit: string; text: string }>> {
  const c = await client();
  return c.db(process.env.MONGODB_DB || "daytknight").collection("inspiration");
}

// Drop Mongo's _id so the client gets a clean Concept.
export function clean(doc: Record<string, unknown> | null): Concept | null {
  if (!doc) return null;
  const { _id, createdAt, ...rest } = doc as Record<string, unknown>;
  void _id;
  void createdAt;
  return rest as unknown as Concept;
}
