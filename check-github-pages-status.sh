#!/bin/bash

echo "🔍 检查GitHub Pages部署状态..."
echo "=================================="

# 检查GitHub Pages URL
GITHUB_PAGES_URL="https://max-yuan-22.github.io/Multi-Agent_DSLframework-2025/"
VERCEL_URL="https://multi-agent-ds-lframework-2025.vercel.app/"

echo "📊 检查部署状态:"
echo ""

# 检查GitHub Pages
echo "🌐 GitHub Pages: $GITHUB_PAGES_URL"
GITHUB_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$GITHUB_PAGES_URL")
if [ "$GITHUB_STATUS" = "200" ]; then
    echo "   ✅ 状态: 正常运行 (HTTP $GITHUB_STATUS)"
else
    echo "   ❌ 状态: 异常 (HTTP $GITHUB_STATUS)"
    echo "   💡 建议: 检查GitHub Pages设置或等待部署完成"
fi

echo ""

# 检查Vercel
echo "🚀 Vercel部署: $VERCEL_URL"
VERCEL_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$VERCEL_URL")
if [ "$VERCEL_STATUS" = "200" ]; then
    echo "   ✅ 状态: 正常运行 (HTTP $VERCEL_STATUS)"
else
    echo "   ❌ 状态: 异常 (HTTP $VERCEL_STATUS)"
fi

echo ""

# 检查GitHub Actions状态
echo "🔧 GitHub Actions状态:"
echo "   查看: https://github.com/Max-YUAN-22/Multi-Agent_DSLframework-2025/actions"
echo ""

# 提供建议
echo "📋 建议操作:"
echo "1. 如果GitHub Pages异常，请检查:"
echo "   - Settings > Pages > Source 是否设置为 'Deploy from a branch'"
echo "   - 分支是否设置为 'main'"
echo "   - 文件夹是否设置为 '/frontend/build'"
echo ""
echo "2. 如果Vercel正常，建议使用Vercel作为主要部署地址"
echo ""
echo "3. 重新部署命令:"
echo "   git add ."
echo "   git commit -m 'fix: 更新部署配置'"
echo "   git push origin main"
echo ""

echo "✅ 检查完成!"
