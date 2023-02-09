window.addEventListener("click", function (e) {
  const href = e.target.getAttribute("href");
  if (href) {
    location.href = href + "?isDark=" + isDark();
    e.preventDefault();
  }
});

if (document.getElementById("checkbox")) {
  const checkbox = document.getElementById("checkbox");

  checkbox.addEventListener(
    "click",
    function (e) {
      toggleLocalStorageItem();
      toggleDark();
    },
    false
  );
}

if (document.getElementsByTagName("nav")[0]) {
  const navEl = document.getElementsByTagName("nav")[0];
  const pWrapExpand = document.createElement("p");
  pWrapExpand.setAttribute("id", "wrap-expand");

  const _nav = navEl.parentElement;
  // add toUpperCase to fix "samecase" XML issue
  if (_nav.tagName.toUpperCase() === "BODY") {
    document.body.insertBefore(pWrapExpand, navEl);
  } else {
    if (_nav.parentElement.tagName.toUpperCase() === "BODY") {
      document.body.insertBefore(pWrapExpand, navEl.parentElement);
    } else {
      console.log("Unable to determine nesting level of <nav>!");
    }
  }

  const aEl = document.createElement("a");
  aEl.setAttribute("id", "expand");
  aEl.setAttribute("href", "javascript: void(0)");
  aEl.setAttribute("onclick", "actExpandCollapse()");
  aEl.setAttribute("title", "Click or hit Space");
  aEl.innerHTML = "Expand all: 1 level";
  pWrapExpand.appendChild(aEl);
}

if (
  document.querySelector('section[data-type="preface"]') ||
  document.querySelector('section[data-type="chapter"]') ||
  document.querySelector('section[data-type="appendix"]') ||
  document.querySelector('section[data-type="glossary"]') ||
  document.querySelector('section[data-type="bibliography"]') ||
  document.querySelector('section[data-type="index"]')
) {
  const he = document.getElementsByTagName("header")[0];
  const h1 = document.getElementsByTagName("h1")[0];
  const parentDiv = h1.parentNode;

  const h1Before = document.createElement("div");
  h1Before.setAttribute("id", "h1Before");
  h1Before.setAttribute("style", "height: 0px;");
  // ✅ Insert element before h1
  parentDiv.insertBefore(h1Before, h1);

  const h1After = document.createElement("div");
  h1After.setAttribute("id", "h1After");
  h1After.setAttribute("style", "height: 80px;");
  // ✅ Insert element after h1
  parentDiv.insertBefore(h1After, h1.nextSibling);

  let fixed = false,
    JD = {},
    curentScrollTop;

  JD.firstName = function () {
    curentScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    // tiny transition correction
    curentScrollTop = curentScrollTop - 29;

    var anchorTop = offset(h1Before).top;

    if (curentScrollTop > anchorTop) {
      if (!fixed) {
        h1Before.style.height = h1.offsetHeight + "px";
        h1.className = "tog-fixed";
        he.className = "he-fixed";
        fixed = true;
      }
    } else {
      if (fixed) {
        h1Before.style.height = 0;
        h1.className = "";
        he.className = "";
        fixed = false;
      }
    }

    function isWindow(obj) {
      return obj != null && obj === obj.window;
    }
    function getWindow(elem) {
      return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }
    function offset(elem) {
      var docElem,
        win,
        box = { top: 0, left: 0 },
        doc = elem && elem.ownerDocument;

      docElem = doc.documentElement;

      if (typeof elem.getBoundingClientRect !== typeof undefined) {
        box = elem.getBoundingClientRect();
      }
      win = getWindow(doc);
      return {
        top: box.top + win.pageYOffset - docElem.clientTop,
        left: box.left + win.pageXOffset - docElem.clientLeft,
      };
    }
  };

  window.addEventListener("scroll", JD.firstName, false);
}

function moveToHash() {
  let urlHash = window.location.hash;

  urlHash = urlHash.split("?")[0];

  if (urlHash) {
    location.replace(urlHash);
    window.scrollBy({
      top: -140,
      left: 0,
      behavior: "smooth",
    });
  }
}

setTimeout(moveToHash, 400);
