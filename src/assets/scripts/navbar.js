if(localStorage.getItem("token")==null){
    $(function(){
        $("#nav-placeholder").load("navbar-estandar.html");
    })
} else {
    $(function(){
        $("#nav-placeholder").load("navbar-logged.html");
  })}