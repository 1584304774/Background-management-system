function Register(container) {
	this.container = container;
	this.init();
}
Register.model = `<div class="login">
					<div class="logo">
						<img src="https://cas.1000phone.net/cas/images/login/logo.png">
					</div>
					<form class="form">
						<div class="form-group">
							<label for="userUname">用户名</label>
							<input type="email" class="form-control" id="userUname" placeholder="请输入用户名">
						</div>
						<div class="form-group">
							<label for="userPwd">密码</label>
							<input type="password" class="form-control" id="userPwd" placeholder="请输入密码">
						</div>
						<div class="form-group">
							<div class="alert alert-danger" role="alert">忘记密码?</div>
							<div class="alert alert-info" role="alert" id="js_login">去登录</div>
						</div>
						<button type="button" class="btn btn-info login_btn" id="login_btn">注册</button>
					</form>
				</div>`;
Register.prototype = {
	init(){
		//添加元素
		this.ele = $("<div class='content'></div>");
		this.ele.append(Register.model);
		this.container.append(this.ele);
		this.jumpToLogin();
		this.RegisterBtn();
	},
	jumpToLogin(){
		//点击跳转到登录
		this.ele.find("#js_login").on("click",$.proxy(this.createLogin,this));
	},
	createLogin(){
		//创建登录页面
		new Page().createEle(true);
	},
	RegisterBtn(){
		//点击注册按钮时触发的事件
		this.ele.find("#login_btn").on("click",$.proxy(this.RegisterBtnEvent,this));
	},
	RegisterBtnEvent(){
		//点击注册将用户名和密码存入数据库
		var uname = this.ele.find("#userUname").val();
		var pwd = this.ele.find("#userPwd").val();
		var userInfo = {
			uname:uname,
			pwd:pwd
		}	
		$.ajax({
			type:"post",
			url:"/api/register",
			data:userInfo,
			dataType:"json",
			success:$.proxy(this.RegisterSucc,this)
		})
	},
	RegisterSucc(data){
		//console.log(data);//如果成功了会显示{status: true, info: "注册成功"}
		if(data.status){//即注册成功时
			alert("注册成功，点击确定跳转");
			//创建登录页面，实际上就是注册成功后跳转到登录页面
			new Page().createEle(true);
		}
	}
}
