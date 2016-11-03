exports.setup = function(){

    var helper = document.getElementById("stats_helper");
    helper.style.display = "true";
    var show = true;

    helper.style.top = "10px";
    helper.style.left = "10px";

    document.onkeypress = function (e) {
        e = e || window.event;

        // (H & h)
        if(e.keyCode === 104 || e.keyCode === 72){

            if(show===true){
                helper.style.display = "none";
                show=false;
                console.log('%c'+'hide_stats.js: TRUE', 'background:#444444;color:#ffffff');
            }else{
                helper.style.display = "block";
                show=true;
                console.log('%c'+'hide_stats.js: FALSE', 'background:#444444;color:#ffffff');
            }

        }

    }


}
