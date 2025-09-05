// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typewriter = document.getElementById('typewriter');
const contactForm = document.getElementById('contact-form');

// Typewriter Effect
const typewriterText = [
    "Building intelligent systems with AI, Data, and Automation.",
    "Passionate about Machine Learning and Deep Learning.",
    "Creating impactful solutions through data science.",
    "Experienced in MLOps and GenAI technologies."
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterDelay = 100;

function typeWriterEffect() {
    const currentText = typewriterText[textIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typewriterDelay = 50;
    } else {
        typewriter.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typewriterDelay = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        typewriterDelay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterText.length;
        typewriterDelay = 500;
    }
    
    setTimeout(typeWriterEffect, typewriterDelay);
}

// Mobile Navigation Toggle
function toggleMobileNav() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// Close mobile nav when clicking on a link
function closeMobileNav() {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
}

// Smooth Scrolling for Navigation Links
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    closeMobileNav();
}

// Navbar Background on Scroll
function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

function handleScrollAnimation(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}

const scrollObserver = new IntersectionObserver(handleScrollAnimation, observerOptions);

// Initialize Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        scrollObserver.observe(el);
    });

    // Add staggered animation to skills
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add staggered animation to projects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Contact Form Handler
async function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Submit to Formspree
    try {
        showNotification('Sending message...', 'info');
        
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    const colors = {
        success: '#22c55e',
        error: '#ef4444',
        info: '#3b82f6'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Parallax effect for hero section
function handleParallax() {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage) {
        heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
}

// Skill cards hover effect enhancement
function enhanceSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Project cards click to expand
function enhanceProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on links
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            // Add a subtle animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Keyboard navigation
function handleKeyboardNavigation(e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileNav();
    }
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize all functionality
function init() {
    // Start typewriter effect
    if (typewriter) {
        typeWriterEffect();
    }
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Enhance interactive elements
    enhanceSkillCards();
    enhanceProjectCards();
    
    // Event listeners
    navToggle?.addEventListener('click', toggleMobileNav);
    navLinks.forEach(link => link.addEventListener('click', smoothScroll));
    contactForm?.addEventListener('submit', handleContactForm);
    
    // Scroll event listeners (throttled for performance)
    const throttledScrollHandler = throttle(() => {
        handleNavbarScroll();
        updateActiveNavLink();
        handleParallax();
    }, 16);
    
    window.addEventListener('scroll', throttledScrollHandler);
    window.addEventListener('keydown', handleKeyboardNavigation);
    
    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileNav();
        }
    });
    
    // Add loading animation completion
    document.body.classList.add('loaded');
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Add CSS for loading state
const loadingCSS = `
    .loaded .hero-content {
        animation: fadeInUp 1s ease-out;
    }
    
    .loaded .hero-image {
        animation: fadeInUp 1s ease-out 0.5s both;
    }
`;

// Inject loading CSS
const style = document.createElement('style');
style.textContent = loadingCSS;
document.head.appendChild(style);

// Export functions for potential testing or external use
window.portfolioUtils = {
    showNotification,
    closeMobileNav,
    typeWriterEffect
};
