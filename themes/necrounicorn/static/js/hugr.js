let wnd = $(window), 
	wrap = $('.wrap'), 
	menu = $('.in_the_middle'), 
	mobile_navigation = $('.mobile_navigation'), 
	pull = $('#pull'), 
	menuBtn = $('.menuBtn'), 
	slidenav = $('.slidenav'), 
	overlay = $('#overlay'), 
	$tocList = $('#toc-list'), 
	headers = $('article').find('h1, h2, h3, h4, h5, h6'), 
	levels = [];

menuHeight = menu.height();

$(function() {

	let hat = $('#hat'), 
		pos = hat.offset(), 
		index = 'key_tab', 
		dataStore = window.sessionStorage;
	try {
		let oldIndex = dataStore.getItem(index);
	} catch(e) {
		let oldIndex = 0;
	}
	// latched when scrolling
	wnd.scroll(function() {

		let top = wnd.scrollTop(), 
			opacity = top > 500 ? 1 : top * 2 / 1000;

		if ($(this).scrollTop() > pos.top+hat.height() && hat.hasClass('default')) {

			hat.fadeOut('fast', function() {
				$(this).removeClass('default').addClass('fixed').fadeIn('fast');
			});

		} else if ($(this).scrollTop() <= pos.top && hat.hasClass('fixed')) {

			hat.fadeOut('fast', function() {
				$(this).removeClass('fixed').addClass('default').fadeIn('fast');
			});

		}
		// mobile navigation
		mobile_navigation.css('opacity', opacity);
	});
	// aside tabs
	$('.update').tabs();
	// slider
	$('.slider').glide({
		autoplay: 11000
	});
});

// for tablet, mobile
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

// mobile scroll
$('.mobile_navigation a').on('click', function() {

	let href = $(this).attr('href');

	$('html, body').animate({
		scrollTop: $(href).offset().top
	}, {
		duration: 370, 
		easing: "linear"
	});

	return false;
});

// pleer
menuBtn.click(function() {
	toggleNav();
});

overlay.click(function() {
	toggleNav();
});

function toggleNav() {
	wrap.toggleClass('navOut');
	overlay.toggleClass('show');
	slidenav.toggleClass('active');
}


headers.each(function () {
        let tag = $(this).prop('tagName').toLowerCase();
        let text = $(this).text();
        let id = $(this).attr('id') || text.toLowerCase().replace(/\s+/g, '-');
        $(this).attr('id', id);

        // Создаём элемент списка
        let listItem = $('<li>').append(
            $('<a>').attr('href', `#${id}`).text(text)
        );

        // Определяем уровень заголовка
        let level = parseInt(tag.replace('h', ''), 10);

        // Вложенность
        if (!levels[level]) levels[level] = $('<ul>');
        levels[level].append(listItem);

        // Если это первый уровень или родительский существует
        if (level === 1 || levels[level - 1]) {
            if (!levels[level - 1]) {
                $tocList.append(levels[level]); // Первый уровень добавляем напрямую
            } else {
                levels[level - 1].append(levels[level]); // Вложенные добавляем к родителю
            }
        }
    });

    // Переключение видимости оглавления
    $('#toc-button').click(function () {
        $('#toc-container').toggle();
    });

    // Прокрутка к заголовкам
    $('#toc-container a').click(function (e) {
        e.preventDefault();
        let target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 500);
        }
    });



// tag
function DblHelix(n, rx, ry, rz) {

	let a = Math.PI / n, i, j, p = [], z = rz * 2 / n;

	for (i = 0; i < n; ++i) {
		j = a * i;
		if (i % 2)
			j += Math.PI;
			p.push([rx * Math.cos(j), rz - z * i, ry * Math.sin(j)]);
		}
	return p;
}