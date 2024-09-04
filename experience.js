document.addEventListener('DOMContentLoaded', function() {
    console.log("Experience page loaded successfully!");

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


