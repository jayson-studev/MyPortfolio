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
// FILE NAME MAPPING
// =========================

const codeFileNames = {
    'soldier-code': 'soldier-node.ino',
    'relay-code': 'relay-node.ino',
    'command-code': 'command-node.ino',
    'traffic-code': 'traffic-light.ino',
    'shelves-code': 'smart-shelves.ino'
};


// =========================
// DISPLAY CODE
// =========================

function displayCode(codeId) {

    const codeSource = document.getElementById(codeId);

    if (!codeSource) {
        console.error(`Source code container not found: ${codeId}`);
        return;
    }

    codeContent.textContent = codeSource.textContent.trim();

    codeFileName.textContent = codeFileNames[codeId] || 'source.ino';

}


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

    copyCode.textContent = 'Copy Code';

}


// =========================
// PROJECT BUTTON EVENTS
// =========================

document.querySelectorAll('.view-code-btn').forEach(button => {

    button.addEventListener('click', () => {

        const codeId = button.dataset.code;

        const projectCard = button.closest('.project-card');

        const projectHeading = projectCard
            ? projectCard.querySelector('h3')
            : null;

        const projectName = projectHeading
            ? projectHeading.textContent.trim()
            : 'Project';

        codeTitle.textContent = `${projectName} - Source Code`;

        // Tactical Vanguard
        if (codeId === 'tactical-code') {

            codeTabs.classList.add('active');

            setActiveTab('soldier-code');

        }

        // Other projects
        else {

            codeTabs.classList.remove('active');

            displayCode(codeId);

        }

        codeModal.classList.add('active');

        copyCode.textContent = 'Copy Code';

    });

});


// =========================
// TAB BUTTON EVENTS
// =========================

codeTabButtons.forEach(tab => {

    tab.addEventListener('click', () => {

        setActiveTab(tab.dataset.node);

    });

});


// =========================
// CLOSE MODAL
// =========================

closeCode.addEventListener('click', () => {

    codeModal.classList.remove('active');

});


// Close when clicking outside
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

        console.error('Unable to copy code:', error);

        copyCode.textContent = 'Copy Failed';

    }

});
