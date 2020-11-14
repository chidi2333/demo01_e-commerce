define(["jquery"],function($){
    
    function download(){
        $.ajax({
            type:"get",
            url:"data/commodity.json",
            success:function(result){
                var list = result.commodity;
                for(var i=0;i<list.length;i++){
                    $(`<li>
                    <a href="product.html?product_id=${list[i].product_id}"><img src="${list[i].img}" alt=""></a>
                    <p class="js-li-info1">${list[i].info}</p>
                    <p class="js-li-info2">售价：￥${list[i].salary}</p>
                </li>`).appendTo($(".js-li"));
                }
            },
            error:function(msg){
                console.log(msg);
            }
        })
    }
    return {
        download:download
    }
})