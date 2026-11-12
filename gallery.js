/* ===== DYNAMIC GALLERY JAVASCRIPT ===== */

// Gallery data cache
let galleryData = null

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeGallery()
  setupEventListeners()
})

/* ===== INITIALIZATION FUNCTIONS ===== */

/**
 * Initialize gallery by loading data and displaying content
 */
async function initializeGallery() {
  try {
    // Show loading state
    showLoadingState()

    // Load gallery data from JSON
    await loadGalleryData()

    // Get activity type from URL parameter
    const activityType = getUrlParameter("activity") || "parade"

    // Display the gallery
    displayGallery(activityType)

    // Update page title
    updatePageTitle(activityType)

    // Hide loading state
    hideLoadingState()
  } catch (error) {
    console.error("Error initializing gallery:", error)
    showErrorState()
  }
}

/**
 * Load gallery data from JSON file
 */
async function loadGalleryData() {
  try {
    const response = await fetch("gallery-data.json")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    galleryData = await response.json()
  } catch (error) {
    console.error("Error loading gallery data:", error)
    throw error
  }
}

/**
 * Display gallery for specific activity type
 * @param {string} activityType - Type of activity gallery to show
 */
function displayGallery(activityType) {
  try {
    // Get activity data
    const activityData = galleryData[activityType]

    if (!activityData) {
      throw new Error(`Activity data not found: ${activityType}`)
    }

    // Update header content
    document.getElementById("galleryTitle").textContent = activityData.title
    document.getElementById("galleryDescription").textContent = activityData.description

    // Generate gallery items
    const galleryGrid = document.getElementById("galleryGrid")
    galleryGrid.innerHTML = "" // Clear existing content

    activityData.images.forEach((image, index) => {
      const galleryItem = createGalleryItem(image, index)
      galleryGrid.appendChild(galleryItem)
    })

    // Setup animations for new items
    setupAnimations()
  } catch (error) {
    console.error("Error displaying gallery:", error)
    showErrorState()
  }
}

/**
 * Create a gallery item element
 * @param {Object} imageData - Image data object
 * @param {number} index - Image index for animation delay
 * @returns {HTMLElement} Gallery item element
 */
function createGalleryItem(imageData, index) {
  const galleryItem = document.createElement("div")
  galleryItem.className = "gallery-item"
  galleryItem.setAttribute("tabindex", "0")
  galleryItem.style.animationDelay = `${index * 100}ms`

  galleryItem.innerHTML = `
        <img src="${imageData.src}" alt="${imageData.alt}" loading="lazy">
        <div class="gallery-overlay">
            <div class="gallery-overlay-text">${imageData.caption}</div>
        </div>
    `

  // Add click event for modal
  galleryItem.addEventListener("click", function () {
    openImageModal(this)
  })

  // Add keyboard accessibility
  galleryItem.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      openImageModal(this)
    }
  })

  return galleryItem
}

/* ===== STATE MANAGEMENT ===== */

/**
 * Show loading state
 */
function showLoadingState() {
  document.getElementById("loadingState").style.display = "block"
  document.getElementById("dynamicGallery").style.display = "none"
  document.getElementById("errorState").style.display = "none"
}

/**
 * Hide loading state
 */
function hideLoadingState() {
  document.getElementById("loadingState").style.display = "none"
  document.getElementById("dynamicGallery").style.display = "block"
}

/**
 * Show error state
 */
function showErrorState() {
  document.getElementById("loadingState").style.display = "none"
  document.getElementById("dynamicGallery").style.display = "none"
  document.getElementById("errorState").style.display = "block"
}

/* ===== EVENT LISTENERS SETUP ===== */

/**
 * Setup all event listeners
 */
function setupEventListeners() {
  // Back button event
  const backBtn = document.getElementById("backBtn")
  if (backBtn) {
    backBtn.addEventListener("click", (e) => {
      e.preventDefault()
      navigateBack()
    })
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    // Escape key to go back
    if (e.key === "Escape") {
      navigateBack()
    }

    // Arrow key navigation between gallery items
    if (e.key.startsWith("Arrow")) {
      navigateGalleryItems(e)
    }
  })

  // Browser back button
  window.addEventListener("popstate", (e) => {
    if (e.state && e.state.activity) {
      displayGallery(e.state.activity)
    } else {
      navigateBack()
    }
  })
}

/* ===== NAVIGATION FUNCTIONS ===== */

/**
 * Navigate back to activities page
 */
