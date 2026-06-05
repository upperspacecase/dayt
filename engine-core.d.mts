import { type Concept } from "./app/dates";

export type Inspiration = { name: string; url: string; credit?: string; text: string };

export const SYSTEM: string;
export const TOOL: Record<string, unknown>;

export function generateConcepts(item: Inspiration, apiKey: string, count?: number): Promise<Concept[]>;
export function toDraft(concept: Concept, item: Inspiration, suffix: number): Concept & { createdAt: Date };
