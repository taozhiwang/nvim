return {
  "folke/tokyonight.nvim",
  lazy = true,
  opts = {
    transparent = true,
    style = "moon", -- TODO

    styles = {
      sidebars = "transparent",
      floats = "transparent",
    },
    on_colors = function(colors)
      colors.suggestion = colors.pink
      colors.selected = colors.pink
    end,
    on_highlights = function(highlights)
      highlights.suggestion = { fg = highlights.pink }
    end,
  },

  require("tokyonight").setup({
    -- use the night style
    style = "moon",
    -- disable italic for functions
    styles = {
      functions = {},
    },
    -- Change the "hint" color to the "orange" color, and make the "error" color bright red
    on_colors = function(colors)
      colors.suggestion = colors.pink
      colors.selected = colors.pink
    end,
    on_highlights = function(highlights)
      highlights.suggestion = { fg = highlights.pink }
    end,
  }),
}