function navigateBack() {
  try {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = "index.html#activities"
    }
  } catch (error) {
    console.error("Error navigating back:", error)
    window.location.href = "index.html"
  }
}

/**
 * Navigate between gallery items using arrow keys
 * @param {KeyboardEvent} e - Keyboard event
 */
function navigateGalleryItems(e) {
  const galleryItems = Array.from(document.querySelectorAll(".gallery-item"))
  const focusedItem = document.activeElement

  if (galleryItems.includes(focusedItem)) {
    e.preventDefault()
    const currentIndex = galleryItems.indexOf(focusedItem)
    let nextIndex

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % galleryItems.length
        break
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
        break
      default:
        return
    }

    galleryItems[nextIndex].focus()
  }
}

/* ===== ANIMATION FUNCTIONS ===== */

/**
 * Setup intersection observer for animations
 */
function setupAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0) scale(1)"
      }
    })
  }, observerOptions)

  // Observe all gallery items
  const galleryItems = document.querySelectorAll(".gallery-item")
  galleryItems.forEach((item, index) => {
    // Set initial state
    item.style.opacity = "0"
    item.style.transform = "translateY(30px) scale(0.95)"
    item.style.transition = "all 0.6s ease"

    // Add staggered delay
    setTimeout(() => {
      item.style.opacity = "1"
      item.style.transform = "translateY(0) scale(1)"
    }, index * 100)

    // Start observing for future animations
    observer.observe(item)
  })
}

/* ===== MODAL FUNCTIONS ===== */

/**
 * Open image in modal/lightbox view
 * @param {HTMLElement} galleryItem - Clicked gallery item
 */
let _galleryList = [];
let _galleryIndex = 0;

