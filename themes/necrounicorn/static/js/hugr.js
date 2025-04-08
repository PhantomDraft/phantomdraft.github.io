/**
 * Утилиты для плавного исчезновения/появления элементов.
 * Используется для эмуляции эффектов fadeOut и fadeIn (примерно 200мс).
 */
function fadeOut(element, duration = 200, callback) {
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = 0;
  setTimeout(() => {
    if (callback) callback();
  }, duration);
}

function fadeIn(element, duration = 200, callback) {
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = 1;
  setTimeout(() => {
    if (callback) callback();
  }, duration);
}

/**
 * Класс для управления шапкой сайта:
 * - Смена классов (default ↔ fixed) при прокрутке
 * - Изменение прозрачности мобильной навигации
 */
class HeaderManager {
  constructor(headerSelector, mobileNavSelector) {
    this.header = document.querySelector(headerSelector);
    this.mobileNavigation = document.querySelector(mobileNavSelector);
    if (!this.header) return;
    // Определяем исходное положение шапки
    this.originalPos = this.header.getBoundingClientRect().top + window.pageYOffset;
    this.headerHeight = this.header.offsetHeight;
    if (!this.header.classList.contains('default') &&
        !this.header.classList.contains('fixed')) {
      this.header.classList.add('default');
    }
  }
  
  init() {
    window.addEventListener('scroll', this.onScroll.bind(this));
  }
  
  onScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const opacity = scrollTop > 500 ? 1 : scrollTop * 2 / 1000;
    if (this.mobileNavigation) {
      this.mobileNavigation.style.opacity = opacity;
    }
    // Если прокрутка прошла точку, где шапка должна изменить состояние
    if (scrollTop > this.originalPos + this.headerHeight && 
        this.header.classList.contains('default')) {
      fadeOut(this.header, 200, () => {
        this.header.classList.remove('default');
        this.header.classList.add('fixed');
        fadeIn(this.header, 200);
      });
    } else if (scrollTop <= this.originalPos && 
               this.header.classList.contains('fixed')) {
      fadeOut(this.header, 200, () => {
        this.header.classList.remove('fixed');
        this.header.classList.add('default');
        fadeIn(this.header, 200);
      });
    }
  }
}

/**
 * Класс для реализации функционала переключения табов.
 * Структура: контейнер с классом .update, содержащий список переключателей (.tabs-titles)
 * и секции контента (.inner > div), идентификаторы которых соответствуют атрибуту href переключателей.
 */
class Tabs {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;
    this.tabTitles = this.container.querySelectorAll('.tabs-titles a');
    this.tabContents = this.container.querySelectorAll('.inner > div');
    this.bindEvents();
    // Инициализация – активируем первый таб
    if (this.tabTitles.length > 0) {
      this.activateTab(this.tabTitles[0]);
    }
  }
  
  bindEvents() {
    this.tabTitles.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        this.activateTab(tab);
      });
    });
  }
  
  activateTab(tab) {
    // Снимаем активное состояние со всех переключателей и скрываем все секции
    this.tabTitles.forEach(t => t.classList.remove('active'));
    this.tabContents.forEach(content => content.style.display = 'none');
    // Активируем выбранный таб
    tab.classList.add('active');
    const targetId = tab.getAttribute('href').substring(1);
    const targetContent = this.container.querySelector(`#${targetId}`);
    if (targetContent) {
      targetContent.style.display = 'block';
    }
  }
}

/**
 * Класс для сохранения и установки языка сайта.
 * Если в локальном хранилище отсутствует язык, определяется язык по URL:
 * - Если URL содержит "/ru/", сохраняется "ru"
 * - Если URL содержит "/uk/", сохраняется "uk"
 * - Иначе сохраняется "en"
 * При использовании английской версии скрываются переключатели альтернативных языков.
 */
class LanguageManager {
  constructor() {
    this.currentURL = window.location.href;
    this.siteLangKey = "siteLang";
  }
  
  init() {
    let storedLang = localStorage.getItem(this.siteLangKey);
    if (!storedLang) {
      if (this.currentURL.includes("/ru/")) {
        localStorage.setItem(this.siteLangKey, "ru");
      } else if (this.currentURL.includes("/uk/")) {
        localStorage.setItem(this.siteLangKey, "uk");
      } else {
        localStorage.setItem(this.siteLangKey, "en");
      }
      storedLang = localStorage.getItem(this.siteLangKey);
    }
    
    if (!this.currentURL.includes("/ru/") && !this.currentURL.includes("/uk/")) {
      if (storedLang === "ru") {
        const elems = document.querySelectorAll(".lang-up a[href$='/uk/']");
        elems.forEach(elem => {
          const li = elem.closest("li");
          if (li) li.style.display = "none";
        });
      } else if (storedLang === "uk") {
        const elems = document.querySelectorAll(".lang-up a[href$='/ru/']");
        elems.forEach(elem => {
          const li = elem.closest("li");
          if (li) li.style.display = "none";
        });
      }
    }
  }
}

