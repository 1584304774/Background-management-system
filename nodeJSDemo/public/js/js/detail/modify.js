function Modify() {
    this.btn = $("#modifybtn");
    this.init();
}
Modify.prototype = {
    init() {
        this.btn.on("click", $.proxy(this.ModifyEvent, this))
    },
    ModifyEvent() {
        //创建formDate表单，模拟表单传递数据。formDate有兼容性问题
        var formData = new FormData();
        //获取到弹出的对话框的所有输入框
        var jobName = $("#modify_jobname");
        var jobPrice = $("#modify_jobprice");
        var jobReq = $("#modify_jobreq");
        var companyName = $("#modify_companyname");
        var logo = $("#modify_logo");
        //获取到确认修改按钮的自定义属性
        var id = this.btn.attr("data-id");
        //通过append将修改后的信息存入数据库(前面的是key值，是服务端接收的key值)
        formData.append("jobName", jobName.val());
        formData.append("jobPrice", jobPrice.val());
        formData.append("jobReq", jobReq.val());
        formData.append("companyName", companyName.val());
        formData.append("logo", logo[0].files[0]);//获取到的原本是jquery对象，需要转换为dom对象（因为files属性是dom对象的属性）
        formData.append("id",id);
        $.ajax({
            type:"post",
            url:"/job/modifyjob",
            data:formData,
            cache:false,//清除缓存
            contentType:false,//发送信息至服务器时内容编码类型
            processData:false,//默认情况下，通过data选项传递过来的数据，如果是一个对象（技术上讲只要不是字符串），都会处理转化成一个查询字符串，以配合默认内容类型"application/x-www-form-urlencoded"。如果要发送DOM树信息或其他不希望转换的信息，请设置为false
            success:$.proxy(this.ModifyEventSucc,this)
        })
    },
    ModifyEventSucc(data){
        if(data.status){
            //如果修改成功，则重新进行职能详情的获取和页面的渲染
            new JobList().getJobList();
        }
    }
}
new Modify();