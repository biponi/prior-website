/**
 * Inline FAQ section for the category page.
 *
 * Renders AI-generated FAQ items (extracted from the category description's
 * <details> blocks) as native collapsible elements — no JS needed; the
 * .tiptap-content styles in globals.css handle the collapse behavior and
 * styling. Server-rendered so crawlers see the Q&A content.
 */
import { sanitizeLite } from '@/lib/seo'
import type { FaqItem } from '@/lib/faq'

interface CategoryFaqProps {
  items: FaqItem[]
}

export default function CategoryFaq({ items }: CategoryFaqProps) {
  if (!items.length) return null

  return (
    <section className="px-4 md:container pb-6" aria-label="Frequently asked questions">
      <h2 className="text-lg font-semibold mb-3">Frequently Asked Questions</h2>
      <div className="tiptap-content">
        {items.map((item, i) => (
          <details
            key={i}
            open={i === 0}
            dangerouslySetInnerHTML={{
              __html: sanitizeLite(
                `<summary>${item.question}</summary><div>${item.answerHtml}</div>`
              ),
            }}
          />
        ))}
      </div>
    </section>
  )
}
