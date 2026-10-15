-- Markdown writing and the Obsidian vault
local vault = vim.fn.expand(vim.env.OBSIDIAN_VAULT or "~/Documents/Obsidian_taozhiwa")

-- Daily notes reuse the Obsidian app's Templater template. Expand its date calls,
-- e.g. <% tp.date.now("YYYY-MM-DD HH:mm:ss") %>, when such a note is created from Neovim.
local function expand_templater_dates(buf)
  local name = vim.api.nvim_buf_get_name(buf)
  if name:find("/Templates/", 1, true) then
    return
  end
  local lines = vim.api.nvim_buf_get_lines(buf, 0, -1, false)
  local changed = false
  for i, line in ipairs(lines) do
    local new = line:gsub('<%%%s*tp%.date%.now%(%s*"([^"]*)"%s*%)%s*%%>', function(fmt)
      return require("obsidian.date").format(os.time(), fmt)
    end)
    if new ~= line then
      lines[i], changed = new, true
    end
  end
  if changed then
    vim.api.nvim_buf_set_lines(buf, 0, -1, false, lines)
    vim.api.nvim_buf_call(buf, function()
      vim.cmd("silent noautocmd write")
    end)
  end
end

return {
  -- Obsidian: follow [[links]], backlinks, daily notes, tags, rename with link updates
  {
    "obsidian-nvim/obsidian.nvim",
    version = "*",
    ft = "markdown",
    cmd = "Obsidian",
    keys = {
      { "<leader>oo", "<cmd>Obsidian quick_switch<cr>", desc = "Open Note" },
      { "<leader>os", "<cmd>Obsidian search<cr>", desc = "Search Notes" },
      { "<leader>on", "<cmd>Obsidian new<cr>", desc = "New Note" },
      { "<leader>od", "<cmd>Obsidian today<cr>", desc = "Today's Daily Note" },
      { "<leader>oD", "<cmd>Obsidian dailies<cr>", desc = "Daily Notes" },
      { "<leader>ob", "<cmd>Obsidian backlinks<cr>", desc = "Backlinks" },
      { "<leader>ol", "<cmd>Obsidian links<cr>", desc = "Links in Note" },
      { "<leader>ot", "<cmd>Obsidian tags<cr>", desc = "Tags" },
      { "<leader>oc", "<cmd>Obsidian toc<cr>", desc = "Table of Contents" },
      { "<leader>or", "<cmd>Obsidian rename<cr>", desc = "Rename Note" },
      { "<leader>op", "<cmd>Obsidian paste_img<cr>", desc = "Paste Image" },
      { "<leader>oO", "<cmd>Obsidian open<cr>", desc = "Open in Obsidian App" },
    },
    init = function()
      vim.api.nvim_create_autocmd("User", {
        pattern = "ObsidianNoteEnter",
        callback = function(ev)
          vim.schedule(function()
            if vim.api.nvim_buf_is_valid(ev.buf) then
              expand_templater_dates(ev.buf)
            end
          end)
        end,
      })
    end,
    opts = {
      legacy_commands = false,
      workspaces = { { name = "vault", path = vault } },
      picker = { name = "snacks.picker" },
      -- render-markdown draws the UI
      ui = { enable = false },
      -- Never rewrite the YAML frontmatter of existing notes
      frontmatter = { enabled = false },
      -- Same behaviour as the Obsidian app settings
      new_notes_location = "current_dir",
      note_id_func = function(title)
        return title or tostring(os.time())
      end,
      daily_notes = {
        folder = "Daily Note",
        template = "Daily.md",
        default_tags = {},
      },
      templates = { folder = "Templates" },
      attachments = { folder = "assets" },
      -- <CR> on a task toggles only the states the Obsidian app understands
      checkbox = { order = { " ", "x" } },
    },
  },

  -- In-buffer rendering: headings, callouts, checkboxes, tables, code blocks
  {
    "MeanderingProgrammer/render-markdown.nvim",
    opts = {
      preset = "obsidian",
      checkbox = { enabled = true },
      -- LaTeX needs extra tools; the vault barely uses math
      latex = { enabled = false },
    },
  },

  -- List and checkbox continuation / renumbering while typing
  {
    "bullets-vim/bullets.vim",
    ft = "markdown",
    init = function()
      vim.g.bullets_enabled_file_types = { "markdown", "text", "gitcommit" }
      -- Skip the default maps: they take <leader>x, which is LazyVim's diagnostics/quickfix group
      vim.g.bullets_set_mappings = 0
      vim.g.bullets_custom_mappings = {
        { "imap", "<cr>", "<Plug>(bullets-newline)" },
        { "inoremap", "<C-cr>", "<cr>" },
        { "nmap", "o", "<Plug>(bullets-newline)" },
        { "vmap", "gN", "<Plug>(bullets-renumber)" },
        { "nmap", "gN", "<Plug>(bullets-renumber)" },
        { "imap", "<C-t>", "<Plug>(bullets-demote)" },
        { "nmap", ">>", "<Plug>(bullets-demote)" },
        { "vmap", ">", "<Plug>(bullets-demote)" },
        { "imap", "<C-d>", "<Plug>(bullets-promote)" },
        { "nmap", "<<", "<Plug>(bullets-promote)" },
        { "vmap", "<", "<Plug>(bullets-promote)" },
      }
    end,
  },

  -- No markdownlint squiggles on notes
  {
    "mfussenegger/nvim-lint",
    opts = function(_, opts)
      opts.linters_by_ft = opts.linters_by_ft or {}
      opts.linters_by_ft.markdown = {}
    end,
  },

  -- obsidian.nvim ships its own LSP for links/backlinks; marksman would duplicate it
  {
    "neovim/nvim-lspconfig",
    opts = {
      servers = { marksman = { enabled = false } },
    },
  },
}
