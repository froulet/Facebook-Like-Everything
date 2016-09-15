document.onreadystatechange<SP>=<SP>function(){
<SP><SP><SP><SP><SP>if(document.readyState<SP>===<SP>'complete'){
<SP><SP><SP><SP><SP><SP><SP><SP><SP>var<SP>url<SP>=<SP>window.location.href;
var<SP>res<SP>=<SP>url.replace("https://www.facebook.com/",<SP>"https://m.facebook.com/");
console.log(res)
window.location.replace(res);
<SP><SP><SP><SP><SP>}
}
