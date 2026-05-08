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
    // Detect Blog Page
    // =========================
    const isBlogPage =
      window.location.pathname.includes("/blog") ||
      document.querySelector("article");

    // =========================
    // Dates
    // =========================
    const publishedDate =
      document.querySelector('meta[name="published_date"]')
      ?.content ||
      new Date().toISOString();

    const modifiedDate =
      document.querySelector('meta[name="modified_date"]')
      ?.content ||
      new Date().toISOString();

    // =========================
    // BLOG POSTING SCHEMA
    // Only for Blog Pages
    // =========================
    if (isBlogPage) {

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

    } else {

      // =========================
      // WEBPAGE SCHEMA
      // For Service/About/Home Pages
      // =========================
      addSchema({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": url + "#webpage",
        "url": url,
        "name": title,
        "description": description,
        "image": image,
        "publisher": {
          "@type": "Organization",
          "name": "GPost",
          "logo": {
            "@type": "ImageObject",
            "url": "https://gpost.store/img/logo.png"
          }
        }
      });

    }

    // =========================
    // FAQ SCHEMA
    // =========================
    let faqs = [];

    const faqSection = Array.from(
      document.querySelectorAll("h2")
    ).find(h2 =>
      h2.innerText.toLowerCase().includes("faq")
    );

    if (faqSection) {

      let current = faqSection.nextElementSibling;

      while (current) {

        if (current.tagName === "H2") break;

        if (current.tagName === "H3" || current.tagName === "H4") {

          let question = current.textContent.trim();

          let answerText = "";
          let answerNode = current.nextElementSibling;

          while (
            answerNode &&
            answerNode.tagName !== "H2" &&
            answerNode.tagName !== "H3" &&
            answerNode.tagName !== "H4"
          ) {
            if (answerNode.textContent.trim()) {
              answerText += answerNode.textContent.trim() + " ";
            }
            answerNode = answerNode.nextElementSibling;
          }

          if (question && answerText.trim()) {
            faqs.push({
              "@type": "Question",
              "name": question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": answerText.trim()
              }
            });
          }
        }

        current = current.nextElementSibling;
      }
    }

    if (faqs.length > 0) {
      addSchema({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": url + "#faq",
        "mainEntity": faqs
      });
    }

    // =========================
    // BREADCRUMB SCHEMA
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
