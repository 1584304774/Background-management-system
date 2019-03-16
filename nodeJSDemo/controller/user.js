//该文件的作用是进行登录注册的判断逻辑，上一步是数据的增删改查函数封装（model中的user.js）
//引入之前定义好的数据库中数据的增删改查
const myModel = require("../model/user");
//引入sha256加密模块
const crypto = require("crypto");
//引入token（需要先安装：cnpm install jsonwebtoken -S）
const jwt = require("jsonwebtoken");
//注册的判断
const register = (req,res)=>{
	//因为数据是用post的方式传到数据库的，所以需要用req.body接收
	//点击注册按钮时在终端显示输入的用户名和密码（对象的形式）
	var uname = req.body.uname;
	var pwd = req.body.pwd;
	//现在数据库中寻找当前注册的用户名是否存在，如果不存在存入数据库中，如果存在则不存入数据库
	//根据uname来查找
	myModel.userFind({uname},function(data){
		//当查找的数据为空时，存入数据库中
		if(!data){
			//创建sha256加密算法
			const hash = crypto.createHash("sha256");
			//需要加密的字符
			hash.update(pwd);
			myModel.userAdd({
				uname:uname,
				pwd:hash.digest("hex")//加盐，使密码加密，生成随机字符
			},function(){
				//成功存入数据库后提示注册成功
				res.json({
					status:true,
					info:"注册成功"
				});
			});
		}else{//当前查找的数据不为空，证明该用户名已存在
			res.json({//通过res.json()返回一个对象(express特有)，res.end()返回的是字符串
				status:false,
				info:"用户名存在"
			});
		}
	});
}
const login = (req,res)=>{
	//当前输入框内的用户名和密码
	var uname = req.body.uname;
	var pwd = req.body.pwd;
	myModel.userFind({uname},function(data){
		if(data){//该用户在数据库中存在
			//因为保存在数据库中的密码是加密过的，所以当前输入框的密码也需要进行加密之后才进行匹配
			const hash = crypto.createHash("sha256");
			hash.update(pwd);
			if(data.pwd == hash.digest("hex")){
				//登录成功后设置token
				//sign()方法中的第一个参数是相关信息，第二个参数是密钥即随机字符，第三个参数是过期时间
				let token = jwt.sign({uname},"hex",{'expiresIn':'1h'})//uname需要与上面的uname保持一致
                //种cookie
                res.cookie("token",token)
				res.cookie("userInfo",uname)
				
				res.json({
					status:true,
					info:"登录成功"
				});
			}else{
				res.json({
					status:false,
					info:"密码不正确"
				});
			}
		}else{//如果根据用户名找到的数据为null，则证明该用户没有注册过
			res.json({
				status:false,
				info:"用户不存在"
			});
		}
	})
}		
module.exports = {
	register,
	login
}

