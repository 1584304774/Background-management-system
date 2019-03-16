function Login(container) {
	this.container = container;
	this.init();
}
Login.model = `<div class="login">
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
							<div class="alert alert-info" role="alert" id="js_register">去注册</div>
						</div>
						<button type="button" class="btn btn-info login_btn" id="login_btn">登陆</button>
					</form>
				</div>`;
Login.prototype = {
	init(){
		//添加元素
		this.ele = $("<div class='content'></div>");
		this.ele.append(Login.model);
		this.container.append(this.ele);
		this.jumpToRegister();
		this.LoginBtn();
	},
	jumpToRegister(){
		//点击去注册跳转到注册页面.$.proxy()类似于bind()，也是为了改变this指向,其参数中的第二个this将createRegister的this指向Login
		this.ele.find("#js_register").on("click",$.proxy(this.createRegister,this));
	},
	createRegister(){//创建注册页面
		new Page().createEle(false);
	 },
	LoginBtn(){
		this.ele.find("#login_btn").on("click",$.proxy(this.LoginBtnEvent,this));
	},
	LoginBtnEvent(){
		var userInfo = {
			uname:this.ele.find("#userUname").val(),
			pwd:this.ele.find("#userPwd").val()
		}
		$.ajax({
			type:"post",
			url:"/api/login",
			data:userInfo,
			success:$.proxy(this.LoginSucc,this)
		})
	},
	LoginSucc(data){
		console.log(data)
		if(data.status){//说明登录成功
			location.href = "http://localhost:3000/html/detail.html";
		}
	}
}
