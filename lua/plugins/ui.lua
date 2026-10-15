-- The original alpha logo, character for character (common indent removed)
local logo_lines = {
  "██╗   ██╗██╗███╗   ███╗",
  "██║   ██║██║████╗ ████║      Z    ",
  "██║   ██║██║██╔████╔██║   z       ",
  "╚██╗ ██╔╝██║██║╚██╔╝██║ z         ",
  " ╚████╔╝ ██║██║ ╚═╝ ██║",
  "  ╚═══╝  ╚═╝╚═╝     ╚═╝",
  "           [ taozhiwang ]",
}
-- snacks centers every header line on its own (alpha centered the block), so pad all lines
-- to the same display width to keep the art aligned
local width = 0
for _, line in ipairs(logo_lines) do
  width = math.max(width, vim.api.nvim_strwidth(line))
end
for i, line in ipairs(logo_lines) do
  logo_lines[i] = line .. string.rep(" ", width - vim.api.nvim_strwidth(line))
end

return {
  {
    "folke/snacks.nvim",
    opts = {
      dashboard = { preset = { header = table.concat(logo_lines, "\n") } },
      -- Inline images in markdown (Ghostty speaks the kitty graphics protocol; not available inside zellij)
      image = { enabled = true },
    },
  },
}
