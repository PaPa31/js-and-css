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

const header = document.getElementsByTagName("h1")[0];
const parentDiv = header.parentNode;

const headerBefore = document.createElement("div");
headerBefore.setAttribute("id", "headerBefore");
headerBefore.setAttribute("style", "height: 0px;");
// ✅ Insert element before h1
parentDiv.insertBefore(headerBefore, header);

const headerAfter = document.createElement("div");
headerAfter.setAttribute("id", "headerAfter");
headerAfter.setAttribute("style", "height: 80px;");
// ✅ Insert element after h1
parentDiv.insertBefore(headerAfter, header.nextSibling);

let fixed = false,
  JD = {},
  curentScrollTop;

window.addEventListener(
  "scroll",
  function () {
    curentScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    curentScrollTop = curentScrollTop - 39;
  },
  false
);

JD.firstName = function () {
  var anchorTop = offset(headerBefore).top;

  console.log("scroll", curentScrollTop, anchorTop, header.offsetHeight);
  if (curentScrollTop > anchorTop) {
    if (!fixed) {
      headerBefore.style.height = header.offsetHeight + "px";
      header.className = "tog-fixed";
      fixed = true;
    }
  } else {
    if (fixed) {
      headerBefore.style.height = 0;
      header.className = "";
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
