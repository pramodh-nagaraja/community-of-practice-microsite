# scripts/generate-form.ps1
# Generates CoP-Lead-Form.docx using the Microsoft Word COM object.
# Run: powershell -ExecutionPolicy Bypass -File scripts\generate-form.ps1

param(
    [string]$Out = "content\_template\CoP-Lead-Form.docx"
)

$OutPath = (Join-Path (Get-Location) $Out)

# Word BGR colour constants (Word uses BGR, not RGB)
$PURPLE   = 16711585   # #A100FF  -> BGR: R=161 G=0 B=255
$PUR_DARK = 11206743   # #5700AB  -> BGR
$WHITE    = 16777215
$GREY_LT  = 15921906   # #F2F2F2

Write-Host "Starting Word..."
$word = New-Object -ComObject Word.Application
$word.Visible        = $false
$word.DisplayAlerts  = 0    # suppress all dialogs during automation

$doc = $word.Documents.Add()
$doc.PageSetup.TopMargin    = $word.CentimetersToPoints(2.0)
$doc.PageSetup.BottomMargin = $word.CentimetersToPoints(2.0)
$doc.PageSetup.LeftMargin   = $word.CentimetersToPoints(2.5)
$doc.PageSetup.RightMargin  = $word.CentimetersToPoints(2.5)

$sel = $word.Selection

function ResetFont {
    $sel.Style = $doc.Styles.Item("Normal")
    $sel.Font.Name    = "Calibri"
    $sel.Font.Size    = 11
    $sel.Font.Bold    = $false
    $sel.Font.Italic  = $false
    $sel.Font.Color   = -16777216
    $sel.ParagraphFormat.Alignment    = 0
    $sel.ParagraphFormat.SpaceBefore  = 0
    $sel.ParagraphFormat.SpaceAfter   = 4
    $sel.ParagraphFormat.LeftIndent   = 0
    $sel.ParagraphFormat.Borders.Item(3).LineStyle = 0
    $sel.ParagraphFormat.Shading.BackgroundPatternColor = -16777216
}

function NL { $sel.TypeParagraph() }

function AddTitle($txt) {
    ResetFont
    $sel.Font.Size   = 22
    $sel.Font.Bold   = $true
    $sel.Font.Color  = $PURPLE
    $sel.ParagraphFormat.Alignment   = 1
    $sel.ParagraphFormat.SpaceAfter  = 4
    $sel.TypeText($txt); NL
}

function AddSubtitle($txt) {
    ResetFont
    $sel.Font.Size   = 9.5
    $sel.Font.Italic = $true
    $sel.ParagraphFormat.Alignment   = 1
    $sel.ParagraphFormat.SpaceAfter  = 14
    $sel.TypeText($txt); NL
}

function AddSectionHeading($txt) {
    ResetFont
    $sel.Font.Size   = 12
    $sel.Font.Bold   = $true
    $sel.Font.Color  = $WHITE
    $sel.ParagraphFormat.SpaceBefore = 14
    $sel.ParagraphFormat.SpaceAfter  = 6
    $sel.ParagraphFormat.Shading.BackgroundPatternColor = $PURPLE
    $sel.TypeText($txt); NL
    $sel.ParagraphFormat.Shading.BackgroundPatternColor = -16777216
}

function AddSubHeading($txt) {
    ResetFont
    $sel.Font.Size  = 11
    $sel.Font.Bold  = $true
    $sel.Font.Color = $PUR_DARK
    $sel.ParagraphFormat.SpaceBefore = 10
    $sel.ParagraphFormat.SpaceAfter  = 4
    $sel.TypeText($txt); NL
}

function AddInstruction($txt) {
    ResetFont
    $sel.Font.Size   = 9.5
    $sel.Font.Italic = $true
    $sel.ParagraphFormat.SpaceAfter = 6
    $sel.TypeText($txt); NL
}

