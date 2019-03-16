//点击退出则刷新页面，相当于退到登录页面
$("#logout").on("click",function(){
    Cookies.remove("token");
    location.reload();//因为在auth.js中已经设置为如果token为空则回到登录页面
})
//面向对象的方式
// function Logout(){
//     this.init();
// }

// Logout.prototype = {
//     init(){
//         this.outBtn()
//     },
//     outBtn(){
//         $("#logout").on("click",$.proxy(this.handleLogoutBtn,this))
//     },
//     handleLogoutBtn(){
//         Cookies.remove("token");
//         location.reload();
//     }
// }

// new Logout();