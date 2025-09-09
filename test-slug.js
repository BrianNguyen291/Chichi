// Test script to verify slug sanitization
function sanitizeSlug(slug) {
  // Remove invisible characters and zero-width spaces, including specific problematic chars
  return slug
    .replace(/[\u200B-\u200D\uFEFF\u2060\u200E\u200F\u202A-\u202E\u2069]/g, '') // Remove invisible characters including ⁩
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
}

const problematicSlug = "越南語言真相解密⁩｜法語？英語？其實我們最愛說";
const sanitizedSlug = sanitizeSlug(problematicSlug);

console.log("Original slug:", problematicSlug);
console.log("Sanitized slug:", sanitizedSlug);
console.log("Are they different?", problematicSlug !== sanitizedSlug);
console.log("Invisible character removed?", problematicSlug.includes('⁩'));
