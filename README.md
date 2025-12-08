# picgo-plugin-silentflow

<p align="center">
  <img src="https://img.shields.io/npm/v/picgo-plugin-silentflow?style=flat-square" alt="npm version">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="license">
  <img src="https://img.shields.io/badge/PicGo-2.3.0%2B-green?style=flat-square" alt="PicGo Version">
</p>

> **Silent Services for a Noisy World.**
> 
> 专为 **[SilentFlow](https://slnt.dev)** 图床服务打造的官方 PicGo 插件。
> 让你的 **Obsidian / Typora / Logseq** 写作体验重回专注。

---

## ✨ 为什么选择 SilentFlow?

厌倦了配置 AWS S3 / 阿里云 OSS 的繁琐参数？担心按量付费的流量账单背刺？
**SilentFlow** 即使在充满噪音的技术世界里，也能为你提供一份**静谧、确定**的体验。

*   **⚡️ 全球加速**: 基于 Cloudflare 边缘网络 (Edge Network)，无论你的读者身在何处，图片都能秒级加载。
*   **🧠 零配置**: 告别 Bucket、Region、ACL。填入一个密钥，即刻开始。
*   **🛡️ 隐私纯净**: 自动清洗云厂商追踪标识与元数据，只保留最纯净的图片链接，保护你的数字隐私。
*   **🔒 数据主权**: 插件代码完全开源，你可以清楚地看到数据在离开你的设备前是如何被处理的。

👉 **还没有账号？** [立即获取密钥 (¥58/年)](https://slnt.dev)

---

## 🚀 安装指南

### 插件商店安装
1. 打开 **PicGo** 主界面。
2. 点击左侧 **「插件设置」**。
3. 在搜索框输入 `silentflow`。
4. 点击 **「安装」**，等待安装完成。


---

## ⚙️ 配置说明

安装完成后，在 PicGo 左侧选择 **「图床设置」** -> **「SilentFlow」**：

| 配置项 | 说明 | 示例 / 获取方式 |
| :--- | :--- | :--- |
| **API Endpoint** | 你的服务接口地址 | `https://slnt.dev` (默认即可) |
| **API Key** | 你的专属密钥 | `sk_xxxxxxxxxxxx` ([点击获取](https://slnt.dev)) |

> **💡 Pro Tip:** 建议在 PicGo 设置中开启 **「上传前重命名」** 或 **「时间戳重命名」**，以避免文件名冲突。

---

## 📝 最佳实践 (For Obsidian Users)

为了获得最佳的“无感”写作体验，建议配合 **Obsidian** 使用：

1.  安装 **[Image Auto Upload Plugin](https://github.com/renmu123/obsidian-image-auto-upload-plugin)** (或者 PicGo Core)。
2.  在 Obsidian 中粘贴截图。
3.  **SilentFlow** 插件会自动接管上传、并返回 HTTPS 链接。
4.  🎉 你只管写作，剩下的交给我们。

---

## ❓ 常见问题 (FAQ)

**Q: 我的图片数据安全吗？**
A: 安全。
1. **传输安全：** 全程 HTTPS 加密传输。
2. **存储安全：** 依托于企业级 OSS 存储。
3. **本地兜底：** 我们强烈建议您在 Obsidian 插件中开启 **"Save Image Locally" (保存本地副本)** 功能。无论发生什么，您的硬盘里永远有一份备份。

**Q: 哪里反馈问题？**
A: 请访问 [GitHub Issues](https://github.com/slnt-dev/picgo-plugin-silentflow/issues)。

---

## 📄 License

MIT © [Silent Lab](https://github.com/slnt-dev)