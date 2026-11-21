// Select the menu toggle button and navigation links
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

// Toggle the mobile navigation menu
menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');

    menuToggle.setAttribute('aria-expanded', String(open));
});

// Close the navigation menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Update the footer with the current year
document.getElementById('year').textContent = new Date().getFullYear();