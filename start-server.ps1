# Simple HTTP Server for PowerShell
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8000/")
$listener.Start()
Write-Host "Server running at http://localhost:8000"
Write-Host "Press Ctrl+C to stop"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    $localPath = Join-Path $PSScriptRoot ($request.Url.LocalPath.TrimStart('/'))
    if ([string]::IsNullOrEmpty($localPath) -or -not (Test-Path $localPath)) {
        $localPath = Join-Path $PSScriptRoot "index.html"
    }
    
    if (Test-Path $localPath -PathType Leaf) {
        $content = [System.IO.File]::ReadAllBytes($localPath)
        $extension = [System.IO.Path]::GetExtension($localPath)
        $mimeType = switch ($extension) {
            ".html" { "text/html; charset=utf-8" }
            ".css" { "text/css; charset=utf-8" }
            ".js" { "application/javascript; charset=utf-8" }
            ".json" { "application/json; charset=utf-8" }
            ".png" { "image/png" }
            ".jpg" { "image/jpeg" }
            ".gif" { "image/gif" }
            ".svg" { "image/svg+xml" }
            default { "application/octet-stream" }
        }
        
        $response.ContentType = $mimeType
        $response.ContentLength64 = $content.Length
        $response.OutputStream.Write($content, 0, $content.Length)
    } else {
        $response.StatusCode = 404
        $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    }
    
    $response.Close()
}
