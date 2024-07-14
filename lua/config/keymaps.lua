-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua
-- Add any additional keymaps here

-- exit insert mode with jj
vim.keymap.set("i", "jj", "<ESC>", { noremap = true, silent = true, desc = "<ESC>" })

-- use <C-S-s> to save file
vim.keymap.set({ "i", "x", "n", "s" }, "<C-S-s>", "<cmd>w<cr><esc>", { desc = "Save file" })
