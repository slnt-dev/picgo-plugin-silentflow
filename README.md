# picgo-plugin-silentflow

<p align="center">
  <img src="https://img.shields.io/npm/v/picgo-plugin-silentflow?style=flat-square" alt="npm version">
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="license">
  <img src="https://img.shields.io/badge/PicGo-2.3.0%2B-green?style=flat-square" alt="PicGo Version">
</p>

> **Silent Services for Knowledge Workers.**
> 
> 专为 **[SilentFlow](https://slnt.dev)** 图床服务打造的官方 PicGo 插件。
> 完美适配 **Obsidian / Typora / Logseq**，让写作体验重回专注。

---

## ✨ 为什么选择 SilentFlow?

专为知识工作者打造的极速图床服务，做好三件事：**极速、稳定、省心**。

*   **⚡️ 全球加速**: 底层依托 **阿里云 OSS** 与 **Cloudflare Edge Network**。无论你的读者身在何处，图片都能秒级加载。
*   **🧠 零配置**: 告别 Bucket、Region、ACL、AccessKey 的繁琐配置。填入一个密钥，即刻开始。
*   **🛡️ 隐私纯净**: 自动清洗云厂商追踪标识与元数据 (EXIF)，只保留最纯净的图片链接，保护数字隐私。
*   **� 简单透明**: 拒绝按请求次数和流量计费的无底洞。简单的固定订阅制 (¥6/月起)，无隐形账单。

👉 **还没有账号？** [立即获取 (¥6/月起)](https://slnt.dev/#pricing)

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
| **API Key** | 你的专属密钥 | `sk_live_xxxxxxxxxxxx` ([点击获取](https://slnt.dev)) |

> **💡 Pro Tip:** 建议在 PicGo 设置中开启 **「上传前重命名」** 或 **「时间戳重命名」**，以避免文件名冲突。

---

## � 软件集成 (Obsidian / Typora / Logseq)

SilentFlow 旨在为知识类软件提供无缝的图片上传体验。

👉 **详细配置教程请查阅：[SilentFlow 官方文档](https://slnt.dev/docs)**

### 给 Obsidian 用户的最佳实践
1.  安装 **[Image Auto Upload Plugin](https://github.com/renmu123/obsidian-image-auto-upload-plugin)** (配合 PicGo 使用)。
2.  **强烈建议**在插件设置中开启 **"Save Image Locally" (保存本地副本)** 功能。
    *   *数据安全黄金法则：无论云端多么可靠，本地永远保留这一份原始文件。*
3.  粘贴截图 -> 自动上传 -> 替换链接。无需任何额外操作。

---

## ❓ 常见问题 (FAQ)

**Q: 如果不续费，图片会失效吗？**
A: **不会立即失效。** 订阅到期后，账号将进入“只读保护期”。您无法上传新图片，但已上传的图片只要未触犯法律法规，将保留相当长的一段时间供您从容迁移或续费。

**Q: 流量用完了会怎么样？**
A: **上传暂停，但浏览不受影响。** 为了防止产生额外费用，当月流量耗尽后系统将暂停上传功能，直到下个月 1 日自动重置。

**Q: 我的数据安全吗？**
A: 安全。
1. **传输安全：** 全程 HTTPS 加密传输。
2. **存储安全：** 企业级 OSS 对象存储，多重异地容灾。
3. **数据主权：** 支持绑定自定义域名。未来若需迁移，可一键导出原始文件结构，实现无缝切换。

**Q: 哪里反馈问题？**
A: 请访问 [GitHub Issues](https://github.com/slnt-dev/picgo-plugin-silentflow/issues) 或联系客服 `support@slnt.dev`。

---

## 📄 License

MIT © [Silent Lab](https://github.com/slnt-dev)