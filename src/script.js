/*
    I Like Everything
    Description: Like everything on Facebook with this JavaScript Bookmarklet
    Original Author: Feross Aboukhadijeh
    Updated by Frantz Roulet
    Read more: http://feross.org/like-everything-on-facebook/
*/
  var nbposts = 5;
  var nbexpands = 2;
  var count = 1;
  var exempendsallcomments = false;
  var friendsonly = true;
  var halt = false;
  var nbscrolls = 2;
  //TO DO
  var likebuttonidentifier = '';

  function init() {
    /////////////MAIN LOGIC//////////////

    //Creating the div with all the elements
    var happyDiv = document.createElement('div');
    happyDiv.innerHTML = "<div id='happy' style='background-color:#ddd;font-size:16px;text-align:center;position:fixed;top:40px;right:40px;width:200px;height:150px;border:4px solid black;z-index:9999;padding-top:15px;'><span>0</span> of <span id='counthappy'>0</span> items liked.<div id='happyStatus' style='margin-top:9px;'><a id='happyButton' href='#' style='display:block;' onclick='haltFn();'> Stop it.</a></div><FORM><INPUT type='checkbox' name='expands' value=''>Expand all comments <br> <INPUT type='checkbox' name='fnonly' value=''>Only like friends post</FORM><button type='button' id='but'>Click Me!</button></div>";

    document.getElementsByTagName('body')[0].appendChild(happyDiv);

    /////ONCLICK/////
    document.getElementById('but').addEventListener('click', function() {

    scrollToBottomAndBegin();

    }, false);

  }

  function start()
  {
    //Checking parameters
    friendsonly = document.getElementsByName("fnonly")[0].checked;
    exempendsallcomments = document.getElementsByName("expands")[0].checked;

    removeDivsByClass('_4ikz');

    //Open an wait a little to expand the comments
    openComments();
    expandComments();

  }

  function openComments() {

    var boxes = document.querySelectorAll(".UFIBlingBox ");
    if(boxes.length < 0 || boxes == null)
    {
      return;
    }

    //Click on all the like/comment box
    [].forEach.call(boxes, function(it) {
      if (!it.querySelector(".ufiPagerLoading")) {
        it.click();
      }
    });

    setTimeout(function(){}, 2000);

    return;

  };

function expandComments(){

  //Expand comments (click on 'view more comments') only once
    [].forEach.call(document.querySelectorAll(".UFIPagerLink "), function(it) {
      if (!it.querySelector(".ufiPagerLoading")) {
        it.click();
      }
    });

    // If selected, expands ALL the comments
    if(exempendsallcomments && count > 0)
    {

        if( document.querySelectorAll(".UFIPagerLink ").length ){
        document.body.style.overflow = '';
        window.scrollTo(0, 0);
        document.body.style.overflow = 'hidden'
        document.getElementById('happyStatus').innerHTML = 'Expanding Comments ...';
        window.setTimeout(expandComments, 3000);
        removeElementsByClass('_4ikz');
        }

        else {
        document.body.style.overflow = '';
        document.getElementById('happyStatus').innerHTML = '';
        likeeverything();
        }

    }

    //If not, like everything already present
    else {
      document.getElementById('happyStatus').innerHTML = '';
      likeeverything();
    }

}

  function likeeverything() {

    if(friendsonly)
    {
      happy = getAllFriendsPost();
      var counthappy = document.querySelector('#counthappy');
      counthappy.innerHTML = happy.length;
      happyFn(happy);
      return;
    }


    var sad = document.getElementsByTagName('a'),
      happy = [];

    //console.log(sad.length);

    // Select only the Like buttons.
    // Convert the sad NodeList to a happy Array.
    for (var i = 0; i < sad.length; i++) {

      link = checkLink(sad[i]);
      if(link != null)
      {
        happy.push(link);
      }

    }

    // Put the number of items in the box.
    var counthappy = document.querySelector('#counthappy');
    counthappy.innerHTML = happy.length;

    happyFn(happy);
}


function happyFn(happy) {

      if (!happy || !happy.length) {
        console.log("BYE");
        document.getElementById('happyStatus').innerHTML = 'Done!';

        /*     // Remove the happy box if necessary
        var selectTag = document.getElementById('happy');
        selectTag.parentNode.removeChild( selectTag);*/

        return;

      }

      console.log("Yes happy");
      happy[0].click();
      happy[0].style.color = '#FF0000';

      var countSpan = document.querySelector('#happy span');
      countSpan.innerHTML = parseInt(countSpan.innerHTML) + 1;

      // Wait for each Like to be processed before trying the next.
      // Facebook enforces this requirement.
      window.setTimeout(function() {
        happyFn(happy.splice(1));
      }, 5000);

    }

function checkLink(link)
{
  if(!link){return null;}

  var pressed =  link.getAttribute("aria-pressed");
  if(pressed == 'true')
  {
    return null;
  }

  var datatest = link.getAttribute("data-testid");

  if (datatest == "fb-ufi-likelink" || datatest == "ufi_comment_like_link") {
    console.log('one sad');
    return link;
  }

}

function removeDivsByClass(className){
  var elements = document.getElementsByClassName(className);

    while(elements.length > nbposts){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function getAllFriendsPost()
{
  console.log("GET ALL FRIENDS POST");
  happy = [];
  var allpost = document.querySelectorAll("div[data-testid][data-fte][data-timestamp]");

  console.log("NB FRIENDS POST " + allpost.length);

  [].forEach.call(allpost, function(post) {

    var wrappers = post.querySelectorAll(".userContentWrapper");

    wrapper = wrappers[0];

    //If there is more than on user wrapper, we use the second one to determine
    //if the post is from an user or a page
    if(wrappers.length > 1)
    {
      var wrapper = wrappers[1];
    }

    var hovercard = wrapper.querySelector("[data-hovercard]");

    console.log(hovercard);

    if(hovercard == null)
    {
      return;
    }

    var lehref = hovercard.getAttribute("data-hovercard");
    console.log(lehref);

    var myRegexp = /user.php\?/g;
    var match = myRegexp.exec(lehref);
    console.log("LA REGEXP");

    console.log(match);
    //typeof obj.foo != 'undefined'
    if(match == null)
    {
      console.log("No match");
      return;
    }

    console.log("Le Match");

    likelink = post.querySelector("[data-testid=fb-ufi-likelink]");
    link = checkLink(likelink);
    if(link != null)
    {
      happy.push(link);
    }

    return;

  });

  console.log("DONE, NOW RETURN");
  return happy;

}


function scrollToBottomAndBegin()
{

  setTimeout (function(){
    window.scrollTo(0,document.body.scrollHeight);
    if(nbscrolls > 0){
      nbscrolls--;
      scrollToBottomAndBegin();
  }
  else {
    start();
  }
  }, 1000);

}

//TO DO : CheckParameters function
// userContentWrapper
init();
