#!/bin/bash
set -e

COMMIT_MSG="${1:-feat: update RestroMind website and assets}"

echo "=================================================="
echo "🚀 RestroMind: Auto Git Push & Vercel Deploy"
echo "=================================================="

# 1. Add all changes
git add .

# 2. Check if there are changes to commit
if git diff --staged --quiet; then
  echo "ℹ️ No local changes to commit."
else
  echo "📦 Committing changes: '$COMMIT_MSG'..."
  git commit -m "$COMMIT_MSG"
fi

# 3. Push to main branch on GitHub
echo "📤 Pushing code to GitHub (main branch)..."
git push origin main

# 4. Deploy to Vercel Production
echo "⚡ Triggering Vercel Production Deployment..."
vercel deploy --prod --yes

echo "=================================================="
echo "🎉 SUCCESS: Code pushed to GitHub and deployed live to Vercel!"
echo "🌐 Live URL: https://restromind-website.vercel.app"
echo "=================================================="
