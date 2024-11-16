---
title: "Sitemap EN"
url: "/sitemap/en.xml"
layout: "sitemap"
outputs:
  - "sitemap"
---

{{- $baseURL := site.BaseURL -}}
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  {{ range (where .Site.Pages "Lang" "en") }}
  <url>
    <loc>{{ $baseURL }}{{ .RelPermalink }}</loc>
    <lastmod>{{ .Lastmod.Format "2006-01-02T15:04:05Z07:00" }}</lastmod>
    <priority>0.8</priority>
  </url>
  {{ end }}
</urlset>