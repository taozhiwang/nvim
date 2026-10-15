-- Options are automatically loaded before lazy.nvim startup
-- Default options that are always set: https://github.com/LazyVim/LazyVim/blob/main/lua/lazyvim/config/options.lua
-- Add any additional options here
local opt = vim.opt

vim.g.lazyvim_python_lsp = "pyright"
vim.g.lazyvim_picker = "snacks"
vim.g.lazyvim_explorer = "snacks"

-- Never reformat on save: protects Obsidian notes from prettier/markdownlint rewrites.
-- Format manually with <leader>cf when needed.
vim.g.autoformat = false

if vim.g.vscode then
  -- <Space> opens VSCode's which-key (see lua/vs/vscode_keymaps.lua). Moving Neovim's leader off <Space>
  -- leaves no longer mapping starting with <Space>, so it fires immediately instead of waiting 'timeoutlen'.
  vim.g.mapleader = "`"
end

-- Clipboard: the unnamed register always syncs with the system clipboard
opt.clipboard = "unnamedplus"
if vim.g.vscode then
  vim.g.clipboard = vim.g.vscode_clipboard
elseif vim.env.SSH_TTY or vim.env.SSH_CONNECTION then
  -- Over SSH, copy through the terminal with OSC 52. Paste returns the last yank made in this Neovim,
  -- because many terminals don't answer OSC 52 reads and Neovim would block for up to 10s.
  -- (Reading getreg('"') here doesn't work: with unnamedplus it is the + register itself.)
  -- Use the terminal's paste (Cmd-V) for text copied outside Neovim.
  local osc52 = require("vim.ui.clipboard.osc52")
  local last = { { "" }, "v" }
  local function copy(reg)
    local send = osc52.copy(reg)
    return function(lines, regtype)
      last = { lines, regtype }
      send(lines, regtype)
    end
  end
  local function paste()
    return last
  end
  vim.g.clipboard = {
    name = "OSC 52",
    copy = { ["+"] = copy("+"), ["*"] = copy("*") },
    paste = { ["+"] = paste, ["*"] = paste },
  }
elseif vim.fn.has("mac") == 1 then
  vim.g.clipboard = "pbcopy"
end

-- Reading-friendly layout
opt.wrap = true
opt.breakindent = true -- wrapped lines keep their indent
opt.breakindentopt = { "list:-1" } -- and align under list item text in markdown

-- Spell check English but never flag CJK characters (most notes are in Chinese)
opt.spelllang = { "en", "cjk" }

-- Diagnostics are off by default; toggle with <leader>ud
vim.diagnostic.enable(false)
