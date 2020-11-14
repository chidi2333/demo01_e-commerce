define(["jquery","jquery-cookie"],function($){
    function loadCarData(){
        new Promise(function(resolve,reject){
            $.ajax({
                url:"data/merchandise.json",
                success:function(obj){
                    resolve(obj.commodity);
                },
                error:function(msg){
                    reject(msg);
                }
            })
        }).then(function(arr){
            console.log(arr);
            var cookieStr = $.cookie("goods");
            if(cookieStr){
                var cookieArr = JSON.parse(cookieStr);
                var newArr = [];
                console.log(cookieArr[0].id);
                
                for(var i=0;i<cookieArr.length;i++){
                    for(var j=0;j<arr.length;j++){
                        if(cookieArr[i].id == arr[j].product_id){
                            arr[j].num = cookieArr[i].num;
                            arr[j].id = arr[j].product_id;
                            newArr.push(arr[j]);
                        }
                    }
                }
                for(i=0;i<newArr.length;i++){
                    var node = $(`<tr class="table-tr" id="${newArr[i].id}">
                    <td>&nbsp;</td>
                    <td rowspan="1" class="table-td1">
                        <input type="checkbox" class="check-input check-input2">选择
                    </td>
                    <td rowspan="1" class="table-td2">
                        <a href="product.html?product_id=${newArr[i].id}"><img src="${newArr[i].img}"></a>
                    </td>
                    <td>
                        <a href="product.html?product_id=${newArr[i].id}">${newArr[i].info}</a>
                    </td>
                    <td class="salary">
                            ${newArr[i].salary}元
                    </td>   
                    <td class="table-input5">
                        <a href="#" class="table-jian">-</a>&nbsp;
                        <input type="text" value="${newArr[i].num}" class="input-text">
                        &nbsp;<a href="#" class="table-jia">+</a>
                    </td>
                    <td class="zongjia">
                        ${(newArr[i].salary * newArr[i].num).toFixed(1)}元 
                    </td>
                    <td class="table-btn">
                        <button class="btnfont">删除</button>
                    </td>
                </tr>`);
                    node.appendTo(".table-tbody");
                }
                // isCheckAll();
                // console.log(newArr);
            }
            // isCheckAll();
    })     
}           
    

    function checkFunc(){
        //全选
        var counts = true;
        $("#all-ckb-top").on("click",function(){
            //获取单个商品选中的框
            var allchecks = $(".check-input");   
            if(!counts){
                allchecks.prop("checked",false);
                counts = true;
                console.log(counts);
            }else{
                allchecks.prop("checked",true);
                counts=false;
                console.log(counts);
            }
            isCheckAll();
        })
        //单选
        $(".table-tbody").on("click",".check-input",function(){
            if(counts){
                $(this).find("table-td1 .check-input").prop("checked",true);
                counts = false;
                console.log(counts);
            }else{
                $(this).find("table-td1 .check-input").prop("checked",false);
                counts=true;
                console.log(counts);
            }
            isCheckAll();
        })
    }


    function isCheckAll(){
        var allcheck = $(".table-tr");
        var isAll = true;
        var total = 0;
        var count = 0;
        var totalCount = 0;
        allcheck.each(function(index,item){
            if(!$(item).find(".check-input").is(':checked')){
                isAll = false;
            }else{
                total += parseFloat($(item).find(".salary").html().trim()) * parseFloat($(this).find(".input-text").val());
                //被选中的有几件
                count += parseInt($(this).find(".input-text").val());
            }
                //所有购物车的
            totalCount += parseInt($(this).find(".input-text").val());
        })
        $("#fk-cartnum2").html(count);
        $("#fk-cartnum1").html(totalCount);
        $("#fk-cartsalary").html(total);

        //是否全选
        // if(isAll){
        //     $(".check-input").prop("checked",true);
        // }else{
        //     $(".check-input").prop("checked",false);
        // }
    }

    //添加删除和删减
    function changeCars(){
        $(".table-tbody").on("click",".btnfont",function(){
            var id = $(this).closest(".table-tr").remove().attr("id");
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            for(var i=0;i<cookieArr.length;i++){
                // console.log(cookieArr);
                if(id==cookieArr[i].id){
                    cookieArr.splice(i,1);
                    break;
                }
            }
            cookieArr.length == 0 ? $.cookie("goods",null) : $.cookie("goods",JSON.stringify(cookieArr),{expires: 7});
            isCheckAll();
        })

        $(".table-tbody").on("click",".table-jian,.table-jia",function(){
            //找id和cookie
            var id = $(this).closest(".table-tr").attr("id");
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            for(var i=0;i<cookieArr.length;i++){
                if(cookieArr[i].id == id){
                    if(this.className == "table-jian"){
                        cookieArr[i].num ==1 ? alert("数量为1，不能减少") :cookieArr[i].num--;
                    }else{
                        cookieArr[i].num++;
                    }
                    break;
                }
            }
            //更新页面商品
            $(this).siblings("input").val(cookieArr[i].num);
            var price = parseFloat($(this).closest(".table-input5").siblings(".salary").html().trim());
            $(this).closest(".table-input5").siblings(".zongjia").html((price * cookieArr[i].num).toFixed(1) + "元");

            //更改数据存cookie
            $.cookie("goods",JSON.stringify(cookieArr),{
                expires:7
            })

            isCheckAll();

            return false;
        })
    }

    return {
        loadCarData:loadCarData,
        checkFunc:checkFunc,
        changeCars:changeCars
    }
})