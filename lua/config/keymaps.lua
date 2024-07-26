-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua
-- Add any additional keymaps here

-- exit insert mode with jj
vim.keymap.set("i", "jj", "<ESC>", { noremap = true, silent = true, desc = "<ESC>" })

-- use <D-s> to save file
vim.keymap.set({ "i", "x", "n", "s" }, "<D-s>", "<cmd>w<cr><esc>", { desc = "Save file" })

-- use <C-z> to undo
vim.keymap.set({ "i" }, "<C-z>", "<cmd>undo<cr>", { desc = "Undo" })

-- use <C-S-z> to redo
vim.keymap.set({ "i" }, "<C-S-z>", "<cmd>redo<cr>", { desc = "Redo" })

-- use <C-`> to open toggle terminal
vim.keymap.set({ "n" }, "<C-`>", "<cmd>ToggleTerm<cr>", { desc = "Open terminal" })

-- use <C-`> to exit toggle terminal when in terminal mode
vim.keymap.set({ "t" }, "<C-`>", "<C-\\><C-n>", { desc = "Exit terminal" })

-- Use command + v to paste in all modes
vim.keymap.set({ "n", "v", "i", "x" }, "<D-v>", '"+p', { desc = "Paste" })

-- Use command + a to select all in all modes
vim.keymap.set({ "n", "v", "i", "x" }, "<C-a>", "<cmd>normal! ggVG<cr>", { desc = "Select all" })
