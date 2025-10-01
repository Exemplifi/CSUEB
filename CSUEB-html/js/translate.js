function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'en',
      autoDisplay: false
    },
    'google_translate_element'
  );
}

function changeLanguage(lang, label) {
  var selectField = document.querySelector("select.goog-te-combo");
  if (selectField) {
    selectField.value = lang;
    selectField.dispatchEvent(new Event("change"));
    // Update selected language span (prevent translation)
    var span = document.getElementById("selected-lang");
    if (span) {
      span.innerText = label;
      span.setAttribute("translate", "no");
      span.classList.add("notranslate");
    }
  } else {
    console.error("Google Translate select box not found yet.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".lang-option").forEach(function (el) {
    el.setAttribute("translate", "no");
    el.classList.add("notranslate");
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var lang = this.getAttribute("data-lang");
      //var label = this.innerText; // Use the visible text as label
      var label = lang.toUpperCase(); // show as short code in uppercase
      changeLanguage(lang, label);
    });
  });
});