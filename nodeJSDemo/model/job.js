//该文件的作用是进行数据的增删改查函数的封装,将函数导出以供controller/job.js中对于信息的逻辑判断使用
//引入连接好的数据库
const mongoose = require("../util/database").mongoose;
//定义数据库中表的字段类型（创建jobs表）
const Job = mongoose.model("job",{
	jobName:String,
	jobPrice:String,
	jobReq:String,
	companyName:String,
	logo:String
})
//封装addjob函数，以供controller/job.js中调用，进行业务逻辑判断
const addJob = (JobInfo,cb)=>{
	let job1 = new Job(JobInfo);
	job1.save().then((res)=>{
		cb(res);
	})
}
const getJob = (JobInfo,cb)=>{
	let count;//数据的总量
	//寻找所有数据
	Job.find().then((res)=>{
		count = res.length;
	})
	//后端分页的思想：（当前页码-1）*每页显示的数量
	//mongoose中利用skip()方法跳过多条数据，limit()方法显示多条数据
	//在joblist.js中的getJobList函数中已经将page（当前页码）和limit（每页显示的数量）传递到了服务器中
	//JobInfo.limit输出的结果是一个字符串，所以需要转换为数值型
	Job.find().skip((JobInfo.page-1)*JobInfo.limit).limit(Number(JobInfo.limit)).then((res)=>{
		cb(res,count);
	})
}
const delJob = (JobInfo,cb)=>{
	Job.remove(JobInfo).then((res)=>{
		cb(res);
	});
}
const findJob = (JobInfo,cb)=>{
	//只寻找一个便可
	Job.findOne(JobInfo).then((res)=>{
		cb(res);
	})
}
const modifyJob = (JobInfo,UpdateInfo,cb)=>{
	Job.update(JobInfo,{$set:UpdateInfo}).then((res)=>{
		cb(res);
	})
}
module.exports = {
	addJob,
	getJob,
	delJob,
	findJob,
	modifyJob
}
