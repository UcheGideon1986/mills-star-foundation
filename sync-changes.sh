#!/bin/bash

# Mills Star Foundation - Sync Changes Script
# This script syncs admin changes to all devices via GitHub

echo "🔄 Mills Star Foundation - Sync Changes"
echo "========================================"
echo ""

# Check if images.json exists in Downloads
if [ ! -f ~/Downloads/images.json ]; then
    echo "❌ Error: images.json not found in Downloads folder"
    echo ""
    echo "Please:"
    echo "1. Go to admin panel"
    echo "2. Click 'Download JSON' button"
    echo "3. Run this script again"
    exit 1
fi

echo "✅ Found images.json in Downloads"
echo ""

# Copy to project
echo "📁 Copying images.json to project..."
cp ~/Downloads/images.json public/data/images.json

if [ $? -eq 0 ]; then
    echo "✅ File copied successfully"
else
    echo "❌ Failed to copy file"
    exit 1
fi

echo ""
echo "📊 Checking for changes..."
git diff --stat public/data/images.json

echo ""
echo "💾 Committing changes..."
git add public/data/images.json

# Get current timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

git commit -m "update: sync latest admin changes

✅ Changes synced from admin panel
- Gallery images
- Hero slideshow
- Blog posts
- Site images
- Impact stats

Synced at: $TIMESTAMP
"

if [ $? -eq 0 ]; then
    echo "✅ Changes committed"
else
    echo "ℹ️  No changes to commit (already up to date)"
fi

echo ""
echo "🚀 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Changes pushed to GitHub"
    echo ""
    echo "⏱️  Netlify will deploy in ~2-3 minutes"
    echo "🌐 Your changes will appear on all devices!"
    echo ""
    echo "Test at: https://millsstarfounders.netlify.app"
else
    echo "❌ Failed to push to GitHub"
    exit 1
fi
