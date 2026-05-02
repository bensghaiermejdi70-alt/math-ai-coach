$lines = Get-Content 'src/app/examens-france/page.tsx'
$count = 0
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match "'[^']*é") {
        Write-Output "Line $($i+1): $($lines[$i].Substring(0, [Math]::Min(100, $lines[$i].Length)))"
        $count++
        if ($count -ge 50) { break }
    }
}
Write-Output "---"
Write-Output "Total found: $count"