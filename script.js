window.addEventListener("load", function() {
  // Hide loader after page is fully loaded
  document.getElementById("loader").style.display = "none";
  document.getElementById("content").style.display = "block";
});


// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger")
  const navMenu = document.getElementById("nav-menu")
  const navLinks = document.querySelectorAll(".nav-link")
  const navbar = document.getElementById("navbar")

  // Mobile menu toggle
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(12, 8, 1, 0.5)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0)"
      navbar.style.boxShadow = "none"
    }
  })

  // Active navigation link highlighting
  const sections = document.querySelectorAll("section[id]")

  function highlightNavigation() {
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"))
        if (navLink) {
          navLink.classList.add("active")
        }
      }
    })
  }

  window.addEventListener("scroll", highlightNavigation)

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 70 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Intersection Observer for animations
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
  const animateElements = document.querySelectorAll(
    ".objective-card, .activity-card, .message-card, .cadet-card, .achievement-card, .benefit-card",
  )
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Smooth scroll to section function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 70 // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// FAQ toggle functionality
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

// Scroll to top functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Add scroll to top button
document.addEventListener("DOMContentLoaded", () => {
  // Create scroll to top button
  const scrollTopBtn = document.createElement("button")
  scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>'
  scrollTopBtn.className = "scroll-top-btn"
  scrollTopBtn.onclick = scrollToTop
  document.body.appendChild(scrollTopBtn)

  // Add CSS for scroll to top button
  const style = document.createElement("style")
  style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #ff6b35, #ff8c42);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .scroll-top-btn:hover {
            background: linear-gradient(135deg, #ff5722, #ff6b35);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
        }
        
        .scroll-top-btn.visible {
            opacity: 1;
            visibility: visible;
        }
    `
  document.head.appendChild(style)

  // Show/hide scroll to top button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("visible")
    } else {
      scrollTopBtn.classList.remove("visible")
    }
  })
})

// Form submission handling (if needed)
function handleFormSubmit(event) {
  event.preventDefault()
  // Add form submission logic here
  alert("Thank you for your interest! We will contact you soon.")
}

// Loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Add loading styles
document.addEventListener("DOMContentLoaded", () => {
  const loadingStyle = document.createElement("style")
  loadingStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
        
        .hero-title,
        .hero-subtitle,
        .hero-description,
        .hero-buttons {
            opacity: 0;
            transform: translateY(30px);
        }
        
        body.loaded .hero-title {
            animation: fadeInUp 1s ease-out forwards;
        }
        
        body.loaded .hero-subtitle {
            animation: fadeInUp 1s ease-out 0.2s forwards;
        }
        
        body.loaded .hero-description {
            animation: fadeInUp 1s ease-out 0.4s forwards;
        }
        
        body.loaded .hero-buttons {
            animation: fadeInUp 1s ease-out 0.6s forwards;
        }
    `
  document.head.appendChild(loadingStyle)
})

// Parallax effect for hero section
// window.addEventListener("scroll", () => {
//   const scrolled = window.pageYOffset
//   const hero = document.querySelector(".hero")
//   const heroBackground = document.querySelector(".hero-background")

//   if (hero && heroBackground) {
//     const rate = scrolled * -0.5
//     heroBackground.style.transform = `translateY(${rate}px)`
//   }
// })

// Counter animation for statistics (if needed)
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    element.textContent = Math.floor(start)

    if (start >= target) {
      element.textContent = target
      clearInterval(timer)
    }
  }, 16)
}

// Initialize counters when they come into view
const counterElements = document.querySelectorAll(".counter")
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = Number.parseInt(entry.target.dataset.target)
      animateCounter(entry.target, target)
      counterObserver.unobserve(entry.target)
    }
  })
})

counterElements.forEach((counter) => {
  counterObserver.observe(counter)
})

// Image lazy loading
const images = document.querySelectorAll("img[data-src]")
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      img.classList.remove("lazy")
      imageObserver.unobserve(img)
    }
  })
})

images.forEach((img) => {
  imageObserver.observe(img)
})

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect on load
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const originalText = heroTitle.textContent
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 150)
    }, 1000)
  }
})

// Hamburger menu toggle for dropdown
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const dropdown = document.getElementById('dropdown-menu');
  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    dropdown.classList.toggle('active');
  });
});


