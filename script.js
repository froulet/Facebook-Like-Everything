/*
    I Like Everything
    Description: Like everything on Facebook with this JavaScript Bookmarklet
    Original Author: Feross Aboukhadijeh
    Updated by Frantz Roulet
    Read more: http://feross.org/like-everything-on-facebook/
*/

var nbexpands = 2;
var count = 0;
var message1 = 'Like this';
var message2 = 'Like this comment';

function expandComments (){
  count ++;

  //Click on all the like/comment box
  [].forEach.call(document.querySelectorAll(".UFIBlingBox "), function(it){
    if( !it.querySelector(".ufiPagerLoading") ){
      it.click();
    }
  });

  //Expand comments (click on 'view more comments')
  [].forEach.call(document.querySelectorAll(".UFIPagerLink "), function(it){
    if( !it.querySelector(".ufiPagerLoading") ){
      it.click();
    }
  });

  // If We want to count the number of expands
  if( count < nbexpands ){
    window.setTimeout(expandComments, 3000);
  }

  /*        // If We want to expand ALL the comments
  if( document.querySelectorAll(".UFIPagerLink ").length ){
  window.setTimeout(expandComments, 3000);
}*/

};


function likeeverything(){

  //var sad = document.getElementsByTagName('*'),
  var sad = document.getElementsByTagName('a'),
  happy = [],
  halt = false;

  // Select only the Like buttons.
  // Convert the sad NodeList to a happy Array.
  for (var i = 0; i < sad.length; i++) {
    //BE CAREFUL WITH YOUR LANGUAGE HERE, CHANGE IT IF NECESSARY
    if (sad[i] && (sad[i].title == message1 || sad[i].title == message2)) {
      happy.push(sad[i]);
    }
  }

  var happyDiv = document.createElement('div');
  happyDiv.innerHTML = '<div id=\'happy\' style=\'background-color:#ddd;font-size:16px;text-align:center;position:fixed;top:40px;right:40px;width:200px;height:100px;border:4px solid black;z-index:9999;padding-top:15px;\'><span>0</span> of '+happy.length+' items liked.<div id=\'happyStatus\' style=\'margin-top:30px;\'><a id=\'happyButton\' href=\'#\' style=\'display:block;\' onclick=\'haltFn();\'>Stop it.</a></div></div>';
  document.getElementsByTagName('body')[0].appendChild(happyDiv);

  function happyFn(happy) {
    if (halt || !happy || !happy.length) {
      document.getElementById('happyStatus').innerHTML = 'Done!';

      /*     // Remove the happy box if necessary
      var selectTag = document.getElementById('happy');
      selectTag.parentNode.removeChild( selectTag);*/

      return;
    }
    happy[0].click();
    happy[0].style.color='#FF0000';
    var countSpan = document.querySelector('#happy span');
    countSpan.innerHTML = parseInt(countSpan.innerHTML) + 1;

    // Wait for each Like to be processed before trying the next.
    // Facebook enforces this requirement.
    window.setTimeout(function() {
      happyFn(happy.splice(1));
    }, 5000);
  }

  function haltFn() {
    halt = true;
    return false; // prevent default event
  }

  happyFn(happy);

}

expandComments();
likeeverything();
