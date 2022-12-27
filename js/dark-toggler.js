if (document.getElementById("checkbox")) {
  const checkbox = document.getElementById("checkbox");

  checkbox.addEventListener(
    "change",
    function (e) {
      e.stopPropagation();
      toggleLocalStorageItem();
      toggleDark();
    },
    false
  );
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

    console.log("scroll", curentScrollTop, anchorTop, h1.offsetHeight);
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

  if (urlHash) {
    location.replace(urlHash);
    window.scrollBy({
      top: -80,
      left: 0,
      behavior: "smooth",
    });
  }
}

setTimeout(moveToHash, 400);
