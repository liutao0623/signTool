const BaseUrl =  process.env.NODE_ENV=='production'? '':'';
//如果是正式环境，其实不需要域名，本身打包发布后就放到主域名下的，所以前缀可以为空字符串。
//如果你都想加上域名，可以自行根据开发的环境变量判断取值，如process.env.NODE_ENV=='production'? process.env.BASE_API:'/api'
//我的这个evn.BASE_API的全局环境变量是在config/dev.env.js配置的，请自行对照配置
export default global.API_URL= {
    'getData': BaseUrl +'/api/toutiao/index',
    // 'addDuty': BaseUrl + '/onDuty/add',
    'getInfo': BaseUrl + '/polyv/live/v3/user/get-info'
}