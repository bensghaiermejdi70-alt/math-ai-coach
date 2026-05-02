$bytes = [System.IO.File]::ReadAllBytes('src/app/examens-france/page.tsx')
$lineStart = 0
for ($i = 0; $i -lt 6017; $i++) {
    $lineStart = [Array]::IndexOf($bytes, [byte]10, $lineStart) + 1
}
$lineEnd = [Array]::IndexOf($bytes, [byte]10, $lineStart)
$line = [System.Text.Encoding]::UTF8.GetString($bytes, $lineStart, $lineEnd - $lineStart)
Write-Output "Line 6018 (0-indexed 6017):"
Write-Output $line
Write-Output "---"
Write-Output "Length: $($line.Length)"

# Check for newline characters
$nextLineStart = $lineEnd + 1
$nextLineEnd = [Array]::IndexOf($bytes, [byte]10, $nextLineStart)
if ($nextLineEnd -eq -1) { $nextLineEnd = $bytes.Length }
$nextLine = [System.Text.Encoding]::UTF8.GetString($bytes, $nextLineStart, $nextLineEnd - $nextLineStart)
Write-Output "Line 6019 (0-indexed 6018):"
Write-Output $nextLine