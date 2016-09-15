document.onreadystatechange = function(){
     if(document.readyState === 'complete'){
         var url = window.location.href;
var res = url.replace("https://www.facebook.com/", "https://m.facebook.com/");
console.log(res)
window.location.replace(res);
     }
}
