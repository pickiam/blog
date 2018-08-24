export default {
    port: process.env.NODE_ENV === 'development' ? 3306 : 3306,
    url:  process.env.NODE_ENV === 'development' ? '118.24.69.214' : '120.55.188.107',
    dataBase: process.env.NODE_ENV === 'development' ? 'myblog' : 'datacollect',
    user: process.env.NODE_ENV === 'development' ? 'root' : 'mysql',
    password: process.env.NODE_ENV === 'development' ? 'root' : 'dell_270',
    tokenSecret: process.env.NODE_ENV === 'development' ? 'dojo': 'dojo',
    redis: process.env.NODE_ENV === 'development' ? {} : {},
    socketPath: process.env.NODE_ENV === 'development' ? 'dojo' : 'dojo',
    draftPostRedisKey: process.env.NODE_ENV === 'development' ? 'dojo' : 'dojo'
}