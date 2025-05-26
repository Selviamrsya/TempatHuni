// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
const categories = document.querySelectorAll('.homepage-catalogue-category');
const currentCategoryDisplay = document.getElementById('current-category');

categories.forEach(category => {
    category.addEventListener('click', function() {
        // Remove 'selected' class from all categories
        categories.forEach(cat => cat.classList.remove('selected'));
        
        // Add 'selected' class to clicked category
        this.classList.add('selected');
        
        // Update the display text (optional)
        const categoryName = this.textContent;
        currentCategoryDisplay.textContent = categoryName;
    });
});
});



document.addEventListener('DOMContentLoaded', function() {
// Modal elements
const filterBtn = document.getElementById('filterBtn');
const modalOverlay = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('closeBtn');
const resetBtn = document.getElementById('resetBtn');
const searchBtn = document.getElementById('searchBtn');

// Toggle buttons
const toggleBtns = document.querySelectorAll('.toggle-btn');
const propertyTypeBtns = document.querySelectorAll('.property-type-btn');

// Open modal
filterBtn.addEventListener('click', function() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close modal
function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = 'auto';

  document.querySelectorAll('.counter-dropdown-menu').forEach(menu => {
      menu.classList.remove('active');
  });
}

closeBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

// Escape key to close modal
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
    }
});

// Buy/Rent toggle
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        toggleBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Show/hide shared facility section based on selection
        const sharedFacilitySection = document.getElementById('sharedFacilitySection');
        if (this.dataset.type === 'rent') {
            sharedFacilitySection.style.display = 'block';
        } else {
            sharedFacilitySection.style.display = 'none';
            // Reset shared facility checkboxes when hiding
            document.querySelectorAll('#sharedFacilitySection input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
            });
        }
    });
});

// Property type selection
document.getElementById('propertyType').value = 'house';

// Counter functionality
const counterBtns = document.querySelectorAll('.counter-btn');

counterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const target = this.dataset.target;
        const display = document.getElementById(target);
        let currentValue = parseInt(display.value) || 0;
        
        if (this.textContent === '+') {
            // Increment (max 10 for reasonable limit)
            if (currentValue < 10) {
                currentValue++;
            }
        } else if (this.textContent === '−') {
            // Decrement (min 0)
            if (currentValue > 0) {
                currentValue--;
            }
        }
        
        display.value = currentValue;
        
        // Update button states
        updateCounterButtons(target, currentValue);
    });
});

// Function to update counter button states
function updateCounterButtons(target, value) {
    const minusBtn = document.getElementById(target + 'Minus');
    const plusBtn = document.getElementById(target + 'Plus');
    
    // Disable minus button if value is 0
    minusBtn.disabled = value <= 0;
    
    // Disable plus button if value is at max (10)
    plusBtn.disabled = value >= 10;
}

// Initialize counter button states
updateCounterButtons('bedroom', 0);
updateCounterButtons('bathroom', 0);


// Reset all filters
resetBtn.addEventListener('click', function() {
    // Reset toggles
    toggleBtns.forEach(btn => btn.classList.remove('active'));
    toggleBtns[0].classList.add('active');

    // Reset property types
    document.getElementById('propertyType').value = 'house';

    // Reset radio buttons
    document.getElementById('popular').checked = true;

    // Reset inputs
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('minSqft').value = '';
    document.getElementById('maxSqft').value = '';

    // Reset counters
    document.getElementById('bedroom').value = '0';
    document.getElementById('bathroom').value = '0';
    updateCounterButtons('bedroom', 0);
    updateCounterButtons('bathroom', 0);

    // Reset checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });

    console.log('All filters reset');
});

