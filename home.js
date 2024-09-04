document.addEventListener('DOMContentLoaded', function() {
    console.log("Page loaded successfully!");

    // Load the navbar and footer dynamically
    loadNavbar();
    loadFooter();

    // Initialize theme
    initializeTheme();

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

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    if (themeToggle && sunIcon && moonIcon) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
        });
    } else {
        console.error('Theme toggle elements not found.');
    }
});

// Load Navbar
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar-container').innerHTML = html;
            // Ensure theme toggle button is initialized correctly
            initializeThemeToggle();
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

// Load Content into the main section
function loadContent(url) {
    if (!url) return;

    const mainElement = document.querySelector('main');
    mainElement.innerHTML = '';

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            mainElement.innerHTML = xhr.responseText;
            console.log('Content loaded successfully from', url);
        } else {
            console.error('Error loading content:', xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error('Request failed');
    };
    xhr.send();
}

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

function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
        });
    }
}
