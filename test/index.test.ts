import plugin from '../src/index'

describe('PicGo Plugin SilentFlow', () => {
    const ctx: any = {
        getConfig: jest.fn(),
        output: [],
        request: jest.fn(),
        log: {
            error: jest.fn()
        },
        emit: jest.fn(),
        helper: {
            uploader: {
                register: jest.fn()
            }
        }
    }

    beforeEach(() => {
        jest.clearAllMocks()
        ctx.output = []
    })

    it('should register the plugin', () => {
        const p = plugin(ctx)
        p.register()
        expect(ctx.helper.uploader.register).toHaveBeenCalledWith('silentflow', expect.anything())
    })

    it('should throw error if config is missing', async () => {
        ctx.getConfig.mockReturnValue(undefined)
        const p = plugin(ctx)
        // Access the handle function from the register call or directly if exposed
        // Since handle is internal to the closure, we need to extract it from the register call
        // But for testing, we might need to export handle or simulate the registration

        // Actually, the plugin returns { register, uploader: 'silentflow' }
        // The handle function is passed to register. 
        // Let's capture the handle function.

        let handle: any
        ctx.helper.uploader.register.mockImplementation((name: string, module: any) => {
            handle = module.handle
        })

        p.register()

        await expect(handle(ctx)).rejects.toThrow('请先配置 SilentFlow 插件')
    })

    it('should upload image successfully', async () => {
        ctx.getConfig.mockReturnValue({
            url: 'https://api.slnt.dev',
            token: 'test-token'
        })
        ctx.output = [{
            fileName: 'test.png',
            buffer: Buffer.from('test')
        }]

        ctx.request.mockResolvedValue({
            url: 'https://slnt.dev/image.png'
        })

        let handle: any
        ctx.helper.uploader.register.mockImplementation((name: string, module: any) => {
            handle = module.handle
        })
        const p = plugin(ctx)
        p.register()

        await handle(ctx)

        expect(ctx.request).toHaveBeenCalledWith(expect.objectContaining({
            url: 'https://api.slnt.dev/upload',
            headers: expect.objectContaining({
                'Authorization': 'Bearer test-token'
            })
        }))
        expect(ctx.output[0].imgUrl).toBe('https://slnt.dev/image.png')
    })

    it('should handle upload failure', async () => {
        ctx.getConfig.mockReturnValue({
            url: 'https://api.slnt.dev',
            token: 'test-token'
        })
        ctx.output = [{
            fileName: 'test.png',
            buffer: Buffer.from('test')
        }]

        ctx.request.mockRejectedValue(new Error('Network Error'))

        let handle: any
        ctx.helper.uploader.register.mockImplementation((name: string, module: any) => {
            handle = module.handle
        })
        const p = plugin(ctx)
        p.register()

        await expect(handle(ctx)).rejects.toThrow('Network Error')
        expect(ctx.log.error).toHaveBeenCalled()
        expect(ctx.emit).toHaveBeenCalledWith('notification', expect.anything())
    })
})
