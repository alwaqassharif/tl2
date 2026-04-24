document.addEventListener("DOMContentLoaded", function () {

(function () {

  try {

    function addSchema(data){
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    }

    const title = document.title || "";
    const description = document.querySelector('meta[name="description"]')?.content || "";
    const url = window.location.href;

    const image =
      document.querySelector("figure img")?.src ||
      document.querySelector("article img")?.src ||
      document.querySelector("img")?.src ||
      "";

    // =======================
    // FAQ Schema Generator
    // =======================
    let faqs = [];

    document.querySelectorAll("h3").forEach(q => {
      let answer = q.nextElementSibling;

      if (
        answer &&
        answer.tagName === "P" &&
        answer.innerText.trim() !== ""
      ) {
        faqs.push({
          "@type": "Question",
          "name": q.innerText.trim(),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": answer.innerText.trim()
          }
        });
      }
    });

    // =======================
    // BlogPosting Schema
    // =======================
    addSchema({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": title,
      "description": description,
      "image": image ? [image] : [],
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "author": {
        "@type": "Organization",
        "name": "GPost"
      },
      "publisher": {
        "@type": "Organization",
        "name": "GPost",
        "logo": {
          "@type": "ImageObject",
          "url": "https://gpost.store/img/logo.png"
        }
      },
      "mainEntityOfPage": url
    });

    // =======================
    // FAQ Schema
    // =======================
    if (faqs.length > 0) {
      addSchema({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs
      });
    }

    // =======================
    // Breadcrumb Schema
    // =======================
    addSchema({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://gpost.store"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": title,
          "item": url
        }
      ]
    });

  } catch (error) {
    console.error("Schema Script Error:", error);
  }

})();

});
