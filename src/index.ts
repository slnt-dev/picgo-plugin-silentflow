import { PicGo } from 'picgo'

interface SilentFlowConfig {
  url: string
  token: string
}

export = (ctx: any) => {
  const register = () => {
    // 1. 注册上传器
    ctx.helper.uploader.register('silentflow', {
      handle,
      name: 'SilentFlow',
      config: config
    })

    if (ctx.gui) {
      // 2. 注册 GUI 菜单 (插件列表右下角齿轮/右键菜单)
      (ctx as any).gui.menu.register('silentflow', [
        {
          label: '📊 查看剩余用量',
          async handle (ctx: any, guiApi: any) {
            try {
              // 注意：这里必须读取 picBed.silentflow，因为这是用户配置上传器的地方
              const userConfig: SilentFlowConfig = ctx.getConfig('picBed.silentflow')
              
              if (!userConfig || !userConfig.url || !userConfig.token) {
                throw new Error('请先在上传器设置中配置 URL 和 Token')
              }

              const url = userConfig.url.replace(/\/$/, '')
              
              // 发起请求查询用量 (假设你的后端有 /user/usage 接口)
              const res = await ctx.request({
                method: 'GET',
                url: `${url}/user/usage`,
                headers: { 
                  'Authorization': `Bearer ${userConfig.token}`,
                  'User-Agent': 'PicGo-Plugin-SilentFlow/1.0'
                },
                json: true
              })

              // 格式化显示 (根据你实际后端返回的数据结构修改)
              // 假设返回结构是 { storage: { percent: string }, traffic: { used: number } }
              // 如果后端接口不同，请修改下方的 body 拼接逻辑
              const storageText = res.storage ? `已用存储: ${res.storage.percent}` : '存储数据获取中...'
              const trafficText = res.traffic ? `本月流量: ${(res.traffic.used / 1024 / 1024).toFixed(2)} MB` : ''

              // 弹窗通知
              ctx.emit('notification', {
                title: 'SilentFlow 用量统计',
                body: `${storageText}\n${trafficText}`
              })

            } catch (err: any) {
              ctx.log.error(`查询失败: ${err.message}`)
              ctx.emit('notification', {
                title: '查询用量失败',
                body: '请检查配置或网络，详情查看日志'
              })
            }
          }
        },
        {
          label: '🌐 打开管理后台',
          handle (ctx: any, guiApi: any) {
            // 调用 Electron 的 shell 打开外部浏览器
            try {
              require('electron').shell.openExternal('https://slnt.dev')
            } catch (e) {
              ctx.log.error('无法打开浏览器，非 Electron 环境？请手动打开 https://slnt.dev')
            }
          }
        }
      ])
    }
  }

  const handle = async (ctx: any) => {
    // 1. 获取配置
    let userConfig: SilentFlowConfig = ctx.getConfig('picBed.silentflow')
    if (!userConfig) {
      throw new Error('请先配置 SilentFlow 插件。获取 Key: https://slnt.dev')
    }

    const url = userConfig.url.replace(/\/$/, '') // 去掉末尾的斜杠
    const token = userConfig.token

    // 2. 遍历图片列表进行上传
    const imgList = ctx.output
    for (const img of imgList) {
      if (img.fileName && img.buffer) {
        let image = img.buffer

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
          // 4. 发起请求
          const body = await ctx.request(postConfig)
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
        default: userConfig?.url || 'https://slnt.dev',
        message: '后端 Worker 地址',
        required: true
      },
      {
        name: 'token',
        type: 'password',
        default: userConfig?.token || '',
        message: 'API Key (例如 sk_live_...)',
        required: true
      },
      {
        name: 'help',
        type: 'input',
        default: '还没有 Key? 访问 slnt.dev 获取',
        message: '还没有 Key? 访问 slnt.dev 获取',
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