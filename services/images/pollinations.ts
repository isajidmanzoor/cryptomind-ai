export function createPollinationsImageUrl(prompt: string) {
  const encodedPrompt = encodeURIComponent(
    `${prompt}, premium crypto editorial cover, cinematic market dashboard, sharp, modern`
  );

  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=630&nologo=true`;
}
