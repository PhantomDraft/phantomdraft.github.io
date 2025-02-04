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

    const notification = document.getElementById("privacy-notification");
    const acceptButton = document.getElementById("accept-privacy");
    const isAccepted = localStorage.getItem("privacyAccepted");

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
        let text = $(this).text().trim();
        let id = $(this).attr('id'); // Используем существующий id

        if (!id) return; // Пропускаем заголовки без id

        let level = parseInt(tag.replace('h', ''), 10);
        let listItem = $('<li>').append(
            $('<a>').attr('href', `#${id}`).text(text)
        );

        if (level === 2) {
            $table_of_list.append(listItem);
            levels = [{ level: 2, list: listItem }];
        } else {
            while (levels.length > 0 && levels[levels.length - 1].level >= level) {
                levels.pop();
            }

            if (levels.length > 0) {
                let parentLevel = levels[levels.length - 1];
                let subList = parentLevel.list.children('ul');

                if (subList.length === 0) {
                    subList = $('<ul>');
                    parentLevel.list.append(subList);
                }

                subList.append(listItem);
            }

            levels.push({ level: level, list: listItem });
        }
    });

    if (isAccepted) {
        notification.classList.add("hide");
    }

    acceptButton.addEventListener("click", function () {
        localStorage.setItem("privacyAccepted", "true");
        notification.classList.add("hide");
    });

    let currentURL = window.location.href;
    let storedLang = localStorage.getItem("siteLang");

    if (!storedLang) {
        if (currentURL.includes("/ru/")) {
            localStorage.setItem("siteLang", "ru");
        } else if (currentURL.includes("/uk/")) {
            localStorage.setItem("siteLang", "uk");
        } else {
            localStorage.setItem("siteLang", "en"); // en start
        }
        storedLang = localStorage.getItem("siteLang");
    }
    // en not first
    if (!currentURL.includes("/ru/") && !currentURL.includes("/uk/")) {
        let savedLang = localStorage.getItem("siteLang");

        if (savedLang === "ru") {
            $(".lang-up a[href$='/uk/']").closest("li").hide();
        } else if (savedLang === "uk") {
            $(".lang-up a[href$='/ru/']").closest("li").hide();
        }
    }

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
    }
});

menuBtn.click(toggleNav);
overlay.click(toggleNav);

function toggleNav(e) {
    e.preventDefault();
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