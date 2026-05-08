document.addEventListener("DOMContentLoaded", function () {

(function () {

  try {

    // =========================
    // Helper Function
    // =========================
    function addSchema(data) {

      const script = document.createElement("script");

      script.type = "application/ld+json";

      script.text = JSON.stringify(data);

      document.head.appendChild(script);
    }

    // =========================
    // Basic Data
    // =========================
    const title =
      document.title.replace(/\s+/g, " ").trim() || "";

    const description =
      document.querySelector('meta[name="description"]')
      ?.content
      ?.trim() || "";

    const url =
      window.location.href.split("#")[0];

    const image =
      document.querySelector("figure img")?.src ||
      document.querySelector("article img")?.src ||
      document.querySelector("img")?.src ||
      "https://gpost.store/img/default.jpg";

    // =========================
    // Detect Homepage
    // =========================
    const isHomePage =
      window.location.pathname === "/" ||
      window.location.pathname.includes("index");

    // Homepage پر schema skip
    if (isHomePage) return;

    // =========================
    // Dates
    // =========================

    // اگر meta tags موجود ہوں تو وہ use ہوں گے
    // ورنہ current date fallback ہوگی

    const publishedDate =
      document.querySelector('meta[name="published_date"]')
      ?.content ||
      new Date().toISOString();

    const modifiedDate =
      document.querySelector('meta[name="modified_date"]')
      ?.content ||
      new Date().toISOString();

    // =========================
    // BlogPosting Schema
    // =========================
    addSchema({

      "@context": "https://schema.org",

      "@type": "BlogPosting",

      "@id": url + "#blogposting",

      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      },

      "headline": title,

      "description": description,

      "image": {
        "@type": "ImageObject",
        "url": image
      },

      "datePublished": publishedDate,

      "dateModified": modifiedDate,

      "author": {
        "@type": "Organization",
        "name": "GPost",
        "url": "https://gpost.store/"
      },

      "publisher": {
        "@type": "Organization",
        "name": "GPost",

        "logo": {
          "@type": "ImageObject",
          "url": "https://gpost.store/img/logo.png"
        }
      }

    });

    // =========================
    // FAQ Schema
    // =========================

    let faqs = [];

    // صرف FAQs heading کے بعد والے سوالات
    const faqSection = Array.from(
      document.querySelectorAll("h2")
    ).find(h2 =>
      h2.innerText.trim().toLowerCase() === "faqs"
    );

    if (faqSection) {

      let current = faqSection.nextElementSibling;

      while (current) {

        // اگلا H2 آئے تو FAQs ختم
        if (current.tagName === "H2") break;

        // صرف H3 سوالات
        if (current.tagName === "H3") {

          let answer = current.nextElementSibling;

          if (
            answer &&
            answer.tagName === "P" &&
            answer.textContent.trim() !== ""
          ) {

            faqs.push({

              "@type": "Question",

              "name": current.textContent.trim(),

              "acceptedAnswer": {
                "@type": "Answer",
                "text": answer.textContent.trim()
              }

            });

          }

        }

        current = current.nextElementSibling;
      }

    }

    // اگر FAQs موجود ہوں
    if (faqs.length > 0) {

      addSchema({

        "@context": "https://schema.org",

        "@type": "FAQPage",

        "@id": url + "#faq",

        "mainEntity": faqs

      });

    }

    // =========================
    // Breadcrumb Schema
    // =========================
    addSchema({

      "@context": "https://schema.org",

      "@type": "BreadcrumbList",

      "@id": url + "#breadcrumb",

      "itemListElement": [

        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://gpost.store/"
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

    console.error("Schema Error:", error);

  }

})();

});
