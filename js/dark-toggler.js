// 1. url search param
// to workaround Firefox file:// same domain issue
window.addEventListener("click", function (e) {
  const href = e.target.getAttribute("href");
  if (href) {
    location.href = href + "?isDark=" + isDark();
    e.preventDefault();
  }
});

// 2. dark/light toggle handler
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

// 3. fix/unfix block functionality
if (true) {
  const he = document.getElementsByTagName("header")[0];
  const wrapFixedEl = document.createElement("div");
  wrapFixedEl.id = "wrap-fixed";
  he.parentNode.insertBefore(wrapFixedEl, he.nextSibling);

  var fixedEl =
    document.getElementsByTagName("h1").length === 0
      ? document.createElement("div")
      : document.getElementsByTagName("h1")[0];

  fixedEl.id = "fixed";
  wrapFixedEl.appendChild(fixedEl);

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

  JD.debounce = function (wait, func, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait || 200);
      if (callNow) {
        func.apply(context, args);
      }
    };
  };

  JD.scrollHandler = function () {
    curentScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    logIn3("#3 scrollHandler", "curentScrollTop=", curentScrollTop);

    // tiny transition correction
    curentScrollTop = curentScrollTop - 19;

    logg3("0 tiny correction; curentScrollTop = ", curentScrollTop);

    var anchorTop = offset(fixedElBefore).top;

    logg3("1 anchorTop = ", anchorTop);
    logg3("2 fixedEl.offsetHeight = ", fixedEl.offsetHeight);

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

    logg3(
      "3 after if; fixedElBefore.style.height = ",
      fixedElBefore.style.height
    );

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
    logOut3();
  };

  window.addEventListener("scroll", JD.debounce(250, JD.scrollHandler));
}

//4. expand/collapse button
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

// 5. pending reload
// waiting for apply all injected css
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

// 6. loggs system
if (true) {
  // Assistant for debugging errors.
  // View active elements DOM,
  // when navigation by TOC menu items.

  // For production - delete this block and loggs.
  // To delete all loggs use regex:^ *log.*$\n*

  // managing vars
  // change to show/hide output loggs
  var showLogg = false; // logg - 'key-navigation functions'
  var showLogg1 = false; // logg1 - 'restore-last-selected functions'
  var showLogg2 = false; // logg2 - shared 'click-event-listener'
  var showLogg3 = true; // logg3 - 'scroll'

  // loggs subsystem 0
  // 'key-navigation functions'
  var logg = (...m) => {
    if (showLogg) console.log(...m);
  };

  // remove '...' to show
  // without 'selected' element
  var logIn = (...mes) => {
    if (showLogg) console.group(...mes);
  };
  var logOut = () => {
    if (showLogg) console.groupEnd();
  };

  // loggs subsystem 1
  // 'restore-last-selected functions'
  var logg1 = (...m) => {
    if (showLogg1) console.log(...m);
  };

  var logIn1 = (...mes) => {
    if (showLogg1) console.group(...mes);
  };
  var logOut1 = () => {
    if (showLogg1) console.groupEnd();
  };

  // loggs subsystem 2
  // 'shared'
  var logg2 = (...m) => {
    if (showLogg2) console.log(...m);
  };

  var logIn2 = (...mes) => {
    if (showLogg2) console.group(...mes);
  };
  var logOut2 = () => {
    if (showLogg2) console.groupEnd();
  };

  // loggs subsystem 3
  // 'scroll'
  var logg3 = (...m) => {
    if (showLogg3) console.log(...m);
  };

  var logIn3 = (...mes) => {
    if (showLogg3) console.group(...mes);
  };
  var logOut3 = () => {
    if (showLogg3) console.groupEnd();
  };
}