function openImageModal(galleryItem) {
  try {
    const grid = document.getElementById("galleryGrid");
    if (!grid) return;

    // Find the clicked <img>
    const clickedImg = galleryItem?.querySelector?.("img") || galleryItem;
    if (!clickedImg) return;

    // Build a full list of images currently in the grid (supports dynamic galleries)
    _galleryList = Array.from(grid.querySelectorAll("img")).map((imgEl) => ({
      el: imgEl,
      src: imgEl.getAttribute("data-full") || imgEl.src,
      alt: imgEl.alt || "",
      caption:
        imgEl.closest(".gallery-item")?.querySelector(".gallery-overlay-text")?.textContent?.trim() ||
        imgEl.alt ||
        "",
    }));

    _galleryIndex = Math.max(0, _galleryList.findIndex((o) => o.el === clickedImg));

    // Create modal overlay
    const modal = document.createElement("div");
    modal.className = "image-modal";
    modal.innerHTML = `
      <div class="modal-overlay">
        <div class="modal-content">
          <button class="modal-close" aria-label="Close modal">&times;</button>
          <button class="modal-nav modal-prev" aria-label="Previous image">&#10094;</button>
          <img src="${_galleryList[_galleryIndex].src}" alt="${_galleryList[_galleryIndex].alt}" class="modal-image">
          <button class="modal-nav modal-next" aria-label="Next image">&#10095;</button>
          <div class="modal-caption">${_galleryList[_galleryIndex].caption}</div>
        </div>
      </div>
    `;

    // Inject/extend styles (only once)
    if (!document.querySelector("#modal-styles")) {
      const styles = document.createElement("style");
      styles.id = "modal-styles";
      styles.innerHTML = `
        .image-modal {
          position: fixed; inset: 0; background: rgba(0,0,0,0.9);
          z-index: 10000; display: flex; align-items: center; justify-content: center;
          animation: fadeIn 0.25s ease;
        }
        .modal-overlay { width: 100%; height: 100%; display: grid; place-items: center; padding: 16px; }
        .modal-content { position: relative; max-width: 90vw; max-height: 90vh; text-align: center; }
        .modal-image { max-width: 100%; max-height: 70vh; object-fit: contain; border-radius: 8px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .modal-close {
          position: absolute; top: -48px; right: 0; background: none; border: none; color: #fff;
          font-size: 2rem; cursor: pointer; width: 40px; height: 40px; display: grid; place-items: center;
          transition: transform 0.2s ease;
        }
        .modal-close:hover { transform: scale(1.1); }
        .modal-caption { color: #fff; margin-top: 16px; font-size: 1rem; line-height: 1.5; max-width: 640px; margin-left: auto; margin-right: auto; }

        .modal-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          background: rgba(0,0,0,0.5); border: none; color: #fff; font-size: 2rem; cursor: pointer;
          padding: 10px 14px; border-radius: 999px; transition: background 0.2s ease, transform 0.1s ease;
          user-select: none;
        }
        .modal-nav:hover { background: rgba(0,0,0,0.8); }
        .modal-prev { left: 8px; }
        .modal-next { right: 8px; }

        @media (max-width: 768px) {
          .modal-close { top: -40px; font-size: 1.6rem; }
          .modal-nav { font-size: 1.6rem; padding: 8px 12px; }
        }

        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fadeOut { from { opacity: 1 } to { opacity: 0 } }
      `;
      document.head.appendChild(styles);
    }

    document.body.appendChild(modal);

    const overlay = modal.querySelector(".modal-overlay");
    const closeBtn = modal.querySelector(".modal-close");
    const prevBtn  = modal.querySelector(".modal-prev");
    const nextBtn  = modal.querySelector(".modal-next");

    // Hide nav if only one image
    if (_galleryList.length <= 1) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    }

    // Clicks
    closeBtn.addEventListener("click", () => closeModal(modal));
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(modal);  // don't close when clicking inside content/buttons
    });
    prevBtn.addEventListener("click", () => _showImage(modal, _galleryIndex - 1));
    nextBtn.addEventListener("click", () => _showImage(modal, _galleryIndex + 1));

    // Keyboard
    const keyHandler = (e) => {
      if (e.key === "Escape") { closeModal(modal); document.removeEventListener("keydown", keyHandler); }
      else if (e.key === "ArrowLeft") { _showImage(modal, _galleryIndex - 1); }
      else if (e.key === "ArrowRight") { _showImage(modal, _galleryIndex + 1); }
    };
    document.addEventListener("keydown", keyHandler);

    // Touch swipe
    let startX = 0;
    modal.addEventListener("touchstart", (e) => { startX = e.changedTouches[0].clientX; }, { passive: true });
    modal.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) _showImage(modal, _galleryIndex + 1);
        else _showImage(modal, _galleryIndex - 1);
      }
    }, { passive: true });

  } catch (err) {
    console.error("Error opening modal:", err);
  }
}
function _showImage(modal, newIndex) {
  if (_galleryList.length === 0) return;

  if (newIndex < 0) newIndex = _galleryList.length - 1;
  if (newIndex >= _galleryList.length) newIndex = 0;
  _galleryIndex = newIndex;

  const { src, alt, caption } = _galleryList[_galleryIndex];
  const modalImg = modal.querySelector(".modal-image");
  const captionEl = modal.querySelector(".modal-caption");

  // tiny fade transition
  modalImg.style.opacity = "0";
  setTimeout(() => {
    modalImg.src = src;
    modalImg.alt = alt;
    captionEl.textContent = caption || "";
    modalImg.onload = () => { modalImg.style.opacity = "1"; };
  }, 120);

  // Preload neighbors (snappy nav)
  const nextIdx = (_galleryIndex + 1) % _galleryList.length;
  const prevIdx = (_galleryIndex - 1 + _galleryList.length) % _galleryList.length;
  [nextIdx, prevIdx].forEach(i => { const im = new Image(); im.src = _galleryList[i].src; });
}
function closeModal(modal) {
  modal.style.animation = "fadeOut 0.25s ease";
  setTimeout(() => { modal.remove(); }, 220);
}
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item") || e.target.closest("img")?.parentElement;
    if (!item || !grid.contains(item)) return;
    openImageModal(item);
  });
});


/**
 * Close image modal
 * @param {HTMLElement} modal - Modal element to close
 */
function closeModal(modal) {
  modal.style.animation = "fadeOut 0.3s ease"
  setTimeout(() => {
    if (modal.parentNode) {
      modal.parentNode.removeChild(modal)
    }
  }, 300)
}

/* ===== UTILITY FUNCTIONS ===== */

/**
 * Get URL parameters
 * @param {string} param - Parameter name to get
 * @returns {string|null} Parameter value or null if not found
 */
function getUrlParameter(param) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

/**
 * Update page title based on activity type
 * @param {string} activityType - Type of activity
 */
function updatePageTitle(activityType) {
  if (galleryData && galleryData[activityType]) {
    document.title = galleryData[activityType].title + " - NCC Activities"
  } else {
    document.title = "NCC Activities Gallery"
  }
}

/* ===== ERROR HANDLING ===== */

// Global error handler
window.addEventListener("error", (e) => {
  console.error("Gallery error:", e.error)
})

// Handle unhandled promise rejections
window.addEventListener("unhandledrejection", (e) => {
  console.error("Gallery promise rejection:", e.reason)
})
