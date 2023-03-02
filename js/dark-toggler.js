// 6. 'change url in address bar only'
var changeSearchWithoutReload = function () {
  logIn5("changeSearchWithoutReload");
  const oldHref = window.location.toString();
  logg5("oldHref:", oldHref);
  const newHref = oldHref.split("?")[0] + "?isDark=" + isDark();

  if (history.pushState) {
    logg5("newHref:", newHref);
    window.history.replaceState({ path: newHref }, "", newHref);
  }
  logOut5();
};

changeSearchWithoutReload();

// 1. add url search param
// to workaround Firefox file:// same domain issue
window.addEventListener("click", function (e) {
  let href = e.target.getAttribute("href");

  if (href) {
    const pageName = href.split("#")[0];
    const samePage = window.location.toString().includes(pageName);

    href = href + "?isDark=" + isDark();

    // preventDefault only when open other page
    if (samePage) {
      //alert("===");
      window.location.replace(href);
    } else {
      //alert("!==");
      window.location.assign(href);
      e.preventDefault();
    }
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
      changeSearchWithoutReload();
    },
    false
  );
}

// 7. breadcrumbs
const spanMaker = () => {
  const spanTag = document.createElement("span");
  spanTag.innerHTML = " > ";
  breadCrumbsEl.appendChild(spanTag);
};

const aMaker = (inner, href) => {
  const aTag = document.createElement("a");
  aTag.setAttribute("href", href);
  aTag.innerHTML = inner;
  breadCrumbsEl.appendChild(aTag);
};

const breadcrumbs = function () {
  logIn6("breadcrumbs");
  var url = window.location.toString();
  logg6("url =", url);
  const delim = url.split("/") ? "/" : "\\";
  const urlApart = url.split(delim);
  logg6("urlApart", urlApart);

  let rootBook = false;
  let urlHead = "";
  let urlLast = "";
  const lenArr = urlApart.length;
  urlApart.forEach((folder, i) => {
    if (urlApart[i] === "Books") {
      rootBook = true;
      logg6("urlHead =", urlHead);
    }
    if (rootBook) {
      logg6(folder);
      urlLast = urlLast === "" ? folder : urlLast + delim + folder;
      if (i + 1 < lenArr) aMaker(folder, urlHead + delim + urlLast);
      if (i + 2 < lenArr) spanMaker();
    } else {
      urlHead = urlHead === "" ? folder : urlHead + delim + folder;
    }
  });
  logOut6();
};

// 3. fix/unfix block functionality
if (true) {
  const he = document.getElementsByTagName("header")[0];
  const wrapFixedEl = document.createElement("div");
  wrapFixedEl.id = "wrap-fixed";
  // Insert as next sibling of <header>
  he.parentNode.insertBefore(wrapFixedEl, he.nextSibling);

  var fixedEl =
    document.getElementsByTagName("h1").length === 0
      ? document.createElement("div")
      : document.getElementsByTagName("h1")[0];

  fixedEl.id = "fixed";
  // Insert as first child of fixed block
  wrapFixedEl.appendChild(fixedEl);

  const fixedElBefore = document.createElement("div");
  fixedElBefore.setAttribute("id", "fixed-before");
  fixedElBefore.setAttribute("style", "height: 25px;");
  // ✅ Insert as last child of fixed block
  wrapFixedEl.insertBefore(fixedElBefore, fixedEl.nextSibling);

  const fixedElAfter = document.createElement("div");
  fixedElAfter.setAttribute("id", "fixed-after");
  fixedElAfter.setAttribute("style", "height: 180px;");
  // ✅ Insert as next sibling of fixed block
  wrapFixedEl.parentNode.insertBefore(fixedElAfter, wrapFixedEl.nextSibling);

  var breadCrumbsEl = document.createElement("div");
  breadCrumbsEl.id = "breadcrumbs";
  // Insert as child of last fixed block
  fixedElBefore.appendChild(breadCrumbsEl);
  breadcrumbs();

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
    curentScrollTop = curentScrollTop - 69;

    logg3("0 tiny correction; curentScrollTop = ", curentScrollTop);

    var anchorTop = offset(fixedElAfter).top;

    logg3("1 anchorTop = ", anchorTop);
    logg3("2 fixedEl.offsetHeight = ", fixedEl.offsetHeight);

    if (curentScrollTop > anchorTop) {
      if (!fixed) {
        wrapFixedEl.className = "tog-fixed";
        he.className = "he-fixed";
        fixed = true;
      }
    } else {
      if (fixed) {
        wrapFixedEl.className = "";
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
    logOut3();
  };

  window.addEventListener("scroll", JD.debounce(50, JD.scrollHandler));
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
    window.location.replace(urlHash);
  }
}

setTimeout(moveToHash, 400);
