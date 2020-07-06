function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    "pcman_line_size": document.querySelector("#pcman_line_size").value,
    "line_head_insert_spaces": document.querySelector("#line_head_insert_spaces").value,
    "title_size": document.querySelector("#title_size").value,
    "wide_line_interval": document.querySelector("#wide_line_interval").checked,
    "newline_num": document.querySelector("#newline_num").value,
    "special_pattern": document.querySelector("#special_pattern").value,
  });
}

function restoreOptions() {

  function setCurrentSize(result) {
    document.querySelector("#pcman_line_size").value         = result.pcman_line_size || 76;
    document.querySelector("#line_head_insert_spaces").value = result.line_head_insert_spaces || 0;
    document.querySelector("#title_size").value              = result.title_size || 36;
    document.querySelector("#wide_line_interval").checked    = result.wide_line_interval || false;
    document.querySelector("#newline_num").value             = result.newline_num || 2;
    document.querySelector("#special_pattern").value         = result.special_pattern || '';
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.sync.get([
    "pcman_line_size",
    "line_head_insert_spaces",
    "title_size",
    "wide_line_interval",
    "newline_num",
    "special_pattern"
    ]);
  getting.then(setCurrentSize, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
