// Инициализация переменных
const wrap = document.querySelector('.wrap');
const menu = document.querySelector('.in_the_middle');
const mobile_navigation = document.querySelector('.mobile_navigation');
const pull = document.getElementById('pull');
const menuBtn = document.querySelector('.menuBtn');
const slidenav = document.querySelector('.slidenav');
const overlay = document.getElementById('overlay');
const table_of_list = document.getElementById('table_of_list');
const headers = document.querySelectorAll('article h1, article h2, article h3, article h4, article h5, article h6');
let levels = [];

let menuHeight = menu.offsetHeight;

// Функции для анимации плавного появления/исчезновения
function fadeOut(element, callback, duration = 200) {
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = 0;
    setTimeout(() => {
        if (typeof callback === 'function') callback.call(element);
    }, duration);
}

function fadeIn(element, callback, duration = 200) {
    element.style.transition = `opacity ${duration}ms`;
    element.style.opacity = 1;
    setTimeout(() => {
        if (typeof callback === 'function') callback.call(element);
    }, duration);
}

// Функция для эффекта slideToggle
function slideToggle(element, duration = 200) {
    const computed = window.getComputedStyle(element);
    if (computed.display === 'none') {
        // slideDown
        element.style.removeProperty('display');
        let display = window.getComputedStyle(element).display;
        if (display === 'none') display = 'block';
        element.style.display = display;
        element.style.overflow = 'hidden';
        const fullHeight = element.scrollHeight;
        element.style.height = '0px';
        element.style.transition = `height ${duration}ms`;
        requestAnimationFrame(() => {
            element.style.height = fullHeight + 'px';
        });
        setTimeout(() => {
            element.style.removeProperty('height');
            element.style.removeProperty('overflow');
            element.style.removeProperty('transition');
        }, duration);
    } else {
        // slideUp
        element.style.overflow = 'hidden';
        const fullHeight = element.scrollHeight;
        element.style.height = fullHeight + 'px';
        requestAnimationFrame(() => {
            element.style.transition = `height ${duration}ms`;
            element.style.height = '0px';
        });
        setTimeout(() => {
            element.style.display = 'none';
            element.style.removeProperty('height');
            element.style.removeProperty('overflow');
            element.style.removeProperty('transition');
        }, duration);
    }
}

// Функция плавной прокрутки
function smoothScrollTo(targetY, duration = 600, callback) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const startTime = performance.now();

    function easeInOutQuad(t) {
        return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t;
    }

    function animateScroll(now) {
        const time = Math.min(1, ((now - startTime) / duration));
        const easedTime = easeInOutQuad(time);
        window.scrollTo(0, startY + distance * easedTime);
        if (time < 1) {
            requestAnimationFrame(animateScroll);
        } else {
            if (typeof callback === 'function') callback();
        }
    }
    requestAnimationFrame(animateScroll);
}

