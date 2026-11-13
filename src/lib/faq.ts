/**
 * FAQ extraction utilities for rich-text (TipTap) descriptions.
 *
 * Category AI descriptions end with an FAQ block of <details> elements:
 *   <details><summary>Question?</summary><div data-type="detailsContent">
 *     <p>Answer.</p>
 *   </div></details>
 *
 * Pure regex — no DOMParser — so these run identically in server components
 * (page.tsx, JSON-LD) and client components.
 */

export interface FaqItem {
  question: string
  answerHtml: string
  answerText: string
}

// Global matcher reused by both functions (reset via String.match, which
// ignores lastIndex, so no state leaks between calls)
const FAQ_BLOCK_REGEX = /<details[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/gi

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

/** Extract FAQ Q&A items from an HTML description. */
export function extractFaqItems(html: string): FaqItem[] {
  if (!html) return []
  const items: FaqItem[] = []
  const regex = new RegExp(FAQ_BLOCK_REGEX.source, 'gi')
  let match: RegExpExecArray | null
  while ((match = regex.exec(html)) !== null) {
    const question = decodeEntities(match[1].replace(/<[^>]*>/g, '').trim())
    if (!question) continue
    const answerHtml = match[2].trim()
    const answerText = decodeEntities(answerHtml.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim())
    items.push({ question, answerHtml, answerText })
  }
  return items
}

/** Remove all FAQ <details> blocks from an HTML description. */
export function stripFaqBlocks(html: string): string {
  if (!html) return html
  return html.replace(FAQ_BLOCK_REGEX, '').trim()
}