function AddFieldLabel($lbl, $hint) {
    ResetFont
    $sel.Font.Size   = 10.5
    $sel.Font.Bold   = $true
    $sel.ParagraphFormat.SpaceBefore = 8
    $sel.ParagraphFormat.SpaceAfter  = 0
    if ($hint) {
        $sel.TypeText($lbl)
        $sel.Font.Bold   = $false
        $sel.Font.Italic = $true
        $sel.Font.Size   = 9.5
        $sel.TypeText("  $hint")
    } else {
        $sel.TypeText($lbl)
    }
    NL
    # Underline answer row
    ResetFont
    $sel.Font.Size  = 10.5
    $sel.ParagraphFormat.SpaceBefore = 0
    $sel.ParagraphFormat.SpaceAfter  = 6
    $sel.ParagraphFormat.Borders.Item(3).LineStyle = 1
    $sel.ParagraphFormat.Borders.Item(3).LineWidth  = 8
    $sel.TypeText(" "); NL
    $sel.ParagraphFormat.Borders.Item(3).LineStyle = 0
}

function AddNoteField($lbl) {
    ResetFont
    $sel.Font.Size  = 10.5
    $sel.Font.Bold  = $true
    $sel.ParagraphFormat.SpaceBefore = 8
    $sel.ParagraphFormat.SpaceAfter  = 0
    $sel.TypeText($lbl); NL
    for ($i = 0; $i -lt 3; $i++) {
        ResetFont
        $sel.Font.Size  = 10.5
        $sel.ParagraphFormat.SpaceBefore = 0
        $sel.ParagraphFormat.SpaceAfter  = 0
        $sel.ParagraphFormat.Borders.Item(3).LineStyle = 1
        $sel.ParagraphFormat.Borders.Item(3).LineWidth  = 8
        $sel.TypeText(" "); NL
    }
    $sel.ParagraphFormat.Borders.Item(3).LineStyle = 0
    $sel.ParagraphFormat.SpaceAfter = 6
    NL
}

function AddHRule {
    ResetFont
    $sel.ParagraphFormat.Borders.Item(3).LineStyle = 1
    $sel.ParagraphFormat.Borders.Item(3).LineWidth  = 6
    $sel.ParagraphFormat.Borders.Item(3).Color      = $PURPLE
    $sel.TypeText(" "); NL
    $sel.ParagraphFormat.Borders.Item(3).LineStyle = 0
}

function AddCheckItem($txt) {
    ResetFont
    $sel.Font.Size  = 10.5
    $sel.ParagraphFormat.SpaceBefore = 2
    $sel.ParagraphFormat.SpaceAfter  = 2
    $sel.TypeText([string][char]0x25A1 + "  " + $txt); NL
}

# Build a table. $headers = 1-D array. $rowData = flat array read in groups of $ncols.
function AddTable($headers, $rowData, $cmWidths) {
    ResetFont
    $ncols   = $headers.Count
    $nrows   = ($rowData.Count / $ncols)
    $range   = $sel.Range
    $tbl     = $doc.Tables.Add($range, ($nrows + 1), $ncols)
    $tbl.Style = "Table Grid"
    $tbl.AllowAutoFit = $false

    $pgW = $doc.PageSetup.PageWidth - $doc.PageSetup.LeftMargin - $doc.PageSetup.RightMargin
    if ($cmWidths) {
        for ($c = 1; $c -le $ncols; $c++) {
            $tbl.Columns.Item($c).Width = $word.CentimetersToPoints($cmWidths[$c-1])
        }
    } else {
        $w = $pgW / $ncols
        for ($c = 1; $c -le $ncols; $c++) {
            $tbl.Columns.Item($c).Width = $w
        }
    }

    # Header row
    for ($c = 1; $c -le $ncols; $c++) {
        $cell = $tbl.Cell(1,$c)
        $cell.Range.Text            = $headers[$c-1]
        $cell.Range.Font.Bold       = $true
        $cell.Range.Font.Size       = 10
        $cell.Range.Font.Name       = "Calibri"
        $cell.Range.Font.Color      = $WHITE
        $cell.Shading.BackgroundPatternColor = $PURPLE
        $cell.VerticalAlignment     = 1
    }

    # Data rows
    for ($r = 0; $r -lt $nrows; $r++) {
        $ri  = $r + 2
        $bg  = if (($r % 2) -eq 0) { $WHITE } else { $GREY_LT }
        for ($c = 1; $c -le $ncols; $c++) {
            $idx  = $r * $ncols + ($c - 1)
            $txt  = if ($idx -lt $rowData.Count) { $rowData[$idx] } else { "" }
            $cell = $tbl.Cell($ri, $c)
            $cell.Range.Text       = $txt
            $cell.Range.Font.Size  = 10
            $cell.Range.Font.Name  = "Calibri"
            $cell.Range.Font.Bold  = $false
            $cell.Shading.BackgroundPatternColor = $bg
            $cell.VerticalAlignment = 1
            if ($txt -eq "") {
                $tbl.Rows.Item($ri).HeightRule = 1
                $tbl.Rows.Item($ri).Height     = $word.CentimetersToPoints(0.85)
            }
        }
    }

    $sel.MoveDown(5, 1) | Out-Null
    ResetFont
    $sel.ParagraphFormat.SpaceBefore = 8
    NL
}

