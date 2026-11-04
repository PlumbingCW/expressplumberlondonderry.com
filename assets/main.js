(function () {
  "use strict";
  // Mobile drawer
  var t = document.getElementById("mob-toggle");
  var d = document.getElementById("mob-drawer");
  var o = document.getElementById("mob-overlay");
  var c = document.getElementById("drawer-close");
  function openDrawer() {
    d.removeAttribute("hidden");
    o.classList.add("visible");
    t.setAttribute("aria-expanded", "true");
    t.setAttribute("aria-label", "Close navigation menu");
    document.documentElement.style.overflow = "hidden";
  }
  function closeDrawer() {
    d.setAttribute("hidden", "");
    o.classList.remove("visible");
    t.setAttribute("aria-expanded", "false");
    t.setAttribute("aria-label", "Open navigation menu");
    document.documentElement.style.overflow = "";
  }
  if (t && d && o) {
    t.addEventListener("click", function () {
      if (t.getAttribute("aria-expanded") === "true") { closeDrawer(); } else { openDrawer(); }
    });
    if (c) { c.addEventListener("click", closeDrawer); }
    o.addEventListener("click", closeDrawer);
    var links = d.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) { links[i].addEventListener("click", closeDrawer); }
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeDrawer(); } });
    window.addEventListener("resize", function () { if (window.innerWidth > 768) { closeDrawer(); } });
  }

  // FAQ accordion: max-height toggle
  var items = document.querySelectorAll(".faq-item");
  function setOpen(item, open) {
    var btn = item.querySelector(".faq-q");
    var panel = item.querySelector(".faq-a");
    if (!btn || !panel) { return; }
    item.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
  }
  for (var j = 0; j < items.length; j++) {
    (function (item) {
      var btn = item.querySelector(".faq-q");
      if (btn) { btn.addEventListener("click", function () { setOpen(item, !item.classList.contains("open")); }); }
    })(items[j]);
  }
  window.addEventListener("resize", function () {
    for (var k = 0; k < items.length; k++) {
      if (items[k].classList.contains("open")) {
        var p = items[k].querySelector(".faq-a");
        p.style.maxHeight = p.scrollHeight + "px";
      }
    }
  });

  // Desktop floating call button: hide while the footer is on screen
  var fc = document.getElementById("float-call");
  var ft = document.querySelector(".site-footer");
  if (fc && ft && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { fc.classList.toggle("is-hidden", en.isIntersecting); });
    });
    io.observe(ft);
  }
})();
