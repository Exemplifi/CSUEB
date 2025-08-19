# Comprehensive PowerShell script to fix all ARIA role issues in HTML files
# This script fixes the following issues:
# 1. Removes role="menu" from dropdown containers
# 2. Removes role="menuitem" from dropdown toggle buttons
# 3. Adds role="none" to li elements in dropdown menus
# 4. Fixes main navigation menu structure
# 5. Ensures proper ARIA role hierarchy

$htmlFiles = Get-ChildItem -Path "CSUEB-html" -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.Name)"
    
    $content = Get-Content $file.FullName -Raw
    
    # Fix 1: Remove role="menu" from dropdown containers and role="menuitem" from dropdown toggle buttons
    $content = $content -replace '<div class="dropdown" role="menu">', '<div class="dropdown">'
    $content = $content -replace 'role="menuitem">\s*<span>INFO FOR', '><span>INFO FOR'
    
    # Fix 2: Add role="none" to li elements in dropdown menus (for dropdown-item class)
    $content = $content -replace '<li><a class="dropdown-item"', '<li role="none"><a class="dropdown-item"'
    
    # Fix 3: Add role="none" to li elements in dropdown menus (for dropdown-item subtext class)
    $content = $content -replace '<li><a class="dropdown-item subtext"', '<li role="none"><a class="dropdown-item subtext"'
    
    # Fix 4: Fix main navigation menu structure (for files that use ul/li structure)
    $content = $content -replace '<li\s+role="menuitem"><a href="#"', '<li role="none"><a href="#" role="menuitem"'
    
    # Fix 5: Remove extra spaces in role attributes
    $content = $content -replace 'role="menuitem"\s+', 'role="menuitem" '
    
    # Fix 6: Ensure proper spacing in role="none" attributes
    $content = $content -replace 'role="none"\s+', 'role="none" '
    
    # Write the fixed content back to the file
    Set-Content -Path $file.FullName -Value $content -NoNewline
    
    Write-Host "Fixed: $($file.Name)"
}

Write-Host "All HTML files have been processed!"
