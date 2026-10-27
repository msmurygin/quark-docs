export type PublicationStats = {sections: number; blocks: number; inlineEvidence: number; tableColumns: number};
export function hasInternalEvidence(value: unknown): boolean;
export function sanitizePublicGuideTree(tree: Record<string, unknown>): PublicationStats;
export function sanitizePublicMarkdownSource(value: unknown): string;
export function sanitizePublicText(value: unknown): string;
export function sanitizePublicObject<T>(value: T): T;
export const PUBLIC_FORBIDDEN_PATTERNS: RegExp[];
