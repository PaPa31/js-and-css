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
  logIn1("#1_1 scrollToCenter", selected);
  var sel = selected.firstElementChild ? selected.firstElementChild : selected;
  logg1("1 after initial if; sel =", sel);
  sel.scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "center",
  });
  logOut1();
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
  logOut();
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
  logOut();
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
  logOut();
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
  logOut();
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
  logOut();
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
  logOut();
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
  logOut();
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
  logOut();
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
  logOut();
};
var gotoLiParent = function () {
  logIn("14 gotoLiParent", selected);
  fromA();
  gotoParent();
  if (!selected.nextElementSibling && ded().tagName.toUpperCase() === "LI") {
    gotoParent();
  }
  15;
  logOut();
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
  logOut();
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
  logOut();
};
var openSelected = function (sel = selected) {
  // if no args, sel = selected
  if (sel.tagName.toUpperCase() === "LI") {
    sel.classList.add("open");
  }
};

var papa = () => selected.parentElement;
var ded = () => selected.parentElement.parentElement;
var praDed = () => selected.parentElement.parentElement.parentElement;

// 2. loggs system
if (true) {
  // Assistant for debugging errors.
  // View active elements DOM,
  // when navigation by TOC menu items.

  // For production - delete this block and loggs.
  // To delete all loggs use regex:^ *log.*$\n*

  // managing vars
  // change to show/hide output loggs
  var showLogg = false; // logg - 'key-navigation functions'
  var showLogg1 = true; // logg1 - 'restore-last-selected functions'
  var showLogg2 = true; // logg2 - shared 'click-event-listener'

  // loggs subsystem 1
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

  // loggs subsystem 2
  var logg1 = (...m) => {
    if (showLogg1) console.log(...m);
  };

  var logIn1 = (...mes) => {
    if (showLogg1) console.group(...mes);
  };
  var logOut1 = () => {
    if (showLogg1) console.groupEnd();
  };

  // loggs subsystem 3
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
}

// 3. selection box, default on the first item on the tree
selected = document
  .getElementsByTagName("nav")[0]
  .getElementsByTagName("ol")[0]
  .getElementsByTagName("li")[0];
showFocus();
var initialSelected = selected;

var liList = document.querySelectorAll("nav > ol li");
for (var i = 0; i < liList.length; i++) {
  //add id for quick navigation when resuming work
  liList[i].id = i;
  // add 'one-child' class for .one-child::before rule
  if (!liList[i].firstElementChild.nextElementSibling) {
    liList[i].classList.add("one-child");
  }
}

// 4. click handlers
var treeListItems = document.querySelectorAll("nav > ol > li");
for (var i = 0; i < treeListItems.length; i++) {
  // click handler
  treeListItems[i].addEventListener("click", function (e) {
    logIn2("#2 click listener", selected);
    var current = e.target;
    logg2("1 current = ", current);
    logg2("2 current.parentElement.id= ", current.parentElement.id);
    lastSelected = current.parentElement.id;
    localStorage.setItem("lastTOCSelected", lastSelected);
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
    logOut2();
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

var recursionUptoNav = function (sel) {
  logIn1("#1_2 recursionUptoNav", sel);
  if (sel.parentElement.tagName.toUpperCase() === "NAV") return;
  openSelected(sel.parentElement);
  recursionUptoNav(sel.parentElement);
  logOut1();
};

let lastSelected = localStorage.getItem("lastTOCSelected")
  ? localStorage.getItem("lastTOCSelected")
  : 0;

var restoreLastSelected = function () {
  logIn1("#1_3 restoreLastSelected", selected);
  if (lastSelected) {
    hideFocus();
    logg1("1 id = ", lastSelected);
    selected = document.getElementById(lastSelected);
    logg1("2 selected = ", selected);
    recursionUptoNav(selected);
    logg1("3 before firstElementChild; selected = ", selected);
    selected = selected.firstElementChild;
    logg1("3 after firstElementChild; selected = ", selected);
    showFocus();
    setTimeout(scrollToCenter, 200);
  }
  logOut1();
};

setTimeout(restoreLastSelected, 100);
