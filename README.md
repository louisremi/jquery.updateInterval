How does animation work?
========================

To animate an element property, jQuery regularily updates the element property, from its initial value to the desired value.
This is of course achieved using a simple setInterval().
Since jQuery 1.4.3, you can modify the update rate (= frame interval) with the property [$.fx.interval](http://api.jquery.com/jQuery.fx.interval/).

What is the problem?
====================

As $.fx.interval is only accessed when setting the interval, changing this property won't have any effect on running animations.

Big deal, why would I want to do that?
======================================

Well, if you only modify this property once at the beginning of your code, then yes: jquery.updateInterval is of no use to you.

If however you wan't to test the visual effect of different values for $.fx.interval, then you might be well advised to read on.

Not as simple as...
===================

For performance purpose, and to keep animations synchronised, jQuery uses one global interval object.
This object is created when an animation starts and is destroyed only when there are no more animation running.
As a consequence, changes made to $.fx.interval will often not take effect immediatly:

    // Animate an element during 2s
    $myElement.animate({left: 800}, 2000);
    // Change the frame interval after 1s
    setInterval(function(){ $.fx.interval = 200; }, 1000);
    // You guessed it, you won't see any change.

    // Animate an element during 2s
    $myElementA.animate({left: 800}, 2000);
    // Animate another element before first animation finishes
    setInterval(function(){ 
        $myElementB.animate({left: 800}, 2000);
    }, 1800);
    // Animate a third element after first animation finishes, BUT before second animation finishes
    setInterval(function(){
        // change the frame interval before running this animation
        $.fx.interval = 200;
        $myElementC.animate({left: 800}, 2000);
    }, 3800);
    // All animations ran with the initial frame interval!

    // Animate an element
    $myElement.animate({left: 800}, 1000, function() {
      // As a callback, change the frame interval
      $.fx.interval = 200;
      // and start a new animation
      $myElement.animate({left: 0}, 1000);
    });
    // Both animations ran with the initial interval!
    
jquery.updateInterval
=====================

This plugin allows you to update the frame interval and see the difference immediatly.
To do so, it 
- changes $.fx.interval
- stops all animations using $.fx.stop()
- runs a dummy animation to keep current animation running, **using the new frame interval**.

Usage
=====

    $.fx.updateInterval(200);