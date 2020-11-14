define(["jquery"],function($){
    // console.log(1)
    function registerSend(){
        $("#register-button").click(function(){
            $.ajax({
                type:"post",
                url:"./php/register.php",
                data:{
                    username:$(".item-account").eq(0).val(),
                    password:$(".item-account").eq(1).val(),
                    repassword:$(".item-account").eq(2).val()
                },
                success:function(result){
                    var obj = JSON.parse(result);
                    
                    if(obj.code){
                        alert("注册失败");
                    }else{
                        alert("注册成功");
                    }
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        })
    }
    console.log("测试2");
    return {
        registerSend:registerSend
    }
})