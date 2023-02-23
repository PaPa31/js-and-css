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
  if (selected.tagName.toUpperCase() === "A") selected.parentElement.click();
  else selected.click();
};
var gotoPrevSibling = function () {
  console.log("gotoPrevSibling");
  hideFocus();
  if (selected.previousElementSibling) {
    console.log("gotoPrevSibling_9_before: ", selected);
    selected = selected.previousElementSibling;
    console.log("gotoPrevSibling_9_after: ", selected);
  } else {
    gotoPrevUncle();
  }
  showFocus();
};
//var gotoPrevCousin = function () {
//  console.log("gotoPrevCousin");
//  gotoParent()
//  hideFocus();
//  if (selected.previousElementSibling) {
//    console.log("gotoPrevSibling_10_before: ", selected);
//    selected = selected.previousElementSibling;
//    console.log("gotoPrevSibling_10_after: ", selected);
//  } else {
//    gotoPrevUncle();
//  }
//  showFocus();
//};
var gotoPrevUncle = function () {
  console.log("gotoPrevUncle");
  const siblingNav =
    selected.closest("nav").previousElementSibling &&
    selected.closest("nav").previousElementSibling.tagName.toUpperCase() ===
      "NAV"
      ? true
      : false;
  if (!siblingNav) {
    console.log("Strange!!");
    gotoParent();
  } else {
    hideFocus();
    console.log("gotoPrevUncle_4_before: ", selected);
    selected = selected.closest("nav").previousElementSibling;
    console.log("gotoPrevUncle_4_after: ", selected);
    gotoLastChild();
    console.log("1", selected);
    if (selected.classList.contains("open") === true) {
      console.log("gotoPrev_4.1_before: ", selected);
      gotoLastChild();
      console.log("gotoPrev_4.1_after: ", selected);
    }
    if (selected.classList.contains("open") === true) {
      gotoLastChild();
      console.log("2", selected);
      if (selected.classList.contains("open") === true) {
        gotoLastChild("3", selected);
      }
    }
    console.log("gotoPrevUncle_444_after: ", selected);
  }
};

var gotoPrev = function () {
  console.log("gotoPrev");
  const selPrev = selected.previousElementSibling;
  if (selPrev) {
    if (
      selected.previousElementSibling.classList.contains("open") === true &&
      selPrev.children.length !== 1
    ) {
      console.log("gotoPrev_5_before: ", selected);
      gotoPrevSibling();
      gotoLastChild();
      console.log("gotoPrev_5_after: ", selected);
      if (
        selected.classList.contains("open") === true &&
        selected.children.length !== 1
      ) {
        console.log("gotoPrev_5.1_before: ", selected);
        gotoLastChild();
        console.log("gotoPrev_5.1_after: ", selected);
        if (
          selected.classList.contains("open") === true &&
          selected.children.length !== 1
        ) {
          console.log("gotoPrev_5.2_before: ", selected);
          gotoLastChild();
          console.log("gotoPrev_5.2_after: ", selected);
        }
      }
    } else {
      console.log("gotoPrev_7_before: ", selected);
      gotoPrevSibling();
      console.log("gotoPrev_7_before: ", selected);
    }
  } else {
    console.log("gotoPrev_6_before: ", selected);
    gotoPrevSibling();
    console.log("gotoPrev_6_before: ", selected);
  }
};
var gotoNextSibling = function () {
  console.log("gotoNextSibling");
  hideFocus();
  if (selected.nextElementSibling) {
    selected = selected.nextElementSibling;
  } else {
    gotoNextCousin();
  }
  showFocus();
};
var gotoNextCousin = function () {
  gotoParent();
  hideFocus();
  if (selected.nextElementSibling) {
    selected = selected.nextElementSibling;
  } else {
    gotoNextUncle();
  }
  showFocus();
};
var gotoNextUncle = function () {
  const siblingNav =
    selected.closest("nav").previousElementSibling &&
    selected.closest("nav").nextElementSibling.tagName.toUpperCase() === "NAV"
      ? true
      : false;
  if (siblingNav) {
    console.log("gotoNextUncle_3_before: ", selected);
    hideFocus();
    selected = selected.closest("nav").nextElementSibling;
    gotoFirstChild();
    showFocus();
    console.log("gotoNextUncle_3_after: ", selected);
  }
};
var gotoNext = function () {
  console.log("gotoNext");
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
};
var gotoFirstChild = function () {
  console.log("gotoFirstChild");
  hideFocus();
  firstSub = selected.getElementsByTagName("ol")[0];
  if (firstSub) {
    selected = firstSub.getElementsByTagName("li")[0];
  }
  showFocus();
};
var gotoLastChild = function () {
  console.log("gotoLastChild");
  console.log("selected before ol[0]: ", selected);
  const olElems = selected.getElementsByTagName("ol");
  console.log(olElems);
  console.log("ol: ", olElems.length);
  hideFocus();
  if (olElems.length !== 1) {
    selected = olElems[olElems.length - 1].parentElement;
  }
  const liElems = olElems[0].children;
  console.log(liElems);
  console.log("li (ol alone): ", liElems.length);
  if (liElems.length) {
    selected = liElems[liElems.length - 1];
  }
  console.log("gotoLastChild Final: ", selected);
  showFocus();
};

