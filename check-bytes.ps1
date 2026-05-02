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
Write-Output "Length: $($line.Length)"
Write-Output "Bytes around end:"
$endBytes = $bytes[($lineStart + $line.Length - 20)..($lineStart + $line.Length + 10)]
Write-Output $endBytes