define(["jquery","jquery-cookie"],function($){
    function download(){

        var product_id = valueByName(location.search,"product_id");

        $.ajax({
            type:"get",
            url:"../data/merchandise.json",
            success:function(arr){
                var arr = arr.commodity;
                var goodsMsg = arr.find(item => item.product_id ==product_id);
                console.log(goodsMsg);
                $(`<img src="${goodsMsg.img}" alt="" class="pic">
                <div id="mark"></div>`).appendTo(".manifying-glass-img");
                $(` <img src="${goodsMsg.img}" alt="" class="pic2">`).appendTo("#big");
                $(`<span>售价：</span>
                ￥<span class="glass-top-span">${goodsMsg.salary}</span>
                <span class="glass-top-span2">充值后相当于：</span>
                <span>￥199.0</span>
                <div class="glass-box-salary">冲100反100，点击充值</div>`).appendTo(".glass-top-title");
                $(` <a href="index.html">首页</a>
                <span> > </span>
                <a href="commodity.html">男装</a>
                <span> > </span>
                <a href="commodity.html">家居服</a>
                <span> > </span>
                <a href="commodity.html">睡衣套装</a>
                <span class="styleinfo">${goodsMsg.info}</span>`).appendTo(".product-header");
                $(`<h2 class="fl">${goodsMsg.info}</h2>
                <div class="product-descript fr">
                    <ul class="product-descript-list">
                        <li>产品描述
                            |
                        </li>
                        <li>评论
                            |
                        </li>
                        <li>提问</li>
                    </ul>
                </div>`).appendTo(".product-title");
                $(`<a href="#" class="info-btn-a1" id="${goodsMsg.product_id}">
                <div class="info-btns1 fl">加入购物车</div>
            </a>
            <a href="shoppingcar.html" class="info-btn-a2">
                <div class="info-btns2 fl">查看购物车</div>
            </a>`).appendTo(".body-info-btn");
            },
            error:function(msg){
                console.log(msg);
            }
        })

        shopping();

        function shopping(){
            $(".body-info-btn").on("click",".info-btn-a1",function(){
                var id = this.id;
                
                var first = $.cookie("goods") == null ? true : false;

                if(first){
                    var cookieArr = [{id:id, num: 1}];
                    $.cookie("goods", JSON.stringify(cookieArr),{
                        expires:7
                    })
                }else{
                    var same = false;
                    var cookieStr = $.cookie("goods");
                    var cookieArr = JSON.parse(cookieStr);
                    for(var i=0;i<cookieArr.length;i++){
                        if(cookieArr[i].id == id){
                            cookieArr[i].num++;
                            same = true;
                            break;
                        }
                    }
                    if(!same){
                        var obj = {id: id, num: 1};
                        cookieArr.push(obj);
                    }
                    $.cookie("goods",JSON.stringify(cookieArr),{
                        expires:7
                    })
                }
                alert("添加成功，请在购物车中查询");
                return false;
            })
        }

        function valueByName(search,name){
            var start = search.indexOf(name + "=");
            if(start ==-1){
                return null;
            }else{
                var end = search.indexOf("&",start);
                if(end == -1){
                    end = search.length;
                }
    
                var str = search.substring(start,end);
                var arr = str.split("=");
                return arr[1];
            }
        }

        bigImg();

        function bigImg(){
            $("#small").on("mouseover",function(){
                $("#mark").css("display","block");
                $("#big").css("display","block");

                $("#small").on("mousemove",function(e){
                    var l =parseInt(e.pageX - $(this).offset().left - 100);
                    l = Math.max(0, l);
                    l = Math.min(300, l);
                    var t =parseInt(e.pageY - $(this).offset().top - 100);
                    t = Math.min(300, t);
                    t = Math.max(0, t);
                    $("#small").css("cursor","move");
                    
                    $("#mark").css("left",l);
                    $("#mark").css("top",t);
    
                    $("#big img").css("left",-2*l);
                    $("#big img").css("top",-2*t);
                })
            })

            $("#small").on("mouseout",function(){
                $("#mark").css("display","none");
                $("#big").css("display","none");
            })

            
        }

    }
    return {
        download:download
    }
})