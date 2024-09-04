
document.addEventListener('DOMContentLoaded', function() {
    console.log("Portfolio page loaded successfully!");

    // Load the navbar and footer dynamically
    loadNavbar();
    loadFooter();

    // Smooth scroll for internal links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Load Navbar
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar-container').innerHTML = html;
            initializeThemeToggle();
            initializeTheme();  // Initialize theme after navbar is loaded
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
}

// Load Footer
function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer-container').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}

// Initialize Theme
function initializeTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleThemeIcons('dark');
    } else {
        document.body.classList.remove('dark-mode');
        toggleThemeIcons('light');
    }
}

// Toggle Theme
function toggleTheme() {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        toggleThemeIcons('light');
    } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        toggleThemeIcons('dark');
    }
}

// Toggle Theme Icons
function toggleThemeIcons(theme) {
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    if (sunIcon && moonIcon) {
        if (theme === 'dark') {
            sunIcon.classList.add('d-none');
            moonIcon.classList.remove('d-none');
        } else {
            sunIcon.classList.remove('d-none');
            moonIcon.classList.add('d-none');
        }
    }
}

// Initialize Theme Toggle Button
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
        });
    }
}


document.querySelectorAll('.work-block').forEach(block => {
    // Define images for each block
   // Define images for each block
   const imagesMap = {
    'Q&A Website': ['1.PNG', '2.PNG', '3.PNG', '5.jpg', '6.jpg'],
    'Younes-Education-WebSite': ['y1.png', 'y2.png', 'y3.png', 'y4.jpg', 'y5.jpg'],
    'Users Manager Systeme': ['s1.png', 's2.png', 's3.png', 's4.jpg', 's5.jpg', 's6.jpg'],
    'Java Web Service MS': ['j1.png', 'j2.png', 'j3.png', 'j4.png', 'j5.png', 'j6.png'],
    'old portfolio': ['d1.png', 'd2.PNG', 'd3.PNG']
};

    
    // Get the title of the current block
    const title = block.querySelector('h3').innerText;
    const images = imagesMap[title];
    let currentImageIndex = 0;

    // Function to update image source
    function updateImage() {
        block.querySelector('.work-image').src = images[currentImageIndex];
    }

    // Arrow buttons for desktop
    block.querySelector('.fa-arrow-right').addEventListener('click', (event) => {
        event.preventDefault();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
    });

    block.querySelector('.fa-arrow-left').addEventListener('click', (event) => {
        event.preventDefault();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImage();
    });

    // Swipe gestures for mobile
    const mc = new Hammer(block);

    mc.on('swipeleft', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateImage();
    });

    mc.on('swiperight', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateImage();
    });
});
