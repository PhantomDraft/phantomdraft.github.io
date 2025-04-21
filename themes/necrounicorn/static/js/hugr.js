/**
 * HeaderManager class
 * - Toggles header classes ("default" ↔ "fixed") based on scroll position.
 * - Adjusts the opacity of mobile navigation.
 */
class HeaderManager {
  constructor(headerSelector, mobileNavSelector) {
    this.header = document.querySelector(headerSelector);
    this.mobileNavigation = document.querySelector(mobileNavSelector);
    if (!this.header) return;
    // Define the header’s original position
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
    // Toggle header state based on scroll position
    if (scrollTop > this.originalPos + this.headerHeight && 
        this.header.classList.contains('default')) {
      this.header.classList.remove('default');
      this.header.classList.add('fixed');
    } else if (scrollTop <= this.originalPos && 
               this.header.classList.contains('fixed')) {
      this.header.classList.remove('fixed');
      this.header.classList.add('default');
    }
  }
}

/**
 * Tabs class
 * Implements tab switching functionality.
 * Structure: container with class ".update" containing a list of tab links (.tabs-titles)
 * and content sections (.inner > div) whose IDs correspond to the href attribute of the links.
 */
class Tabs {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;
    this.tabTitles = this.container.querySelectorAll('.tabs-titles a');
    this.tabContents = this.container.querySelectorAll('.inner > div');
    this.bindEvents();
    // Initialize – activate first tab by default
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
    // Remove active state from all tabs and hide all content sections
    this.tabTitles.forEach(t => t.classList.remove('active'));
    this.tabContents.forEach(content => content.style.display = 'none');
    // Activate the selected tab
    tab.classList.add('active');
    const targetId = tab.getAttribute('href').substring(1);
    const targetContent = this.container.querySelector(`#${targetId}`);
    if (targetContent) {
      targetContent.style.display = 'block';
    }
  }
}

/**
 * LanguageManager class
 * Manages site language settings.
 * If no language is stored in localStorage, determines the language by URL:
 * - If URL contains "/ru/", stores "ru"
 * - If URL contains "/uk/", stores "uk"
 * - Otherwise, stores "en"
 * When using the English version, alternative language links are hidden.
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
 * CookieNotice class
 * Manages the cookie/privacy notification window.
 * If the corresponding flag is set in localStorage, the window is hidden.
 * On clicking the acceptance button, the consent is stored and the window is hidden.
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
 * TableOfContents class
 * Builds a table of contents (TOC) based on headers within an article.
 * For headers with an id, it creates a nested list:
 * - <h2> level headers form the top level.
 * - Deeper headers are grouped into sub-lists.
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
      if (!id) return; // Skip headers without an id
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
          // If there is no nesting, add directly to the TOC container
          this.tocContainer.appendChild(listItem);
        }
        this.levels.push({ level: level, listItem: listItem });
      }
    });
  }
}

/**
 * SidePanel class
 * Manages sidebar panels.
 * When one panel is opened, any previously open panel is automatically closed.
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
    if (this.wrap) this.wrap.classList.add("navOut");
    if (this.overlay) this.overlay.classList.add("show");
    if (this.slidenav) this.slidenav.classList.add("active");
    SidePanel.currentOpenPanel = this;
  }

  close() {
    if (this.wrap) this.wrap.classList.remove("navOut");
    if (this.overlay) this.overlay.classList.remove("show");
    if (this.slidenav) this.slidenav.classList.remove("active");
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
 * NavigationManager class
 * Implements:
 * - Toggling the sidebar panel (using the SidePanel class)
 * - Showing/hiding the menu when clicking on the #pull element
 * - Responsive menu behavior on window resize
 * - Smooth scrolling for links in mobile navigation and the table of contents
 * - Toggling the display of the table of contents when clicking its button
 */
class NavigationManager {
  constructor(options) {
    // Expected selectors in options:
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
    // Initialize the sidebar panel
    this.sidePanel = new SidePanel({
      wrapSelector: options.wrapSelector,
      overlaySelector: options.overlaySelector,
      slidenavSelector: options.slidenavSelector
    });

    this.mobileNavLinks = document.querySelectorAll(options.mobileNavLinkSelector);
    this.tocLinks = document.querySelectorAll(options.tocLinkSelector);

    this.bindEvents();

    window.navigationManagerInstance = this;
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
        // Simple emulation of slideToggle: show/hide the menu
        if (this.menu.style.display === 'none' ||
            getComputedStyle(this.menu).display === 'none') {
          this.menu.style.display = 'block';
        } else {
          this.menu.style.display = 'none';
        }
      });
    }
    // On window resize, if width >320 and the menu is hidden, remove inline styles
    window.addEventListener('resize', () => {
      if (window.innerWidth > 320 &&
          (this.menu.style.display === 'none' ||
           getComputedStyle(this.menu).display === 'none')) {
        this.menu.removeAttribute('style');
      }
    });

    // Smooth scroll handler for mobile navigation and TOC links
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

    // Toggle the display of the table of contents when its button is clicked
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
 * SearchManager class
 * Implements search functionality.
 * Handles the display/hide of the search form, the search query,
 * and dynamically adds the found posts to the results container.
 */
