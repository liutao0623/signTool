export default{
    getSign(params){
        var str = params.appSecret
        var appSecret = params.appSecret
        delete params.appSecret
        var tempArr = Object.keys(params).sort();
        console.log(params,tempArr)
        for( var i in tempArr ){
             str = str + tempArr[i]+params[tempArr[i]]
        }
         str = str + appSecret
         return str;
    }
}