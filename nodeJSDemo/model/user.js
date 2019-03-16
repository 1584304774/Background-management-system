//该文件的作用是进行数据库的增删改查，上一步是数据库的连接(util文件夹)，下一步是一些登录注册的判断逻辑(controller)
//引入连接到的数据库
const mongoose = require("../util/database").mongoose;
//定义数据库表中的字段(创建users表)
const User = mongoose.model("user",{
    uname:String,
    pwd:String
});
//函数的封装
const userFind = (userInfo,cb)=>{//先进行数据的查找，当用户名存在时则不存入数据库，不存在才存入
//userInfo为之前定义过的保存的用户名和密码(register.js文件中)
    User.findOne(userInfo).then((res)=>{
        cb(res);
    });
}


//数据的增加
const userAdd = (userInfo,cb)=>{
    let user1 = new User(userInfo);
    user1.save().then((res)=>{
        cb(res);
    });
}

//将数据的查找和增加导出，以便之后使用
module.exports = {
    userFind,
    userAdd
}