var selected;
var showFocus = function () {
  // add toUpperCase to fix "samecase" XML issue
  if (selected.tagName.toUpperCase() !== "OL") {
    selected.style.fontWeight = "bold";
  }
};
var hideFocus = function () {
  selected.style.fontWeight = "normal";
};
var scrollToCenter = function () {
  selected.firstElementChild.scrollIntoView({
    behavior: "smooth",
    inline: "end",
    block: "center",
  });
};
var clickSelected = function () {
  if (selected.tagName.toUpperCase() === "A") papa().click();
  else selected.click();
};
var gotoPrevSibling = function () {
  logIn("5 gotoPrevSibling", selected);
  hideFocus();
  if (selected.previousElementSibling) {
    logg("5 before previousElementSibling: ", selected);
    selected = selected.previousElementSibling;
    logg("5 after previousElementSibling: ", selected);
  } else {
    gotoPrevUncle();
  }
  showFocus();
  logOut("5 gotoPrevSibling", selected);
};
var gotoPrevUncle = function () {
  logIn("6 gotoPrevUncle", selected);
  const siblingNav =
    selected.closest("nav").previousElementSibling &&
    selected.closest("nav").previousElementSibling.tagName.toUpperCase() ===
      "NAV"
      ? true
      : false;
  if (!siblingNav) {
    logg("6 Strange!!");
    gotoParent();
  } else {
    hideFocus();
    logg("6 before previousElementSibling: ", selected);
    selected = selected.closest("nav").previousElementSibling;
    logg("6 after previousElementSibling: ", selected);
    gotoLastChild();
    if (selected.classList.contains("open") === true) {
      gotoLastChild();
    }
    if (selected.classList.contains("open") === true) {
      gotoLastChild();
      if (selected.classList.contains("open") === true) {
        gotoLastChild();
      }
    }
  }
  logOut("6 gotoPrevUncle", selected);
};
var gotoPrev = function () {
  logIn("7 gotoPrev", selected);
  const selPrev = selected.previousElementSibling;
  if (selPrev) {
    if (
      selected.previousElementSibling.classList.contains("open") === true &&
      selPrev.children.length !== 1
    ) {
      gotoPrevSibling();
      gotoLastChild();
      if (
        selected.classList.contains("open") === true &&
        selected.children.length !== 1
      ) {
        gotoLastChild();
        if (
          selected.classList.contains("open") === true &&
          selected.children.length !== 1
        ) {
          gotoLastChild();
        }
      }
    } else {
      gotoPrevSibling();
    }
  } else {
    gotoPrevSibling();
  }
  logOut("7 gotoPrev", selected);
};
var gotoNextSibling = function () {
  logIn("8 gotoNextSibling", selected);
  hideFocus();
  if (selected.nextElementSibling) {
    logg("8 before nextElementSibling: ", selected);
    selected = selected.nextElementSibling;
    logg("8 after nextElementSibling: ", selected);
  } else {
    gotoNextCousin();
  }
  showFocus();
  logOut("8 gotoNextSibling", selected);
};
var gotoNextCousin = function () {
  logIn("9 gotoNextCousin", selected);
  gotoParent();
  hideFocus();
  if (selected.nextElementSibling) {
    logg("9 before nextElementSibling;", selected);
    selected = selected.nextElementSibling;
    logg("9 after nextElementSibling:", selected);
  } else {
    gotoNextUncle();
  }
  showFocus();
  logOut("9 gotoNextCousin", selected);
};
var gotoNextUncle = function () {
  logIn("10 gotoNextUncle", selected);
  const siblingNav =
    selected.closest("nav").previousElementSibling &&
    selected.closest("nav").nextElementSibling.tagName.toUpperCase() === "NAV"
      ? true
      : false;
  if (siblingNav) {
    hideFocus();
    logg("10 before nextElementSibling: ", selected);
    selected = selected.closest("nav").nextElementSibling;
    logg("10 after nextElementSibling: ", selected);
    gotoFirstChild();
    showFocus();
  }
  logOut("10 gotoNextUncle", selected);
};
var gotoNext = function () {
  logIn("11 gotoNext", selected);
  if (
    selected.classList.contains("open") === true &&
    selected.children.length !== 1
  ) {
    gotoFirstChild();
  } else {
    if (selected.nextElementSibling) {
      gotoNextSibling();
    } else {
      gotoLiParent();
      gotoNextSibling();
    }
  }
  logOut("11 gotoNext", selected);
};
var gotoFirstChild = function () {
  logIn("12 gotoFirstChild", selected);
  hideFocus();
  firstSub = selected.getElementsByTagName("ol")[0];
  if (firstSub) {
    logg("12 before ol[0]: ", selected);
    selected = firstSub.getElementsByTagName("li")[0];
    logg("12 after ol[0]: ", selected);
  }
  showFocus();
  logOut("12 gotoFirstChild", selected);
};
var gotoLastChild = function () {
  logIn("13 gotoLastChild", selected);
  const olElems = selected.getElementsByTagName("ol");
  logg("13 olElems: ", olElems);
  logg("13 olElems.length: ", olElems.length);
  hideFocus();
  if (olElems.length !== 1) {
    selected = olElems[olElems.length - 1].parentElement;
  }
  const liElems = olElems[0].children;
  logg("13 liElems", liElems);
  logg("13 liElems.length (ol alone): ", liElems.length);
  if (liElems.length) {
    selected = liElems[liElems.length - 1];
  }
  showFocus();
  logOut("13 gotoLastChild", selected);
};

