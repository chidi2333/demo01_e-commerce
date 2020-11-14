require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "nav":"nav",
        "list":"list"
    },
    shim:{
        "jquery-cookie":["jquery"]
    }
})

require(["nav","list"],function(nav,list){
    nav.download();
    nav.topNavtab();
    list.download();
})