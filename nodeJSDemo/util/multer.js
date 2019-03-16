//引入multer模块，主要应用与图片或文件的上传
const multer = require("multer");
//第一件事情 读文件     将文件放在指定的区域
//第二件事件 更改文件名称

//配置项
var storage = multer.diskStorage({
    
    //将上传的文件存储在指定的位置
    destination: function (req, file, cb) {
       //浏览器在执行项目时，会从public文件夹开始，所以将图片保存在项目中时的路径是以public文件夹开始的
      cb(null, './public/img')
    },
    //将上传的文件做名称的更改
    filename: function (req, file, cb) {
       //file.originalname保存着图片的名称
      cb(null,  Date.now()+"-"+file.originalname);//在图片名称的前面加上时间戳，以防上传同一张图片时会被覆盖
    }
  })

var upload = multer({ storage: storage })
//指定当前字段可以携带多少个文件
//name的属性值需要和public/js/js/detail/job.js中formDate.append("logo",logo[0].files[0]);定义的属性名相同
//maxCount表示最多可以携带多少个文件
var cpUpload = upload.fields([{ name: 'logo', maxCount: 1 }])

//导出配置项以供routes/job.js中调用
module.exports = {
    cpUpload
}