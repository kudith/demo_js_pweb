/**
 * Portfolio Website JavaScript
 * 
 * This script handles all interactive functionality for the portfolio website including:
 * - Mobile menu toggle
 * - Theme switching with localStorage persistence
 * - Project filtering and display
 * - Typing animation effect
 * - Scroll-based navigation highlighting
 * - Form handling
 * 
 * @author John Doe
 * @version 1.0
 */

// ======================================================
// DOM ELEMENT SELECTIONS
// ======================================================
const mobileMenu = document.getElementById('mobile-menu');         // Hamburger menu button
const navMenu = document.querySelector('.nav-menu');               // Navigation menu container
const themeToggleBtn = document.getElementById('theme-toggle-btn'); // Dark/light mode toggle button
const filterBtns = document.querySelectorAll('.filter-btn');       // Project filter buttons
const projectsGrid = document.querySelector('.projects-grid');     // Container for project cards
const changingText = document.getElementById('changing-text');     // Element for typing animation
const navLinks = document.querySelectorAll('.nav-link');           // Navigation links

// ======================================================
// PROJECT DATA
// ======================================================
/**
 * Array of project objects containing all project information
 * Each project has:
 * - id: Unique identifier
 * - title: Project name
 * - description: Short project description
 * - image: Path to project image
 * - tags: Array of technologies used
 * - liveLink: URL to live demo
 * - codeLink: URL to source code
 * - category: Array of filter categories this project belongs to
 */
const projects = [
    {
        id: 1,
        title: 'E-commerce Website',
        description: 'A fully responsive e-commerce website with product filtering and cart functionality.',
        image: 'assets/project1.jpg',
        tags: ['HTML', 'CSS', 'JavaScript'],
        liveLink: '#',
        codeLink: '#',
        category: ['all', 'html', 'css', 'js']
    },
    {
        id: 2,
        title: 'Portfolio Template',
        description: 'A clean and modern portfolio template for creative professionals.',
        image: 'assets/project2.jpg',
        tags: ['HTML', 'CSS'],
        liveLink: '#',
        codeLink: '#',
        category: ['all', 'html', 'css']
    },
    {
        id: 3,
        title: 'Task Manager App',
        description: 'A JavaScript application to manage daily tasks with local storage.',
        image: 'assets/project3.jpg',
        tags: ['HTML', 'CSS', 'JavaScript'],
        liveLink: '#',
        codeLink: '#',
        category: ['all', 'html', 'css', 'js']
    },
    {
        id: 4,
        title: 'Landing Page',
        description: 'A modern landing page with smooth animations and responsive design.',
        image: 'assets/project4.jpg',
        tags: ['HTML', 'CSS'],
        liveLink: '#',
        codeLink: '#',
        category: ['all', 'html', 'css']
    },
    {
        id: 5,
        title: 'Weather Dashboard',
        description: 'A weather application that fetches and displays weather data from an API.',
        image: 'assets/project5.jpg',
        tags: ['HTML', 'CSS', 'JavaScript'],
        liveLink: '#',
        codeLink: '#',
        category: ['all', 'html', 'css', 'js']
    },
    {
        id: 6,
        title: 'Interactive Quiz',
        description: 'A dynamic quiz application with score tracking and timer functionality.',
        image: 'assets/project6.jpg',
        tags: ['HTML', 'CSS', 'JavaScript'],
        liveLink: '#',
        codeLink: '#',
        category: ['all', 'html', 'css', 'js']
    }
];

// ======================================================
// INITIALIZATION
// ======================================================
/**
 * Initialize the page when DOM content is fully loaded
 * Sets up theme, displays projects, starts animations, and adds event listeners
 */
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference in localStorage
    checkThemePreference();
    
    // Display all projects initially with 'all' filter
    displayProjects('all');
    
    // Start the typing effect animation in hero section
    startTypingEffect();
    
    // Set active nav link based on current scroll position
    setActiveNavLink();
    
    // Set up all event listeners for interactive elements
    setupEventListeners();
});

// ======================================================
// MOBILE MENU FUNCTIONALITY
// ======================================================
/**
 * Toggles the mobile menu open/closed state
 * Adds/removes active class to menu elements and prevents body scrolling
 */
function toggleMobileMenu() {
    // Toggle active class on hamburger icon
    mobileMenu.classList.toggle('active');
    
    // Toggle active class on navigation menu
    navMenu.classList.toggle('active');
    
    // Prevent background scrolling when menu is open
    document.body.classList.toggle('no-scroll');
}

// ======================================================
// THEME TOGGLE FUNCTIONALITY
// ======================================================
/**
 * Toggles between light and dark theme
 * Updates the body class and saves preference to localStorage
 */
