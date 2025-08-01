// Global variables
let currentSlide = 0
const slides = document.querySelectorAll(".carousel-slide")
const dots = document.querySelectorAll(".dot")
let map = null
const L = window.L // Declare the L variable

// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  // Hamburger menu toggle
  const hamburgerMenuBtn = document.getElementById("hamburgerMenuBtn")
  const fullscreenMenu = document.getElementById("fullscreenMenu")
  const menuCloseBtn = document.getElementById("menuCloseBtn")

  if (hamburgerMenuBtn && fullscreenMenu) {
    hamburgerMenuBtn.addEventListener("click", () => {
      hamburgerMenuBtn.classList.toggle("active")
      fullscreenMenu.classList.toggle("active")
      document.body.style.overflow = fullscreenMenu.classList.contains("active") ? "hidden" : "auto"
    })
  }

  if (menuCloseBtn && fullscreenMenu) {
    menuCloseBtn.addEventListener("click", () => {
      hamburgerMenuBtn.classList.remove("active")
      fullscreenMenu.classList.remove("active")
      document.body.style.overflow = "auto"
    })
  }

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".menu-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      scrollToSection(targetId)

      // Close fullscreen menu
      if (fullscreenMenu && fullscreenMenu.classList.contains("active")) {
        hamburgerMenuBtn.classList.remove("active")
        fullscreenMenu.classList.remove("active")
        document.body.style.overflow = "auto"
      }
    })
  })

  // Active section highlighting
  window.addEventListener("scroll", updateActiveSection)

  // Initialize carousel
  initializeCarousel()

  // FAQ functionality
  initializeFAQs()

  // Scroll animations
  initializeScrollAnimations()

  // Initialize map
  initializeMap()

  // Custom cursor movement and click effect
  const cursor = document.querySelector('.cursor');
  const cursorInner = document.querySelector('.cursor-inner');
  
  document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorInner.style.left = e.clientX + 'px';
      cursorInner.style.top = e.clientY + 'px';
  });
  
  document.addEventListener('click', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
      setTimeout(() => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 100);
  });
})

// Smooth scroll function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 80 // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Update active navigation section
function updateActiveSection() {
  const sections = [
    "home",
    "about",
    "objectives",
    "activities",
    "messages",
    "ranks",
    "achievements",
    "alumni",
    "join",
    "faqs",
    "contact",
  ]
  const scrollPosition = window.scrollY + 100

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId)
    const navLink = document.querySelector(`[data-section="${sectionId}"]`)

    if (section && navLink) {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        document.querySelectorAll(".menu-link").forEach((link) => {
          link.classList.remove("active")
        })
        // Add active class to current link
        navLink.classList.add("active")
      }
    }
  })
}

// Carousel functionality
function initializeCarousel() {
  if (slides.length > 0) {
    showSlide(0)

    // Auto-advance carousel
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length
      showSlide(currentSlide)
    }, 5000)
  }
}

function showSlide(index) {
  // Hide all slides
  slides.forEach((slide) => {
    slide.classList.remove("active")
  })

  // Remove active class from all dots
  dots.forEach((dot) => {
    dot.classList.remove("active")
  })

  // Show current slide and activate corresponding dot
  if (slides[index] && dots[index]) {
    slides[index].classList.add("active")
    dots[index].classList.add("active")
  }
}

function changeSlide(direction) {
  currentSlide += direction

  if (currentSlide >= slides.length) {
    currentSlide = 0
  } else if (currentSlide < 0) {
    currentSlide = slides.length - 1
  }

  showSlide(currentSlide)
}

function currentSlideIndex(index) {
  currentSlide = index - 1
  showSlide(currentSlide)
}

// FAQ functionality
function initializeFAQs() {
  const faqQuestions = document.querySelectorAll(".faq-question")

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.parentElement
      const isActive = faqItem.classList.contains("active")

      // Close all FAQ items
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active")
      })

      // Open clicked item if it wasn't active
      if (!isActive) {
        faqItem.classList.add("active")
      }
    })
  })
}

function toggleFAQ(element) {
  const faqItem = element.parentElement
  const isActive = faqItem.classList.contains("active")

  // Close all FAQ items
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active")
  })

  // Open clicked item if it wasn't active
  if (!isActive) {
    faqItem.classList.add("active")
  }
}

// Map functionality
function initializeMap() {
  // SOA University coordinates
  const soaCoordinates = [20.0504, 85.0982]

  // Initialize the map
  map = L.map("map").setView(soaCoordinates, 16)

  // Add tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map)

  // Custom marker icon with NCC colors
  const customIcon = L.divIcon({
    html: '<div style="background: linear-gradient(135deg, #dc2626, #1e3a8a, #0ea5e9); width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.3);"><i class="fas fa-shield-alt" style="font-size: 14px;"></i></div>',
    className: "custom-marker",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  })

  // Add marker
  const marker = L.marker(soaCoordinates, { icon: customIcon }).addTo(map)

  // Add popup
  marker
    .bindPopup(
      `
    <div style="text-align: center; padding: 10px;">
      <h3 style="margin: 0 0 8px 0; color: #1e3a8a; font-size: 16px;">SOA NCC Unit</h3>
      <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">4(O) CTC</p>
      <p style="margin: 0; font-size: 12px; color: #888;">Siksha 'O' Anusandhan University<br>Kalinga Nagar, Bhubaneswar</p>
    </div>
  `,
    )
    .openPopup()

  // Add circle to highlight the area with NCC colors
  L.circle(soaCoordinates, {
    color: "#dc2626",
    fillColor: "#1e3a8a",
    fillOpacity: 0.1,
    radius: 200,
  }).addTo(map)
}

function centerMap() {
  if (map) {
    map.setView([20.0504, 85.0982], 16)
  }
}

function getDirections() {
  const destination = "20.0504,85.0982"
  const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&destination_place_id=ChIJX8lXXXXXXXXXXXXXXXXX`
  window.open(url, "_blank")
}

// Scroll animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".activity-card, .message-card, .cadet-card, .alumni-card, .benefit-card, .contact-item",
  )
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)"
  }
})

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  const fullscreenMenu = document.getElementById("fullscreenMenu")
  const hamburgerMenuBtn = document.getElementById("hamburgerMenuBtn")

  if (
    fullscreenMenu &&
    fullscreenMenu.classList.contains("active") &&
    !fullscreenMenu.contains(e.target) &&
    !hamburgerMenuBtn.contains(e.target)
  ) {
    hamburgerMenuBtn.classList.remove("active")
    fullscreenMenu.classList.remove("active")
    document.body.style.overflow = "auto"
  }
})

// Utility functions for external use
window.scrollToSection = scrollToSection
window.changeSlide = changeSlide
window.currentSlide = currentSlideIndex
window.toggleFAQ = toggleFAQ
window.centerMap = centerMap
window.getDirections = getDirections
