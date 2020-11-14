define(["jquery"],function($){
    function download(){
        $.ajax({
            type:"get",
            url:"data/banner.json",
            success:function(result){
                // alert(result);
                var bannerArr = result.banner;
                for(var i=0;i<bannerArr.length;i++){
                    $(`<a href="${bannerArr[i].url}">
                    <img class="" src="images/${bannerArr[i].img}" alt="">
                </a>`).appendTo("#banners .banner-images");

                var node = $(`<a href="#" class="closen"></a>`);
                if(i==0){
                    node.addClass("activity");
                }

                node.appendTo("#banners .banner-circle");
                }

            },
            error:function(msg){
                console.log(msg);
            }
        })

        topNavDownload();
    }

    function banner(){
        var iNow = 0;
        var aImgs = null;
        var aBtns = null;

        var timer = setInterval(function(){
            iNow++;
            tab();
        },2000)

        function tab(){
            if(!aImgs){
                aImgs = $("#banners .banner-images").find("a");
            }
            if(!aBtns){
                aBtns = $("#banners .banner-circle").find("a");
            }
            if(iNow == 5){
                iNow = 0;
            }

            aImgs.hide().css("opacity",0.2).eq(iNow).show().animate({opacity:1},500);
            
            aBtns.removeClass("activity").eq(iNow).addClass("activity");

        }

        $(".banner-btnleft,.banner-btnright,.banner-images").mouseenter(function(){
            clearInterval(timer);   
        }).mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },2000)
        })

        $("#banners .banner-circle").on("click","a",function(){
            iNow = $(this).index();
            tab();  
            return false;
        })

        $(".banner-btnleft,.banner-btnright").click(function(){
           if(this.className == "banner-btnleft"){
            iNow--;
            if(iNow == -1){
                iNow = 4;
            }   
           }else{
                iNow++;
           }
           tab();
        })
    }
    
    function topNavDownload(){
        $.ajax({
            url:"data/nav.json",
            success:function(result){
                var topNavArr = result.topNav;
                for(var i = 0;i<topNavArr.length;i++){
                    var node=$(`<ul class="nav-ul">
                    <p class="nav-title">${topNavArr[i].title}</p>
                </ul>`).appendTo($(".nav-list"));

                    if(topNavArr[i].text){
                       var childArr = topNavArr[i].text;
                       for(var j=0;j<childArr.length;j++){
                           $(`<li class="nav-li" style="display:none">${childArr[j]}</li>`).appendTo(node);
                       }     
                    }
                }
            }
        })
    }

    function topNavtab(){
        $(".nav-list").on("mouseenter",".nav-ul",function(){
            $(this).addClass("nav-item-active");
            var index = $(this).index();
            $(".nav-ul").find(".nav-title").eq(index).addClass("nav-item-actives");
            $(".nav-ul").eq(index).find(".nav-li").css({display:"block"});
        })

        $(".nav-list").on("mouseenter",".nav-li",function(){
           $(this).css({color:"#b81b22"});
        })

        $(".nav-list").on("mouseleave",".nav-li",function(){
            $(this).css({color:"#727171"});
         })

        $(".nav-list").on("mouseleave",".nav-ul",function(){
            $(this).removeClass("nav-item-active");
            var index = $(this).index();
            $(".nav-ul").find(".nav-title").eq(index).removeClass("nav-item-actives");
            $(".nav-ul").eq(index).find(".nav-li").css({display:"none"});
        })
    }

    return {
        download:download,
        banner:banner,
        topNavtab:topNavtab
    }
})