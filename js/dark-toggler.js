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

if (true) {
  const he = document.getElementsByTagName("header")[0];
  var fixedEl;
  const d1 = document.createElement("div");
  if (document.getElementsByTagName("h1").length === 0) {
    fixedEl = document.createElement("div");
    fixedEl.id = "fixed";
    he.parentNode.insertBefore(d1, he.nextSibling);
    d1.appendChild(fixedEl);
  } else {
    fixedEl = document.getElementsByTagName("h1")[0];
  }
  const parentDiv = fixedEl.parentNode;

  const fixedElBefore = document.createElement("div");
  fixedElBefore.setAttribute("id", "fixedElBefore");
  fixedElBefore.setAttribute("style", "height: 0px;");
  // ✅ Insert element before fixedEl
  parentDiv.insertBefore(fixedElBefore, fixedEl);

  const fixedElAfter = document.createElement("div");
  fixedElAfter.setAttribute("id", "fixedElAfter");
  fixedElAfter.setAttribute("style", "height: 80px;");
  // ✅ Insert element after fixedEl
  parentDiv.insertBefore(fixedElAfter, fixedEl.nextSibling);

  let fixed = false,
    JD = {},
    curentScrollTop;

  JD.firstName = function () {
    curentScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    // tiny transition correction
    curentScrollTop = curentScrollTop - 29;

    var anchorTop = offset(fixedElBefore).top;

    if (curentScrollTop > anchorTop) {
      if (!fixed) {
        fixedElBefore.style.height = fixedEl.offsetHeight + "px";
        fixedEl.className = "tog-fixed";
        he.className = "he-fixed";
        fixed = true;
      }
    } else {
      if (fixed) {
        fixedElBefore.style.height = 0;
        fixedEl.className = "";
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

if (document.getElementsByTagName("nav")[0]) {
  const pWrapExpand = document.createElement("p");
  pWrapExpand.setAttribute("id", "wrap-expand");

  fixedEl.appendChild(pWrapExpand);

  const getDepth = function (list) {
    for (
      var depth = 0;
      list.querySelector(Array(depth++ + 3).join(list.tagName + " "));

    );
    return depth;
  };

  // 'var' for global scope
  var olLevelNesting = getDepth(document.getElementsByTagName("ol")[0]);

  const levelsEl = document.createElement("span");
  pWrapExpand.appendChild(levelsEl);

  const levelValueEl = document.createElement("div");
  levelValueEl.setAttribute("id", "level-value");
  levelValueEl.innerHTML = "1 level";
  levelsEl.appendChild(levelValueEl);

  const deepNestingEl = document.createElement("div");
  deepNestingEl.setAttribute("id", "deep-nesting");
  deepNestingEl.innerHTML = "Depth: " + olLevelNesting;
  levelsEl.appendChild(deepNestingEl);

  const wrapButtonEl = document.createElement("span");
  pWrapExpand.appendChild(wrapButtonEl);

  const buttonEl = document.createElement("button");
  buttonEl.setAttribute("id", "expand");
  buttonEl.setAttribute("onclick", "actExpandCollapse()");
  buttonEl.setAttribute("title", "Click or hit Space");
  buttonEl.innerHTML = "Expand: to 2 level";
  wrapButtonEl.appendChild(buttonEl);
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
