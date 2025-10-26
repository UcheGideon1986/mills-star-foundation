#!/bin/bash

# Script to update images from downloaded JSON file
# Usage: ./update-images.sh

echo "🎯 Mills Star Foundation - Update Images Script"
echo "================================================"
echo ""

# Check if images.json exists in Downloads
DOWNLOADS_PATH="$HOME/Downloads/images.json"

if [ -f "$DOWNLOADS_PATH" ]; then
    echo "✅ Found images.json in Downloads folder"
    
    # Copy to public/data/
    cp "$DOWNLOADS_PATH" public/data/images.json
    echo "✅ Copied to public/data/images.json"
    
    # Show what changed
    echo ""
    echo "📊 Checking changes..."
    git diff public/data/images.json
    
    # Ask to commit
    echo ""
    read -p "📤 Do you want to commit and push these changes? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add public/data/images.json
        git commit -m "Update images data - $(date '+%Y-%m-%d %H:%M')"
        git push origin main
        
        echo ""
        echo "✅ Done! Changes pushed to GitHub"
        echo "⏱️  Wait 2-3 minutes for Netlify to deploy"
        echo "🎉 Then your images will show on all devices!"
    else
        echo "❌ Cancelled. Run this script again when ready."
    fi
else
    echo "❌ images.json not found in Downloads folder"
    echo ""
    echo "📝 Please follow these steps:"
    echo "1. Go to: https://millsstarfounders.netlify.app/admin"
    echo "2. Login with: admin123"
    echo "3. Click 'Download JSON' button (green card at top)"
    echo "4. Run this script again"
fi
