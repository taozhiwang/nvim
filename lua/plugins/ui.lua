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
      -- <leader>uz (zen) doubles as reading mode: a centered column without line numbers or dimming.
      -- Notes get a book-like width (about 40 Chinese characters per line); code keeps 120.
      zen = {
        toggles = { dim = false, git_signs = false, mini_diff_signs = false },
        win = {
          width = function()
            return vim.bo.filetype == "markdown" and 90 or 120
          end,
          wo = { number = false, relativenumber = false, signcolumn = "no", statuscolumn = "" },
        },
      },
    },
  },

  -- Always show the open file(s) at the top, even with a single buffer
  {
    "akinsho/bufferline.nvim",
    opts = { options = { always_show_bufferline = true } },
  },

  -- Borders around hover docs and signature help
  {
    "folke/noice.nvim",
    opts = { presets = { lsp_doc_border = true } },
  },

  -- Scrollbar with marks for git changes and diagnostics: shows where in a long file the AI edited
  {
    "petertriho/nvim-scrollbar",
    event = "LazyFile",
    opts = {
      hide_if_all_visible = true,
      excluded_filetypes = {
        "neo-tree",
        "snacks_dashboard",
        "snacks_picker_input",
        "snacks_picker_list",
        "lazy",
        "mason",
        "noice",
        "prompt",
      },
      handlers = { gitsigns = true },
    },
  },

  -- Color matching brackets by nesting depth (it lazy-loads itself; the README says not to lazy-load it)
  { "HiPhish/rainbow-delimiters.nvim" },
}
