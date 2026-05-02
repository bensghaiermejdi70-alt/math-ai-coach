$bytes = [System.IO.File]::ReadAllBytes('src/app/examens-france/page.tsx')
$lineStart = 0
for ($i = 0; $i -lt 6016; $i++) {
    $lineStart = [Array]::IndexOf($bytes, [byte]10, $lineStart) + 1
}
$lineEnd = [Array]::IndexOf($bytes, [byte]10, $lineStart)
$line = [System.Text.Encoding]::UTF8.GetString($bytes, $lineStart, $lineEnd - $lineStart)
Write-Output "Line 6017 (0-indexed 6016):"
Write-Output $line

# Check the byte right after this line
$afterLine = $bytes[$lineStart..($lineStart + $line.Length + 5)]
Write-Output "---"
Write-Output "Bytes after line end:"
Write-Output $afterLine