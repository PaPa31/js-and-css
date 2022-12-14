//var tog = document.getElementById("tog");
const tog = document.getElementsByTagName("h1");

const divTag = document.createElement("div");
divTag.setAttribute("id", "anchor");
divTag.setAttribute("style", "height: 0px;");
// ✅ Insert element before h1
tog.body.insertBefore(divTag, tog);

var anchor = document.getElementById("anchor"),
  aux = document.getElementById("aux_tables"),
  fixed = false,
  JD = {},
  curentScrollTop;

window.addEventListener(
  "scroll",
  function () {
    curentScrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
  },
  false
);

JD.firstName = function () {
  var anchorTop = offset(anchor).top,
    anchorBottom = offset(aux).top;

  console.log(
    "scroll",
    curentScrollTop,
    anchorTop,
    tog.offsetHeight,
    anchorBottom
  );
  if (curentScrollTop > anchorTop && curentScrollTop < anchorBottom) {
    if (!fixed) {
      anchor.style.height = tog.offsetHeight + "px";
      tog.className = "abp tog-fixed";
      fixed = true;
    }
  } else {
    if (fixed) {
      anchor.style.height = 0;
      tog.className = "abp";
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
      top: box.top + win.pageYOffset - docElem.clientTop - 15,
      left: box.left + win.pageXOffset - docElem.clientLeft,
    };
  }
};

window.addEventListener("scroll", JD.firstName, false);
