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

-- Reload files that AI tools change while they are open. LazyVim already checks on focus;
-- this also checks when entering a buffer and after the cursor rests ('updatetime').
vim.api.nvim_create_autocmd({ "BufEnter", "CursorHold" }, {
  group = vim.api.nvim_create_augroup("user_checktime", { clear = true }),
  callback = function()
    if vim.o.buftype == "" and vim.fn.mode() ~= "c" then
      vim.cmd("checktime")
    end
  end,
})
