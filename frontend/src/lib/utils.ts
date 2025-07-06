export function extractAlias(input: string): string | null {
  try {
    const url = new URL(input);
    const parts = url.pathname.split('/').filter(Boolean);
    return parts.length > 0 ? parts[parts.length - 1] : null;
  } catch {
    return input.trim() || null;
  }
}