function toggleTheme() {
    // Toggle dark-mode class on body element
    document.body.classList.toggle('dark-mode');
    
    // Save current theme preference to localStorage for persistence
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

/**
 * Checks localStorage for saved theme preference
 * Applies dark mode if user previously selected it
 */
function checkThemePreference() {
    // Get saved theme preference from localStorage
    const darkMode = localStorage.getItem('darkMode');
    
    // Apply dark mode if it was previously set to true
    if (darkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// ======================================================
// PROJECT FILTERING FUNCTIONALITY
// ======================================================
/**
 * Filters projects based on selected category
 * Updates active state of filter buttons and displays matching projects
 * 
 * @param {string} category - The category to filter by (all, html, css, js)
 */
function filterProjects(category) {
    // Update active state of filter buttons
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Display projects that match the selected category
    displayProjects(category);
}

/**
 * Displays projects that match the selected category
 * Creates and renders project cards with animations
 * 
 * @param {string} category - The category to filter by (all, html, css, js)
 */
function displayProjects(category) {
    // Clear existing projects from the grid
    projectsGrid.innerHTML = '';
    
    // Filter projects array based on selected category
    const filteredProjects = projects.filter(project => 
        project.category.includes(category)
    );
    
    // Create and append project cards for each matching project
    filteredProjects.forEach(project => {
        // Create project card container
        const projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        
        // Populate card with project details using template literal
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.liveLink}" class="project-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>
                    <a href="${project.codeLink}" class="project-link" target="_blank">
                        <i class="fas fa-code"></i> View Code
                    </a>
                </div>
            </div>
        `;
        
        // Add the card to the projects grid
        projectsGrid.appendChild(projectCard);
    });
    
    // Add staggered animation to project cards
    animateProjectCards();
}

/**
 * Animates project cards with a staggered fade-in effect
 * Each card animates with a slight delay after the previous one
 */
function animateProjectCards() {
    // Get all project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    // Apply staggered animation to each card
    projectCards.forEach((card, index) => {
        // Set initial state (invisible and shifted down)
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        // Animate card after a staggered delay based on index
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index); // Each card animates 100ms after the previous one
    });
}

// ======================================================
// TYPING EFFECT ANIMATION
// ======================================================
/**
 * Creates a typing effect animation for the hero section
 * Cycles through an array of words, typing and deleting each one
 */
function startTypingEffect() {
    // Words to cycle through in the typing animation
    const words = ['websites', 'applications', 'experiences', 'solutions'];
    let wordIndex = 0;      // Current word index
    let charIndex = 0;      // Current character index
    let isDeleting = false; // Whether we're deleting or typing
    let typingSpeed = 100;  // Base typing speed in milliseconds
    
    /**
     * Inner function that handles the typing animation
     * Recursively calls itself to create continuous animation
     */
    function type() {
        // Get the current word from the array
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Deleting characters (backspace effect)
            changingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing characters
            changingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal speed when typing
        }
        
        // If word is complete, start deleting after a pause
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause before deleting
        }
        
        // If word is deleted, move to next word
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Loop through words array
        }
        
        // Schedule the next update
        setTimeout(type, typingSpeed);
    }
    
    // Start the typing animation
    type();
}

// ======================================================
// SCROLL-BASED NAVIGATION HIGHLIGHTING
// ======================================================
/**
 * Updates active navigation link based on scroll position
 * Highlights the nav item corresponding to the current section in view
 */
function setActiveNavLink() {
    // Get all sections that should trigger nav highlighting
    const sections = document.querySelectorAll('section');
    
    // Listen for scroll events
    window.addEventListener('scroll', () => {
        let current = '';
        
        // Determine which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // If we've scrolled past 1/3 of the section, consider it active
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active class on navigation links
        navLinks.forEach(link => {
            // Remove active class from all links
            link.classList.remove('active');
            
            // Add active class to the link that matches current section
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ======================================================
// EVENT LISTENERS SETUP
// ======================================================
/**
 * Sets up all event listeners for interactive elements
 * Centralizes event binding for better organization
 */
function setupEventListeners() {
    // ---- Mobile Menu Toggle ----
    mobileMenu.addEventListener('click', toggleMobileMenu);
    
    // ---- Theme Toggle ----
    themeToggleBtn.addEventListener('click', toggleTheme);
    
    // ---- Project Filters ----
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterProjects(btn.dataset.filter);
        });
    });
    
    // ---- Nav Links ----
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close mobile menu when a link is clicked
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
    
    // ---- Contact Form Submission ----
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, just log it to the console
            console.log('Form submitted:', { name, email, subject, message });
            
            // Reset form fields
            contactForm.reset();
            
            // Show success message (you could add a proper notification system)
            alert('Message sent successfully!');
        });
    }
    
    // ---- Smooth Scrolling for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target element from the href attribute
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // Scroll to target if it exists
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ---- Navbar Scroll Effect ----
    const navbar = document.querySelector('.navbar');
    
    // Change navbar appearance on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Compact navbar when scrolled
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 20px var(--shadow-color)';
        } else {
            // Regular navbar at top of page
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = '0 2px 10px var(--shadow-color)';
        }
    });
}