#  Movie & TV Collection App (Frontend Only)

This is a simple **frontend-only web app** to track and manage your personal movie and TV show collection.  
The app runs entirely in the browser and uses **LocalStorage** for saving data (no backend required).  

---

##  Features
-  Add Movies & TV Shows with:
  - Title, Director, Genre, Platform (e.g., Netflix, Prime)
  - Type (Movie / TV Show)
  - Status (Watching, Completed, Wishlist)
  - Rating (15) and Review
  - Episodes (for TV Shows)
-  Track progress:
  - For TV Shows  episodes watched / total episodes  
  - For Movies  rating or status
-  Rate and review content
-  Filter list by Genre, Platform, or Status
-  Refresh button to reset filters and show all items
-  Progress bar for both movies and TV shows
-  Edit and Delete items
-  Data persists in browser via **LocalStorage**

---

##  Tech Stack
- **HTML5**
- **CSS3**
- **Vanilla JavaScript (ES6)**  
- **LocalStorage** (for saving data in the browser)

---

##  Getting Started

1. Clone or download this repository.  
2. Open the project folder.  
3. Run the app by opening **`index.html`** in your browser.  
   - No backend, server, or database is required.  

---

##  Project Structure
```
movie-tv-collection/

 index.html      # Main HTML file
 style.css       # Styling (cards, buttons, filters, progress bar)
 script.js       # App logic (add, edit, delete, filter, progress tracking)
 README.md       # Documentation
```

---

##  Future Enhancements
- Dark mode toggle 
- Export/Import collection to JSON file
- Search by title
- Backend integration with a database (FastAPI/Django + SQLite/PostgreSQL)

---

##  License
This project is free to use and modify for personal purposes.  

---

 Just open `index.html` and start building your own movie/TV library!