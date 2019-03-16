//选项卡
function TAB() {
	this.Li = $(".main_left ul li");
	this.init();
}
TAB.prototype = {
	init() {
		this.Li.on("click", $.proxy(this.TABClick)); //$.proxy()中的第二个参数this指向的是TAB，如果需要this指向Li，则需要将$.proxy()中的第二个参数去掉
	},
	TABClick() {
		$(this).addClass("active").siblings().removeClass("active");
		switch ($(this).index()) {
			//点击时获取下标，根据下标显示相应的内容
			case 0:
				break;
			case 1:
				new JobList().getJobList();//在joblist.js中已经获取到了职能的详情
				break;
			case 2://此时点击的是“职能添加”，则将表格添加到页面中
				new Job();//在job.js中已经将职能添加的表格创建
				break;
		}
	}
}
new TAB();
