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

//if (document.getElementById("checkbox")) {
//  document.querySelector("#checkbox").addEventListener("change", () => {
//    toggleLocalStorageItem();
//    toggleDark();
//  });
//}