var gotoLiParent = function () {
  console.log("gotoLiParent_1_before gotoParent: ", selected);
  fromA();
  gotoParent();
  console.log("gotoLiParent_1_After: ", selected);
  if (
    !selected.nextElementSibling &&
    selected.parentElement.parentElement.tagName.toUpperCase() === "LI"
  ) {
    gotoParent();
    console.log("gotoLiParent_2: ", selected);
  }
};
var gotoParent = function () {
  console.log("gotoParent");
  hideFocus();
  if (
    selected.parentElement &&
    selected.parentElement.parentElement &&
    selected.parentElement.parentElement.tagName.toUpperCase() !== "NAV"
  ) {
    console.log("gotoParent_8_before", selected);
    selected = selected.parentElement.parentElement;
    console.log("gotoParent_8_before", selected);
  }
  showFocus();
};
var fromA = function () {
  if (selected.tagName.toUpperCase() === "A") {
    hideFocus();
    if (selected.parentElement.tagName.toUpperCase() !== "NAV") {
      selected = selected.parentElement;
    }
    showFocus();
  }
};

var scrollToCenter = function () {
  selected.firstElementChild.scrollIntoView({
    behavior: "smooth",
    inline: "end",
    block: "center",
  });
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
        if (
          selected.parentElement.parentElement.parentElement.tagName.toUpperCase() !==
          "NAV"
        ) {
          selected = selected.parentElement.parentElement.parentElement;
        } else {
          selected = selected.parentElement;
        }
        showFocus();

        if (selected.classList.contains("open") === true) {
          clickSelected();
        }
      } else {
        if (selected.parentElement.tagName.toUpperCase() !== "NAV") {
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
  var allListItems = document.querySelectorAll(sel);
  for (var k = 0; k < allListItems.length; k++) {
    allListItems[k].classList.add("open");
  }
};
var collapseOneLevel = function (sel) {
  var allListItems = document.querySelectorAll(sel);
  for (var k = 0; k < allListItems.length; k++) {
    allListItems[k].classList.remove("open");
  }
};
var i = 0;
var j = 1;
var expText = ["Collapse", "Expand"];
var aSel = [
  "nav > ol > li",
  "nav > ol > li > ol > li",
  "nav > ol > li > ol > li > ol > li",
  "nav > ol > li > ol > li > ol > li > ol > li",
];

var actExpandCollapse = function () {
  var borderStyle = ["solid", "dashed", "dotted", "hidden"];
  var levelValue = document.getElementById("level-value");
  var button = document.getElementById("expand");
  console.log("i = ", i, " ; j = ", j);

  if (!j) {
    i = i - 1;
  }

  if (1 - j) {
    console.log("collapse 1", aSel[i]);
    collapseOneLevel(aSel[i]);
    gotoParent();
  } else {
    console.log("expand", aSel[i]);
    expandOneLevel(aSel[i]);
    scrollToCenter();
  }

  if (j) {
    i = i + 1;
  }

  levelValue.innerHTML = i + " level";
  button.style.borderStyle = borderStyle[i];

  if (i === olLevelNesting - 1 || i === 0) {
    j = 1 - j;
    console.log("change j => ", j);
  }

  var nextLevel = j ? i + 1 : i - 1;
  button.innerHTML = expText[j] + ": to " + nextLevel + " level";
};
