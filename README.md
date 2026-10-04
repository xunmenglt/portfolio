# 刘腾｜AI 项目作品集

这是一个不依赖构建工具的静态作品集，可直接发布至 GitHub Pages。

## 页面结构

- `index.html`：作品集首页与项目入口
- `resume.html`：教育、实习、研究、竞赛与专业技能
- `cad-system.html`：广诚 CAD 内容识别系统
- `ai-projects.html`：金融垂域模型、Codura、智能审查与人才引擎
- `assets/`：从用户提供的 PPT 中提取的界面素材，以及样式和交互脚本

## 发布到 GitHub Pages

1. 在 GitHub 新建一个公开仓库，例如 `portfolio`。
2. 将本目录全部文件推送到默认分支（通常为 `main`）。
3. 打开仓库的 **Settings → Pages**，在 **Build and deployment** 中选择 **Deploy from a branch**。
4. 选择 `main` 分支和 `/ (root)` 文件夹，保存后等待 GitHub 发布。
5. 访问 GitHub 显示的 Pages 地址，确认首页可以打开后再生成二维码。

如果仓库名为 `portfolio`，默认访问地址通常是：`https://<GitHub 用户名>.github.io/portfolio/`。

## 简历二维码建议

二维码内容使用上述完整 HTTPS 链接。简历中同时放一行可点击的短链接，并在投递前用手机扫描测试。页面未使用外部字体、脚本或 CDN，便于在网络条件一般的环境下打开。
