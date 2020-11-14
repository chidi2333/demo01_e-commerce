require.config({
    paths:{
        "jquery":"jquery-1.11.3",
        "jquery-cookie":"jquery.cookie",
        "car":"car"
    },
    shim:{
        "jquery-cookie":["jquery"]
    }
})

require(["car"],function(car){
    car.loadCarData();
    car.checkFunc();
    car.changeCars();
})