var gotoLiParent = function () {
  logIn("14 gotoLiParent", selected);
  fromA();
  gotoParent();
  if (!selected.nextElementSibling && ded().tagName.toUpperCase() === "LI") {
    gotoParent();
  }
  15;
  logOut("14 gotoLiParent", selected);
};
var gotoParent = function () {
  logIn("15 gotoParent", selected);
  hideFocus();
  if (papa() && ded() && ded().tagName.toUpperCase() !== "NAV") {
    logg("15 before ded: ", selected);
    selected = ded();
    logg("15 after ded: ", selected);
  }
  showFocus();
  logOut("15 gotoParent", selected);
};
var fromA = function () {
  logIn("16 fromA", selected);
  if (selected.tagName.toUpperCase() === "A") {
    hideFocus();
    if (papa().tagName.toUpperCase() !== "NAV") {
      logg("16 before papa: ", selected);
      selected = papa();
      logg("16 after papa: ", selected);
    }
    showFocus();
  }
  logOut("16 fromA", selected);
};

var papa = () => selected.parentElement;
var ded = () => selected.parentElement.parentElement;
var praDed = () => selected.parentElement.parentElement.parentElement;

var showLogg = false;
var logg = (...m) => {
  if (showLogg) console.log(...m);
};

// remove '...' to stop logs 'selected'
var logIn = (...mes) => {
  if (showLogg) console.group(...mes);
};
var logOut = (...mes) => {
  if (showLogg) console.groupEnd(...mes);
};

// 3. selection box, default on the first item on the tree
selected = document
  .getElementsByTagName("nav")[0]
  .getElementsByTagName("ol")[0]
  .getElementsByTagName("li")[0];
showFocus();
var initialSelected = selected;

var aList = document.querySelectorAll("nav a");
for (var i = 0; i < aList.length; i++) {
  aList[i].target = "_blank";
}

var liList = document.querySelectorAll("nav > ol li");
for (var i = 0; i < liList.length; i++) {
  // no-child filter
  if (!liList[i].firstElementChild.nextElementSibling) {
    liList[i].classList.add("no-child");
  }
}

// 4. click handlers
var treeListItems = document.querySelectorAll("nav > ol > li");
for (var i = 0; i < treeListItems.length; i++) {
  // click handler
  treeListItems[i].addEventListener("click", function (e) {
    var current = e.target;
    hideFocus();
    selected = current;
    showFocus();
    var classList = current.classList;
    if (classList.contains("open")) {
      // close the element and its children
      classList.remove("open");
      var openChildrenList = current.querySelectorAll(":scope .open");
      for (var j = 0; j < openChildrenList.length; j++) {
        openChildrenList[j].classList.remove("open");
      }
    } else {
      // open the element
      classList.add("open");
    }
    scrollToCenter();
  });
}

