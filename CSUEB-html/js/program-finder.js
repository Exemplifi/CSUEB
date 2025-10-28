document.addEventListener("DOMContentLoaded", function () {
  const programList = document.getElementById("programList");
  const filterBar = document.getElementById("programFilterBar");

  if (!programList || !filterBar) {
    //console.warn("programList or filterBar not found — stopping script.");
    return;
  }

  // Insert Load More button after programList
  const loadMoreWrapper = document.createElement("div");
  loadMoreWrapper.className = "text-center row-button-sec row-btn-width";
  loadMoreWrapper.style.display = "none"; // hidden until needed

  loadMoreWrapper.innerHTML = `
    <button class="btn btn-primary">
      <span>Load more</span>
      <span class="sr-only">Majors</span>
    </button>
  `;

  programList.insertAdjacentElement("afterend", loadMoreWrapper);

  // Helper to safely extract text
  function getElementText(parent, selector, allowMissing = false) {
    const elem = parent.querySelector(selector);
    if (!elem) {
      if (!allowMissing) {
        //console.warn(`Element with selector '${selector}' not found inside`, parent);
      }
      return "";
    }
    return elem.textContent.trim();
  }

  // Build dropdown options (from .modalities text)
  function buildDropdownOptions() {
    const modalitySet = new Set();
    const programLinks = programList.querySelectorAll(".program-link");

    programLinks.forEach(link => {
      const modalityEl = link.querySelector(".modalities");
      if (modalityEl) {
        modalityEl.textContent
          .split(",") // split "Online, On Campus" into ["Online","On Campus"]
          .map(m => m.trim())
          .forEach(m => modalitySet.add(m));
      }
    });

    let optionsHTML = '<option value="">All Major</option>';
    modalitySet.forEach(modality => {
      optionsHTML += `<option value="${modality}">${modality}</option>`;
    });

    return optionsHTML;
  }

  // Insert filter bar HTML
  filterBar.innerHTML = `
    <form class="row gx-3">
      <div class="input-first col-12 col-sm-6">
        <label for="search-input" class="form-label screen-only">Search for Majors</label>
        <input type="text" class="form-control" placeholder="Search for Majors" id="search-input">
      </div>
      <div class="input-last col-12 col-sm-6">
        <label for="degree-level" class="form-label screen-only">All Major</label>
        <select id="degree-level" class="form-select">
          ${buildDropdownOptions()}
        </select>
      </div>
    </form>
  `;

  const searchInput = document.getElementById("search-input");
  const degreeSelect = document.getElementById("degree-level");

  const itemsPerPage = 10;
  let currentlyShownCount = 0;
  let filteredPrograms = [];

  // Show/hide programs based on count
  function updateProgramVisibility() {
    filteredPrograms.forEach((program, idx) => {
      if (idx < currentlyShownCount) {
        program.classList.remove("d-none");
        program.classList.add("d-flex");
      } else {
        program.classList.add("d-none");
        program.classList.remove("d-flex");
      }
    });

    if (filteredPrograms.length > itemsPerPage && currentlyShownCount < filteredPrograms.length) {
      loadMoreWrapper.style.display = "block";
    } else {
      loadMoreWrapper.style.display = "none";
    }
  }

  // Filtering logic
    function filterPrograms() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const selectedModality = degreeSelect.value.trim().toLowerCase();
    
      const programs = Array.from(programList.querySelectorAll(".program-link"));
      filteredPrograms = [];
    
      programs.forEach(program => {
        const programName = getElementText(program, ".programName", true).toLowerCase();
        const concentration = getElementText(program, ".concentration", true).toLowerCase();
        const degree = getElementText(program, ".degree", true).toLowerCase();
        const modalities = getElementText(program, ".modalities", true).toLowerCase();
    
        // Search will match if term is in ANY field
        const matchesSearch =
          !searchTerm ||
          programName.includes(searchTerm) ||
          concentration.includes(searchTerm) ||
          degree.includes(searchTerm) ||
          modalities.includes(searchTerm);
    
        // Dropdown will match only if selected modality is present
        const matchesModality =
          !selectedModality || modalities.includes(selectedModality);
    
        const showProgram = matchesSearch && matchesModality;
    
        if (showProgram) {
          filteredPrograms.push(program);
        } else {
          program.classList.add("d-none");
          program.classList.remove("d-flex");
        }
      });
    
      currentlyShownCount = Math.min(itemsPerPage, filteredPrograms.length);
      updateProgramVisibility();
    }


  // Load more button click
  loadMoreWrapper.querySelector("button").addEventListener("click", function (e) {
    e.preventDefault();
    currentlyShownCount += itemsPerPage;
    if (currentlyShownCount > filteredPrograms.length) {
      currentlyShownCount = filteredPrograms.length;
    }
    updateProgramVisibility();
  });

  // Event listeners
  searchInput.addEventListener("input", filterPrograms);
  degreeSelect.addEventListener("change", filterPrograms);

  // Initial filter on load
  filterPrograms();
});
