let wnd = $(window),
    wrap = $('.wrap'),
    menu = $('.in_the_middle'),
    mobile_navigation = $('.mobile_navigation'),
    pull = $('#pull'),
    menuBtn = $('.menuBtn'),
    slidenav = $('.slidenav'),
    overlay = $('#overlay'),
    $table_of_list = $('#table_of_list'),
    headers = $('article').find('h1, h2, h3, h4, h5, h6'),
    levels = [];

let menuHeight = menu.height();

$(function() {
    let hat = $('#hat'),
        pos = hat.offset(),
        index = 'key_tab',
        dataStore = window.sessionStorage;

    let oldIndex;
    try {
        oldIndex = dataStore.getItem(index);
    } catch (e) {
        oldIndex = 0;
    }

    let isScrolling = false;
    wnd.scroll(function() {
        if (!isScrolling) {
            isScrolling = true;
            window.requestAnimationFrame(function() {
                handleScroll();
                isScrolling = false;
            });
        }
    });

    function handleScroll() {
        let top = wnd.scrollTop(),
            opacity = top > 500 ? 1 : top * 2 / 1000;

        if (top > pos.top + hat.height() && hat.hasClass('default')) {
            hat.fadeOut('fast', function() {
                $(this).removeClass('default').addClass('fixed').fadeIn('fast');
            });
        } else if (top <= pos.top && hat.hasClass('fixed')) {
            hat.fadeOut('fast', function() {
                $(this).removeClass('fixed').addClass('default').fadeIn('fast');
            });
        }

        mobile_navigation.css('opacity', opacity);
    }

    headers.each(function() {
        let tag = $(this).prop('tagName').toLowerCase();
        let text = $(this).text();
        let id = $(this).attr('id') || text.toLowerCase().replace(/\s+/g, '-');
        $(this).attr('id', id);

        let listItem = $('<li>').append(
            $('<a>').attr('href', `#${id}`).text(text)
        );

        $table_of_list.append(listItem);
    });

    $('.update').tabs();
    $('.slider').glide({
        autoplay: 11000
    });
});

$(pull).on('click', function(e) {
    e.preventDefault();
    menu.slideToggle();
});

wnd.resize(function() {
    let w = $(window).width();
    if (w > 320 && menu.is(':hidden')) {
        menu.removeAttr('style');
    }
});

$(document).on('click', '.mobile_navigation a, #table_of_contents a', function(e) {
    e.preventDefault();

    let href = $(this).attr('href');
    let target = $(href);

    if (target.length) {
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 600, 'swing', function() {
            if (history.pushState) {
                history.pushState(null, null, ' ');
            }
        });
    } else {
        console.error(`Element not found: ${href}`);
    }
});

menuBtn.click(toggleNav);
overlay.click(toggleNav);

function toggleNav() {
    wrap.toggleClass('navOut');
    overlay.toggleClass('show');
    slidenav.toggleClass('active');
}

$('#table_of_contents_button').click(function() {
    $('#table_of_contents').toggle();
});

function DblHelix(n, rx, ry, rz) {
    let a = Math.PI / n, p = [], z = rz * 2 / n;
    for (let i = 0; i < n; ++i) {
        let j = a * i;
        if (i % 2) {
            j += Math.PI;
        }
        p.push([rx * Math.cos(j), rz - z * i, ry * Math.sin(j)]);
    }
    return p;
}