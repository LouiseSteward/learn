---
layout: null
---

{% include_relative nav.js %}
{% include_relative get-query-variable.js %}
{% include_relative mark.min.js %}
{% include_relative mark-search-terms.js %}
{% include_relative videos.js %}
{% include_relative tables.js %}

// Custom Bettercare scripts
{% include_relative show-hide.js %}

{% if site.data.settings.web.search.type == "google-cse" and site.output == "web" %}
    {% include_relative google-cse.js %}
{% endif %}

{% if site.data.settings.web.monetization.enabled == true %}
    {% include_relative monetization.js %}
{% endif %}