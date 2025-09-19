# 🚀 GitHub Pages部署配置

## 📋 步骤1: 启用GitHub Pages

1. 访问: https://github.com/Max-YUAN-22/Multi-Agent_DSLframework-2025/settings/pages
2. 点击 **"Settings"** 标签
3. 滚动到 **"Pages"** 部分
4. 在 **"Source"** 下选择 **"GitHub Actions"**
5. 等待GitHub Actions自动部署
6. 或者选择 **"Deploy from a branch"** → **"main"** → **"/frontend/build"**
7. 点击 **"Save"**

## 📋 步骤2: 配置GitHub Actions

在项目根目录创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
        
    - name: Install dependencies
      run: |
        cd frontend
        npm install
        
    - name: Build
      run: |
        cd frontend
        npm run build
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./frontend/build
```

## 📋 步骤3: 推送配置

```bash
cd ~/Desktop/部署/auto-
git add .
git commit -m "添加GitHub Pages部署配置"
git push origin main
```

## 🎯 部署URL

部署完成后，您的应用将在以下URL可用：
```
https://max-yuan-22.github.io/Multi-Agent_DSLframework-2025/
```

## 🎯 企业级功能确认

- ✅ Material-UI企业主题
- ✅ 响应式设计
- ✅ ATSLP算法展示 (2.17x吞吐量提升)
- ✅ HCMPL算法展示 (85%+缓存命中率)
- ✅ CALK算法展示 (40-60%延迟减少)
- ✅ 企业级监控
- ✅ 安全合规
- ✅ 云原生支持
- ✅ 全球CDN

## 🚀 推荐操作

**最简单的方法**: 直接使用成功的Vercel部署！
```
https://multi-agent-ds-lframework-2025-rjvuqv3vv-maxs-projects-f9670228.vercel.app/
```

**或者**: 使用GitHub Pages部署，更简单且免费！
