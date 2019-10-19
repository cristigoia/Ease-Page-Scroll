// Grab both red boxes
var section = document.querySelector("section");
// Check how much we can scroll. This value is the 
// height of the scrollable element minus the height of the widow
var sectionHeight = section.getBoundingClientRect().height - window.innerHeight;
// Add easing to the scroll. Play with this value to find a setting that you like.
var ease = 0.1;
// Store current scroll position
var targetX = 0,
    targetY = 0;
var currentX = 0,
    currentY = 0;
// Use this if you want to lock the elastic overscroll on mobile
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
});
// Add ease scroll listener
EaseScroll.on(function(e) {
    // Accumulate delta value on each scroll event
    targetY += e.deltaY;
    targetX += e.deltaX;
    // Clamp the value so it doesn't go too far up or down
    // The value needs to be between 0 and -sectionHeight
    targetY = Math.max(-sectionHeight, targetY);
    targetY = Math.min(0, targetY);
});
var scroll = function() {
    // Make sure this works across different browsers (use the shim or something)
    requestAnimationFrame(scroll);
    // Get closer to the target value at each frame, using ease. 
    // Other easing methods are also ok.
    currentY += (targetY - currentY) * ease;
    // Uncomment this line to scroll horizontally
    //   currentX += (targetX - currentX) * ease;
    // Create the CSS transform string
    // (alternativly: use WebKitCSSMatrix, though it doesn't see any faster (http://jsperf.com/webkitcssmatrix-vs-translate3d)
    var v1 = "translateX(" + currentX + "px) translateY(" + currentY + "px) translateZ(0)"; // translateZ(0)";
    var v2 = "translateX(" + currentX + "px) translateY(" + currentY + "px) translateZ(0)"; // translateZ(0)";
    // Apply CSS style
    section.style['webkitTransform'] = v1;
    section.style['msTransform'] = v1;
    section.style.transform = v1;
    //   console.log(EasingFunctions);
}
// Start the rendering loop function
scroll();