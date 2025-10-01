document.addEventListener("DOMContentLoaded", function () {
    const itemsToShow = 3;
    let itemsVisible = 0;
    const container = document.getElementById("experts-profile-faculty-in-the-news");
    
    // Add null check for container
    if (!container) {
        return; // Exit early if container doesn't exist
    }
    
    const items = container.querySelectorAll(".col-12.col-lg-4");
    const loadMoreBtn = document.getElementById("experts-profile-faculty-in-the-news-loadMore");

    // Hide all first
    items.forEach(item => {
        item.style.display = "none";
    });

    // Show first 3
    for (let i = 0; i < itemsToShow && i < items.length; i++) {
        items[i].style.display = "block";
    }
    itemsVisible = Math.min(itemsToShow, items.length);

    // Hide button if <= 3 items
    if (items.length <= itemsToShow) {
        if (loadMoreBtn) {
            loadMoreBtn.style.display = "none";
        }
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", function (e) {
            e.preventDefault(); // prevent link navigation

            for (let i = itemsVisible; i < itemsVisible + itemsToShow && i < items.length; i++) {
                items[i].style.display = "block";
            }
            itemsVisible += itemsToShow;

            if (itemsVisible >= items.length) {
                loadMoreBtn.style.display = "none";
            }
        });
    }
});