// Search with filters
searchBtn.addEventListener('click', function() {
    const filters = {
        type: document.querySelector('.toggle-btn.active').dataset.type,
        propertyType: document.getElementById('propertyType').value,
        sortBy: document.querySelector('input[name="filter"]:checked').value,
        priceRange: {
            min: document.getElementById('minPrice').value,
            max: document.getElementById('maxPrice').value
        },
        squareFeet: {
            min: document.getElementById('minSqft').value,
            max: document.getElementById('maxSqft').value
        },
        bedroom: parseInt(document.getElementById('bedroomDisplay').dataset.value) || 0,
        bathroom: parseInt(document.getElementById('bathroomDisplay').dataset.value) || 0,
        facilities: Array.from(document.querySelectorAll('#sharedFacilitySection input[type="checkbox"]:checked, .checkbox-group:not(.shared-facility-grid) input[type="checkbox"]:checked'))
            .map(cb => cb.value),
        sharedFacilities: Array.from(document.querySelectorAll('#sharedFacilitySection input[type="checkbox"]:checked'))
            .map(cb => cb.value)
    };

    console.log('Search filters:', filters);
    console.log('About to close modal');
    
    // Close modal after search
    closeModal();
    console.log('Modal close function called');
});

// Price formatting for Indonesian Rupiah
const priceInputs = ['minPrice', 'maxPrice'];
priceInputs.forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener('input', function() {
        let value = this.value.replace(/[^\d]/g, '');
        if (value) {
            this.value = 'Rp. ' + new Intl.NumberFormat('id-ID').format(value);
        }
    });
});
});


class PropertyCarousel {
constructor() {
  this.currentIndex = 0;
  this.cards = document.querySelectorAll('.homepage-carousel-card');
  this.totalCards = this.cards.length;
  this.carouselContent = document.getElementById('carouselContent');
  this.leftBtn = document.getElementById('carouselLeftBtn');
  this.rightBtn = document.getElementById('carouselRightBtn');
  
  // Fixed values based on your CSS
  this.cardsPerView = 4; // Show 4 cards at a time
  this.slideBy = 2; // Move by 2 cards each time
  
  this.init();
}

init() {
  this.updateCarousel();
  this.attachEventListeners();
  this.handleResize();
  this.updateButtonVisibility();
}

moveCarousel(direction) {
  // Calculate how many slides are possible
  const maxSlides = Math.ceil((this.totalCards - this.cardsPerView) / this.slideBy);
  
  if (direction === 1) {
      // Moving right
      this.currentIndex = (this.currentIndex + 1) % (maxSlides + 1);
  } else {
      // Moving left
      this.currentIndex = this.currentIndex === 0 ? maxSlides : this.currentIndex - 1;
  }
  
  this.updateCarousel();
  this.updateButtonVisibility();
}

updateCarousel() {
  // Move by percentage based on cards per view and current index
  const movePercentage = (this.currentIndex * this.slideBy * 100) / this.totalCards;
  this.carouselContent.style.transform = `translateX(-${movePercentage}%)`;
}

updateButtonVisibility() {
  const maxSlides = Math.ceil((this.totalCards - this.cardsPerView) / this.slideBy);
  
  if (this.totalCards <= this.cardsPerView) {
      // Hide buttons if all cards fit in view
      this.leftBtn.style.display = 'none';
      this.rightBtn.style.display = 'none';
  } else {
      // Show buttons
      this.leftBtn.style.display = 'flex';
      this.rightBtn.style.display = 'flex';
      
      // Adjust opacity based on position
      this.leftBtn.style.opacity = this.currentIndex === 0 ? '0.3' : '0.5';
      this.rightBtn.style.opacity = this.currentIndex === maxSlides ? '0.3' : '0.5';
  }
}

attachEventListeners() {
  this.leftBtn.addEventListener('click', () => this.moveCarousel(-1));
  this.rightBtn.addEventListener('click', () => this.moveCarousel(1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.moveCarousel(-1);
      if (e.key === 'ArrowRight') this.moveCarousel(1);
  });

  // Touch/swipe support
  let startX = 0;
  let endX = 0;

  this.carouselContent.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
  });

  this.carouselContent.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
          if (diff > 0) {
              this.moveCarousel(1);
          } else {
              this.moveCarousel(-1);
          }
      }
  });
}

handleResize() {
  window.addEventListener('resize', () => {
      // Recalculate on resize if needed
      this.updateCarousel();
      this.updateButtonVisibility();
  });
}
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
new PropertyCarousel();
});
