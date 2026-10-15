return {
  -- No completion popups or snippets: code is written by AI tools, prose is typed by hand.
  -- Native <C-n>/<C-p> and <C-x><C-o> (LSP omnifunc) still work on demand.
  { "saghen/blink.cmp", enabled = false },
  { "rafamadriz/friendly-snippets", enabled = false },

  -- Extra parsers for reading code in languages without a LazyVim lang extra enabled
  {
    "nvim-treesitter/nvim-treesitter",
    opts = { ensure_installed = { "cpp", "css", "go", "java", "rust", "sql" } },
  },

  -- <leader>p is the system-clipboard paste (config/keymaps.lua); yank history moves to <leader>sy
  {
    "gbprod/yanky.nvim",
    keys = {
      { "<leader>p", false, mode = { "n", "x" } },
      {
        "<leader>sy",
        function()
          Snacks.picker.yanky()
        end,
        mode = { "n", "x" },
        desc = "Yank History",
      },
    },
  },
}
