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
    selected = selected.previousElementSibling;
  } else {
    const siblingNav =
      selected.closest("nav").previousElementSibling.tagName.toUpperCase() ===
      "NAV"
        ? true
        : false;
    if (!siblingNav) {
      gotoParent();
    } else {
      console.log("selected_4_before: ", selected);
      hideFocus();
      selected = selected.closest("nav").previousElementSibling;
      gotoLastChild();
      if (selected.classList.contains("open") === true) {
        gotoLastChild();
        if (selected.classList.contains("open") === true) {
          gotoLastChild();
        }
      }
      console.log("selected_4_after: ", selected);
    }
  }
  showFocus();
};
var gotoPrevSiblingOrCousin = function () {
  selPrev = selected.previousElementSibling;
  if (selPrev) {
    if (
      selected.previousElementSibling.classList.contains("open") === true &&
      selPrev.children.length !== 1
    ) {
      console.log("selected_5_before: ", selected);
      gotoPrevSibling();
      gotoLastChild();
      if (selected.classList.contains("open") === true) {
        gotoLastChild();
      }
      console.log("selected_5_before: ", selected);
    } else {
      console.log("selected_7_before: ", selected);
      gotoPrevSibling();
      console.log("selected_7_before: ", selected);
    }
  } else {
    console.log("selected_6_before: ", selected);
    gotoPrevSibling();
    console.log("selected_6_before: ", selected);
  }
};
var gotoNextSibling = function () {
  hideFocus();
  if (selected.nextElementSibling) {
    selected = selected.nextElementSibling;
  } else {
    const siblingNav =
      selected.closest("nav").nextElementSibling.tagName.toUpperCase() === "NAV"
        ? true
        : false;
    if (!siblingNav) {
    } else {
      console.log("selected_3_before: ", selected);
      hideFocus();
      selected = selected.closest("nav").nextElementSibling;
      gotoFirstChild();
      console.log("selected_3_after: ", selected);
    }
  }
  showFocus();
};
var gotoNextSiblingOrCousin = function () {
  if (
    selected.classList.contains("open") === true &&
    selected.children.length !== 1
  ) {
    gotoFirstChild();
  } else {
    if (selected.nextElementSibling) {
      gotoNextSibling();
    } else {
      console.log("selected_1_before gotoParent: ", selected);
      fromA();
      gotoParent();
      console.log("selected_1_After: ", selected);
      if (
        !selected.nextElementSibling &&
        selected.parentElement.parentElement.tagName.toUpperCase() === "LI"
      ) {
        gotoParent();
        console.log("selected_2: ", selected);
      }
      gotoNextSibling();
    }
  }
};
var gotoFirstChild = function () {
  hideFocus();
  firstSub = selected.getElementsByTagName("ol")[0];
  if (firstSub) {
    selected = firstSub.getElementsByTagName("li")[0];
  }
  showFocus();
};
var gotoLastChild = function () {
  console.log("selected before ol[0]: ", selected);
  olElems = selected.querySelectorAll("ol")[0];
  console.log(olElems);
  console.log("ol: ", olElems.length);
  hideFocus();
  if (olElems.length) {
    if (olElems.length !== 1) {
      selected = olElems[olElems.length - 1].parentElement;
    } else {
      liElems = selected.querySelectorAll(
        `${selected.tagName.toLowerCase()}> ol > li`
      );
      console.log("li (ol.length): ", liElems.length);
      if (liElems.length) {
        selected = liElems[liElems.length - 1];
      }
    }
  } else {
    liElems = selected.querySelectorAll(
      `${selected.tagName.toLowerCase()}> ol > li`
    );
    console.log("li (ol alone): ", liElems.length);
    if (liElems.length) {
      selected = liElems[liElems.length - 1];
    }
  }
  showFocus();
};
var gotoParent = function () {
  hideFocus();
  //const siblingNav =
  //  selected.closest("nav").nextElementSibling.tagName.toUpperCase() === "NAV"
  //    ? true
  //    : false;
  //console.log(siblingNav);
  //console.log(selected.parentElement.parentElement.tagName.toUpperCase());
  if (
    selected.parentElement &&
    selected.parentElement.parentElement &&
    selected.parentElement.parentElement.tagName.toUpperCase() !== "NAV"
  ) {
    //console.log(selected.parentElement.parentElement.tagName);
    selected = selected.parentElement.parentElement;
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
            gotoPrevSiblingOrCousin();
          } else {
            gotoNextSiblingOrCousin();
          }
        }
        showFocus();
      }
      break;
    case " ":
      e.preventDefault();
      actExpandCollapse();
      break;
    case "ArrowDown":
      fromA();
      gotoNextSiblingOrCousin();
      break;
    case "ArrowUp":
      fromA();
      gotoPrevSiblingOrCousin();
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
var i = 1;
var j = 1;
var exp = ["Collapse", "Expand"];
var aSel = ["nav > ol > li", "nav ol > li"];

var actExpandCollapse = function () {
  var button = document.getElementById("expand");
  if (1 - j && i === 1) {
    collapseOneLevel(aSel[1]);
    expandOneLevel(aSel[0]);
  } else {
    if (i != 0) {
      expandOneLevel(aSel[1 - j]);
    } else {
      collapseOneLevel(aSel[1]);
    }
  }

  if (j) {
    i = i + 1;
    button.innerHTML = exp[j] + " all: " + i + " level";
  } else {
    button.innerHTML = exp[j] + " all: " + i + " level";
    i = i - 1;
  }

  if (i === 2 || i === 0) {
    j = 1 - j;
  }
};