// Обработчик событий после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    const hat = document.getElementById('hat');
    const pos = { top: hat.offsetTop, left: hat.offsetLeft };
    const index = 'key_tab';
    const dataStore = window.sessionStorage;
    let oldIndex;
    try {
        oldIndex = dataStore.getItem(index);
    } catch (e) {
        oldIndex = 0;
    }

    let isScrolling = false;
    window.addEventListener('scroll', function() {
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
        const top = window.pageYOffset || document.documentElement.scrollTop;
        const opacity = top > 500 ? 1 : top * 2 / 1000;

        if (top > pos.top + hat.offsetHeight && hat.classList.contains('default')) {
            fadeOut(hat, function() {
                hat.classList.remove('default');
                hat.classList.add('fixed');
                fadeIn(hat);
            });
        } else if (top <= pos.top && hat.classList.contains('fixed')) {
            fadeOut(hat, function() {
                hat.classList.remove('fixed');
                hat.classList.add('default');
                fadeIn(hat);
            });
        }

        mobile_navigation.style.opacity = opacity;
    }

    // Построение списка оглавления
    headers.forEach(header => {
        const tag = header.tagName.toLowerCase();
        const text = header.textContent.trim();
        const id = header.id; // Используем существующий id
        if (!id) return; // Пропускаем заголовки без id

        const level = parseInt(tag.replace('h', ''), 10);
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = text;
        listItem.appendChild(link);

        if (level === 2) {
            table_of_list.appendChild(listItem);
            levels = [{ level: 2, list: listItem }];
        } else {
            while (levels.length > 0 && levels[levels.length - 1].level >= level) {
                levels.pop();
            }
            if (levels.length > 0) {
                const parentLevel = levels[levels.length - 1];
                let subList = parentLevel.list.querySelector('ul');
                if (!subList) {
                    subList = document.createElement('ul');
                    parentLevel.list.appendChild(subList);
                }
                subList.appendChild(listItem);
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
            localStorage.setItem("siteLang", "en"); // en по умолчанию
        }
        storedLang = localStorage.getItem("siteLang");
    }
    // Если URL не содержит /ru/ и /uk/
    if (!currentURL.includes("/ru/") && !currentURL.includes("/uk/")) {
        const savedLang = localStorage.getItem("siteLang");
        if (savedLang === "ru") {
            const elem = document.querySelector(".lang-up a[href$='/uk/']");
            if (elem && elem.closest("li")) {
                elem.closest("li").style.display = 'none';
            }
        } else if (savedLang === "uk") {
            const elem = document.querySelector(".lang-up a[href$='/ru/']");
            if (elem && elem.closest("li")) {
                elem.closest("li").style.display = 'none';
            }
        }
    }

    // Инициализация табов и слайдера
    document.querySelectorAll('.update').forEach(el => {
        // Реализуйте функциональность табов на чистом JavaScript по необходимости
    });
    document.querySelectorAll('.slider').forEach(el => {
        // Реализуйте функциональность слайдера (например, с автопроигрыванием 11000 мс) на чистом JavaScript
    });
});

// Обработчик клика по кнопке pull для переключения меню
pull.addEventListener('click', function(e) {
    e.preventDefault();
    slideToggle(menu);
});

// Обработчик изменения размеров окна
window.addEventListener('resize', function() {
    const w = window.innerWidth;
    if (w > 320 && window.getComputedStyle(menu).display === 'none') {
        menu.style.removeProperty('display');
        menu.style.removeProperty('height');
        menu.style.removeProperty('transition');
    }
});

// Делегирование событий для плавной прокрутки по ссылкам меню мобильной навигации и оглавления
document.addEventListener('click', function(e) {
    const target = e.target;
    if (target.matches('.mobile_navigation a, #table_of_contents a')) {
        e.preventDefault();
        const href = target.getAttribute('href');
        const scrollTarget = document.querySelector(href);
        if (scrollTarget) {
            const targetTop = scrollTarget.offsetTop;
            smoothScrollTo(targetTop, 600, function() {
                if (history.pushState) {
                    history.pushState(null, null, ' ');
                }
            });
        }
    }
});

// Обработчики клика для переключения навигационного меню
menuBtn.addEventListener('click', toggleNav);
overlay.addEventListener('click', toggleNav);

function toggleNav(e) {
    e.preventDefault();
    wrap.classList.toggle('navOut');
    overlay.classList.toggle('show');
    slidenav.classList.toggle('active');
}

// Переключение отображения оглавления
document.getElementById('table_of_contents_button').addEventListener('click', function() {
    const toc = document.getElementById('table_of_contents');
    if (window.getComputedStyle(toc).display === 'none') {
        toc.style.display = 'block';
    } else {
        toc.style.display = 'none';
    }
});

// Функция DblHelix (не требует преобразования)
function DblHelix(n, rx, ry, rz) {
    const a = Math.PI / n;
    const p = [];
    const z = (rz * 2) / n;
    for (let i = 0; i < n; ++i) {
        let j = a * i;
        if (i % 2) {
            j += Math.PI;
        }
        p.push([rx * Math.cos(j), rz - z * i, ry * Math.sin(j)]);
    }
    return p;
}