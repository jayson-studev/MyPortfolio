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

// =========================
// PROJECT CODE VIEWER
// =========================

const codeModal = document.getElementById('code-modal');
const codeContent = document.getElementById('code-content');
const codeTitle = document.getElementById('code-title');
const codeFileName = document.getElementById('code-file-name');

const closeCode = document.getElementById('close-code');
const copyCode = document.getElementById('copy-code');

// Project code viewer buttons
document.querySelectorAll('.view-code-btn').forEach(button => {
    button.addEventListener('click', () => {

        const codeId = button.dataset.code;
        const codeSource = document.getElementById(codeId);

        if (!codeSource) return;

        const projectName = button.closest('.project-card')
            .querySelector('h3').textContent;

        codeTitle.textContent = projectName + ' - Source Code';

        codeFileName.textContent =
            codeId === 'traffic-code' ? 'main.ino' : 'main.cpp';

        codeContent.textContent = codeSource.textContent.trim();

        codeModal.classList.add('active');
    });
});

// Close modal
closeCode.addEventListener('click', () => {
    codeModal.classList.remove('active');
});

// Close when clicking outside the modal
codeModal.addEventListener('click', event => {
    if (event.target === codeModal) {
        codeModal.classList.remove('active');
    }
});

// Close with Escape key
document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        codeModal.classList.remove('active');
    }
});

// Copy source code
copyCode.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(codeContent.textContent);

        copyCode.textContent = 'Copied!';

        setTimeout(() => {
            copyCode.textContent = 'Copy Code';
        }, 2000);

    } catch (error) {
        copyCode.textContent = 'Copy Failed';
    }
});
