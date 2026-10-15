local vscode = require("vscode")

local function action(cmd)
  return function()
    vscode.action(cmd)
  end
end

-- <Space> shows VSCode's which-key. The leader is moved off <Space> in options.lua, so nothing else starts
-- with <Space> and this fires immediately.
vim.keymap.set({ "n", "x" }, "<Space>", action("whichkey.show"), { nowait = true, desc = "Show WhichKey" })

-- use u for vscode undo, C-r for vscode redo
vim.keymap.set("n", "u", action("undo"), { desc = "Undo" })
vim.keymap.set("n", "<C-r>", action("redo"), { desc = "Redo" })

vim.keymap.set({ "n", "x" }, "<S-h>", action("workbench.action.navigateLeft"), { desc = "Focus Left" })
vim.keymap.set({ "n", "x" }, "<S-j>", action("workbench.action.navigateDown"), { desc = "Focus Down" })

vim.keymap.set("n", "<C-o>", action("workbench.action.navigateBack"), { desc = "Go Back" })
vim.keymap.set("n", "<C-i>", action("workbench.action.navigateForward"), { desc = "Go Forward" })
