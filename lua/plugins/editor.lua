return {
  -- Completion (blink.cmp, LazyVim's default) is off until <leader>uk turns it on (see config/keymaps.lua).
  -- Snippets stay off: code is written by AI tools, prose is typed by hand.
  {
    "saghen/blink.cmp",
    opts = {
      enabled = function()
        return vim.g.completion == true and vim.b.completion ~= false and vim.bo.buftype ~= "prompt"
      end,
      -- `:` command completion stays, but its menu opens only on <Tab>
      cmdline = { completion = { menu = { auto_show = false } } },
    },
  },
  { "rafamadriz/friendly-snippets", enabled = false },

  -- Extra parsers for reading code in languages without a LazyVim lang extra enabled
  {
    "nvim-treesitter/nvim-treesitter",
    opts = { ensure_installed = { "cpp", "css", "go", "java", "rust", "sql" } },
  },

  -- Short keys for the most used pickers: <leader>f files, <leader>r recent, <leader>/ grep (LazyVim's).
  -- The <leader>f… group is dropped so <leader>f fires at once.
  {
    "folke/snacks.nvim",
    keys = {
      { "<leader>ff", false },
      { "<leader>fF", false },
      { "<leader>fr", false },
      { "<leader>fR", false },
      { "<leader>fb", false },
      { "<leader>fB", false },
      { "<leader>fc", false },
      { "<leader>fg", false },
      { "<leader>fp", false },
      { "<leader>f", LazyVim.pick("files"), desc = "Find Files (Root Dir)" },
      { "<leader>F", LazyVim.pick("files", { root = false }), desc = "Find Files (cwd)" },
      { "<leader>r", LazyVim.pick("oldfiles"), desc = "Recent Files" },
      {
        "<leader>R",
        function()
          Snacks.picker.recent({ filter = { cwd = true } })
        end,
        desc = "Recent Files (cwd)",
      },
    },
    opts = {
      -- File name first, directory dimmed after it: easier to scan grep and file results
      picker = { formatters = { file = { filename_first = true } } },
    },
  },

  -- Explorer: neo-tree (LazyVim extra) with Files / Git / Symbols tabs at the top; switch with < and >
  {
    "nvim-neo-tree/neo-tree.nvim",
    keys = {
      { "<leader>fe", false },
      { "<leader>fE", false },
      {
        "<leader>e",
        function()
          require("neo-tree.command").execute({ toggle = true, dir = LazyVim.root() })
        end,
        desc = "Explorer NeoTree (Root Dir)",
      },
      {
        "<leader>E",
        function()
          require("neo-tree.command").execute({ toggle = true, dir = vim.uv.cwd() })
        end,
        desc = "Explorer NeoTree (cwd)",
      },
    },
    opts = {
      sources = { "filesystem", "buffers", "git_status", "document_symbols" },
      source_selector = {
        winbar = true,
        sources = {
          { source = "filesystem" },
          { source = "git_status" },
          { source = "document_symbols" },
        },
      },
      filesystem = {
        -- Show hidden and git-ignored files (e.g. .env) dimmed instead of hiding them, like VSCode
        filtered_items = {
          visible = true,
          never_show = { ".DS_Store", ".git" },
        },
      },
    },
  },

  -- Git blame for the current line at the end of the line ("You, 3 days ago • message");
  -- toggle with <leader>uB
  {
    "lewis6991/gitsigns.nvim",
    opts = {
      current_line_blame = true,
      current_line_blame_opts = { delay = 500 },
    },
    keys = {
      { "<leader>uB", "<cmd>Gitsigns toggle_current_line_blame<cr>", desc = "Toggle Git Blame Line" },
    },
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
