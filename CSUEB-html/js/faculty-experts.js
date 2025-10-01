document.addEventListener("DOMContentLoaded", function () {
    // ====== CONFIG ======
    const exp_itemsToShow = 6; // how many cards to show initially
    const exp_increment = 6; // how many to show on each "Load More"

    // ====== ELEMENTS ======
    const exp_section = document.querySelector(".faculty-experts-litsing-sec");
    const exp_cards = document.querySelectorAll(".faculty-experts-litsing-sec .col-12.col-sm-6.col-lg-4");
    const exp_loadMoreBtn = document.querySelector(".faculty-experts-litsing-sec .btn.btn-primary");
    const exp_searchInput = document.getElementById("search-input");
    const exp_dropdown = document.getElementById("filter-expertise");

    // ====== EXIT EARLY IF REQUIRED ELEMENTS DON'T EXIST ======
    if (!exp_section || exp_cards.length === 0) {
        // Exit early if faculty experts section or cards don't exist on this page
        return;
    }

    let exp_visibleCount = exp_itemsToShow;

    // ====== POPULATE DROPDOWN FROM TAGS ======
    if (exp_dropdown) {
        // Grab all expertise tags from ALL cards (even hidden)
        const exp_tagElements = document.querySelectorAll(".expert-tags-wrap li");
        const exp_tags = Array.from(exp_tagElements)
            .map(li => li.textContent.replace(/,\s*$/, "").trim())
            .filter(tag => tag.length > 0);

        // Unique & sorted
        const exp_uniqueTags = [...new Set(exp_tags)].sort((a, b) => a.localeCompare(b));

        // Reset dropdown
        exp_dropdown.innerHTML = "";

        // Add default option
        const exp_defaultOpt = document.createElement("option");
        exp_defaultOpt.value = "";
        exp_defaultOpt.textContent = "Filter by Expertise";
        exp_dropdown.appendChild(exp_defaultOpt);

        // Add tag options
        exp_uniqueTags.forEach(exp_tag => {
            const exp_opt = document.createElement("option");
            exp_opt.value = exp_tag;
            exp_opt.textContent = exp_tag;
            exp_dropdown.appendChild(exp_opt);
        });
    }

    // ====== FILTER LOGIC ======
    function exp_cardMatchesFilter(card) {
        const exp_searchText = exp_searchInput ? exp_searchInput.value.toLowerCase().trim() : "";
        const exp_selectedTag = exp_dropdown ? exp_dropdown.value.toLowerCase() : "";
        
        // Get name for search input - updated selector to match your HTML
        const exp_name = card.querySelector(".expert-name-sec h2 a")?.textContent.toLowerCase() || "";
        
        // Get expertise tags for dropdown filter
        const exp_tags = Array.from(card.querySelectorAll(".expert-tags-wrap li"))
            .map(li => li.textContent.replace(/,\s*$/, "").trim().toLowerCase());

        // Name search match (search input filters by NAME only)
        const exp_nameMatch = exp_searchText === "" || exp_name.includes(exp_searchText);

        // Expertise dropdown match (dropdown filters by EXPERTISE only)
        const exp_expertiseMatch = exp_selectedTag === "" || exp_tags.includes(exp_selectedTag);

        // Both filters must match
        return exp_nameMatch && exp_expertiseMatch;
    }

    // ====== SHOW/HIDE CARDS ======
    function exp_renderCards() {
        let exp_visible = 0;
        const exp_filteredCards = Array.from(exp_cards).filter(exp_cardMatchesFilter);

        exp_filteredCards.forEach((card, index) => {
            if (index < exp_visibleCount) {
                card.style.display = "";
                exp_visible++;
            } else {
                card.style.display = "none";
            }
        });

        // Hide the rest (not matching filter)
        exp_cards.forEach(card => {
            if (!exp_filteredCards.includes(card)) {
                card.style.display = "none";
            }
        });

        // Hide Load More if all visible
        if (exp_loadMoreBtn) {
            if (exp_visibleCount >= exp_filteredCards.length) {
                exp_loadMoreBtn.style.display = "none";
            } else {
                exp_loadMoreBtn.style.display = "";
            }
        }
    }

    // ====== EVENT: LOAD MORE ======
    if (exp_loadMoreBtn) {
        exp_loadMoreBtn.addEventListener("click", function (e) {
            e.preventDefault();
            exp_visibleCount += exp_increment;
            exp_renderCards();
        });
    }

    // ====== EVENT: SEARCH + DROPDOWN ======
    if (exp_searchInput) {
        exp_searchInput.addEventListener("input", function () {
            exp_visibleCount = exp_itemsToShow; // reset count when filtering
            exp_renderCards();
        });
    }

    if (exp_dropdown) {
        exp_dropdown.addEventListener("change", function () {
            exp_visibleCount = exp_itemsToShow; // reset count when filtering
            exp_renderCards();
        });
    }

    // ====== INIT ======
    exp_renderCards();
});