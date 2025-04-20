-- lua/extras/vscode.lua
if not vim.g.vscode then
  return {}
end

local enabled = {
  "alpha-nvim",
  "bufferline.nvim",
  "flash.nvim",
  "lazy.nvim",
  "LazyVim",
  "lualine.nvim",
  "mini.ai",
  "mini.animate",
  "mini.comment",
  "mini.icons",
  "mini.pairs",
  "noice.nvim",
  "nui.nvim",
  "nvim-treesitter-textobjects",
  "toggleterm.nvim",
  "tokyonight.nvim",
  "trouble.nvim",
  "ts-comments.nvim",
  "which-key.nvim",
  "yanky.nvim",
}

local Config = require("lazy.core.config")
Config.options.checker.enabled = false
Config.options.change_detection.enabled = false
Config.options.defaults.cond = function(plugin)
  local is_enabled = vim.tbl_contains(enabled, plugin.name) or plugin.vscode
  print("Checking plugin:", plugin.name, "Enabled:", is_enabled)
  return is_enabled
end

-- Add some vscode specific keymaps
vim.api.nvim_create_autocmd("User", {
  pattern = "LazyVimKeymapsDefaults",
  callback = function()
    -- vim.keymap.set("n", "<leader><space>", "<cmd>Find<cr>")
    -- vim.keymap.set("n", "<leader>/", [[<cmd>lua require('vscode').action('workbench.action.findInFiles')<cr>]])
    -- vim.keymap.set("n", "<leader>ss", [[<cmd>lua require('vscode').action('workbench.action.gotoSymbol')<cr>]])
  end,
})

-- function LazyVim.terminal()
--   require("vscode").action("workbench.action.terminal.toggleTerminal")
-- end

return {
  {
    "LazyVim/LazyVim",
    config = function(_, opts)
      opts = opts or {}
      -- disable the colorscheme
      opts.colorscheme = function() end
      require("lazy").setup(opts)
    end,
  },
  {
    "nvim-treesitter/nvim-treesitter",
    opts = { highlight = { enable = false } },
  },
}