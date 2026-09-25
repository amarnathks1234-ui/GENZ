$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$baseDir = "c:\Users\PC\Desktop\NEXORA"
$pyDir = "$baseDir\pyruntime"
$pthFile = "$pyDir\python312._pth"

Write-Host "Configuring _pth file without BOM..."
$pthContent = "python312.zip`n.`nLib`nLib\site-packages`nimport site`n"
[System.IO.File]::WriteAllText($pthFile, $pthContent, [System.Text.UTF8Encoding]::new($false))

Write-Host "Installing pip..."
$getPip = "$pyDir\get-pip.py"
if (!(Test-Path $getPip)) {
    Invoke-WebRequest -Uri "https://bootstrap.pypa.io/get-pip.py" -OutFile $getPip
}
& "$pyDir\python.exe" $getPip --no-warn-script-location

Write-Host "Installing FastAPI and backend requirements..."
& "$pyDir\Scripts\pip.exe" install fastapi "uvicorn[standard]" pydantic pydantic-settings sqlalchemy "python-jose[cryptography]" "passlib[bcrypt]" python-multipart email-validator pytest httpx pytest-asyncio --no-warn-script-location

if (Test-Path $getPip) { Remove-Item $getPip -Force }
Write-Host "SUCCESS: Python runtime and packages installed successfully!"
