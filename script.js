const form = document.getElementById("itemForm");
const list = document.getElementById("list");

const filterGenre = document.getElementById("filterGenre");
const filterPlatform = document.getElementById("filterPlatform");
const filterStatus = document.getElementById("filterStatus");
const refreshBtn = document.getElementById("refreshBtn");


let items = JSON.parse(localStorage.getItem("items")) || [];
let editId = null; 

function saveItems() {
  localStorage.setItem("items", JSON.stringify(items));
}

function renderItems() {
  list.innerHTML = "";

  const genreFilter = filterGenre.value;
  const platformFilter = filterPlatform.value;
  const statusFilter = filterStatus.value;

  const filtered = items.filter(it =>
    (!genreFilter || it.genre === genreFilter) &&
    (!platformFilter || it.platform === platformFilter) &&
    (!statusFilter || it.status === statusFilter)
  );

  filtered.forEach(it => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${it.title} <span class="tag">${it.type}</span></h3>
      <p>Director: ${it.director || "N/A"}</p>
      <p>Genre: ${it.genre || "N/A"}</p>
      <p>Platform: ${it.platform || "N/A"}</p>
      <p>Status: ${it.status}</p>
      ${it.type === "tv" ? `<p>Progress: ${it.episodesWatched}/${it.episodesTotal}</p>` : ""}
      ${it.review ? `<p>Review: ${it.review}</p>` : ""}
      ${it.rating ? `<p>Rating: ⭐ ${it.rating}/5</p>` : ""}
      <div>
        ${it.type === "tv" ? `<button class="small" onclick="updateProgress(${it.id}, 1)">+1 Ep</button>` : ""}
        <button class="small" onclick="editItem(${it.id})">Edit</button>
        <button class="small" onclick="deleteItem(${it.id})">Delete</button>
      </div>
    `;

    
    if (it.type === "tv") {
      const progressPercent = it.episodesTotal ? (it.episodesWatched / it.episodesTotal) * 100 : 0;
      const progressDiv = document.createElement("div");
      progressDiv.className = "progress-container";
      progressDiv.innerHTML = `<div class="progress-bar" style="width:${progressPercent}%"></div>`;
      div.appendChild(progressDiv);
    }

    list.appendChild(div);
  });

  updateFilters();
}

function updateFilters() {
  const genres = [...new Set(items.map(it => it.genre).filter(Boolean))];
  const platforms = [...new Set(items.map(it => it.platform).filter(Boolean))];

  filterGenre.innerHTML = '<option value="">All Genres</option>' +
    genres.map(g => `<option value="${g}">${g}</option>`).join("");

  filterPlatform.innerHTML = '<option value="">All Platforms</option>' +
    platforms.map(p => `<option value="${p}">${p}</option>`).join("");
}


refreshBtn.addEventListener("click", () => {
  filterGenre.value = "";
  filterPlatform.value = "";
  filterStatus.value = "";
  renderItems();
});

form.addEventListener("submit", e => {
  e.preventDefault();

  const formData = {
    title: document.getElementById("title").value,
    director: document.getElementById("director").value,
    genre: document.getElementById("genre").value,
    platform: document.getElementById("platform").value,
    type: document.getElementById("type").value,
    episodesTotal: Number(document.getElementById("episodesTotal").value) || 0,
    episodesWatched: 0,
    status: document.getElementById("status").value,
    review: document.getElementById("review").value,
    rating: Number(document.getElementById("rating").value) || null,
  };

  if (editId) {
   
    const index = items.findIndex(it => it.id === editId);
    if (index !== -1) {
      formData.episodesWatched = items[index].episodesWatched; 
      formData.id = editId;
      items[index] = formData;
    }
    editId = null;
  } else {
   
    formData.id = Date.now();
    items.push(formData);
  }

  saveItems();
  renderItems();
  form.reset();
});


function editItem(id) {
  const item = items.find(it => it.id === id);
  if (!item) return;

  editId = id;

  document.getElementById("title").value = item.title;
  document.getElementById("director").value = item.director;
  document.getElementById("genre").value = item.genre;
  document.getElementById("platform").value = item.platform;
  document.getElementById("type").value = item.type;
  document.getElementById("episodesTotal").value = item.episodesTotal;
  document.getElementById("status").value = item.status;
  document.getElementById("review").value = item.review;
  document.getElementById("rating").value = item.rating;
}


function updateProgress(id, change) {
  const item = items.find(it => it.id === id);
  if (item && item.type === "tv") {
    item.episodesWatched = Math.min(item.episodesWatched + change, item.episodesTotal);
    saveItems();
    renderItems();
  }
}


function deleteItem(id) {
  items = items.filter(it => it.id !== id);
  saveItems();
  renderItems();
}


filterGenre.addEventListener("change", renderItems);
filterPlatform.addEventListener("change", renderItems);
filterStatus.addEventListener("change", renderItems);

renderItems();