# ══════════════════════════════════════════════════════════════════
#  DOCUMENT CONTENT
# ══════════════════════════════════════════════════════════════════

AddTitle "Community of Practice"
AddTitle "Information Form"
AddSubtitle "Complete all sections and return to Pramodh Nagaraja (pramodh.nagaraja@accenture.com) with leadership photos."
AddHRule

# ── SECTION 1 ──────────────────────────────────────────────────
AddSectionHeading "SECTION 1 - CoP Page Details"

AddFieldLabel "CoP Full Name" "(e.g., Cloud Engineering)"
AddFieldLabel "One-Line Tagline" "(shown on the hero banner)"
AddNoteField "Description (2-3 sentences shown below the tagline)"

ResetFont
$sel.Font.Size  = 10.5
$sel.Font.Bold  = $true
$sel.ParagraphFormat.SpaceBefore = 8
$sel.ParagraphFormat.SpaceAfter  = 4
$sel.TypeText("Accent / Brand Colour"); NL

$colourHeaders = @("Option", "Colour", "Hex Code", "Select Here")
$colourRows    = @(
    "Accenture Purple (default)", "Purple",  "#A100FF", "",
    "Electric Blue",              "Blue",    "#0057B8", "",
    "Teal",                       "Teal",    "#00BABC", "",
    "Green",                      "Green",   "#009B77", "",
    "Orange",                     "Orange",  "#E8650A", "",
    "Custom",                     "-",       "#______", ""
)
AddTable $colourHeaders $colourRows @(5.5, 3.0, 3.0, 3.0)

AddInstruction "Note: CoP icon will be assigned by Pramodh from the standard QBE icon set."
AddHRule

# ── SECTION 2 ──────────────────────────────────────────────────
AddSectionHeading "SECTION 2 - Community Stats"

AddFieldLabel "Number of current members"
AddFieldLabel "Number of certifications achieved so far" "(optional)"
AddFieldLabel "Number of sessions held to date" "(optional)"
AddFieldLabel "Year CoP was launched"
AddHRule

# ── SECTION 3 ──────────────────────────────────────────────────
AddSectionHeading "SECTION 3 - Mission, Vision and Values"

AddNoteField "Mission Statement (1-2 sentences: what your CoP does and for whom)"
AddNoteField "Vision Statement (1-2 sentences: where you want to be in 3-5 years)"
AddNoteField "Values (short statement or list of 3-5 core values)"
AddHRule

# ── SECTION 4 ──────────────────────────────────────────────────
AddSectionHeading "SECTION 4 - Join and Contact"

AddFieldLabel "Email address for join requests" "(e.g., yourname@accenture.com)"
AddFieldLabel "Topics members can express interest in (comma separated)" "(e.g., Cloud Architecture, DevOps, AWS, Azure)"
AddHRule

# ── SECTION 5 ──────────────────────────────────────────────────
AddSectionHeading "SECTION 5 - Leadership Team"
AddInstruction "Provide details for up to 3 leaders. Attach headshot photos as separate image files named FirstnameLastname.jpg"

$ldrHeaders = @("Field", "Your Answer")
$ldr1Rows   = @(
    "Full Name",             "",
    "Initials (2 chars)",   "",
    "Job Title / Role",     "",
    "Accenture Email",      "",
    "Photo File Name",      "e.g., JohnSmith.jpg"
)
$ldr2Rows   = @(
    "Full Name",             "",
    "Initials (2 chars)",   "",
    "Job Title / Role",     "",
    "Accenture Email",      "",
    "Photo File Name",      "e.g., JaneSmith.jpg"
)
$ldr3Rows   = @(
    "Full Name",             "",
    "Initials (2 chars)",   "",
    "Job Title / Role",     "",
    "Accenture Email",      "",
    "Photo File Name",      "e.g., YourName.jpg"
)