/**
 * Класс для управления окном уведомления о кукисах/конфиденциальности.
 * Если соответствующий флаг сохранён в localStorage, окно скрывается.
 * При клике по кнопке пользовательское согласие сохраняется и окно скрывается.
 */
class CookieNotice {
  constructor(notificationSelector, acceptButtonSelector) {
    this.notification = document.querySelector(notificationSelector);
    this.acceptButton = document.querySelector(acceptButtonSelector);
    this.storageKey = "privacyAccepted";
    if (this.acceptButton && this.notification) {
      this.acceptButton.addEventListener("click", this.accept.bind(this));
    }
  }
  
  init() {
    if (localStorage.getItem(this.storageKey)) {
      if (this.notification) this.notification.classList.add("hide");
    }
  }
  
  accept(e) {
    e.preventDefault();
    localStorage.setItem(this.storageKey, "true");
    if (this.notification) this.notification.classList.add("hide");
  }
}

/**
 * Класс для построения оглавления (TOC) на основе заголовков внутри элемента article.
 * Для заголовков с id формируется вложенный список, где:
 * - Заголовки уровня <h2> становятся верхним уровнем
 * - Более глубокие заголовки группируются в виде подсписков
 */
class TableOfContents {
  constructor(tocSelector, articleSelector = "article") {
    this.tocContainer = document.querySelector(tocSelector);
    this.article = document.querySelector(articleSelector);
    this.levels = [];
  }
  
  init() {
    if (!this.tocContainer || !this.article) return;
    const headers = this.article.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headers.forEach(header => {
      const tag = header.tagName.toLowerCase();
      const text = header.textContent.trim();
      const id = header.getAttribute('id');
      if (!id) return; // Пропускаем заголовки без id
      const level = parseInt(tag.replace('h', ''), 10);
      const listItem = document.createElement("li");
      const anchor = document.createElement("a");
      anchor.setAttribute("href", `#${id}`);
      anchor.textContent = text;
      listItem.appendChild(anchor);
      
      if (level === 2) {
        this.tocContainer.appendChild(listItem);
        this.levels = [{ level: 2, listItem: listItem }];
      } else {
        while (this.levels.length > 0 &&
               this.levels[this.levels.length - 1].level >= level) {
          this.levels.pop();
        }
        if (this.levels.length > 0) {
          let parent = this.levels[this.levels.length - 1].listItem;
          let subList = parent.querySelector("ul");
          if (!subList) {
            subList = document.createElement("ul");
            parent.appendChild(subList);
          }
          subList.appendChild(listItem);
        } else {
          // Если нет вложенности, добавляем в корень TOC
          this.tocContainer.appendChild(listItem);
        }
        this.levels.push({ level: level, listItem: listItem });
      }
    });
  }
}

/**
 * Класс для боковой панели (SidePanel).
 * При открытии одной панели автоматически закрываются все остальные.
 */
class SidePanel {
  static currentOpenPanel = null;
  
  constructor(options) {
    // options: { wrapSelector, overlaySelector, slidenavSelector }
    this.wrap = document.querySelector(options.wrapSelector);
    this.overlay = document.querySelector(options.overlaySelector);
    this.slidenav = document.querySelector(options.slidenavSelector);
  }
  
  open() {
    if (SidePanel.currentOpenPanel && SidePanel.currentOpenPanel !== this) {
      SidePanel.currentOpenPanel.close();
    }
    this.wrap && this.wrap.classList.add("navOut");
    this.overlay && this.overlay.classList.add("show");
    this.slidenav && this.slidenav.classList.add("active");
    SidePanel.currentOpenPanel = this;
  }
  
  close() {
    this.wrap && this.wrap.classList.remove("navOut");
    this.overlay && this.overlay.classList.remove("show");
    this.slidenav && this.slidenav.classList.remove("active");
    if (SidePanel.currentOpenPanel === this) {
      SidePanel.currentOpenPanel = null;
    }
  }
  
  toggle() {
    if (this.wrap && this.wrap.classList.contains("navOut")) {
      this.close();
    } else {
      this.open();
    }
  }
}

/**
 * Класс для управления навигацией.
 * Реализует:
 * - Тoggling боковой панели (с использованием класса SidePanel)
 * - Переключение отображения меню при клике по элементу #pull
 * - Адаптивное поведение меню при изменении размеров окна
 * - Плавную прокрутку для ссылок из мобильной навигации и оглавления
 * - Переключение отображения окна оглавления при клике по кнопке
 */
