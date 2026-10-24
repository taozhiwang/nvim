-- Tokyonight Moon on a transparent background, matching the Ghostty palette
return {
  {
    "folke/tokyonight.nvim",
    opts = {
      style = "moon",
      transparent = true,
      styles = {
        sidebars = "transparent",
        floats = "transparent",
      },
      on_highlights = function(hl, c)
        -- Markdown emphasis in the pink of the Obsidian "Things" theme (--strong-color / --em-color)
        local pink = "#ff82b2"
        hl["@markup.strong"] = { fg = pink, bold = true }
        hl["@markup.italic"] = { fg = pink, italic = true }
        -- Code blocks without a language: plain text instead of all-green (labelled blocks keep
        -- their language highlighting on top)
        hl["@markup.raw.block.markdown"] = { fg = c.fg }
      end,
    },
  },
  {
    "LazyVim/LazyVim",
    opts = { colorscheme = "tokyonight" },
  },
}