class SearchManager {
  constructor() {
    // Elements related to search functionality.
    this.searchForms = document.querySelectorAll('.search-form');
    this.searchRoots = document.querySelectorAll('.search-root');
    this.searchContainers = document.querySelectorAll('.search');
    this.searchInputs = document.querySelectorAll('.search input');
    this.searchZzButtons = document.querySelectorAll('.search-zz');
    this.searchButtons = document.querySelectorAll('.search button');
    this.clearButtons = document.querySelectorAll('.sclear');
    this.searchKeyInput = document.getElementById('search-key');
    // Assumes existence of global variables: arrPosts, postsCount, search_nothing, search_found, search_results, search_result, search_theEnd.
  }

  init() {
    // Attach click event to each element with class "search-form"
    this.searchForms.forEach(form => {
      form.addEventListener('click', () => {
        this.showSearch();
      });
    });

    // Attach click event to each element with class "search-zz"
    this.searchZzButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.hideSearch();
      });
    });

    // Attach click event to each search button to trigger search.
    this.searchButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.search();
      });
    });

    // Attach click event to each clear button (class "sclear")
    this.clearButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (this.searchKeyInput) {
          this.searchKeyInput.value = '';
          this.searchKeyInput.focus();
        }
        this.clearPosts();
      });
    });

    // Attach keydown event to trigger search on "Enter" key press.
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        this.search();
      }
    });
  }

  // Displays the search interface: show the search root, animate marginTop to 10px and focus the input.
  showSearch() {
    this.searchRoots.forEach(root => {
      root.style.display = 'block';
    });
    this.searchContainers.forEach(searchElem => {
      searchElem.style.transition = 'margin-top 100ms linear';
      searchElem.style.marginTop = '10px';
    });
    this.searchInputs.forEach(input => {
      input.focus();
    });
  }

  // Hides the search interface: resets marginTop, hides the search root, clears the input, and clears search results.
  hideSearch() {
    this.searchContainers.forEach(searchElem => {
      searchElem.style.marginTop = '0';
    });
    this.searchRoots.forEach(root => {
      root.style.display = 'none';
    });
    if (this.searchKeyInput) {
      this.searchKeyInput.value = '';
    }
    this.clearPosts();
  }

  // Performs the search and displays results.
  search() {
    this.clearPosts();
    const key = this.searchKeyInput ? this.searchKeyInput.value : '';
    let postCount = 0;
    const sbodyElem = document.querySelector('.sbody');
    const stipElem = document.querySelector('.stip');
    const sbody1Elem = document.querySelector('.sbody-1');

    if (!key) {
      if (stipElem) {
        stipElem.innerHTML = search_nothing + '，';
      }
      const atBottom = document.querySelector('.at-bottom');
      if (atBottom) {
        atBottom.style.display = 'none';
      }
      if (sbodyElem) {
        sbodyElem.style.display = 'block';
      }
      return;
    }

    // Loop through posts; assume arrPosts is an array and postsCount is defined globally.
    for (let i = 0; i < postsCount; i++) {
      const post = arrPosts[i];
      const postTitle = post.title;
      const postPubDate = post.pubDate;
      const postPlain = post.plain;
      const link = post.link;
      const keyIndex = postPlain.indexOf(key);
      const keyIndexTitle = postTitle.indexOf(key);

      if (keyIndex >= 0 || keyIndexTitle >= 0) {
        const postMark = this.toMark(postPlain, key);
        const postMark2 = this.toMarkTitle(postTitle, key);
        postCount++;
        if (postMark || postMark2) {
          this.addItem(this.hlHtml(postMark2, key), postPubDate, this.hlHtml(postMark, key), link);
        }
      }
    }

    if (stipElem) {
      if (postCount === 0) {
        stipElem.innerHTML = search_nothing + '，';
      } else {
        stipElem.innerHTML = search_found + ' ' + postCount + (postCount > 1 ? (' ' + search_results + ', ') : (' ' + search_result + ', '));
        if (sbody1Elem) {
          sbody1Elem.insertAdjacentHTML('beforeend', '<div class="at-bottom">' + search_theEnd + '</div>');
        }
      }
    }

    if (sbodyElem) {
      sbodyElem.style.display = 'block';
    }
  }

  // Adds a search result item to the results container.
  addItem(title, pubDate, mark, link) {
    const pHtml = `<a href="${link}" target="_blank" class="post">
      <div class="post-header">
        <h4 class="post-title">${title}</h4>
        <div class="post-time">${pubDate}</div>
      </div>
      <div class="post-mark">${mark}</div>
    </a>`;
    const div = document.createElement('div');
    div.innerHTML = pHtml;
    div.className = 'post-root';
    const sbody1Elem = document.querySelector('.sbody-1');
    if (sbody1Elem) {
      sbody1Elem.appendChild(div);
    }
  }

  // Clears previous search results.
  clearPosts() {
    const sbodyElem = document.querySelector('.sbody');
    if (sbodyElem) {
      sbodyElem.style.display = 'none';
    }
    document.querySelectorAll('.post-root, .at-bottom').forEach(el => el.remove());
  }

  // Extracts a snippet from the post plain text where the search key is found.
  toMark(oPlain, key) {
    const kIdx = oPlain.indexOf(key);
    if (kIdx >= 0) {
      const kLen = key.length;
      let beginIdx = kIdx;
      let postMark_l = '';
      const postMark_r = oPlain.slice(kIdx + kLen, kIdx + kLen + 401);
      while (beginIdx > 0 && [',', '.', '，', '。'].indexOf(oPlain[beginIdx - 1]) === -1) {
        beginIdx--;
        postMark_l = oPlain[beginIdx] + postMark_l;
      }
      if (postMark_l === key) {
        return '';
      }
      return postMark_l + key + postMark_r;
    } else {
      return oPlain === '' ? '...' : oPlain;
    }
  }

  // Extracts a snippet from the post title where the search key is found.
  toMarkTitle(oPlain, key) {
    const kIdx = oPlain.indexOf(key);
    if (kIdx >= 0) {
      const kLen = key.length;
      let beginIdx = kIdx;
      let postMark_l = '';
      const postMark_r = oPlain.slice(kIdx + kLen, kIdx + kLen + 401);
      while (beginIdx > 0 && [',', '.', '，', '。'].indexOf(oPlain[beginIdx - 1]) === -1) {
        beginIdx--;
        postMark_l = oPlain[beginIdx] + postMark_l;
      }
      if (postMark_l === key) {
        return '';
      }
      return postMark_l + key + postMark_r;
    }
    return oPlain;
  }

  // Highlights the occurrences of the search key in the text by wrapping them in a span element.
  hlHtml(oMark, key) {
    let keyIdx = oMark.indexOf(key);
    if (oMark && keyIdx >= 0) {
      let text = oMark;
      let newMark = '';
      const keyHtml = `<span class="key-hl">${key}</span>`;
      while (keyIdx >= 0) {
        newMark += text.slice(0, keyIdx) + keyHtml;
        text = text.slice(keyIdx + key.length);
        keyIdx = text.indexOf(key);
      }
      return newMark + text;
    }
    return oMark;
  }
}

