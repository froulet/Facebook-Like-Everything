function init(){var e=document.createElement("div");e.innerHTML="<div id='happy' style='background-color:#ddd;font-size:16px;text-align:center;position:fixed;top:40px;right:40px;width:200px;height:150px;border:4px solid black;z-index:9999;padding-top:15px;'><span>0</span> of <span id='counthappy'>0</span> items liked.<div id='happyStatus' style='margin-top:9px;'><a id='happyButton' href='#' style='display:block;' onclick='haltFn();'> Stop it.</a></div><FORM><INPUT type='checkbox' name='expands' value=''>Expand all comments <br> <INPUT type='checkbox' name='fnonly' value=''>Only like friends post</FORM><button type='button' id='but'>Click Me!</button></div>",document.getElementsByTagName("body")[0].appendChild(e),document.getElementById("but").addEventListener("click",function(){scrollToBottomAndBegin()},!1)}function start(){friendsonly=document.getElementsByName("fnonly")[0].checked,exempendsallcomments=document.getElementsByName("expands")[0].checked,removeDivsByClass("_4ikz"),openComments(),expandComments()}function openComments(){var e=document.querySelectorAll(".UFIBlingBox ");e.length<0||null==e||([].forEach.call(e,function(e){e.querySelector(".ufiPagerLoading")||e.click()}),setTimeout(function(){},2e3))}function expandComments(){[].forEach.call(document.querySelectorAll(".UFIPagerLink "),function(e){e.querySelector(".ufiPagerLoading")||e.click()}),exempendsallcomments&&count>0?document.querySelectorAll(".UFIPagerLink ").length?(document.body.style.overflow="",window.scrollTo(0,0),document.body.style.overflow="hidden",document.getElementById("happyStatus").innerHTML="Expanding Comments ...",window.setTimeout(expandComments,3e3),removeElementsByClass("_4ikz")):(document.body.style.overflow="",document.getElementById("happyStatus").innerHTML="",likeeverything()):(document.getElementById("happyStatus").innerHTML="",likeeverything())}function likeeverything(){if(friendsonly){t=getAllFriendsPost();var e=document.querySelector("#counthappy");return e.innerHTML=t.length,void happyFn(t)}for(var n=document.getElementsByTagName("a"),t=[],o=0;o<n.length;o++)link=checkLink(n[o]),null!=link&&t.push(link);var e=document.querySelector("#counthappy");e.innerHTML=t.length,happyFn(t)}function happyFn(e){if(!e||!e.length)return void 0,void(document.getElementById("happyStatus").innerHTML="Done!");void 0,e[0].click(),e[0].style.color="#FF0000";var n=document.querySelector("#happy span");n.innerHTML=parseInt(n.innerHTML)+1,window.setTimeout(function(){happyFn(e.splice(1))},5e3)}function checkLink(e){if(!e)return null;var n=e.getAttribute("aria-pressed");if("true"==n)return null;var t=e.getAttribute("data-testid");return"fb-ufi-likelink"==t||"ufi_comment_like_link"==t?(void 0,e):void 0}function removeDivsByClass(e){for(var n=document.getElementsByClassName(e);n.length>nbposts;)n[0].parentNode.removeChild(n[0])}function getAllFriendsPost(){void 0,happy=[];var e=document.querySelectorAll("div[data-testid][data-ft][data-timestamp]");return void 0,[].forEach.call(e,function(e){var n=e.querySelectorAll(".userContentWrapper");if(t=n[0],n.length>1)var t=n[1];var o=t.querySelector("[data-hovercard]");if(void 0,null!=o){var l=o.getAttribute("data-hovercard");void 0;var i=/user.php\?/g,r=i.exec(l);if(void 0,void 0,null==r)return void void 0;void 0,likelink=e.querySelector("[data-testid=fb-ufi-likelink]"),link=checkLink(likelink),null!=link&&happy.push(link)}}),void 0,happy}function scrollToBottomAndBegin(){setTimeout(function(){window.scrollTo(0,document.body.scrollHeight),nbscrolls>0?(nbscrolls--,scrollToBottomAndBegin()):start()},1e3)}var nbposts=5,nbexpands=2,count=1,exempendsallcomments=!1,friendsonly=!0,halt=!1,nbscrolls=2;init();