// About section image slideshow
// Enhanced Slideshow Functionality
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  let currentIndex = 0;
  let slideInterval;
  const slideDuration = 4000; // 4 seconds

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    currentIndex = index;
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  function startSlideshow() {
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  // Initialize
  showSlide(0);
  startSlideshow();

  // Pause on hover
  const slideshowContainer = document.querySelector('.about-image-container');
  slideshowContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slideshowContainer.addEventListener('mouseleave', startSlideshow);

  // Click indicators
  indicators.forEach(indicator => {
    indicator.addEventListener('click', function() {
      const slideIndex = parseInt(this.getAttribute('data-index'));
      showSlide(slideIndex);
      clearInterval(slideInterval);
      startSlideshow();
    });
  });
});




/* ===== ACTIVITIES SECTION JAVASCRIPT ===== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

  // ===== ACTIVITY CARD CLICK HANDLERS =====
  const activityCards = document.querySelectorAll('.activity-card');

  activityCards.forEach(card => {
    card.addEventListener('click', function (e) {
      // Prevent default action
      e.preventDefault();

      // Get activity type from data attribute
      const activityType = this.getAttribute('data-activity');

      // Call function to open gallery
      openGallery(activityType);
    });
  });

  // ===== VIEW GALLERY BUTTON HANDLERS =====
  const galleryButtons = document.querySelectorAll('.view-gallery-btn');

  galleryButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      // Prevent event bubbling and default behavior
      e.preventDefault();
      e.stopPropagation();

      // Get activity type from parent card
      const activityCard = this.closest('.activity-card');
      const activityType = activityCard.getAttribute('data-activity');

      // Call function to open gallery
      openGallery(activityType);
    });
  });
});

/* ===== GALLERY NAVIGATION FUNCTIONS ===== */

/**
 * Open gallery page for specific activity
 * @param {string} activityType - The type of activity (parade, blood-donation, etc.)
 */
function openGallery(activityType) {
  try {
    // Create URL for gallery page
    const galleryUrl = `gallery.html?activity=${activityType}`;

    // Navigate to gallery page
    window.location.href = galleryUrl;

    // Alternative method if you want to open in new tab
    // window.open(galleryUrl, '_blank');

  } catch (error) {
    console.error('Error opening gallery:', error);

    // Fallback: Try to find gallery section on same page
    const gallerySection = document.getElementById(`${activityType}-gallery`);
    if (gallerySection) {
      // Hide activities section
      const activitiesSection = document.getElementById('activities');
      if (activitiesSection) {
        activitiesSection.style.display = 'none';
      }

      // Show gallery section
      gallerySection.style.display = 'block';
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert('Gallery page not found. Please ensure gallery.html exists.');
    }
  }
}

/* ===== UTILITY FUNCTIONS ===== */

/**
 * Get URL parameters
 * @param {string} param - Parameter name to get
 * @returns {string|null} Parameter value or null if not found
 */
function getUrlParameter(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Smooth scroll to element
 * @param {string} elementId - ID of element to scroll to
 */
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/* ===== ANIMATION ENHANCEMENTS ===== */

// Add entrance animations when section comes into view
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add animation classes to cards
      const cards = entry.target.querySelectorAll('.activity-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }
  });
}, observerOptions);

// Observe activities section when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  const activitiesSection = document.getElementById('activities');
  if (activitiesSection) {
    // Set initial state for animation
    const cards = activitiesSection.querySelectorAll('.activity-card');
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'all 0.6s ease';
    });

    // Start observing
    observer.observe(activitiesSection);
  }
});

/* ===== ERROR HANDLING ===== */

// Global error handler for navigation issues
window.addEventListener('error', function (e) {
  console.error('Navigation error:', e.error);
});

// Handle navigation failures
window.addEventListener('unhandledrejection', function (e) {
  console.error('Navigation promise rejection:', e.reason);
});



// Achievement Section 
let slideIndex = 1;

// Function to change slide by n positions
function changeSlide(n) {
  showSlide(slideIndex += n);
}

// Function to show a specific slide
function currentSlide(n) {
  showSlide(slideIndex = n);
}

// Function to display the slide
function showSlide(n) {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');

  // Handle slide index boundaries
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Hide all slides
  slides.forEach(slide => {
    slide.classList.remove('active');
  });

  // Remove active class from all dots
  dots.forEach(dot => {
    dot.classList.remove('active');
  });

  // Show current slide and activate corresponding dot
  if (slides[slideIndex - 1]) {
    slides[slideIndex - 1].classList.add('active');
  }
  if (dots[slideIndex - 1]) {
    dots[slideIndex - 1].classList.add('active');
  }
}

