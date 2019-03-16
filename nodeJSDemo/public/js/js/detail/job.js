//职能添加页面,点击“职能添加”时显示
function Job() {
	this.main = $("#addJob");
	this.clear = $("#jobList");
	this.init();
}
Job.model =
	`<form>
                <div class="form-group">
                    <label for="job_name">职位</label>
                    <input type="text" class="form-control" id="job_name" placeholder="请输入职位名称">
                </div>
                <div class="form-group">
                    <label for="job_price">薪资</label>
                    <input type="text" class="form-control" id="job_price" placeholder="请输入薪资">
                </div>
                <div class="form-group">
                    <label for="job_req">要求</label>
                    <input type="text" class="form-control" id="job_req" placeholder="请输入招聘要求">
                </div>
                <div class="form-group">
                    <label for="company_name">公司名称</label>
                    <input type="text" class="form-control" id="company_name" placeholder="请输入公司名称">
                </div>
                <div class="form-group">
                    <label for="logo">上传公司logo</label>
                    <input type="file" id="logo" multiple="multiple">
                </div>
                <button type="button" class="btn btn-default" id="jobBtn">上传</button>
            </form>`;
Job.prototype = {
	init() {
		this.ele = $("<div class='jobform'></div>");
		this.ele.append(Job.model);
		this.clear.html("");
		this.main.html(this.ele);//使用html(),如果使用了append()方法的话会将其他的内容追加到下面，而不是实现覆盖
		this.jobBtn();
	},
	jobBtn() {
		this.ele.find("#jobBtn").on("click", $.proxy(this.jobBtnEvent, this));
	},
	jobBtnEvent() {
		//创建formDate表单，模拟表单传递数据。formDate有兼容性问题
		var formData = new FormData();
		var jobName = this.ele.find("#job_name");
		var jobPrice = this.ele.find("#job_price");
		var jobReq = this.ele.find("#job_req");
		var companyName = this.ele.find("#company_name");
		var logo = this.ele.find("#logo");
		if (jobName.val() && jobPrice.val() && jobReq.val() && companyName.val()) {
			//key值是服务端接收的值(是服务端定义的key值)
			formData.append("jobName",jobName.val());
			formData.append("jobPrice",jobPrice.val());
			formData.append("jobReq",jobReq.val());
			formData.append("companyName",companyName.val());
			formData.append("logo",logo[0].files[0]);//获取到的原本是jquery对象，需要转换为dom对象（因为files属性是dom对象的属性）
			$.ajax({
				type:"post",
				url:"/job/addjob",
				data:formData,
				cache:false,//清除缓存
				contentType:false,//禁止将数据转换成其他格式
				processData:false,
				success:$.proxy(this.jobBtnEventSucc,this)
			})
		}
	},
	jobBtnEventSucc(data) {
		if (data.status) {
			alert("添加成功");
			//在弹出提示框之后将详情显示出来（使用html()方法进行覆盖）
			new JobList().getJobList();//主要的作用是进行职能详情的获取和页面的渲染
			//将选项卡的样式也改变
			//$(this.main.parent().find("ul li").eq(1)).addClass("active").siblings().removeClass("active");
		}
	}
}
