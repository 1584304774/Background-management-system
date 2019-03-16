function JobList() {
    this.main = $("#jobList");//将职能详情列表添加在此处,那么main_right的内容便不会被清空
    this.clear = $("#addJob");//将职能添加项添加在此处
    this.flag = true;
}
JobList.prototype = {
    //里面的参数是由layuipage.js中传递过来，第一个参数是当前页，第二个参数是每页显示的数据量
    //分别赋予这两个参数一个默认值，但不传值时使用默认值，传值时使用所传的值
    getJobList(page=1,limit=3) {//主要的作用是进行职能详情的获取和页面的渲染
        page != 1 ? this.flag = false : this.flag = true;//判断当前是否是第一页，如果是则flag为true，否则为false
        $.ajax({
            type: "get",
            url: "/job/getjob",
            data:{page:page,limit:limit},//接收到LayUiPage.js中传递过来的page和limit，同时将这两个值上传到服务器中
            dataType: "json",
            cache:false,
            success: $.proxy(this.getSucc, this)
        })
    },
    getSucc(data) {
        //data为获取到的所有的数据，格式为{status: true, info: "获取数据成功", data: Array(2)}，所以真正的数据存放在了data.data这个数组中
        if (data.status) {
            this.ele = $("<div class='list'></div>");
            var str = "";
            for (var i = 0; i < data.data.length; i++) {
                //每条数据都有一个_id是唯一的标识，点击删除时根据_id来确认是哪一个
                var result = data.data[i];
                str += `<div class="listcon">
                <div class="jobcon">
                    <div class="jobconleft">
                        <div class="jobname">${result.jobName}</div>
                        <div class="jobreq">${result.jobReq}</div>
                    </div>
                    <div class="jobconright">
                        <div class="jobprice">${result.jobPrice}</div>
                    </div>
                </div>
                <div class="listconbottom">
                    <div class="companycon">
                        <div class="companylogo">
                            <img src="${result.logo}"/>
                        </div>
                        <div class="companyname">${result.companyName}</div>
                    </div>
                    <div class="operation" data-id='${result._id}'>
                        <button class="btn btn-danger delbtn">删除</button>
                        <button class="btn btn-info modifybtn" data-toggle="modal" data-target="#jobModel">修改</button>
                    </div>
                </div>   
            </div>`;
            }
            this.ele.append(str);
            //当点击删除时，需要请求ajax，这时所有的代码都会在此下面书写，显得累赘，所以需要用函数来将参数传递，从而可以在另一个函数值中去请求ajax
            //data.count为数据的总量，在model/job.js中已经定义（为获取到的数据的总长度）
            //如果flag为true，则表明当前是第一页（在上面对flag进行了判断），则执行下面的new LayUiPage()（该函数的作用是创建分页的效果）,若flag为false，则表明当前不是第一页，则不执行new LayUiPage()
            if(this.flag){
                this.Render(this.ele,data.count);
            }else{
                this.Render1(this.ele);
            }
        }       
    },
    Render(val,n){//用n接收data.count,LayUiPage来接收执行结果
        this.clear.html("");//将职能添加项清空，否则会显示在职能详情的上面
        this.main.html(val);
        //将每一个职能详情渲染出来后，再将分页的效果显示出来
        new LayUiPage(n);//将数据总量传递到LayUiPage函数中
        //遍历每一个删除按钮，添加点击事件
        $.each(this.ele.find(".delbtn"),$.proxy(this.EachEvent,this))
        //修改事件(通过ajax先获取到所点击修改按钮的职能详情数据，将其显示在弹出的对话框中，然后进行修改，之后对话框消失后将修改后的信息保存入数据库，再一次请求ajax将修改后的数据显示出来)
        this.Modify();
    },
    Render1(val){//用n接收data.count,LayUiPage来接收执行结果
        this.clear.html("");//将职能添加项清空，否则会显示在职能详情的上面
        this.main.html(val);
        //遍历每一个删除按钮，添加点击事件
        $.each(this.ele.find(".delbtn"),$.proxy(this.EachEvent,this))
        //修改事件(通过ajax先获取到所点击修改按钮的职能详情数据，将其显示在弹出的对话框中，然后进行修改，之后对话框消失后将修改后的信息保存入数据库，再一次请求ajax将修改后的数据显示出来)
        this.Modify();
    },
    EachEvent(i){
        //为第i个删除按钮添加点击事件，on()方法中的第二个参数i可以传递到DelBtnEvent()函数中使用(用e.data接收) 
        this.ele.find(".delbtn").eq(i).on("click",i,$.proxy(this.DelBtnEvent,this))
    },
    DelBtnEvent(e){
        //使用e.data来接收上一个函数传递过来的i
        var id = this.ele.find(".delbtn").eq(e.data).parent().data("id");
        var flag = confirm("确定删除？");
        if(flag){
            $.ajax({
                type:"get",
                url:"/job/deljob",
                data:{id},
                cache:false,//清除缓存
                dataType:"json",
                success:$.proxy(this.DelSucc,this)
            })
        }
    },
    DelSucc(data){
        if(data.status){
            this.ele = "";//this.ele(其实就是<div class='list'></div>)包含着所有的职能详情，所以当删除成功后，需要将页面清空，然后再一次进行页面的获取和渲染
            this.getJobList();//主要的作用是进行职能详情的获取和页面的渲染
        }
    },
    Modify(){
        var _this = this;
        //将_this传递给下面的函数
        this.ele.find(".modifybtn").on("click",_this,$.proxy(this.ModifyBtnEvent))
    },
    //该函数用e.data接收上面函数传递的_this
    ModifyBtnEvent(e){
        let id = $(this).parent().data("id");//$(this)指的是当前点击的修改按钮
        $.ajax({
            type:"get",
            url:"/job/findjob",
            data:{id},
            dataType:"json",
            success:$.proxy(e.data.ModifySucc,e.data)
        })
    },
    ModifySucc(data){
        //获取到弹出的对话框中所有的输入框
        var modifyjobname = $("#modify_jobname");
        var modifyjobprice = $("#modify_jobprice");
        var modifyjobreq = $("#modify_jobreq");
        var modifycompanyname = $("#modify_companyname");
        //获取到确认修改按钮
        var modifybtn = $("#modifybtn");
        //将通过ajax获取到的数据赋值给输入框(data是获取到的数据，里面中的data是一个对象，包含着所有的数据)
        modifyjobname.val(data.data.jobName);
        modifyjobprice.val(data.data.jobReq);
        modifyjobreq.val(data.data.jobPrice);
        modifycompanyname.val(data.data.companyName);
        //给确认修改按钮添加自定义属性
        modifybtn.attr("data-id",data.data._id);
    }
}