// Auto-play functionality (uncomment to enable)
function autoSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

// Enable auto-play every 4 seconds (uncomment the line below)
setInterval(autoSlide, 4000);

// Touch/swipe support for mobile devices
let startX = 0;
let endX = 0;

// Initialize touch events when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  const carouselContainer = document.querySelector('.carousel-container');

  if (carouselContainer) {
    carouselContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    carouselContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  // Keyboard navigation
  document.addEventListener('keydown', handleKeyDown);
});

function handleTouchStart(e) {
  startX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
}

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = startX - endX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next slide
      changeSlide(1);
    } else {
      // Swipe right - previous slide
      changeSlide(-1);
    }
  }
}

// Keyboard navigation
function handleKeyDown(e) {
  // Only respond to arrow keys when carousel is visible
  const achievementsSection = document.querySelector('.achievements');
  if (!achievementsSection) return;

  const rect = achievementsSection.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

  if (isVisible) {
    if (e.key === 'ArrowLeft') {
      changeSlide(-1);
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      changeSlide(1);
      e.preventDefault();
    }
  }
}

// Optional: Pause auto-play on hover
function pauseAutoPlay() {
  // Clear any existing intervals
  if (window.carouselInterval) {
    clearInterval(window.carouselInterval);
  }
}

function resumeAutoPlay() {
  // Resume auto-play (only if it was enabled)
  // window.carouselInterval = setInterval(autoSlide, 5000);
}

// Add hover listeners for auto-play control (uncomment if using auto-play)
/*
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', pauseAutoPlay);
        carouselContainer.addEventListener('mouseleave', resumeAutoPlay);
    }
});
*/

// Smooth initialization
document.addEventListener('DOMContentLoaded', function () {
  // Ensure the first slide is active
  showSlide(slideIndex);
});




// Alumni Section
document.addEventListener('DOMContentLoaded', function () {
  // Initialize AOS (Animate On Scroll) for card animations
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });

  // Counter animation for statistics
  const statNumbers = document.querySelectorAll('.stat-number');

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000;
      const start = 0;
      const increment = target / (duration / 16); // 60fps

      let current = start;
      const timer = setInterval(() => {
        current += increment;
        stat.textContent = Math.floor(current);

        if (current >= target) {
          stat.textContent = target;
          clearInterval(timer);
        }
      }, 16);
    });
  };

  // Intersection Observer for counter animation
  const statsSection = document.querySelector('.alumni-stats');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  if (statsSection) {
    observer.observe(statsSection);
  }

  // Card hover effects
  const cards = document.querySelectorAll('.alumni-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const angleX = (y - centerY) / 20;
      const angleY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;

      // Glow effect
      const glow = card.querySelector('.card-glow');
      glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, transparent 70%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
    });
  });

  // Parallax effect for background elements
  window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const orbs = document.querySelectorAll('.gradient-orb');
    orbs[0].style.transform = `translate(${x * 30}px, ${y * 30}px)`;
    orbs[1].style.transform = `translate(${-x * 40}px, ${-y * 40}px)`;
    orbs[2].style.transform = `translate(${x * 20}px, ${-y * 20}px)`;
  });
});



// Contributors Section Animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const parent = bar.parentElement;
            const level = parent.getAttribute('data-level');
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = level + '%';
                
                // Animate percentage counter
                const percentElement = parent.querySelector('.skill-percent');
                let current = 0;
                const duration = 1500;
                const increment = level / (duration / 16);
                
                const counter = setInterval(() => {
                    current += increment;
                    percentElement.textContent = Math.floor(current) + '%';
                    
                    if (current >= level) {
                        percentElement.textContent = level + '%';
                        clearInterval(counter);
                    }
                }, 16);
            }, 300);
        });
    };

    // Intersection Observer for skill bars
    const contributorsSection = document.querySelector('#contributors');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (contributorsSection) {
        observer.observe(contributorsSection);
    }

    // 3D tilt effect
const alumniCards = document.querySelectorAll('.alumni-card');

