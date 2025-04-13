# Portfolio Website

A professional, responsive, and visually appealing portfolio website built with HTML, CSS, and JavaScript. This portfolio is designed to showcase your profile, projects, skills, and contact information effectively.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Smooth Animations**: Elegant transitions and animations
- **Interactive UI**: Modern and clean user interface
- **Tailwind CSS**: Utilized for responsive and clean styling
- **GitHub Pages Ready**: Easily deployable to GitHub Pages

## Table of Contents

- [Local Setup](#local-setup)
- [Deployment to GitHub Pages](#deployment-to-github-pages)
- [Updating Content](#updating-content)
- [Adding Projects](#adding-projects)
- [Structure](#structure)
- [Technologies Used](#technologies-used)

## Local Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Open the website locally**

   Simply open the `index.html` file in your browser to view the website locally:

   ```bash
   # On Windows
   start index.html

   # On macOS
   open index.html

   # On Linux
   xdg-open index.html
   ```

3. **Install a local development server (optional but recommended)**

   For a better development experience, you can use a local server like Live Server in VS Code or http-server:

   ```bash
   # Install http-server globally
   npm install -g http-server

   # Run the server
   http-server
   ```

## Deployment to GitHub Pages

1. **Create a GitHub repository**

   Create a new repository on GitHub named `yourusername.github.io` (replace 'yourusername' with your actual GitHub username).

2. **Initialize Git in your project folder (if not already done)**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Connect your local repository to GitHub**

   ```bash
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   ```

4. **Push your code to GitHub**

   ```bash
   git push -u origin main
   ```

   If your default branch is named 'master' instead of 'main', use:

   ```bash
   git push -u origin master
   ```

5. **Configure GitHub Pages**

   - Go to your repository on GitHub
   - Click on 'Settings'
   - Scroll down to the 'GitHub Pages' section
   - Under 'Source', select 'main' branch (or 'master' if that's what you're using)
   - Click 'Save'

6. **View your deployed website**

   Your portfolio will be available at `https://yourusername.github.io` after a few minutes.

### Alternative: Deploy Using GitHub Actions

You can also set up automatic deployment using GitHub Actions:

1. **Create a `.github/workflows` directory in your project**

2. **Create a file named `deploy.yml` in that directory with the following content:**

   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v2

         - name: Deploy
           uses: JamesIves/github-pages-deploy-action@4.1.4
           with:
             branch: gh-pages
             folder: .
   ```

3. **Push this file to your repository**

   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Actions workflow"
   git push
   ```

## Updating Content

### Personalizing Basic Information

1. **Edit the `index.html` file to update:**
   - Your name (replace "Your Name" with your actual name)
   - Profile description
   - Contact information
   - Social media links
   - About Me section

2. **Replace placeholder images:**
   - Replace `assets/images/profile-placeholder.jpg` with your profile picture
   - Update project images in the `assets/images/` directory

3. **Update your resume:**
   - Replace `assets/resume/resume.pdf` with your actual resume

### Modifying Colors and Styles

1. **Edit the CSS variables in `css/styles.css`**

   ```css
   :root {
     --primary-color: #3b82f6; /* Change this to your preferred primary color */
     --primary-hover: #2563eb;
     --text-dark: #1f2937;
     --text-light: #f9fafb;
     /* Other variables... */
   }
   ```

## Adding Projects

To add new projects to your portfolio:

1. **Edit the `index.html` file and locate the Projects section**

2. **Copy and paste a project card template:**

   ```html
   <!-- New Project -->
   <div class="project-card animate-fadeIn" style="animation-delay: 0.2s;">
       <div class="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden transform transition hover:scale-105">
           <div class="h-48 overflow-hidden">
               <img src="assets/images/your-new-project.jpg" alt="Project Title" class="w-full h-full object-cover">
           </div>
           <div class="p-6">
               <h3 class="text-xl font-semibold mb-2">Project Title</h3>
               <p class="text-gray-600 dark:text-gray-300 mb-4">
                   Description of your new project.
               </p>
               <div class="flex flex-wrap gap-2 mb-4">
                   <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">Technology 1</span>
                   <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">Technology 2</span>
               </div>
               <div class="flex space-x-3">
                   <a href="#" class="text-blue-500 hover:text-blue-700 transition" target="_blank">
                       <i class="fab fa-github text-xl"></i>
                   </a>
                   <a href="#" class="text-blue-500 hover:text-blue-700 transition" target="_blank">
                       <i class="fas fa-external-link-alt text-xl"></i>
                   </a>
               </div>
           </div>
       </div>
   </div>
   ```

3. **Update the following in the template:**
   - Project image (`src` attribute)
   - Project title
   - Project description
   - Technology tags
   - Links to GitHub repository and live demo

4. **Add your project image to `assets/images/` directory**

## Structure

```
portfolio-website/
├── index.html           # Main HTML file
├── css/
│   └── styles.css       # Custom styles
├── js/
│   └── main.js          # JavaScript functionality
├── assets/
│   ├── images/          # Images for the website
│   │   ├── profile-placeholder.jpg
│   │   ├── project1.jpg
│   │   ├── project2.jpg
│   │   └── project3.jpg
│   └── resume/
│       └── resume.pdf   # Your resume
└── README.md            # Project documentation
```

## Technologies Used

- HTML5
- CSS3 
- JavaScript (ES6+)
- Tailwind CSS for styling
- Font Awesome for icons
- Google Fonts
- Framer Motion for animations

---

This portfolio template is designed to be easily customizable to fit your personal brand and showcase your work professionally.
