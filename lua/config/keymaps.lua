-- Keymaps are automatically loaded on the VeryLazy event
-- Default keymaps that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/keymaps.lua
-- Add any additional keymaps here
local map = vim.keymap.set

-- System clipboard (explicit, works even if 'clipboard' changes)
map({ "n", "x" }, "<leader>y", '"+y', { desc = "Yank to System Clipboard" })
map("n", "<leader>Y", '"+y$', { desc = "Yank to EOL to System Clipboard" })
map("n", "<leader>p", '"+p', { desc = "Paste from System Clipboard" })
-- Visual P replaces the selection without overwriting the register
map("x", "<leader>p", '"+P', { desc = "Paste from System Clipboard" })

if vim.g.vscode then
  require("vs.vscode_keymaps")
  return
end

-- exit insert mode with jk or kj (same as Cursor's compositeKeys)
map("i", "jk", "<Esc>", { desc = "Exit Insert Mode" })
map("i", "kj", "<Esc>", { desc = "Exit Insert Mode" })

-- <C-`> toggles a terminal; inside it, <C-`> goes back to normal mode
map("n", "<C-`>", function()
  Snacks.terminal()
end, { desc = "Terminal" })
map("t", "<C-`>", "<C-\\><C-n>", { desc = "Exit Terminal Mode" })

-- Select all
map({ "n", "x", "i" }, "<C-a>", "<Esc>ggVG", { desc = "Select All" })

-- Save is LazyVim's <C-s>. The old `<Esc>fs` map made every <Esc> wait 'timeoutlen'.

-- <leader>f finds files directly (lua/plugins/editor.lua), so drop LazyVim's remaining <leader>f… maps.
-- New file is :enew; terminals are <C-/> and <C-`>.
for _, lhs in ipairs({ "<leader>fn", "<leader>ft", "<leader>fT" }) do
  pcall(vim.keymap.del, "n", lhs)
end

-- Auto completion is off by default (vim.g.completion in options.lua)
Snacks.toggle({
  name = "Auto Completion",
  get = function()
    return vim.g.completion == true
  end,
  set = function(state)
    vim.g.completion = state
  end,
}):map("<leader>uk")
