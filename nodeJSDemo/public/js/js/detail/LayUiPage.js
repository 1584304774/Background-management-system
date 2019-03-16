//分页的效果
function LayUiPage(n){//在joblist.js中定义了n(数据的总量)
    this.main = $(".main_right");
    this.flag = true;
    this.count = n;//用来记录数据总量
    this.init();
}
LayUiPage.prototype = {
    init(){
        //使用laypage中间件来配置分页效果
        layui.use("laypage",$.proxy(this.LayPageEvent,this));
    },
    LayPageEvent(){
		//调用分页模块
        var laypage = layui.laypage;
		//分页的配置项
        laypage.render({
            elem:"page",//(指向存放分页的容器，值可以是容器ID、DOM对象)在detail.html中有一个id名为page的div（此处不能使用#，只使用id名）
            count:this.count,//用来记录数据总量(数据总数。一般通过服务端得到)
            limit:3,//每页显示3条数据(每页显示的条数。laypage将会借助 count 和 limit 计算出分页数)
            groups:3,//连续出现的页码个数
            prev:"上一页",//自定义“上一页”的内容，支持传入普通文本和HTML
            next:"下一页",//自定义“下一页”的内容，同上
            jump:$.proxy(this.LayPageSucc,this)//切换分页的回调函数，函数返回两个参数：obj（当前分页的所有选项值）、first（是否首次，一般用于初始加载的判断）
            //obj包含了当前分页的所有参数，比如：obj.curr:得到当前页，以便向服务端请求对应页的数据。obj.limit:得到每页显示的条数
        })
    },
    LayPageSucc(obj){
        //刚开始时flag为true,当前是第一页时不需要进行职能详情的获取和页面的渲染，之后flag设为false，即点击第二页的时候才进行渲染
        if(!this.flag){//当flag为false时，执行里面的代码
            //obj.curr:得到当前页，以便向服务端请求对应页的数据。obj.limit:得到每页显示的条数
            //在joblist.js中也用参数接收这两个参数
            new JobList().getJobList(obj.curr,obj.limit);//主要的作用是进行职能详情的获取和页面的渲染
        }   
        this.flag = false;
    }
}