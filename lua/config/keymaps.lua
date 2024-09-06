-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua
-- Add any additional keymaps here

-- exit insert mode with jj
vim.keymap.set("i", "jj", "<ESC>", { noremap = true, silent = true, desc = "<ESC>" })

-- use <C-`> to open toggle terminal
vim.keymap.set({ "n" }, "<C-`>", "<cmd>ToggleTerm<cr>", { desc = "Open terminal" })

-- use <C-`> to exit toggle terminal when in terminal mode
vim.keymap.set({ "t" }, "<C-`>", "<C-\\><C-n>", { desc = "Exit terminal" })

-- Use <C-a> to select all in all modes
vim.keymap.set({ "n", "v", "i", "x" }, "<C-a>", "<cmd>normal! ggVG<cr>", { desc = "Select all" })

-- Press s and s to save in all modes
-- vim.keymap.set({ "n", "v", "i", "x" }, "ss", "<cmd>write<cr>", { desc = "Save" })