class NavigationManager {
  constructor(options) {
    // Ожидаемые селекторы передаются в options:
    // menuSelector, menuBtnSelector, overlaySelector, pullSelector, wrapSelector,
    // slidenavSelector, tableOfContentsButtonSelector, tableOfContentsSelector,
    // mobileNavLinkSelector, tocLinkSelector.
    this.menu = document.querySelector(options.menuSelector);
    this.menuBtn = document.querySelector(options.menuBtnSelector);
    this.overlay = document.querySelector(options.overlaySelector);
    this.pull = document.querySelector(options.pullSelector);
    this.wrap = document.querySelector(options.wrapSelector);
    this.slidenav = document.querySelector(options.slidenavSelector);
    this.tableOfContentsButton = document.querySelector(options.tableOfContentsButtonSelector);
    this.tableOfContents = document.querySelector(options.tableOfContentsSelector);
    
    // Инициализируем боковую панель
    this.sidePanel = new SidePanel({
      wrapSelector: options.wrapSelector,
      overlaySelector: options.overlaySelector,
      slidenavSelector: options.slidenavSelector
    });
    
    this.mobileNavLinks = document.querySelectorAll(options.mobileNavLinkSelector);
    this.tocLinks = document.querySelectorAll(options.tocLinkSelector);
    
    this.bindEvents();
  }
  
  bindEvents() {
    if (this.menuBtn) {
      this.menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.sidePanel.toggle();
      });
    }
    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        e.preventDefault();
        this.sidePanel.toggle();
      });
    }
    if (this.pull && this.menu) {
      this.pull.addEventListener('click', (e) => {
        e.preventDefault();
        // Простая эмуляция slideToggle: скрываем/показываем меню
        if (this.menu.style.display === 'none' ||
            getComputedStyle(this.menu).display === 'none') {
          this.menu.style.display = 'block';
        } else {
          this.menu.style.display = 'none';
        }
      });
    }
    // При изменении размера окна, если ширина >320 и меню скрыто, удаляем inline-стили
    window.addEventListener('resize', () => {
      if (window.innerWidth > 320 &&
          (this.menu.style.display === 'none' ||
           getComputedStyle(this.menu).display === 'none')) {
        this.menu.removeAttribute('style');
      }
    });
    
    // Обработчик плавной прокрутки для ссылок мобильной навигации и оглавления
    const smoothScrollHandler = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        if (history.pushState) {
          history.pushState(null, null, ' ');
        }
      }
    };
    
    this.mobileNavLinks.forEach(link => {
      link.addEventListener('click', smoothScrollHandler);
    });
    this.tocLinks.forEach(link => {
      link.addEventListener('click', smoothScrollHandler);
    });
    
    // Переключение отображения оглавления при клике на соответствующую кнопку
    if (this.tableOfContentsButton && this.tableOfContents) {
      this.tableOfContentsButton.addEventListener('click', () => {
        if (this.tableOfContents.style.display === 'none' ||
            getComputedStyle(this.tableOfContents).display === 'none') {
          this.tableOfContents.style.display = 'block';
        } else {
          this.tableOfContents.style.display = 'none';
        }
      });
    }
  }
}

/**
 * Инициализация всех компонентов после загрузки DOM
 */
document.addEventListener('DOMContentLoaded', () => {
  // Управление шапкой сайта
  const headerManager = new HeaderManager('#hat', '.mobile_navigation');
  headerManager.init();
  
  // Инициализация табов
  const tabs = new Tabs('.update');
  
  // Управление языком сайта
  const languageManager = new LanguageManager();
  languageManager.init();
  
  // Уведомление о кукисах / конфиденциальности
  const cookieNotice = new CookieNotice('#privacy-notification', '#accept-privacy');
  cookieNotice.init();
  
  // Построение оглавления страницы
  const toc = new TableOfContents('#table_of_list', 'article');
  toc.init();
  
  // Инициализация навигации (боковая панель, плавная прокрутка, переключение меню)
  const navigationManager = new NavigationManager({
    menuSelector: '.in_the_middle',
    menuBtnSelector: '.menuBtn',
    overlaySelector: '#overlay',
    pullSelector: '#pull',
    wrapSelector: '.wrap',
    slidenavSelector: '.slidenav',
    tableOfContentsButtonSelector: '#table_of_contents_button',
    tableOfContentsSelector: '#table_of_contents',
    mobileNavLinkSelector: '.mobile_navigation a',
    tocLinkSelector: '#table_of_contents a'
  });
});