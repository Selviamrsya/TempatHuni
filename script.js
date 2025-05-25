// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Search functionality
  const searchBtn = document.getElementById("searchBtn")
  const searchInput = document.getElementById("searchInput")
  const filterBtn = document.getElementById("filterBtn")
  const signInBtn = document.getElementById("signInBtn")

  // Search button click handler
  searchBtn.addEventListener("click", () => {
    const searchValue = searchInput.value.trim()
    if (searchValue) {
      console.log(`Searching for: ${searchValue}`)
      alert(`Searching for: ${searchValue}`)
      // Here you would typically send the search query to your backend
      performSearch(searchValue)
    } else {
      alert("Please enter a search term")
    }
  })

  // Enter key search
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchBtn.click()
    }
  })

  // Filter button functionality
  filterBtn.addEventListener("click", () => {
    console.log("Filter button clicked")
    alert("Filter options would open here")
    // Here you would typically open a filter modal or dropdown
    openFilterModal()
  })

  // Sign in button functionality
  signInBtn.addEventListener("click", () => {
    console.log("Sign in button clicked")
    alert("Sign in form would open here")
    // Here you would typically redirect to sign in page or open modal
    openSignInModal()
  })

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Header background on scroll

  // Feature cards animation on scroll
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

  // Initially hide feature cards for animation
  document.querySelectorAll(".feature-card").forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(30px)"
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(card)
  })

  // Mobile menu toggle (if needed for future expansion)
  function toggleMobileMenu() {
    const headerContent = document.querySelector(".header-content")
    headerContent.classList.toggle("mobile-open")
  }

  // Search function
  function performSearch(query) {
    // Simulate search functionality
    console.log(`Performing search for: ${query}`)

    // Here you would typically:
    // 1. Send request to backend API
    // 2. Handle loading state
    // 3. Display results
    // 4. Handle errors

    // For demo purposes, we'll just log the search
    const searchData = {
      query: query,
      timestamp: new Date().toISOString(),
      filters: getActiveFilters(),
    }

    console.log("Search data:", searchData)
  }

  // Filter modal function
  function openFilterModal() {
    // Here you would typically create and show a filter modal
    console.log("Opening filter modal...")

    // Example filter options that could be implemented:
    const filterOptions = {
      location: "",
      priceRange: { min: 0, max: 1000000 },
      propertyType: "",
      bedrooms: 0,
      bathrooms: 0,
      amenities: [],
    }

    console.log("Available filters:", filterOptions)
  }

  // Sign in modal function
  function openSignInModal() {
    // Here you would typically create and show a sign in modal
    console.log("Opening sign in modal...")

    // Example sign in form that could be implemented:
    const signInForm = {
      email: "",
      password: "",
      rememberMe: false,
    }

    console.log("Sign in form structure:", signInForm)
  }

  // Get active filters function
  function getActiveFilters() {
    // This would return currently active filters
    return {
      location: "",
      priceRange: null,
      propertyType: null,
    }
  }

  // Form validation helper
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Utility function for debouncing search input
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Add debounced search input listener
  const debouncedSearch = debounce((value) => {
    if (value.length > 2) {
      console.log(`Auto-searching for: ${value}`)
      // Here you could implement auto-complete or live search
    }
  }, 300)

  searchInput.addEventListener("input", (e) => {
    debouncedSearch(e.target.value)
  })

  // Initialize page
  console.log("Tempat Huni website initialized")
})

// Global utility functions
window.TempatHuni = {
  search: (query) => {
    console.log(`Global search function called with: ${query}`)
  },

  showNotification: (message, type = "info") => {
    console.log(`Notification (${type}): ${message}`)
    // Here you could implement a toast notification system
  },

  formatPrice: (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price),
}
