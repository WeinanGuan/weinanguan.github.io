"use strict";
const tools = document.querySelector(".paper-tools");
const input = document.querySelector("#paper-search");
const year = document.querySelector("#paper-year");
const reset = document.querySelector("#reset-papers");
const papers = [...document.querySelectorAll(".publication")];
const empty = document.querySelector("#no-papers");
const status = document.querySelector("#filter-status");
if (tools && input && year && reset) {
  tools.hidden = false;
  function filter() {
    const query = input.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const paper of papers) {
      paper.hidden = !((year.value === "all" || paper.dataset.year === year.value) && paper.textContent.toLocaleLowerCase().includes(query));
      if (!paper.hidden) visible++;
    }
    empty.hidden = visible !== 0;
    status.textContent = `${visible} publications shown.`;
  }
  input.addEventListener("input", filter);
  year.addEventListener("change", filter);
  reset.addEventListener("click", () => { input.value = ""; year.value = "all"; filter(); input.focus(); });
}
