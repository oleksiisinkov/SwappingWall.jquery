# SwappingWall.jquery
This is a very simple jQuery plugin, which create simple wall-gallery, and animation with randomly swapping items. This plugin is responsive and easy to use. 
You can use it for free.
# Requirements
Requires jQuery v3.2.0
# Example

Creating div with some pictures
```
// HTML

<div class="list">
 <img src="img/img1.jpg">
 <img src="img/img2.jpg">
 <img src="img/img3.jpg">
 <img src="img/img4.jpg">
 <img src="img/img5.jpg">
 <img src="img/img6.jpg">
 <img src="img/img7.jpg">
 <img src="img/img8.jpg">
</div>
```

Making them floating
```
// CSS

.list{
	width: 100%;
	padding: 0;
	margin: 0; 
}
.list img{
	float: left;
	width: 100%;
}
```
Example of settings
```
// JS 

$('.list').SwappingWall({
 'time': 2000,
 'itemsInRow': 4,
 'duration': 400,
 'responsive': [
  {
   'breakpoint': 991,
   'itemsInRow': 3,
  },
  {
   'breakpoint': 768,
   'itemsInRow': 2,
  }
 ]
})
```

# Options
- `itemsInRow` [integer, `require`] <br />
  How much items will place in row.
- `time` [integer, default `2500ms`] <br />
  Time between animations.
- `duration` [integer, default `500ms`] <br />
  Duration of animation.
- `responsive` [object, default `none`] <br />
  Object containing breakpoints and settings objects. Enables settings sets at given screen width.
- `breakpoint` [integer, default `none`] <br />
  Fires after a breakpoint is hit.
- `stop` [boolean, dafault `false`]  <br />
  Enable/Disable gallery on specific breakpoint.
  
# Feedback/bugs
This is my first project on github, so, please, don't judge strictly :) <br />
And you found a bug, please, post it under "issues".
