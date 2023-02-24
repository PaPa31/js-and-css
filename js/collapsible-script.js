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
var clickSelected = function () {
  if (selected.tagName.toUpperCase() === "A") papa().click();
  else selected.click();
};
var gotoPrevSibling = function () {
  logIn("gotoPrevSibling");
  hideFocus();
  if (selected.previousElementSibling) {
    logg("gotoPrevSibling_9_before: ", selected);
    selected = selected.previousElementSibling;
    logg("gotoPrevSibling_9_after: ", selected);
  } else {
    gotoPrevUncle();
  }
  showFocus();
  logOut("gotoPrevSibling");
};
var gotoPrevUncle = function () {
  logIn("gotoPrevUncle");
  const siblingNav =
    selected.closest("nav").previousElementSibling &&
    selected.closest("nav").previousElementSibling.tagName.toUpperCase() ===
      "NAV"
      ? true
      : false;
  if (!siblingNav) {
    logg("Strange!!");
    gotoParent();
  } else {
    hideFocus();
    logg("gotoPrevUncle_4_before: ", selected);
    selected = selected.closest("nav").previousElementSibling;
    logg("gotoPrevUncle_4_after: ", selected);
    gotoLastChild();
    logg("1", selected);
    if (selected.classList.contains("open") === true) {
      logg("gotoPrev_4.1_before: ", selected);
      gotoLastChild();
      logg("gotoPrev_4.1_after: ", selected);
    }
    if (selected.classList.contains("open") === true) {
      gotoLastChild();
      logg("2", selected);
      if (selected.classList.contains("open") === true) {
        gotoLastChild("3", selected);
      }
    }
    logg("gotoPrevUncle_444_after: ", selected);
  }
  logOut("gotoPrevUncle");
};

var gotoPrev = function () {
  logIn("gotoPrev");
  const selPrev = selected.previousElementSibling;
  if (selPrev) {
    if (
      selected.previousElementSibling.classList.contains("open") === true &&
      selPrev.children.length !== 1
    ) {
      logg("gotoPrev_5_before: ", selected);
      gotoPrevSibling();
      gotoLastChild();
      logg("gotoPrev_5_after: ", selected);
      if (
        selected.classList.contains("open") === true &&
        selected.children.length !== 1
      ) {
        logg("gotoPrev_5.1_before: ", selected);
        gotoLastChild();
        logg("gotoPrev_5.1_after: ", selected);
        if (
          selected.classList.contains("open") === true &&
          selected.children.length !== 1
        ) {
          logg("gotoPrev_5.2_before: ", selected);
          gotoLastChild();
          logg("gotoPrev_5.2_after: ", selected);
        }
      }
    } else {
      logg("gotoPrev_7_before: ", selected);
      gotoPrevSibling();
      logg("gotoPrev_7_before: ", selected);
    }
  } else {
    logg("gotoPrev_6_before: ", selected);
    gotoPrevSibling();
    logg("gotoPrev_6_before: ", selected);
  }
  logOut("gotoPrev");
};
var gotoNextSibling = function () {
  logIn("gotoNextSibling");
  hideFocus();
  if (selected.nextElementSibling) {
    selected = selected.nextElementSibling;
  } else {
    gotoNextCousin();
  }
  showFocus();
  logOut("gotoNextSibling");
};
var gotoNextCousin = function () {
  logIn("gotoNextCousin");
  gotoParent();
  hideFocus();
  if (selected.nextElementSibling) {
    selected = selected.nextElementSibling;
  } else {
    gotoNextUncle();
  }
  showFocus();
  logOut("gotoNextCousin");
};
var gotoNextUncle = function () {
  logIn("gotoNextUncle");
  const siblingNav =
    selected.closest("nav").previousElementSibling &&
    selected.closest("nav").nextElementSibling.tagName.toUpperCase() === "NAV"
      ? true
      : false;
  if (siblingNav) {
    logg("gotoNextUncle_3_before: ", selected);
    hideFocus();
    selected = selected.closest("nav").nextElementSibling;
    gotoFirstChild();
    showFocus();
    logg("gotoNextUncle_3_after: ", selected);
  }
  logOut("gotoNextUncle");
};
var gotoNext = function () {
  logIn("gotoNext");
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
  logOut("gotoNext");
};
var gotoFirstChild = function () {
  logIn("gotoFirstChild");
  hideFocus();
  firstSub = selected.getElementsByTagName("ol")[0];
  if (firstSub) {
    selected = firstSub.getElementsByTagName("li")[0];
  }
  showFocus();
  logOut("gotoFirstChild");
};
var gotoLastChild = function () {
  logIn("gotoLastChild");
  logg("selected before ol[0]: ", selected);
  const olElems = selected.getElementsByTagName("ol");
  logg(olElems);
  logg("ol: ", olElems.length);
  hideFocus();
  if (olElems.length !== 1) {
    selected = olElems[olElems.length - 1].parentElement;
  }
  const liElems = olElems[0].children;
  logg(liElems);
  logg("li (ol alone): ", liElems.length);
  if (liElems.length) {
    selected = liElems[liElems.length - 1];
  }
  logg("gotoLastChild Final: ", selected);
  showFocus();
  logOut("gotoLastChild");
};

var gotoLiParent = function () {
  logIn("gotoLiParent");
  logg("gotoLiParent_1_before gotoParent: ", selected);
  fromA();
  gotoParent();
  logg("gotoLiParent_1_After: ", selected);
  if (!selected.nextElementSibling && ded().tagName.toUpperCase() === "LI") {
    gotoParent();
    logg("gotoLiParent_2: ", selected);
  }
  logOut("gotoLiParent");
};
var gotoParent = function () {
  logIn("gotoParent");
  hideFocus();
  if (papa() && ded() && ded().tagName.toUpperCase() !== "NAV") {
    logg("gotoParent_8_before", selected);
    selected = ded();
    logg("gotoParent_8_before", selected);
  }
  showFocus();
  logOut("gotoParent");
};
var fromA = function () {
  logIn("fromA");
  if (selected.tagName.toUpperCase() === "A") {
    hideFocus();
    if (papa().tagName.toUpperCase() !== "NAV") {
      selected = papa();
    }
    showFocus();
  }
  logOut("fromA");
};

var scrollToCenter = function () {
  selected.firstElementChild.scrollIntoView({
    behavior: "smooth",
    inline: "end",
    block: "center",
  });
};

var papa = () => selected.parentElement;
var ded = () => selected.parentElement.parentElement;
var praDed = () => selected.parentElement.parentElement.parentElement;

var logg = (...messages) => console.log(...messages);
var logIn = (mes) => console.group(mes);
var logOut = (mes) => console.groupEnd(mes);

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
