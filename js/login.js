define(["jquery"],function($){
    function loginSend(){
        $("#login-button").click(function(){
            $.ajax({
                type:"post",
                url:"./php/login.php",
                data:{
                    username:$(".inputs-1").eq(0).val(),
                    password:$(".inputs-2").eq(0).val(),
                },
                success:function(result){
                    var obj = JSON.parse(result);

                    if(obj.code == 0){
                        alert("登录成功");
                    }else{
                        alert("用户名或密码错误")
                    }
                },
                error:function(msg){
                    console.log(msg);
                }
            })
        })
    }
    return {
        loginSend:loginSend
    }
})