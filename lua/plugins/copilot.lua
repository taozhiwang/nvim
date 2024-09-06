return {
  {
  "nvim-cmp",
  opts = function(_, opts)
    -- local cmp = require("cmp")
    opts.sources = vim.tbl_filter(function(v)
      return not vim.tbl_contains({ "copilot" }, v.name)
    end, opts.sources)
  end,
  },

  {
    "zbirenbaum/copilot.lua",
    cmd = "Copilot",
    build = ":Copilot auth",
    opts = {
      suggestion = {
        enabled = true,
        auto_trigger = true,
        keymap = {
          accept = "<Tab>",
          prev = "<D-[>",
          next = "<D-]>",
          dismiss = "<C-e>",
        },
      },
      panel = {
        auto_refresh = false,
        enabled = true,
      },
      filetypes = {
        markdown = true,
        help = true,
        gitcommit = true,
      },
    },
  }
}