AddSubHeading "Leader 1 - Executive Sponsor"
AddTable $ldrHeaders $ldr1Rows @(5.0, 9.5)

AddSubHeading "Leader 2 - Global Lead  (optional)"
AddTable $ldrHeaders $ldr2Rows @(5.0, 9.5)

AddSubHeading "Leader 3 - CoP Lead"
AddTable $ldrHeaders $ldr3Rows @(5.0, 9.5)
AddHRule

# ── SECTION 6 - CUSTOM ─────────────────────────────────────────
AddSectionHeading "SECTION 6 - Custom / Additional Information  (optional)"
AddInstruction "Use this section for anything specific to your CoP that does not fit the standard template above - unique programs, spotlight initiatives, recognition schemes, custom certification pathways, featured tools or vendors, etc."

$customHeaders = @("Item Name", "Details / Description")
$customRows    = @("","", "","", "","", "","", "","")
AddTable $customHeaders $customRows @(5.0, 9.5)

AddNoteField "Any other notes, special requirements, or requests for the page?"
AddHRule

# ── SECTION 7 - MEMBERS ────────────────────────────────────────
AddSectionHeading "SECTION 7 - Members"
AddInstruction "List all current members. For Certification Level use: Foundation, Associate, or Expert. If your CoP uses different certification names, note them in the Notes column."

$memHeaders = @("Full Name", "Initials", "Certification Level", "Notes")
$memRows    = @(
    "", "", "Foundation", "",
    "", "", "Associate",  "",
    "", "", "Expert",     ""
)
# Add 22 blank rows
for ($i = 0; $i -lt 22; $i++) { $memRows += @("", "", "", "") }

AddTable $memHeaders $memRows @(7.0, 2.0, 4.0, 1.5)
AddHRule

# ── SECTION 8 - EVENTS ─────────────────────────────────────────
AddSectionHeading "SECTION 8 - Upcoming Events  (optional)"
AddInstruction "List any upcoming webinars, workshops, or sessions you want shown on the CoP page."

$evtHeaders = @("Day", "Month & Year", "Event Title", "Short Description", "Type", "Time / Time Zone")
$evtRows    = @(
    "", "", "", "", "Webinar",   "",
    "", "", "", "", "Workshop",  "",
    "", "", "", "", "Boot Camp", ""
)
AddTable $evtHeaders $evtRows @(1.2, 2.5, 3.5, 4.0, 2.2, 2.6)

AddInstruction "Type options: Webinar, Workshop, Boot Camp, Hackathon, Demo, Case Study, Town Hall"
AddHRule

# ── SECTION 9 - CHECKLIST ──────────────────────────────────────
AddSectionHeading "SECTION 9 - Checklist Before Sending"

AddCheckItem "All sections above completed (skip only optional ones)"
AddCheckItem "Leader 1 (Executive Sponsor) photo attached"
AddCheckItem "Leader 2 (Global Lead) photo attached (if applicable)"
AddCheckItem "Leader 3 (CoP Lead) photo attached"
AddCheckItem "Photo files named as FirstnameLastname.jpg"

ResetFont
$sel.ParagraphFormat.SpaceBefore = 14
$sel.Font.Size   = 10.5
$sel.Font.Bold   = $true
$sel.Font.Color  = $PURPLE
$sel.TypeText("Send completed form + photo files to:  ")
$sel.Font.Bold   = $false
$sel.Font.Color  = -16777216
$sel.TypeText("pramodh.nagaraja@accenture.com")
NL

AddHRule

ResetFont
$sel.Font.Size   = 9
$sel.Font.Italic = $true
$sel.ParagraphFormat.Alignment  = 1
$sel.TypeText("Template version 1.1 - QBE N&O CoP Microsite"); NL

# ── Save to local temp first (avoids OneDrive sync blocking SaveAs2) ──
$tmpPath = Join-Path $env:TEMP "CoP-Lead-Form-tmp.docx"
Write-Host "Saving (local temp)..."
$doc.SaveAs2($tmpPath, 16)
$doc.Close($false)
$word.Quit()
[System.Runtime.InteropServices.Marshal]::ReleaseComObject($word) | Out-Null
[GC]::Collect()

# Copy to final destination
Copy-Item -Path $tmpPath -Destination $OutPath -Force
Remove-Item $tmpPath -Force

Write-Host ""
Write-Host "Done: $OutPath"
