//该文件的作用是连接数据库，下一步要进行数据的增删改查，即M层（model）
//连接数据库
var mongoose = require("mongoose");
let url = "mongodb://127.0.0.1:27017/BK1824";
mongoose.connect(url);


module.exports = {//导出连接到的数据库
    mongoose:mongoose
}
