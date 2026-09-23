// Language selection for the FeltIt site.
//
// The app compiles in the English URLs (privacy.html), so the English pages
// forward a first-time visitor to their browser's language. Once someone picks
// a language from the globe menu, that choice wins over the browser and is
// never overridden. Translated pages never redirect, so a direct link to one
// always shows it. Without JavaScript every page still works; only the
// automatic forward is lost.
(function () {
  var KEY = "feltit.lang";
  var SUPPORTED = ["de", "fr", "es", "it", "pt-BR", "ja", "ko", "zh-Hans"];

  function load() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  // Maps a BCP 47 browser tag to a shipped folder, "en", or null (no match).
  function match(tag) {
    tag = (tag || "").toLowerCase();
    var primary = tag.split("-")[0];
    if (primary === "en") return "en";
    if (primary === "zh") {
      // Traditional Chinese readers are better served by English than by Simplified.
      return /hant|-tw|-hk|-mo/.test(tag) ? null : "zh-Hans";
    }
    if (primary === "pt") return "pt-BR";
    return SUPPORTED.indexOf(primary) >= 0 ? primary : null;
  }

  if (document.documentElement.hasAttribute("data-autolang")) {
    var target = load();
    if (!target) {
      var prefs = navigator.languages || [navigator.language];
      for (var i = 0; i < prefs.length && !target; i++) target = match(prefs[i]);
    }
    if (target && target !== "en" && SUPPORTED.indexOf(target) >= 0) {
      var page = location.pathname.split("/").pop() || "privacy.html";
      location.replace(target + "/" + page + location.hash);
    }
  }

  document.addEventListener("click", function (e) {
    var link = e.target.closest && e.target.closest("a[data-lang]");
    if (link) save(link.getAttribute("data-lang"));
    document.querySelectorAll("details.lang[open]").forEach(function (d) {
      if (!d.contains(e.target)) d.removeAttribute("open");
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    document.querySelectorAll("details.lang[open]").forEach(function (d) {
      d.removeAttribute("open");
      d.querySelector("summary").focus();
    });
  });
})();