alumniCards.forEach(card => {
    const glow = card.querySelector('.card-glow');

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const angleX = (y - centerY) / 15;
        const angleY = (centerX - x) / 15;

        // 3D tilt
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;

        // Glow follows cursor
        glow.style.opacity = "1";
        glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 255, 255, 0.3) 0%, transparent 70%)`;
    });

    card.addEventListener('mouseleave', () => {
        // Reset tilt
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';

        // Fade out glow
        glow.style.opacity = "0";
    });
});



    // Floating tech orbs animation
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        const orbs = document.querySelectorAll('.tech-orb');
        orbs[0].style.transform = `translate(${x * 40}px, ${y * 40}px)`;
        orbs[1].style.transform = `translate(${-x * 50}px, ${-y * 50}px)`;
    });
});


//====== HERO SECTION ============//

// DOM Elements
const heroMusic = document.getElementById('heroMusic');
const musicToggle = document.getElementById('musicToggle');
const heroSection = document.getElementById('home');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Music control variables
let isMusicPlaying = false;
let originalVolume = 0.3; // Default volume (30%)

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeHeroSection();
});

// Initialize hero section functionality
function initializeHeroSection() {
    setupMusic();
    setupScrollEffects();
    setupScrollIndicator();
    attemptAutoPlay();
}

// Setup music functionality
function setupMusic() {
    // Set initial volume
    heroMusic.volume = originalVolume;
    
    // Music toggle button functionality
    musicToggle.addEventListener('click', toggleMusic);
    
    // Handle music events
    heroMusic.addEventListener('loadeddata', function() {
        console.log('Music loaded successfully');
    });
    
    heroMusic.addEventListener('error', function(e) {
        console.error('Error loading music:', e);
        musicToggle.style.display = 'none'; // Hide button if music fails to load
    });

    // ✅ Keep state in sync with actual audio
    heroMusic.addEventListener('play', () => {
        isMusicPlaying = true;
        updateMusicButton();
    });

    heroMusic.addEventListener('pause', () => {
        isMusicPlaying = false;
        updateMusicButton();
    });
}

// Attempt to auto-play music (with user interaction fallback)
function attemptAutoPlay() {
    const playPromise = heroMusic.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                console.log('Music auto-play started');
                // state & icon now update via 'play' event
            })
            .catch((error) => {
                console.log('Auto-play failed, waiting for user interaction');
                setupUserInteractionMusic();
            });
    }
}

// Setup music to start on first user interaction
function setupUserInteractionMusic() {
    const startMusicOnInteraction = () => {
        if (heroMusic.paused) {
            heroMusic.play()
                .then(() => {
                    console.log('Music started after user interaction');
                })
                .catch((error) => {
                    console.error('Failed to start music:', error);
                });
        }
        // Remove listeners after first interaction
        document.removeEventListener('click', startMusicOnInteraction);
        document.removeEventListener('keydown', startMusicOnInteraction);
        document.removeEventListener('touchstart', startMusicOnInteraction);
    };
    
    // Add listeners for various user interactions
    document.addEventListener('click', startMusicOnInteraction);
    document.addEventListener('keydown', startMusicOnInteraction);
    document.addEventListener('touchstart', startMusicOnInteraction);
}

// Toggle music play/pause
function toggleMusic() {
    if (heroMusic.paused) {
        heroMusic.play().catch((error) => {
            console.error('Error playing music:', error);
        });
    } else {
        heroMusic.pause();
    }
}

// Update music button icon
function updateMusicButton() {
    const icon = musicToggle.querySelector('i');
    if (isMusicPlaying) {
        icon.className = 'fas fa-volume-up';
        musicToggle.classList.remove('muted');
    } else {
        icon.className = 'fas fa-volume-mute';
        musicToggle.classList.add('muted');
    }
}


// ===== Hero Video Fallback ===== //
const heroVideo = document.querySelector('.hero-video');

heroVideo.addEventListener('error', () => {
    console.warn('Hero video failed to load. Using fallback image.');
    // Hide video element
    heroVideo.style.display = 'none';
});


// Setup scroll effects for music fade
function setupScrollEffects() {
    let ticking = false;

    function updateMusicVolume() {
        if (!isMusicPlaying) return;

        const heroHeight = heroSection.offsetHeight;
        const scrolled = window.pageYOffset;

        // Only start fading music after user scrolls past hero
        let newVolume = originalVolume;
        if (scrolled > heroHeight) {
            const extraScroll = scrolled - heroHeight;
            const fadeDistance = 10000; // pixels over which music fades completely
            const fadePercent = Math.min(extraScroll / fadeDistance, 1);
            newVolume = originalVolume * (1 - fadePercent);
        }

        heroMusic.volume = Math.max(0, newVolume);

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateMusicVolume);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
}


// Setup scroll indicator functionality
function setupScrollIndicator() {
    scrollIndicator.addEventListener('click', function() {
        scrollToSection('about');
    });
}

// Smooth scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Handle page visibility change (pause music when tab is hidden)
document.addEventListener('visibilitychange', function() {
    if (document.hidden && isMusicPlaying) {
        heroMusic.pause();
    } else if (!document.hidden && isMusicPlaying) {
        heroMusic.play().catch(console.error);
    }
});

// Handle window resize
window.addEventListener('resize', function() {
    // Recalculate hero height for scroll effects
    setupScrollEffects();
});

// Preload video and music for better performance
window.addEventListener('load', function() {
    const video = document.querySelector('.hero-video');
    if (video) {
        video.load(); // Preload video
    }
    heroMusic.load(); // Preload music
});

// <===== Contributors Section ======>

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("carousel-track")
  const cards = document.querySelectorAll(".contributor-card")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.getElementById("prev-btn")
  const nextBtn = document.getElementById("next-btn")

  let currentSlide = 2 // Start with middle card active
  const totalSlides = cards.length

  // Calculate card width including gap
  function getCardWidth() {
    const card = cards[0]
    const cardStyle = window.getComputedStyle(card)
    const cardWidth = card.offsetWidth
    const gap = 30 // Gap between cards
    return cardWidth + gap
  }

  // Update carousel position and active states
  function updateCarousel() {
    const cardWidth = getCardWidth()
    const offset = currentSlide * cardWidth
    const centerOffset = track.parentElement.offsetWidth / 2 - cardWidth / 2

    track.style.transform = `translateX(${centerOffset - offset}px)`

    // Update active card
    cards.forEach((card, index) => {
      card.classList.toggle("active", index === currentSlide)
    })

    // Update active dot
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide)
    })
  }
  

  // Navigate to specific slide
  function goToSlide(slideIndex) {
    currentSlide = Math.max(0, Math.min(slideIndex, totalSlides - 1))
    updateCarousel()
  }

  // Previous slide
  function prevSlide() {
    goToSlide(currentSlide - 1)
  }

  // Next slide
  function nextSlide() {
    goToSlide(currentSlide + 1)
  }

  // Event listeners
  prevBtn.addEventListener("click", prevSlide)
  nextBtn.addEventListener("click", nextSlide)

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => goToSlide(index))
  })

  // Touch/swipe functionality
  let startX = 0
  let isDragging = false

  function handleStart(e) {
    isDragging = true
    startX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX
    track.style.transition = "none"
  }

  function handleMove(e) {
    if (!isDragging) return
    e.preventDefault()

    const currentX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX
    const diffX = startX - currentX
    const cardWidth = getCardWidth()
    const offset = currentSlide * cardWidth
    const centerOffset = track.parentElement.offsetWidth / 2 - cardWidth / 2

    track.style.transform = `translateX(${centerOffset - offset - diffX}px)`
  }

  function handleEnd(e) {
    if (!isDragging) return
    isDragging = false

    const endX = e.type === "mouseup" ? e.clientX : e.changedTouches[0].clientX
    const diffX = startX - endX
    const threshold = 50

    track.style.transform = `translateX(-${index * slideWidth}px)`;


    if (Math.abs(diffX) > threshold) {
      if (diffX > 0 && currentSlide < totalSlides - 1) {
        nextSlide()
      } else if (diffX < 0 && currentSlide > 0) {
        prevSlide()
      } else {
        updateCarousel() // Snap back to current position
      }
    } else {
      updateCarousel() // Snap back to current position
    }
  }

  // Mouse events
  track.addEventListener("mousedown", handleStart)
  document.addEventListener("mousemove", handleMove)
  document.addEventListener("mouseup", handleEnd)

  // Touch events
  track.addEventListener("touchstart", handleStart, { passive: false })
  track.addEventListener("touchmove", handleMove, { passive: false })
  track.addEventListener("touchend", handleEnd, { passive: true })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide()
    } else if (e.key === "ArrowRight") {
      nextSlide()
    }
  })

  // Auto-play functionality (optional)
  let autoPlayInterval

  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      if (currentSlide >= totalSlides - 1) {
        goToSlide(0)
      } else {
        nextSlide()
      }
    }, 4000)
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval)
  }

  // Start auto-play
  startAutoPlay()

  // Pause auto-play on hover
  track.addEventListener("mouseenter", stopAutoPlay)
  track.addEventListener("mouseleave", startAutoPlay)

  // Handle window resize
  window.addEventListener("resize", updateCarousel)

  // Initial setup
  updateCarousel()
})
