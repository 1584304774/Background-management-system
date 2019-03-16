function Page(){
	this.container = $(".login_container");
	this.flag = true;
	this.init();
}
Page.prototype = {
	init(){
		this.createEle();
	},
	createEle(params=this.flag){//传入参数时使用params，不传入参数时使用this.falg
		this.container.html("");//先清空再创建元素
		if(params){
			//传参数时跳转到登录
			this.login = new Login(this.container);
		}else{
			//不传参数时跳转到注册
			this.register = new Register(this.container);
		}
	}
}
new Page();//实例化
