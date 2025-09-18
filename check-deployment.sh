#!/bin/bash

# 部署状态监控脚本
# Deployment Status Monitoring Script

echo "🔍 检查多智能体DSL框架部署状态..."

# 检查GitHub Actions状态
echo "📊 GitHub Actions状态:"
echo "访问: https://github.com/Max-YUAN-22/Multi-Agent_DSLframework-2025/actions"

# 检查Vercel部署状态
echo "🌐 Vercel部署状态:"
echo "访问: https://vercel.com/dashboard"

# 检查网站可访问性
echo "🌍 网站可访问性检查:"
echo "主要地址: https://multi-agent-ds-lframework-2025.vercel.app"

# 使用curl检查网站状态
if command -v curl &> /dev/null; then
    echo "🔍 检查网站响应..."
    response=$(curl -s -o /dev/null -w "%{http_code}" https://multi-agent-ds-lframework-2025.vercel.app)
    if [ "$response" = "200" ]; then
        echo "✅ 网站响应正常 (HTTP $response)"
    else
        echo "⚠️ 网站响应异常 (HTTP $response)"
    fi
else
    echo "⚠️ curl未安装，无法检查网站状态"
fi

# 显示部署配置
echo ""
echo "📋 当前部署配置:"
echo "- GitHub仓库: Max-YUAN-22/Multi-Agent_DSLframework-2025"
echo "- Vercel项目: multi-agent-ds-lframework-2025"
echo "- 自动部署: 已启用"
echo "- 监控: GitHub Actions + Vercel"

# 显示最近提交
echo ""
echo "📝 最近提交:"
git log --oneline -5

echo ""
echo "🎯 部署验证清单:"
echo "- [ ] GitHub Actions构建成功"
echo "- [ ] Vercel部署完成"
echo "- [ ] 网站可正常访问"
echo "- [ ] 所有页面功能正常"
echo "- [ ] API路由工作正常"
echo "- [ ] 移动端响应式正常"

echo ""
echo "📞 如需帮助:"
echo "- GitHub Issues: https://github.com/Max-YUAN-22/Multi-Agent_DSLframework-2025/issues"
echo "- Vercel支持: https://vercel.com/support"
