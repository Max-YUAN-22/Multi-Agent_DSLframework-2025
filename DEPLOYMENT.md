# 部署指南 / Deployment Guide

## 🚀 GitHub Pages 部署 / GitHub Pages Deployment

### 1. 准备GitHub仓库 / Prepare GitHub Repository

1. 在GitHub上创建新仓库 / Create a new repository on GitHub
2. 仓库名称建议: `multi-agent-dsl-final` / Suggested repository name: `multi-agent-dsl-final`
3. 设置为公开仓库 / Set as public repository
4. 添加README和LICENSE / Add README and LICENSE

### 2. 上传项目文件 / Upload Project Files

```bash
# 初始化Git仓库 / Initialize Git repository
cd /Users/Apple/Desktop/multi-agent-dsl-final
git init

# 添加所有文件 / Add all files
git add .

# 提交更改 / Commit changes
git commit -m "Initial commit: Multi-Agent DSL Framework"

# 添加远程仓库 / Add remote repository
git remote add origin https://github.com/Max-YUAN-22/multi-agent-dsl-final.git

# 推送到GitHub / Push to GitHub
git branch -M main
git push -u origin main
```

### 3. 配置GitHub Pages / Configure GitHub Pages

1. 进入仓库设置 / Go to repository settings
2. 滚动到"Pages"部分 / Scroll to "Pages" section
3. 选择"Deploy from a branch" / Select "Deploy from a branch"
4. 选择"main"分支和"/ (root)"文件夹 / Select "main" branch and "/ (root)" folder
5. 保存设置 / Save settings

### 4. 访问部署的网站 / Access Deployed Website

部署完成后，您的网站将在以下地址可用：
After deployment, your website will be available at:

```
https://max-yuan-22.github.io/multi-agent-dsl-final/
```

## 📁 项目文件说明 / Project Files Description

### 🌐 网页文件 / Web Files
- `index.html` - 主页面 / Main page
- `main.css` - 主样式文件 / Main stylesheet
- `virtual-demo.html` - 虚拟演示页面 / Virtual demo page
- `virtual-demo.css` - 虚拟演示样式 / Virtual demo styles
- `WEB_README.md` - 网页使用说明 / Web usage guide

### 🖼️ 资源文件 / Resource Files
- `background2.png` - 背景图片 / Background image
- `ai.png` - AI主题图片 / AI theme image
- `show.png` - 装饰图片 / Decorative image
- `graph1.drawio.png`, `graph2.drawio.png`, `graph3.drawio.png` - 架构图 / Architecture diagrams

### 📊 演示数据 / Demo Data
- `presentation-site/` - 演示网站 / Presentation website
- `results/` - 实验结果 / Experimental results
- `frontend/` - 前端应用 / Frontend application
- `backend/` - 后端服务 / Backend services

## 🔧 本地开发 / Local Development

### 启动本地服务器 / Start Local Server

```bash
# 在项目根目录启动HTTP服务器 / Start HTTP server in project root
cd /Users/Apple/Desktop/multi-agent-dsl-final
python3 -m http.server 8080

# 访问本地网站 / Access local website
open http://localhost:8080
```

### 开发模式 / Development Mode

```bash
# 启动后端服务 / Start backend service
python backend/main.py

# 启动前端服务 / Start frontend service
cd frontend && npm start

# 访问完整系统 / Access full system
open http://localhost:3001
```

## 📝 更新说明 / Update Notes

### 版本历史 / Version History
- **v2.1.0** - 企业级网页设计，虚拟演示功能 / Enterprise web design, virtual demo features
- **v2.0.0** - 多智能体DSL框架核心功能 / Multi-agent DSL framework core features
- **v1.0.0** - 初始版本 / Initial version

### 最新更新 / Latest Updates
- ✅ 企业级网页设计 / Enterprise web design
- ✅ 虚拟演示功能 / Virtual demo functionality
- ✅ 响应式布局 / Responsive layout
- ✅ 双语支持 / Bilingual support
- ✅ 性能优化 / Performance optimization

## 🎯 使用建议 / Usage Recommendations

### 最佳实践 / Best Practices
1. **定期更新**: 保持项目文件最新 / Keep project files updated
2. **测试验证**: 部署前本地测试 / Test locally before deployment
3. **文档维护**: 及时更新README / Keep README updated
4. **版本控制**: 使用语义化版本号 / Use semantic versioning

### 性能优化 / Performance Optimization
1. **图片压缩**: 优化图片文件大小 / Optimize image file sizes
2. **缓存策略**: 合理使用浏览器缓存 / Use browser caching effectively
3. **CDN加速**: 考虑使用CDN服务 / Consider CDN services
4. **代码压缩**: 生产环境压缩代码 / Minify code for production

---

**部署完成后，您的Multi-Agent DSL Framework项目将在GitHub上完整展示！**

**After deployment, your Multi-Agent DSL Framework project will be fully showcased on GitHub!**
