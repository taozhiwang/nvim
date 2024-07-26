return {
  "folke/tokyonight.nvim",
  lazy = true,
  opts = { style = "moon" },

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
  }),
}
