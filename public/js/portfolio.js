// projectFilter.js
filterSelection("all");

function filterSelection(c) {
  let projects = document.getElementsByClassName("project-block");

  // If "all" is selected, make every project visible
  if (c === "all") {
    for (let project of projects) {
      project.style.display = "block";
    }
    return;
  }

  // Otherwise, hide/show projects based on their keywords
  for (let project of projects) {
    let keywords = project.dataset.keywords.split(', ');

    if (keywords.includes(c)) {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  }
}
