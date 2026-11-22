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

const codeTabs = document.getElementById('code-tabs');
const codeTabButtons = document.querySelectorAll('.code-tab');

const closeCode = document.getElementById('close-code');
const copyCode = document.getElementById('copy-code');


// =========================
// DISPLAY SOURCE CODE
// =========================

function displayCode(codeId) {
    const codeSource = document.getElementById(codeId);

    if (!codeSource) return;

    codeContent.textContent = codeSource.textContent.trim();

    codeFileName.textContent = codeId === 'traffic-code'
        ? 'main.ino'
        : codeId === 'shelves-code'
            ? 'main.cpp'
            : codeId === 'soldier-code'
                ? 'soldier-node.ino'
                : codeId === 'relay-code'
                    ? 'relay-node.ino'
                    : codeId === 'command-code'
                        ? 'command-node.ino'
                        : 'source.ino';
}


// =========================
// PROJECT BUTTONS
// =========================

document.querySelectorAll('.btn btn-outline view-code-btn').forEach(button => {

    button.addEventListener('click', () => {

        const codeId = button.dataset.code;

        const projectName = button.closest('.project-card')
            .querySelector('h3').textContent;

        codeTitle.textContent = projectName + ' - Source Code';

        // Tactical Vanguard: Show node tabs
        if (codeId === 'tactical-code') {

            codeTabs.classList.add('active');

            // Default to Soldier Node
            setActiveTab('soldier-code');

        } else {

            // Other projects: Hide node tabs
            codeTabs.classList.remove('active');

            displayCode(codeId);
        }

        codeModal.classList.add('active');

        copyCode.textContent = 'Copy Code';

    });

});


// =========================
// TACTICAL VANGUARD TABS
// =========================

function setActiveTab(nodeId) {

    displayCode(nodeId);

    codeTabButtons.forEach(tab => {

        tab.classList.toggle(
            'active',
            tab.dataset.node === nodeId
        );

    });

}


codeTabButtons.forEach(tab => {

    tab.addEventListener('click', () => {

        setActiveTab(tab.dataset.node);

        copyCode.textContent = 'Copy Code';

    });

});


// =========================
// CLOSE MODAL
// =========================

closeCode.addEventListener('click', () => {
    codeModal.classList.remove('active');
});


// Close when clicking outside the modal
codeModal.addEventListener('click', event => {

    if (event.target === codeModal) {
        codeModal.classList.remove('active');
    }

});


// Close using Escape key
document.addEventListener('keydown', event => {

    if (event.key === 'Escape') {
        codeModal.classList.remove('active');
    }

});


// =========================
// COPY SOURCE CODE
// =========================

copyCode.addEventListener('click', async () => {

    try {

        await navigator.clipboard.writeText(
            codeContent.textContent
        );

        copyCode.textContent = 'Copied!';

        setTimeout(() => {
            copyCode.textContent = 'Copy Code';
        }, 2000);

    } catch (error) {

        copyCode.textContent = 'Copy Failed';

    }

});
