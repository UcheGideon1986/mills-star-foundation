#!/bin/bash

# Verify JSON has all required data

echo "🔍 Checking latest images.json in Downloads..."
echo ""

# Find the latest images*.json file
LATEST_JSON=$(ls -t ~/Downloads/images*.json 2>/dev/null | head -1)

if [ -z "$LATEST_JSON" ]; then
    echo "❌ No images.json found in Downloads"
    echo ""
    echo "Please:"
    echo "1. Go to admin panel"
    echo "2. Click 'Download JSON' button"
    echo "3. Run this script again"
    exit 1
fi

echo "✅ Found: $LATEST_JSON"
echo ""

# Check contents
echo "📊 Contents:"
echo "─────────────────────────────────────"

if command -v jq &> /dev/null; then
    # Use jq if available
    cat "$LATEST_JSON" | jq '{
      images: (.images | length),
      siteImages: (.siteImages | keys | length),
      impactImages: (.impactImages | length),
      blogPosts: (.blogPosts | length),
      heroSlides: (.heroSlides | length // 0),
      hasHeroSlides: (.heroSlides != null)
    }'
else
    # Fallback without jq
    echo "Images: $(grep -o '"id"' "$LATEST_JSON" | wc -l | tr -d ' ')"
    echo "Has heroSlides: $(grep -q '"heroSlides"' "$LATEST_JSON" && echo 'Yes' || echo 'No')"
fi

echo ""
echo "─────────────────────────────────────"
echo ""

# Check if heroSlides exists
if grep -q '"heroSlides"' "$LATEST_JSON"; then
    echo "✅ heroSlides field found!"
    echo "✅ This JSON is ready to sync!"
    echo ""
    echo "Next step: Run ./sync-changes.sh"
else
    echo "❌ heroSlides field NOT found!"
    echo ""
    echo "This means:"
    echo "1. You downloaded JSON before the code update, OR"
    echo "2. You haven't uploaded any slideshow images yet"
    echo ""
    echo "Solution:"
    echo "1. Go to admin → Hero Slideshow tab"
    echo "2. Upload slideshow images"
    echo "3. Download JSON again"
    echo "4. Run this script again"
fi
