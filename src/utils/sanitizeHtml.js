const ALLOWED_TAGS = new Set(['P', 'BR', 'B', 'STRONG', 'I', 'EM', 'U', 'H2', 'H3', 'UL', 'OL', 'LI', 'A', 'IMG', 'BLOCKQUOTE'])

// Allowlist-based sanitizer for admin-authored article HTML (contenteditable output).
// Only the single trusted admin can reach this — still worth stripping anything
// outside the allowlist before it's stored and later rendered via v-html.
export function sanitizeArticleHtml(value) {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = value

  wrapper.querySelectorAll('*').forEach((node) => {
    if (!ALLOWED_TAGS.has(node.tagName)) {
      node.replaceWith(document.createTextNode(node.textContent ?? ''))
      return
    }

    ;[...node.attributes].forEach((attr) => {
      if (node.tagName === 'A' && attr.name === 'href') {
        const href = attr.value.trim()
        if (href.startsWith('https://') || href.startsWith('http://') || href.startsWith('/')) return
      }
      if (node.tagName === 'IMG' && ['src', 'alt'].includes(attr.name)) {
        if (attr.name === 'alt') return
        const src = attr.value.trim()
        if (src.startsWith('https://') || src.startsWith('http://') || src.startsWith('/uploads/') || src.startsWith('/images/')) return
      }
      node.removeAttribute(attr.name)
    })

    if (node.tagName === 'A') {
      node.setAttribute('target', '_blank')
      node.setAttribute('rel', 'noopener noreferrer')
    }
    if (node.tagName === 'IMG') {
      node.setAttribute('loading', 'lazy')
    }
  })

  return wrapper.innerHTML.trim()
}
