require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "nav":"nav",
        "product":"merchandise"
    },
    shim:{
        "jquery-cookie":["jquery"]
    }
})

require(["nav","merchandise"],function(nav,product){
    nav.download();
    nav.topNavtab();
    product.download();
})