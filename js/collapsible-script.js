var selected;
var showFocus = function () {
  if (selected.tagName != "OL") {
    selected.style.fontWeight = "bold";
  }
};
var hideFocus = function () {
  selected.style.fontWeight = "normal";
};
var clickSelected = function () {
  if (selected.tagName == "A") selected.parentElement.click();
  else selected.click();
};
var gotoPrevSibling = function () {
  hideFocus();
  if (selected.previousElementSibling) {
    selected = selected.previousElementSibling;
  }
  showFocus();
};
var gotoPrevSiblingOrCousin = function (_hasParentLi) {
  if (selected.previousElementSibling) {
    if (selected.previousElementSibling.classList.contains("open") === true) {
      gotoLastChild();
    } else {
      gotoPrevSibling();
    }
  } else {
    if (_hasParentLi) {
      gotoParent();
    }
  }
};
var gotoNextSibling = function () {
  hideFocus();
  if (selected.nextElementSibling) {
    selected = selected.nextElementSibling;
  }
  showFocus();
};
var gotoNextSiblingOrCousin = function (_hasParentLi) {
  if (selected.nextElementSibling) {
    if (selected.nextElementSibling.classList.contains("open") === true) {
      gotoFirstChild();
      console.log("Point to Cousin", selected);
    } else {
      gotoNextSibling();
      console.log("Point to Sibling", selected);
    }
  } else {
    if (_hasParentLi) {
      gotoParent();
      console.log("Point to Parent", selected);
      gotoNextSibling();
      console.log("Point to NextSibling", selected);
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
  olElems = selected.previousElementSibling.getElementsByTagName("ol");
  if (olElems.length) {
    hideFocus();
    if (olElems.length !== 1) {
      selected = olElems[olElems.length - 1].parentElement;
    } else {
      liElems = selected.previousElementSibling.getElementsByTagName("li");
      if (liElems.length) {
        selected = liElems[liElems.length - 1];
      }
    }
    showFocus();
  }
};
var gotoParent = function () {
  hideFocus();
  if (
    selected.parentElement &&
    selected.parentElement.parentElement &&
    selected.parentElement.parentElement.tagName != "NAV"
  ) {
    selected = selected.parentElement.parentElement;
  }
  showFocus();
};
var fromA = function () {
  if (selected.tagName == "A") {
    hideFocus();
    if (selected.parentElement.tagName != "NAV") {
      selected = selected.parentElement;
    }
    showFocus();
  }
};

// 3. selection box, default on the first item on the tree
selected = document
  .getElementsByTagName("nav")[0]
  .firstElementChild.getElementsByTagName("li")[0];
showFocus();

var aList = document.querySelectorAll("nav a");
for (var i = 0; i < aList.length; i++) {
  aList[i].target = "_blank";
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
  var isTabActive = activeTab.tagName !== "BODY";
  var activeTabInsideNav =
    activeTab.parentElement && activeTab.parentElement.tagName === "LI";
  console.log("activeElement = ", activeTab.tagName);

  var hasParentLi = selected.parentElement.parentElement.tagName === "LI";
  console.log("hasParentLi = ", hasParentLi);

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
        selected = activeTab;
        showFocus();
        if (e.shiftKey) {
          fromA();
          gotoPrevSiblingOrCousin(hasParentLi);
        } else {
          fromA();
          gotoNextSiblingOrCousin(hasParentLi);
        }
      }
      break;
    case " ":
      e.preventDefault();
      actExpandCollapse();
      break;
    case "ArrowDown":
      fromA();
      gotoNextSiblingOrCousin(hasParentLi);
      break;
    case "ArrowUp":
      fromA();
      gotoPrevSiblingOrCousin(hasParentLi);
      break;
    case "ArrowRight":
      if (
        selected.classList.contains("open") === false &&
        selected.tagName != "A"
      ) {
        clickSelected();
        console.log("click not <a>", selected);
      }
      if (selected.tagName == "A" && selected.nextElementSibling) {
        clickSelected();
        console.log("click <a>", selected);
      }
      gotoFirstChild();
      console.log("after First Child ", selected);
      if (isTabActive && selected.tagName == "LI")
        selected.firstElementChild.focus();
      break;
    case "ArrowLeft":
      if (selected.tagName == "A") {
        hideFocus();
        if (
          selected.parentElement.parentElement.parentElement.tagName != "NAV"
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
        if (selected.parentElement.tagName != "NAV") {
          gotoParent();
          if (selected.classList.contains("open") === true) {
            clickSelected();
          }
        }
      }
      if (isTabActive && selected.tagName == "LI") {
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
