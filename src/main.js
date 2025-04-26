const app = require('./app/app');
const { APP_PORT } = require('./config/config.default')

//监听端口
app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}  http://localhost:${APP_PORT}`);

})