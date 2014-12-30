/*
 jQuery tinyDraggable v1.0.4
 Copyright (c) 2014 Simon Steinberger / Pixabay
 GitHub: https://github.com/Pixabay/jQuery-tinyDraggable
 More info: http://pixabay.com/blog/posts/p-52/
 License: http://www.opensource.org/licenses/mit-license.php
 */

(function ($) {

    $.fn.tinyDraggable = function (options) {
        var defaults = {
            handle    : 0,
            exclude   : 0,
            allowXDrag: true,
            allowYDrag: true,
            start     : null,
            step      : null,
            finish    : null
        };
        var settings = $.extend(defaults, options);

        return this.each(function () {
            var dx, dy, el = $(this), handle = settings.handle ? $(settings.handle, el) : el;
            handle.on({
                mousedown: function (e) {

                    if (settings.exclude && ~$.inArray(e.target, $(settings.exclude, el))) return;

                    e.preventDefault();


                    var os = el.offset();

                    // start hook
                    if (typeof( settings.start ) == 'function') {
                        settings.start(el, os.top, os.left);
                    }

                    dx = e.pageX - os.left, dy = e.pageY - os.top;

                    $(document).on('mousemove.drag', function (e) {

                        var top = (settings.allowYDrag) ? (e.pageY - dy) : (os.top);
                        var left = (settings.allowXDrag) ? (e.pageX - dx) : (os.left);


                        try {

                            if (typeof( settings.step ) == 'function') {
                                settings.step(el, top, left);
                            }

                            el.offset({top: top, left: left});

                        } catch (e) {
                            console.log('step exception');
                            $(document).off('mousemove.drag');
                        }


                    });
                },
                mouseup  : function (e) {

                    $(document).off('mousemove.drag');

                    // stop hook
                    if (typeof( settings.finish ) == 'function') {

                        var os = el.offset();

                        settings.finish(el, os.top, os.left);
                    }
                }
            });
        });
    }
}(jQuery));