// 5. keyboard handler
document.addEventListener("keydown", function (e) {
  var activeTab = document.activeElement;
  var isTabActive = activeTab.tagName.toUpperCase() !== "BODY";
  var activeTabInsideNav =
    (activeTab.parentElement &&
      activeTab.parentElement.tagName.toUpperCase() === "LI") ||
    (activeTab.parentElement &&
      activeTab.parentElement.tagName.toUpperCase() === "P");

  var parentNav =
    document
      .getElementsByTagName("nav")[0]
      .parentElement.tagName.toUpperCase() === "BODY"
      ? "NAV"
      : "DIV";

  switch (e.key) {
    case "Enter":
      if (isTabActive && activeTabInsideNav) {
      } else {
        e.preventDefault();
        if (selected.firstElementChild) {
          selected.firstElementChild.click();
        } else {
          selected.click();
        }
      }
      break;
    case "Tab":
      if (activeTabInsideNav) {
        hideFocus();
        if (
          activeTab.parentElement.nextElementSibling &&
          activeTab.parentElement.nextElementSibling.tagName.toUpperCase() ===
            parentNav
        ) {
          selected = initialSelected;
        } else {
          selected = activeTab;
          fromA();
          if (e.shiftKey) {
            gotoPrev();
          } else {
            gotoNext();
          }
        }
        showFocus();
        scrollToCenter();
      }
      break;
    case " ":
      e.preventDefault();
      actExpandCollapse();
      scrollToCenter();
      break;
    case "ArrowDown":
      fromA();
      gotoNext();
      scrollToCenter();
      break;
    case "ArrowUp":
      fromA();
      gotoPrev();
      scrollToCenter();
      break;
    case "ArrowRight":
      if (
        selected.classList.contains("open") === false &&
        selected.tagName.toUpperCase() !== "A"
      ) {
        clickSelected();
      }
      if (
        selected.tagName.toUpperCase() === "A" &&
        selected.nextElementSibling
      ) {
        clickSelected();
      }
      gotoFirstChild();
      if (isTabActive && selected.tagName.toUpperCase() === "LI")
        selected.firstElementChild.focus();
      break;
    case "ArrowLeft":
      if (selected.tagName.toUpperCase() === "A") {
        hideFocus();
        if (praDed().tagName.toUpperCase() !== "NAV") {
          selected = praDed();
        } else {
          selected = papa();
        }
        showFocus();

        if (selected.classList.contains("open") === true) {
          clickSelected();
        }
      } else {
        if (papa().tagName.toUpperCase() !== "NAV") {
          gotoParent();
          if (selected.classList.contains("open") === true) {
            clickSelected();
          }
        }
      }
      if (isTabActive && selected.tagName.toUpperCase() === "LI") {
        selected.firstElementChild.focus();
      }
      break;
  }
});

var expandOneLevel = function (sel) {
  document.querySelectorAll(sel).forEach((el) => el.classList.add("open"));
};
var collapseOneLevel = function (sel) {
  document.querySelectorAll(sel).forEach((el) => el.classList.remove("open"));
};
var i = 1;
var j = 1;

var actExpandCollapse = function () {
  var borderStyle = ["solid", "dashed", "dotted", "hidden"];
  var levelValue = document.getElementById("level-value");
  var button = document.getElementById("expand");
  if (!j) {
    i = i - 1;
  }

  var query = "nav " + Array(i + 1).join("> ol > li ");

  if (1 - j) {
    collapseOneLevel(query);
    if (
      ded().tagName.toUpperCase() !== "NAV" &&
      ded().classList.contains("open") !== true
    )
      gotoParent();
  } else {
    expandOneLevel(query);
    scrollToCenter();
  }

  if (j) {
    i = i + 1;
  }

  levelValue.textContent = i + " level";
  button.style.borderStyle = borderStyle[i - 1];

  if (i === olLevelNesting || i === 1) {
    j = 1 - j;
  }

  //XHTML does not support document.write or .innerHTML
  button.textContent = `${j ? "Expand" : "Collapse"}: to ${
    j ? i + 1 : i - 1
  } level`;
};
