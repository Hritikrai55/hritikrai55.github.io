// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get app container
    const appContainer = document.getElementById('app');
    
    // Load portfolio data from JSON file and build the website
    loadPortfolioData();
    
    // Check for saved theme in localStorage
    if (localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    // Load data from JSON and update the portfolio
    async function loadPortfolioData() {
        try {
            const response = await fetch('js/data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            buildWebsite(data);
        } catch (error) {
            console.error('Error loading portfolio data:', error);
            appContainer.innerHTML = `<div class="container mx-auto p-8 text-center"><h1 class="text-xl">Error loading portfolio data. Please try again later.</h1></div>`;
        }
    }
    
    // Build the entire website structure from JSON data
    function buildWebsite(data) {
        // Build HTML structure
        appContainer.innerHTML = `
            ${buildNavigation(data)}
            ${buildHomeSection(data.basics)}
            ${buildAboutSection(data.about, data.education, data.experience, data.interests)}
            ${buildSkillsSection(data.skills)}
            ${buildProjectsSection(data.projects)}
            ${buildFooter(data.basics, data.navigation)}
        `;
        
        // Initialize interactions after DOM is updated
        initializeInteractions();
    }
    
    // Function to build navigation from JSON data
    function buildNavigation(data) {
        const { navigation, basics } = data;
        const socialLinks = basics.profiles.map(profile => 
            `<a href="${profile.url}" target="_blank" aria-label="${profile.network}" class="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors duration-300">
                <i class="fab fa-${profile.network.toLowerCase()}"></i>
            </a>`
        ).join('');
        
        return `
        <header class="bg-white dark:bg-gray-900 shadow-sm fixed w-full top-0 z-50 transition-colors duration-300">
            <div class="container mx-auto px-4 py-4">
                <nav class="flex justify-between items-center">
                    <a href="#home" class="text-2xl font-bold text-primary">${basics.name.split(' ')[0]}</a>
                    
                    <!-- Desktop Navigation -->
                    <div class="hidden md:flex items-center space-x-6">
                        <ul class="flex space-x-2" id="desktop-nav">
                            ${navigation.map(item => 
                                `<li><a href="#${item.id}" class="px-3 py-2 hover:text-primary transition-colors duration-300">${item.text}</a></li>`
                            ).join('')}
                        </ul>
                        
                        <div class="flex items-center space-x-4">
                            ${socialLinks}
                            <button id="theme-toggle" class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300" aria-label="Toggle Theme">
                                <i class="fas fa-moon dark:hidden"></i>
                                <i class="fas fa-sun hidden dark:block"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Mobile Menu Button -->
                    <div class="flex items-center space-x-3 md:hidden">
                        <button id="theme-toggle-mobile" class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300" aria-label="Toggle Theme">
                            <i class="fas fa-moon dark:hidden"></i>
                            <i class="fas fa-sun hidden dark:block"></i>
                        </button>
                        <button id="mobile-menu-button" class="text-gray-600 dark:text-gray-300 focus:outline-none" aria-label="Open Menu">
                            <i class="fas fa-bars text-xl"></i>
                        </button>
                    </div>
                    
                    <!-- Mobile Menu -->
                    <div id="mobile-menu" class="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 hidden transition-all duration-300">
                        <div class="flex justify-end p-4">
                            <button id="close-mobile-menu" class="text-white text-2xl" aria-label="Close Menu">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <ul class="flex flex-col items-center justify-center h-full space-y-8" id="mobile-nav">
                            ${navigation.map(item => 
                                `<li><a href="#${item.id}" class="text-white text-2xl hover:text-primary transition-colors duration-300">${item.text}</a></li>`
                            ).join('')}
                            <li class="flex space-x-6 mt-8">
                                ${socialLinks}
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
        `;
    }
    
    // Function to build hero/home section from JSON data
    function buildHomeSection(basics) {
        return `
        <section id="home" class="pt-24 pb-16 md:pt-32 md:pb-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div class="container mx-auto px-4">
                <div class="flex flex-col md:flex-row items-center justify-between gap-10">
                    <div class="w-full md:w-1/2 space-y-6">
                        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white animate-on-scroll">
                            ${basics.name}
                        </h1>
                        <p class="text-2xl md:text-3xl text-primary font-medium animate-on-scroll animation-delay-200">
                            ${basics.label}
                        </p>
                        <p class="text-lg text-gray-600 dark:text-gray-300 animate-on-scroll animation-delay-400">
                            ${basics.summary}
                        </p>
                        <div class="flex flex-wrap gap-4 animate-on-scroll animation-delay-600">
                            <a href="${basics.resume}" class="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-md transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                                <i class="fas fa-download mr-2"></i> Download CV
                            </a>
                            <a href="#contact" class="border border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-md transition-colors duration-300">
                                <i class="fas fa-paper-plane mr-2"></i> Contact Me
                            </a>
                        </div>
                    </div>
                    <div class="w-full md:w-2/5 flex justify-center md:justify-end animate-on-scroll animation-delay-800">
                        ${basics.image ? `
                            <div class="relative">
                                <div class="absolute inset-0 bg-primary rounded-full blur-xl opacity-20 -z-10 transform scale-110"></div>
                                <img src="${basics.image}" alt="${basics.name}" class="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-white dark:border-gray-800 shadow-xl">
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </section>
        `;
    }
    
    // Function to build about section from JSON data
    function buildAboutSection(about, education, experience, interests) {
        // Build education HTML
        const educationHTML = education.items.map(item => `
            <div class="mb-6 last:mb-0">
                <div class="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h4 class="text-lg font-bold">${item.institution}</h4>
                    <span class="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">${item.startDate} - ${item.endDate || 'Present'}</span>
                </div>
                <p class="text-primary font-medium">${item.area}, ${item.studyType}</p>
                <p class="text-gray-600 dark:text-gray-300 mt-2">${item.description || ''}</p>
            </div>
        `).join('');
        
        // Build experience HTML
        const experienceHTML = experience.items.map(item => `
            <div class="mb-6 last:mb-0">
                <div class="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h4 class="text-lg font-bold">${item.position}</h4>
                    <span class="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">${item.startDate} - ${item.endDate || 'Present'}</span>
                </div>
                <p class="text-primary font-medium">${item.company}, ${item.location}</p>
                <ul class="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2 space-y-1">
                    ${item.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
            </div>
        `).join('');
        
        // Build interests HTML
        const interestsHTML = interests.items.map(item => `
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center">
                <div class="bg-gray-100 dark:bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i class="${item.icon} text-primary text-xl"></i>
                </div>
                <h4 class="font-medium">${item.name}</h4>
            </div>
        `).join('');
        
        return `
        <section id="about" class="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">${about.title}</h2>
                
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div class="lg:col-span-2">
                        <div class="prose lg:prose-lg dark:prose-dark max-w-none mb-12">
                            ${about.content.map(paragraph => `<p>${paragraph}</p>`).join('')}
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <!-- Experience Section -->
                            <div>
                                <h3 class="text-2xl font-bold mb-6 flex items-center">
                                    <i class="fas fa-briefcase mr-3 text-primary"></i> ${experience.title}
                                </h3>
                                ${experienceHTML}
                            </div>
                            
                            <!-- Education Section -->
                            <div>
                                <h3 class="text-2xl font-bold mb-6 flex items-center">
                                    <i class="fas fa-graduation-cap mr-3 text-primary"></i> ${education.title}
                                </h3>
                                ${educationHTML}
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h3 class="text-2xl font-bold mb-6 flex items-center">
                            <i class="fas fa-heart mr-3 text-primary"></i> ${interests.title}
                        </h3>
                        <div class="grid grid-cols-2 gap-4">
                            ${interestsHTML}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
    }
    
    // Function to build skills section from JSON data
    function buildSkillsSection(skills) {
        // Build categories HTML
        const categoriesHTML = skills.categories.map((category, index) => {
            const animationDelay = index * 100; // Staggered animation
            
            return `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-on-scroll" style="animation-delay: ${animationDelay}ms">
                <h3 class="text-xl font-bold mb-6 flex items-center">
                    <i class="${category.icon} text-primary mr-3"></i> ${category.name}
                </h3>
                <div class="space-y-5">
                    ${category.skills.map(skill => `
                        <div>
                            <div class="flex justify-between mb-1">
                                <span class="font-medium">${skill.name}</span>
                                ${skill.level ? `<span class="text-sm text-gray-500 dark:text-gray-400">${skill.level}%</span>` : ''}
                            </div>
                            ${skill.level ? `
                                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div class="bg-primary h-2 rounded-full transition-all duration-1000" style="width: 0%" data-width="${skill.level}%"></div>
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
            `;
        }).join('');
        
        return `
        <section id="skills" class="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">${skills.title}</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${categoriesHTML}
                </div>
            </div>
        </section>
        `;
    }
    
    // Function to build projects section from JSON data
    function buildProjectsSection(projects) {
        // Build project cards HTML
        const projectsHTML = projects.items.map((project, index) => {
            const animationDelay = index * 100; // Staggered animation
            
            return `
            <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2 animate-on-scroll" style="animation-delay: ${animationDelay}ms">
                ${project.image ? `
                    <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover object-center">
                ` : ''}
                <div class="p-6">
                    <h3 class="text-xl font-bold mb-2">${project.title}</h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-4">${project.description}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${project.technologies.map(tech => `
                            <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">${tech}</span>
                        `).join('')}
                    </div>
                    <div class="flex space-x-4">
                        ${project.github ? `
                            <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300">
                                <i class="fab fa-github text-xl"></i>
                            </a>
                        ` : ''}
                        ${project.demo ? `
                            <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300">
                                <i class="fas fa-external-link-alt text-xl"></i>
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
            `;
        }).join('');
        
        return `
        <section id="projects" class="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl md:text-4xl font-bold text-center mb-6">${projects.title}</h2>
                <p class="text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-16">${projects.description}</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${projectsHTML}
                </div>
            </div>
        </section>
        `;
    }
    
    // Function to build footer section from JSON data
    function buildFooter(basics, navigation) {
        const currentYear = new Date().getFullYear();
        const socialLinks = basics.profiles.map(profile => 
            `<a href="${profile.url}" target="_blank" aria-label="${profile.network}" class="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors duration-300 text-xl">
                <i class="fab fa-${profile.network.toLowerCase()}"></i>
            </a>`
        ).join('');
        
        const navLinks = navigation.map(item => 
            `<a href="#${item.id}" class="hover:text-primary transition-colors duration-300">${item.text}</a>`
        ).join('');
        
        return `
        <footer id="contact" class="bg-gray-100 dark:bg-gray-900 transition-colors duration-300 pt-16 pb-8">
            <div class="container mx-auto px-4">
                <div class="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div class="mb-6 md:mb-0">
                        <h2 class="text-3xl font-bold text-primary mb-4">${basics.name}</h2>
                        <p class="text-gray-600 dark:text-gray-300 max-w-md">${basics.summary}</p>
                    </div>
                    
                    <div class="space-y-6">
                        <div class="flex justify-center md:justify-end space-x-4">
                            ${socialLinks}
                        </div>
                        
                        <div>
                            <h3 class="font-bold text-lg mb-3">Contact</h3>
                            <p class="text-gray-600 dark:text-gray-300 mb-1">
                                <i class="fas fa-envelope mr-2 text-primary"></i> ${basics.email}
                            </p>
                            <p class="text-gray-600 dark:text-gray-300">
                                <i class="fas fa-map-marker-alt mr-2 text-primary"></i> ${basics.location.city}, ${basics.location.region}, ${basics.location.country}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="border-t border-gray-200 dark:border-gray-700 pt-8">
                    <div class="flex flex-col md:flex-row justify-between items-center">
                        <p class="text-gray-500 dark:text-gray-400 text-sm">&copy; ${currentYear} ${basics.name}. All rights reserved.</p>
                        <div class="flex space-x-4 mt-4 md:mt-0">
                            ${navLinks}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        `;
    }
    
    // Function to initialize all interactions after DOM is built
    function initializeInteractions() {
        // Elements
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const closeMobileMenuButton = document.getElementById('close-mobile-menu');
        const mobileMenu = document.getElementById('mobile-menu');
        const themeToggle = document.getElementById('theme-toggle');
        const themeToggleMobile = document.getElementById('theme-toggle-mobile');
        const skillBars = document.querySelectorAll('.bg-primary.h-2');
        
        // Mobile menu toggle
        if (mobileMenuButton && mobileMenu && closeMobileMenuButton) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
            
            closeMobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = ''; // Enable scrolling
            });
            
            // Close mobile menu when clicking a link
            document.querySelectorAll('#mobile-nav a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    document.body.style.overflow = '';
                });
            });
        }
        
        // Theme toggle functionality
        const toggleTheme = () => {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        };
        
        if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
        if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Scroll animation for sections
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.animate-on-scroll');
            const triggerBottom = window.innerHeight * 0.8;
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                if (elementTop < triggerBottom) {
                    element.classList.add('fadeIn');
                    
                    // Animate skill bars if they're in this element
                    const skillBars = element.querySelectorAll('.bg-primary.h-2');
                    skillBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 300);
                    });
                }
            });
        };
        
        // Add scroll event listener
        window.addEventListener('scroll', animateOnScroll);
        
        // Initial check on page load
        animateOnScroll();
    }
});

// Add CSS for animations
document.head.insertAdjacentHTML('beforeend', `
<style>
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .animate-on-scroll.fadeIn {
        opacity: 1;
        transform: translateY(0);
    }
    
    .animation-delay-200 {
        transition-delay: 200ms;
    }
    
    .animation-delay-400 {
        transition-delay: 400ms;
    }
    
    .animation-delay-600 {
        transition-delay: 600ms;
    }
    
    .animation-delay-800 {
        transition-delay: 800ms;
    }
</style>
`);
    
    // Update basic information (name, title, etc.)
    function updateBasicInfo(basics) {
        // Update page title
        document.title = `${basics.name} | ${basics.title}`;
        
        // Update navigation brand
        document.querySelector('nav a.text-xl').textContent = basics.name;
        
        // Update hero section
        document.querySelector('#home h1 span').textContent = basics.name;
        document.querySelector('#home h2').textContent = basics.title;
        document.querySelector('#home p').textContent = basics.description;
        
        // Update profile image if it exists
        const profileImg = document.querySelector('#home img');
        if (profileImg) profileImg.src = basics.image;
        
        // Update resume link
        const resumeLink = document.querySelector('a[download]');
        if (resumeLink) resumeLink.href = basics.resumeFile;
        
        // Update footer copyright
        document.querySelector('footer p').textContent = `© ${basics.copyrightYear} ${basics.name}. All rights reserved.`;
    }
    
    // Update about section
    function updateAboutSection(about, education, experience, interests) {
        // Get basics info from global data context
        const basics = document.querySelector('#home h1 span').textContent;
        const email = document.querySelector('head title').textContent.split('|')[0].trim();
        
        // Update about summary
        const aboutContainer = document.querySelector('#about .prose');
        aboutContainer.innerHTML = '';
        
        about.summary.forEach(paragraph => {
            const p = document.createElement('p');
            p.classList.add('mb-4');
            p.textContent = paragraph;
            aboutContainer.appendChild(p);
        });
        
        // Add contact info - retrieves email and phone directly from their elements in the DOM
        // This avoids the issue of not having direct access to the data object
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('mt-4');
        
        // We'll just use the values directly from the JSON file since we know them
        contactDiv.innerHTML = `
            <div class="flex items-center mb-2">
                <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>hritikrai55@gmail.com</span>
            </div>
            <div class="flex items-center">
                <svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span>9018285142</span>
            </div>
        `;
        aboutContainer.appendChild(contactDiv);
        
        // Update education
        const educationContainer = document.querySelector('#about .grid > div:nth-child(1) > div');
        educationContainer.innerHTML = '<h3 class="text-xl font-semibold mb-4">Education</h3>';
        
        education.forEach((edu, index) => {
            const isLast = index === education.length - 1;
            const eduDiv = document.createElement('div');
            eduDiv.classList.add(isLast ? '' : 'mb-4');
            eduDiv.innerHTML = `
                <h4 class="font-medium">${edu.institution}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">${edu.degree}, ${edu.dates}${edu.gpa ? ` <br>${edu.gpa}` : ''}</p>
            `;
            educationContainer.appendChild(eduDiv);
        });
        
        // Update experience
        const experienceContainer = document.querySelector('#about .grid > div:nth-child(2) > div');
        experienceContainer.innerHTML = '<h3 class="text-xl font-semibold mb-4">Experience</h3>';
        
        experience.forEach((exp, index) => {
            const expDiv = document.createElement('div');
            expDiv.classList.add(index === experience.length - 1 ? '' : 'mb-4');
            
            let expHTML = `
                <h4 class="font-medium">${exp.company}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">${exp.position}, ${exp.dates}</p>
            `;
            
            if (exp.highlights && exp.highlights.length > 0) {
                expHTML += '<ul class="list-disc list-inside text-xs text-gray-600 dark:text-gray-400 mt-2 pl-2">';
                exp.highlights.forEach(highlight => {
                    expHTML += `<li>${highlight}</li>`;
                });
                expHTML += '</ul>';
            }
            
            expDiv.innerHTML = expHTML;
            experienceContainer.appendChild(expDiv);
        });
        
        // Update interests
        const interestsContainer = document.querySelector('#about .grid > div:nth-child(3) ul');
        interestsContainer.innerHTML = '';
        
        interests.forEach(interest => {
            const li = document.createElement('li');
            li.textContent = interest;
            interestsContainer.appendChild(li);
        });
    }
    
    // Update skills section
    function updateSkillsSection(skills) {
        const skillsContainer = document.querySelector('#skills .grid');
        skillsContainer.innerHTML = '';
        
        skills.forEach(skill => {
            const skillDiv = document.createElement('div');
            skillDiv.classList.add('skill-card');
            skillDiv.innerHTML = `
                <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 transition transform hover:scale-105 text-center">
                    <div class="text-4xl mb-4">
                        <i class="${skill.icon} ${skill.color}"></i>
                    </div>
                    <h3 class="font-semibold">${skill.name}</h3>
                    <p class="text-sm mt-2">${skill.rating}</p>
                </div>
            `;
            skillsContainer.appendChild(skillDiv);
        });
    }
    
    // Update projects section
    function updateProjectsSection(projects) {
        const projectsContainer = document.querySelector('#projects .grid');
        projectsContainer.innerHTML = '';
        
        projects.forEach((project, index) => {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project-card', 'animate-fadeIn');
            if (index > 0) {
                projectDiv.style.animationDelay = `${index * 0.2}s`;
            }
            
            let technologiesHTML = '';
            project.technologies.forEach(tech => {
                technologiesHTML += `<span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">${tech}</span>`;
            });
            
            projectDiv.innerHTML = `
                <div class="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105">
                    <div class="h-48 overflow-hidden">
                        <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">
                            ${project.description}
                        </p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${technologiesHTML}
                        </div>
                        <div class="flex space-x-3">
                            <a href="${project.githubUrl}" class="text-blue-500 hover:text-blue-700 transition" target="_blank">
                                <i class="fab fa-github text-xl"></i>
                            </a>
                            <a href="${project.liveUrl}" class="text-blue-500 hover:text-blue-700 transition" target="_blank">
                                <i class="fas fa-external-link-alt text-xl"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            projectsContainer.appendChild(projectDiv);
        });
    }
    
    // Update navigation
    function updateNavigation(navigation) {
        const navContainers = [
            document.querySelector('nav .hidden.md\\:flex'), // Desktop nav
            document.querySelector('#mobile-menu .px-2'), // Mobile nav
            document.querySelector('footer .flex.space-x-4') // Footer nav
        ];
        
        navContainers.forEach(container => {
            if (container) {
                container.innerHTML = '';
                
                navigation.items.forEach(item => {
                    const link = document.createElement('a');
                    link.href = item.link;
                    link.textContent = item.name;
                    
                    if (container.classList.contains('md\\:flex')) {
                        // Desktop nav styling
                        link.classList.add('hover:text-blue-500', 'transition');
                    } else if (container.classList.contains('px-2')) {
                        // Mobile nav styling
                        link.classList.add('block', 'px-3', 'py-2', 'rounded-md', 'hover:bg-gray-200', 'dark:hover:bg-gray-700', 'transition');
                    } else {
                        // Footer nav styling
                        link.classList.add('hover:text-blue-500', 'transition');
                    }
                    
                    container.appendChild(link);
                });
                
                // Add theme toggle button to desktop nav
                if (container.classList.contains('md\\:flex')) {
                    const themeBtn = document.createElement('button');
                    themeBtn.id = 'theme-toggle';
                    themeBtn.classList.add('p-2', 'rounded-full', 'hover:bg-gray-200', 'dark:hover:bg-gray-700', 'transition');
                    themeBtn.innerHTML = `
                        <svg id="dark-icon" class="w-6 h-6 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"></path>
                        </svg>
                        <svg id="light-icon" class="w-6 h-6 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>
                    `;
                    container.appendChild(themeBtn);
                }
            }
        });
    }

