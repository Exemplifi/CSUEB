# PowerShell script to fix ARIA role issues in HTML files
# This script fixes the following issues:
# 1. Removes role="menu" from dropdown containers
# 2. Removes role="menuitem" from dropdown toggle buttons
# 3. Adds role="none" to li elements in dropdown menus
# 4. Fixes main navigation menu structure

$htmlFiles = Get-ChildItem -Path "CSUEB-html" -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)"
    
    $content = Get-Content $file.FullName -Raw
    
    # Fix 1: Remove role="menu" from dropdown containers and role="menuitem" from dropdown toggle buttons
    $content = $content -replace '<div class="dropdown" role="menu">', '<div class="dropdown">'
    $content = $content -replace 'role="menuitem">\s*<span>INFO FOR', '><span>INFO FOR'
    
    # Fix 2: Add role="none" to li elements in dropdown menus
    $content = $content -replace '<li><a class="dropdown-item"', '<li role="none"><a class="dropdown-item"'
    
    # Fix 3: Fix main navigation menu structure (for files that use ul/li structure)
    $content = $content -replace '<li\s+role="menuitem"><a href="#"', '<li role="none"><a href="#" role="menuitem"'
    
    # Fix 4: Remove extra spaces in role attributes
    $content = $content -replace 'role="menuitem"\s+', 'role="menuitem" '
    
    # Write the fixed content back to the file
    Set-Content -Path $file.FullName -Value $content -NoNewline
    
    Write-Host "Fixed: $($file.Name)"
}

Write-Host "All HTML files have been processed!"
