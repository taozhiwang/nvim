; Replaces nvim-treesitter's markdown_inline injections, minus the LaTeX one.
; Upstream treats any text between two `$` as math, so "$12 lunch, $30 dinner" turned
; blue and lost spell check. The Obsidian app shows that as plain text, and notes use
; `$` for money far more than for math, so `$` is never math here and needs no `\$`.

((html_tag) @injection.content
  (#set! injection.language "html")
  (#set! injection.combined))
