---
title: "{{ replace .Name "-" " " | title }}"
description: ""
# format for string: "xxxx-xx-xx"
date: {{ .Date }}
lastmod: "{{ .Date }}"
# set false when you want the post publish
draft: true
# one category: ["category-1"]
# more categories: ["category-1", "category-2", ...]
categories: []
# refer to categories
tags: []
# seires
series: []
# Top image for the post: /local/images/test/cover.jpg
image: ""
# Hide from home and other main page
hideFromCenter: false
# Hide from archive page
hideFromArchives: false
# Hide from everything but the archive
hideFromSection: false
# Hide from everything but the Sitemap
hideFromSitemap: false
# Hide from gtag
hideFromGtag: false
---

<!--more-->