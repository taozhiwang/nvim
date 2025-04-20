-- bootstrap lazy.nvim, LazyVim and your plugins

if vim.g.vscode then
  -- VSCode extension
  require("config.lazy-vscode")
  require("extras.vscode")
  vim.cmd[[source $HOME/.config/nvim/lua/vs/settings.vim]]
else
  require("config.lazy")
end
