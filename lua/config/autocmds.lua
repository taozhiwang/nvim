-- Autocmds are automatically loaded on the VeryLazy event
-- Default autocmds that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/autocmds.lua
-- Add any additional autocmds here

-- Notes read as prose: no indent guides (they also cut through code blocks) and no trailing-space markers
vim.api.nvim_create_autocmd("FileType", {
  group = vim.api.nvim_create_augroup("user_markdown", { clear = true }),
  pattern = "markdown",
  callback = function(ev)
    vim.b[ev.buf].snacks_indent = false
    vim.opt_local.list = false
  end,
})
