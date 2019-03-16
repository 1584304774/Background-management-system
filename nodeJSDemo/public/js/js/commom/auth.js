let token = Cookies.get("token");
if(!token){//当token不存在时意味着处于退出状态，则退到登录页面(路由文件中已经写明访问根路径时跳到登录页面)
    location.href = "http://localhost:3000/";
}
let uname = Cookies.get("userInfo");//获取用户名
$("#inforName").html(uname);