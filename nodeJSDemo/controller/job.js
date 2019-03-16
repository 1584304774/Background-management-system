//职能添加的业务逻辑,上一步是model/job.js中对于addjob函数的封装（addjob函数的作用是将职能信息添加到数据库中）
var jobModel = require("../model/job");
const addjob = (req,res)=>{
	let {
		//这里的参数需要和public/js/js/detail/job.js中传入服务器的key值相对应(formDate.append("jobName",jobName.val());)
		jobName,
		jobPrice,
		jobReq,
		companyName
	} = req.body;//是通过post的方式将职能传递到服务器
	//req.files中保存着存入图片的所有信息（一个对象，键为存入服务器的key值：logo，值为一个数组），req.files.logo为一个数组，里面包含着图片的所有信息
	//req.files.logo[0].path保存着图片在本项目中的绝对路径（public\\img\\1.jpg），但是需要将其转换为http://localhost:3000/public\img\1.jpg的形式
	let path = req.files.logo[0].path;
	var reg = /public\\img\\(.+)/;//在服务端中解析\不能使用\\，(.+)中.表示任意字符，+表示1到多个字符
	var newPath = path.replace(reg,($0,$1)=>{
		//$0表示匹配整个正则，$1表示reg中第一个括号里的内容，如果有$2则表示reg中的第二个括号的内容
		var str = "http://localhost:3000/img/";//此时的图片是以detail.html起点开始找的，所以前面的路径应该要把public去掉，直接找到img文件夹，不然图片的路径会寻找不到
		return str += $1;
	})
	jobModel.addJob({jobName,jobPrice,jobReq,companyName,logo:newPath},(data)=>{
		if(data){//如果data存在，则证明已经在数据库中添加成功(data输出的是在数据库中的数据)
			res.json({
				status:true,
				info:"添加成功"
			})
		}else{
			res.json({
				status:false,
				info:"添加失败"
			})
		}
	})
}
const getjob = (req,res)=>{
	let {page,limit} = req.query;//req.query包含着传递过来的page和limit
	jobModel.getJob({page,limit},(data,count)=>{
		if(data.length > 0){//获取到了查找的所有数据
			res.json({
				status:true,
				info:"获取数据成功",
				data:data,//将获取到的所有数据保存在一个对象中，用来后面的使用
				count//在model/job.js中的getJob函数中已经定义了count值（数据的总量）
			})
		}else{
			res.json({
				status:false,
				info:"获取数据失败"
			})
		}
	});
}
const deljob = (req,res)=>{
	let {id} = req.query;//通过get方式传输数据，在req.query中将id值赋值给变量id
	//根据_id来寻找到对应的数据，在将其删除
	jobModel.delJob({_id:id},(data)=>{
		if(data){//data返回的是删除成功后受影响的行数（在mongoose中删除数据后的返回值为收到影响的行数）
			res.json({
				status:true,
				info:"删除成功"
			})
		}else{
			res.json({
				status:false,
				info:"删除失败"
			})
		}
	})
}
const findjob = (req,res)=>{
	let {id} = req.query;
	//通过_id来寻找到相应的数据
	jobModel.findJob({_id:id},(data)=>{
		res.json({
			status:true,
			info:"查找数据成功",
			data:data
		})
	})
}
const modifyjob = (req,res)=>{
	let {jobName,jobPrice,jobReq,companyName,id} = req.body;//数据是通过post方式传输的
	//req.files中保存着存入图片的所有信息（一个对象，键为存入服务器的key值：logo，值为一个数组），req.files.logo为一个数组，里面包含着图片的所有信息
	//req.files.logo[0].path保存着图片在本项目中的绝对路径（public\\img\\1.jpg），但是需要将其转换为http://localhost:3000/public\img\1.jpg的形式
	let path = req.files.logo[0].path;
	var reg = /public\\img\\(.+)/;//在服务端中解析\不能使用\\，(.+)中.表示任意字符，+表示1带多个字符
	var newPath = path.replace(reg,($0,$1)=>{
		//$0表示匹配整个正则，$1表示reg中第一个括号里的内容，如果有$2则表示reg中的第二个括号的内容
		var str = "http://localhost:3000/img/";//此时的图片是以detail.html起点开始找的，所以前面的路径应该要把public去掉，直接找到img文件夹，不然图片的路径会寻找不到
		return str += $1;
	})
	//通过_id来找到相应的数据，更改后的数据为新获取到的数据
	jobModel.modifyJob({_id:id},{jobName,jobPrice,jobReq,companyName,logo:newPath},()=>{
		res.json({
			status:true,
			info:"修改成功"
		})
	})
}
module.exports = {
	addjob,
	getjob,
	deljob,
	findjob,
	modifyjob
}