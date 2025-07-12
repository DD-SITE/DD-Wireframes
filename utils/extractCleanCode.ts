export function extractCleanCode(raw: string): string {
  const codeBlockMatch = raw.match(/```(?:jsx|js)?\n([\s\S]*?)```/i);
  if (codeBlockMatch) return codeBlockMatch[1].trim();

  // Fallback: remove leading explanations and just return all lines after first one
  const lines = raw.trim().split('\n');
  return lines.slice(1).join('\n').trim();
}

