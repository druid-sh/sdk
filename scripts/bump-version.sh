#!/bin/bash

# Script to bump patch version in package.json
# Usage: ./bump-version.sh [major|minor|patch] [path/to/package.json]
# Default: patch version bump in ./package.json

set -e

# Default values
BUMP_TYPE="${1:-patch}"
PACKAGE_JSON="${2:-package.json}"

# Check if package.json exists
if [ ! -f "$PACKAGE_JSON" ]; then
    echo "Error: $PACKAGE_JSON not found!"
    exit 1
fi

# Check if jq is available (better JSON parsing)
if command -v jq > /dev/null 2>&1; then
    echo "Using jq for JSON manipulation..."
    
    # Get current version
    CURRENT_VERSION=$(jq -r '.version' "$PACKAGE_JSON")
    
    if [ "$CURRENT_VERSION" = "null" ]; then
        echo "Error: No version field found in $PACKAGE_JSON"
        exit 1
    fi
    
    echo "Current version: $CURRENT_VERSION"
    
    # Parse version components
    IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"
    
    # Bump version based on type
    case $BUMP_TYPE in
        major)
            MAJOR=$((MAJOR + 1))
            MINOR=0
            PATCH=0
            ;;
        minor)
            MINOR=$((MINOR + 1))
            PATCH=0
            ;;
        patch)
            PATCH=$((PATCH + 1))
            ;;
        *)
            echo "Error: Invalid bump type. Use 'major', 'minor', or 'patch'"
            exit 1
            ;;
    esac
    
    NEW_VERSION="$MAJOR.$MINOR.$PATCH"
    echo "New version: $NEW_VERSION"
    
    # Update package.json
    jq ".version = \"$NEW_VERSION\"" "$PACKAGE_JSON" > "${PACKAGE_JSON}.tmp" && mv "${PACKAGE_JSON}.tmp" "$PACKAGE_JSON"
    
else
    echo "jq not found, using sed (basic approach)..."
    
    # Get current version using grep and sed
    CURRENT_VERSION=$(grep -o '"version"[[:space:]]*:[[:space:]]*"[^"]*"' "$PACKAGE_JSON" | sed 's/.*"\([^"]*\)".*/\1/')
    
    if [ -z "$CURRENT_VERSION" ]; then
        echo "Error: Could not find version in $PACKAGE_JSON"
        exit 1
    fi
    
    echo "Current version: $CURRENT_VERSION"
    
    # Parse version components
    IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"
    
    # Bump version based on type
    case $BUMP_TYPE in
        major)
            MAJOR=$((MAJOR + 1))
            MINOR=0
            PATCH=0
            ;;
        minor)
            MINOR=$((MINOR + 1))
            PATCH=0
            ;;
        patch)
            PATCH=$((PATCH + 1))
            ;;
        *)
            echo "Error: Invalid bump type. Use 'major', 'minor', or 'patch'"
            exit 1
            ;;
    esac
    
    NEW_VERSION="$MAJOR.$MINOR.$PATCH"
    echo "New version: $NEW_VERSION"
    
    # Update package.json using sed
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/\"version\"[[:space:]]*:[[:space:]]*\"[^\"]*\"/\"version\": \"$NEW_VERSION\"/" "$PACKAGE_JSON"
    else
        # Linux
        sed -i "s/\"version\"[[:space:]]*:[[:space:]]*\"[^\"]*\"/\"version\": \"$NEW_VERSION\"/" "$PACKAGE_JSON"
    fi
fi

echo "✅ Successfully bumped $BUMP_TYPE version: $CURRENT_VERSION → $NEW_VERSION"

# Optional: Show the updated line
echo "Updated line:"
if command -v jq > /dev/null 2>&1; then
    jq -r '.version' "$PACKAGE_JSON" | sed 's/^/  "version": "/' | sed 's/$/"/'
else
    grep '"version"' "$PACKAGE_JSON"
fi