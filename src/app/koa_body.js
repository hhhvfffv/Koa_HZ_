

const koa_body_file = (app, koaBody, path, fs) => {
    app.use(async (ctx, next) => {
        try {
            await koaBody({
                multipart: true,
                formidable: {
                    uploadDir: path.join(__dirname, '../upload'),
                    keepExtensions: true,
                    onFileBegin: (name, file) => {
                        console.log("开始上传文件");
                        //定义可以上传文件的类型
                        const rightFileType = ['.jpg', '.png', '.gif', '.jpeg']
                        //获取文件的扩展名
                        const extname = path.extname(file.newFilename).toLocaleLowerCase()

                        //对比扩展名是否在数组中
                        if (!rightFileType.includes(extname)) {
                            file.write = () => { }
                            file.end = () => { }
                            file.on('end', () => {
                                fs.unlinkSync(file.filepath)
                            })
                            const err = new Error('文件类型不支持'); //创建错误对象
                            err.status = 403;   //设置状态码，用于读取
                            throw err; //抛出错误，触发onError  这个就是catch检测捕捉的err
                        }
                    }
                }
            })(ctx, next)
        } catch (err) {
            console.log(err)
            ctx.status = err.status || 500;
            ctx.body = {
                message: '上传失败',
                reslut: {
                    err: err.message
                }
            }
        }
    }
    )
}

module.exports = koa_body_file