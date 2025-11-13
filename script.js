const colorPicker = document.getElementById("colorPicker");
    const preview = document.getElementById("preview");
    const saveBtn = document.getElementById("saveBtn");
    const favoritesList = document.getElementById("favoritesList");
    const currentCode = document.getElementById("currentCode");

    // Load favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Function to update preview
    function updatePreview(color) {
      preview.style.background = color;
      currentCode.textContent = color;
    }

    // Function to render favorite colors
    function renderFavorites() {
      favoritesList.innerHTML = "";
      favorites.forEach(color => {
        const item = document.createElement("div");
        item.className = "fav-item";

        const div = document.createElement("div");
        div.className = "fav";
        div.style.background = color;
        div.title = color;
        div.onclick = () => updatePreview(color);

        const code = document.createElement("div");
        code.className = "fav-code";
        code.textContent = color;

        item.appendChild(div);
        item.appendChild(code);
        favoritesList.appendChild(item);
      });
    }

    // Initial load
    renderFavorites();
    updatePreview(colorPicker.value);

    // Update preview on color change
    colorPicker.addEventListener("input", (e) => {
      updatePreview(e.target.value);
    });

    // Save to favorites
    saveBtn.addEventListener("click", () => {
      const color = colorPicker.value;
      if (!favorites.includes(color)) {
        favorites.push(color);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        renderFavorites();
      }
    });