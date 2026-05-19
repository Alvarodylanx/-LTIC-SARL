const MYMEMORY = 'https://api.mymemory.translated.net/get';

export async function translateText(
  text: string,
  from: 'en' | 'fr',
  to: 'en' | 'fr',
): Promise<string> {
  if (!text?.trim() || from === to) return text;
  try {
    const res = await fetch(
      `${MYMEMORY}?q=${encodeURIComponent(text)}&langpair=${from}|${to}`,
    );
    const data = await res.json();
    const translated: string = data?.responseData?.translatedText;
    if (translated && data?.responseStatus === 200) return translated;
    return text;
  } catch {
    return text;
  }
}

export async function translateFields<T extends Record<string, string>>(
  fields: T,
  from: 'en' | 'fr',
  to: 'en' | 'fr',
): Promise<T> {
  const entries = await Promise.all(
    Object.entries(fields).map(async ([k, v]) => [k, await translateText(v as string, from, to)]),
  );
  return Object.fromEntries(entries) as T;
}
