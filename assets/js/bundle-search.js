---
layout: null
---

{% unless site.output == "web" and site.data.settings.web.search.type == "google-cse" %}

{% include metadata %}

{% include_relative elasticlunr.min.js %}
{% include_relative search-data.js %}
{% include_relative search.js %}

{% endunless %}
