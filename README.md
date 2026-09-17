# 今天吃什么 · 餐厅转盘

一个单文件的纯 HTML 网页应用：输入地址和距离范围，把周边餐厅装进转盘，指针停在谁就去吃谁。

当前状态：**功能已完成**（`index.html` 单文件，双击即可运行），内置 Mock 演示数据，可离线跑通完整流程（设置 → 列表 → 转盘 → 结果），并已支持自定义转盘、黑名单、历史记录、分享图。要上线，还差「部署」和「接真实餐厅数据」两件事。

## 这个项目和你那个 GTA6 情报站的区别

| | 本项目（转盘） | GTA6 情报站 |
|---|---|---|
| 技术栈 | **纯 HTML + CSS + 原生 JS，单文件** | Next.js 16 + React + TypeScript |
| 构建 | 不用构建，浏览器直接打开 | 要 `npm run build` 生成静态页 |
| 内容 | 数据来自高德地图 API（实时） | Markdown 文件 |
| 语言 | 单语言（中文） | 4 语言 |
| 部署 | 静态托管（Cloudflare Pages） | Cloudflare Pages |

**结论**：这个项目简单得多，不需要 Node/React/Next 那套工具链。`website/docs/` 里的架构文档大部分是 Next.js 专属的，所以这里只把**通用部分**（部署、域名、DNS、Git、Cloudflare 坑）抽出来适配成两份文档。

## 文档索引

- **[网站搭建与部署流程.md](./网站搭建与部署流程.md)** —— 从改名到上线 Cloudflare Pages 的完整步骤
- **[代码完善清单.md](./代码完善清单.md)** —— 接高德地图真实数据、安全提醒、剩余待办

## 现在就能用

`index.html` 已是可直接运行的工作版本，双击用浏览器打开即可本地预览（当前用 Mock 演示数据）。要上线，按 [网站搭建与部署流程.md](./网站搭建与部署流程.md) 推到 GitHub + Cloudflare Pages 即可。

> 想看 GTA6 情报站那套 Next.js 的完整原始文档（架构、i18n、SEO、踩坑），在 `..\website\docs\architecture-and-deployment.md` 和 `..\website\docs\website-principles-guide.md`。
