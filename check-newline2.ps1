$bytes = [System.IO.File]::ReadAllBytes('src/app/examens-france/page.tsx')
$lineStart = 0
for ($i = 0; $i -lt 6016; $i++) {
    $lineStart = [Array]::IndexOf($bytes, [byte]10, $lineStart) + 1
}
$lineEnd = [Array]::IndexOf($bytes, [byte]10, $lineStart)
$line = [System.Text.Encoding]::UTF8.GetString($bytes, $lineStart, $lineEnd - $lineStart)
Write-Output "Line 6017 (0-indexed 6016):"
Write-Output $line
Write-Output "---"
Write-Output "Line ends at byte position: $lineEnd"
Write-Output "Byte at lineEnd: $($bytes[$lineEnd])"
Write-Output "Byte at lineEnd+1: $($bytes[$lineEnd+1])"

# Check if there's a newline at lineEnd
if ($bytes[$lineEnd] -eq 10) {
    Write-Output "Found newline at lineEnd"
} else {
    Write-Output "NO newline at lineEnd - this is the problem!"
}