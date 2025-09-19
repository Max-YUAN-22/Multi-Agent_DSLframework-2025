#!/bin/bash

echo "🔧 修复Vercel部署问题..."

# 进入frontend目录
cd frontend

# 设置正确的homepage
echo "设置homepage为根路径..."
sed -i '' 's|"homepage": ".*"|"homepage": "."|g' package.json

# 重新构建
echo "重新构建前端..."
npm run build

# 检查构建结果
echo "检查构建结果..."
if [ -f "build/index.html" ]; then
    echo "✅ 构建成功"
    echo "检查资源路径..."
    grep -o 'src="[^"]*"' build/index.html | head -3
else
    echo "❌ 构建失败"
    exit 1
fi

echo "🎉 Vercel部署修复完成！"
echo "访问: https://multi-agent-ds-lframework-2025.vercel.app/"
