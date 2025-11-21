
const hamburgerButton = document.getElementById('hamburger');
const navigationMenu = document.getElementById('navLinks');
const closeSidebarButton = document.getElementById('closeSidebar');
const dropdowns = document.querySelectorAll('.dropdown');

// Toggle sidebar
hamburgerButton.addEventListener('click', () => {
  navigationMenu.classList.toggle('show');
  closeSidebarButton.style.display = navigationMenu.classList.contains('show') ? 'block' : 'none';
});

closeSidebarButton.addEventListener('click', () => {
  navigationMenu.classList.remove('show');
  closeSidebarButton.style.display = 'none';
});

// Toggle dropdowns on mobile
dropdowns.forEach(dropdown => {
  const btn = dropdown.querySelector('.drop-btn');

  btn.addEventListener('click', (event) => {
    if (window.innerWidth <= 768) {
      event.preventDefault();
      dropdowns.forEach(d => { if (d !== dropdown) d.classList.remove('open'); });
      dropdown.classList.toggle('open');
    }
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown') && !e.target.closest('#navLinks') && !e.target.closest('#hamburger')) {
    dropdowns.forEach(d => d.classList.remove('open'));
  }
});

// Hide sidebar on resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    navigationMenu.classList.remove('show');
    closeSidebarButton.style.display = 'none';
    dropdowns.forEach(d => d.classList.remove('open'));
  }
});

// setInterval(autoSlide, 6000); // 6 seconds
const sections = document.querySelectorAll('.slide-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.3 });

sections.forEach(sec => observer.observe(sec));



let newsIndex = 0;
const newsContainer = document.querySelector(".news-container");
const cards = document.querySelectorAll(".news-card");

function getCardsPerView() {
    return window.innerWidth <= 768 ? 1 : 3;
}

function slideNewsRight() {
    let maxIndex = cards.length - getCardsPerView();
    if (newsIndex < maxIndex) {
        newsIndex++;
    }
    updateSlider();
}

function slideNewsLeft() {
    if (newsIndex > 0) {
        newsIndex--;
    }
    updateSlider();
}

function updateSlider() {
    const cardWidth = cards[0].offsetWidth + 20; 
    newsContainer.style.transform = `translateX(-${newsIndex * cardWidth}px)`;
}

window.addEventListener("resize", () => {
    updateSlider();
});

