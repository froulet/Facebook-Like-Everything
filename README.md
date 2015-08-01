# Like Everything on Facebook with this JavaScript Bookmarklet

### Read the [original blog post](http://feross.org/like-everything-on-facebook/).

Do you want to like every post and comment that you see on Facebook all at once? Well, it’s your lucky day.

Make a bookmark in your browser's bookmarks bar with the title "Like Everything" and set the URL to be the javascript code in bookmarklet.js. Once your new bookmark is created, head to Facebook, then click it! :)

## Why’d I do this?

Some friends and I were playing around with Facebook’s new comment-on-enter feature and we got a large 70+ comment thread going, then people began to like every comment in the thread. Yay, notification spam! Thus, the idea for this JavaScript bookmarklet was born. I whipped it up in 15 minutes.

![Like Bomb](http://feross.org/images/like-bomb.png)

## How to use this script
To Use it, don't forget to change the variables 'message1' and 'message2' if you use a language different than English on your facebook account.
To find the correct messages, inspect the element of a like button by righ-clicking it and then cliking 'Inspect Element'.
Then find the content of the title attribute from the <a> tag with the class 'UFILikeLink'.

To use this script, just copy-paste it [in the console of your browser](https://www.youtube.com/watch?v=uMXLiz6vx5s) when you are on a facebook page.