/**
 * Initialize all components after the DOM content is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  // Header management
  const headerManager = new HeaderManager('#hat', '.mobile_navigation');
  headerManager.init();

  // Tabs initialization
  const tabs = new Tabs('.update');

  // Language management
  const languageManager = new LanguageManager();
  languageManager.init();

  // Cookie/privacy notice
  const cookieNotice = new CookieNotice('#privacy-notification', '#accept-privacy');
  cookieNotice.init();

  // Build the table of contents
  const toc = new TableOfContents('#table_of_list', 'article');
  toc.init();

  // Navigation management (sidebar panel, smooth scrolling, menu toggling)
  const navigationManager = new NavigationManager({
    menuSelector: '.in_the_middle',
    menuBtnSelector: '.menuBtn[data-panel]',
    overlaySelector: '#overlay',
    pullSelector: '#pull',
    wrapSelector: '.wrap',
    slidenavSelector: '.slidenav',
    tableOfContentsButtonSelector: '#table_of_contents_button',
    tableOfContentsSelector: '#table_of_contents',
    mobileNavLinkSelector: '.mobile_navigation a',
    tocLinkSelector: '#table_of_contents a'
  });

  // Search functionality initialization
  const searchManager = new SearchManager();
  searchManager.init();
});

document.addEventListener('DOMContentLoaded', () => {
  // Panel toggler: opens only one panel at a time
  document.querySelectorAll('.menuBtn[data-panel]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const panelName = btn.getAttribute('data-panel'); // "inside" или "projects"
      const allContents = document.querySelectorAll('[data-panel-content]');
      // Hide all panels
      allContents.forEach(el => el.style.display = 'none');
      // Show matching panel
      const target = document.querySelector(`[data-panel-content="${panelName}"]`);
      if (target) target.style.display = 'block';
      // Open the side panel
      window.navigationManagerInstance.sidePanel.open();
    });
  });
});