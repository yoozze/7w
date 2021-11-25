// Debug
$.getScript('assets/js/debug.js');

/**
 * Hide dropdown for given navigation item.
 * @param {Object} $item - jQuery object of navigation item.
 */
function hideDropdown($item) {
    $item.removeClass('show');
    $item.find('> .dropdown-menu').removeClass('show');
    $item.find('> .nav-link').attr('aria-expanded', false);
}

/**
 * Scroll given element into view.
 * @param {Object} $el - jQueryy eleemnt of DOM element to be scrolled into view.
 * @param {number|undefined} duration - Animation duration.
 * @param {boolean|undefined} adjust - Dynamically adjust end value. Dynamic
 * adjustment will only work if `duration` > 0.
 */
function scrollIntoView($el, duration, adjust) {
    var $headerHeight = $('#site-header').height();

    $('html, body').animate(
        {
            scrollTop: $el.offset().top - $headerHeight,
        },
        {
            duration: typeof duration === 'number' ? duration : 0,
            step: function (now, fx) {
                if (adjust) {
                    fx.end = $el.offset().top - $headerHeight;
                }
            },
        },
    );
}

var $window = $(window);
var hasIntersectionObserver =
    'IntersectionObserver' in window && 'IntersectionObserverEntry' in window;
var windowLoadEvent = null;

$window.on('load', function (e) {
    windowLoadEvent = e;
});

var resizeTimeout;

// Throttle/debounce resize events.
$window.on('resize', function (e) {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(function () {
        $window.trigger('resize2', e);
    }, 50);
});

$(document).ready(function () {
    // # Images (lazy loading)
    // =======================

    $('img[loading="lazy"]').each(function (i, el) {
        var $image = $(el);

        $image.on('load error', function () {
            $image.addClass('loaded');
        });

        if (el.complete) {
            $image.addClass('loaded');
        }
    });

    // # Header
    // ========

    var $siteHeader = $('#site-header');

    $window.on('load2 scroll', function () {
        $siteHeader.toggleClass('is-scrolled', $window.scrollTop() > 90);
    });

    // # Main navigation
    // =================

    var $navbarContent = $('#navbar-content');
    var $navbarItems = $navbarContent.find('.nav-item');
    var $navbarToggler = $navbarContent.prev().find('> button');

    $window.on('resize', function () {
        if (window.matchMedia('(min-width: 992px)').matches) {
            $siteHeader.toggleClass('is-expanded', false);
            $navbarContent.toggleClass('show', false);
        }
    });

    $navbarContent.parent().on({
        'show.bs.collapse': function () {
            $siteHeader.addClass('is-expanded');
        },
        'hide.bs.collapse': function () {
            $siteHeader.removeClass('is-expanded');
        },
    });

    // # Sliders
    // =========

    if (hasIntersectionObserver) {
        var sliderObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    var $target = $(entry.target);

                    if ($target.hasClass('slick-initialized')) {
                        if (entry.isIntersecting) {
                            $target.slick('slickPlay');
                        } else {
                            $target.slick('slickPause');
                        }
                    }
                    refsVisible = entry.isIntersecting;
                });
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.8,
            },
        );

        $('.slider').each(function (i, el) {
            sliderObserver.observe(el);
        });
    }

    // Clients slider
    $('#clients').slick({
        arrows: false,
        autoplaySpeed: 3000,
        centerMode: true,
        variableWidth: true,
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
    });

    // Usecases slider
    $('#usecases').slick({
        arrows: false,
        autoplaySpeed: 5000,
        centerMode: true,
        variableWidth: false,
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
    });

    // Ensure custom `load2` event is always triggered.
    if (windowLoadEvent) {
        $window.trigger('load2', windowLoadEvent);
    } else {
        $window.on('load', function (e) {
            $window.trigger('load2', e);
        });
    }
});
