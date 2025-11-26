import { PicGo } from 'picgo'
import sharp from 'sharp'

interface SilentFlowConfig {
  url: string
  token: string
  autoCompress?: boolean
}

export = (ctx: PicGo) => {
  const register = () => {
    ctx.helper.uploader.register('silentflow', {
      handle,
      name: 'SilentFlow',
      config: config
    })
  }

  const handle = async (ctx: any) => {
    // 1. 获取配置
    let userConfig: SilentFlowConfig = ctx.getConfig('picBed.silentflow')
    if (!userConfig) {
      throw new Error('请先配置 SilentFlow 插件。获取 Key: https://slnt.dev')
    }

    const url = userConfig.url.replace(/\/$/, '') // 去掉末尾的斜杠
    const token = userConfig.token
    const autoCompress = userConfig.autoCompress !== false // 默认为 true

    // 2. 遍历图片列表进行上传
    const imgList = ctx.output
    for (const img of imgList) {
      if (img.fileName && img.buffer) {
        let image = img.buffer

        // 客户端压缩
        if (autoCompress && (img.extname === '.png' || img.extname === '.jpg' || img.extname === '.jpeg')) {
          try {
            ctx.log.info(`[SilentFlow] Compressing ${img.fileName}...`)
            image = await sharp(image)
              .webp({ quality: 80 })
              .toBuffer()
            img.buffer = image
            img.fileName = img.fileName.replace(/\.[^/.]+$/, "") + ".webp"
            img.extname = '.webp'
            ctx.log.success(`[SilentFlow] Compressed to WebP`)
          } catch (e: any) {
            ctx.log.error(`[SilentFlow] Compression failed: ${e.message}`)
            // 压缩失败降级为原图上传
          }
        }

        // 3. 构造请求参数
        const postConfig: any = {
          method: 'POST',
          url: `${url}/upload`,
          headers: {
            'Authorization': `Bearer ${token}`,
            'User-Agent': 'PicGo-Plugin-SilentFlow/1.0',
            'Content-Type': 'multipart/form-data'
          },
          formData: {
            file: {
              value: image,
              options: {
                filename: img.fileName,
                contentType: undefined
              }
            }
          }
        }

        try {
          // 4. 发起请求 (使用 PicGo 内置的 request)
          const body = await ctx.request(postConfig)

          // 5. 解析返回结果
          const result = typeof body === 'string' ? JSON.parse(body) : body

          if (result.url) {
            img.imgUrl = result.url
          } else {
            throw new Error('后端未返回 URL。请检查 Key 是否有效: https://slnt.dev')
          }
        } catch (err: any) {
          ctx.log.error(`SilentFlow 上传失败: ${err.message}`)
          ctx.emit('notification', {
            title: '上传失败',
            body: err.message
          })
          throw err
        }
      }
    }
    return ctx
  }

  const config = (ctx: any) => {
    let userConfig: SilentFlowConfig = ctx.getConfig('picBed.silentflow')
    return [
      {
        name: 'url',
        type: 'input',
        default: userConfig?.url || '',
        message: '后端 Worker 地址 (例如 https://xxx.workers.dev)',
        required: true
      },
      {
        name: 'token',
        type: 'password',
        default: userConfig?.token || '',
        message: 'API Key (例如 sk_test_...)',
        required: true
      },
      {
        name: 'autoCompress',
        type: 'confirm',
        default: userConfig?.autoCompress !== false,
        message: '是否开启自动压缩 (转为 WebP 80%)',
        required: true
      },
      {
        name: 'help',
        type: 'input',
        default: 'Get Key: https://slnt.dev',
        message: 'No Key? Visit slnt.dev',
        required: false,
        alias: '获取密钥'
      }
    ]
  }

  return {
    register,
    uploader: 'silentflow'
  }
}