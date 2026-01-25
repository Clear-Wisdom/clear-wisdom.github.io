/**
 * Portfolio Navigation & Theme Script
 * Handles section switching, active state management, and theme toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sections = document.querySelectorAll('.section');
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // ========================================
  // Theme Toggle
  // ========================================
  const getStoredTheme = () => localStorage.getItem('theme');
  const setStoredTheme = (theme) => localStorage.setItem('theme', theme);

  const applyTheme = (theme) => {
    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
    } else {
      html.removeAttribute('data-theme');
    }
  };

  // Initialize theme from localStorage or system preference
  const initializeTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      applyTheme(storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      applyTheme('light');
    }
  };

  // Toggle theme on button click
  themeToggle?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    setStoredTheme(newTheme);
  });

  // Initialize theme
  initializeTheme();

  // ========================================
  // Navigation
  // ========================================
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetSection = link.getAttribute('data-section');
      
      // Update active nav link
      navLinks.forEach(navLink => navLink.classList.remove('active'));
      link.classList.add('active');
      
      // Show target section
      sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetSection) {
          section.classList.add('active');
        }
      });

      // Update URL hash without scrolling
      history.pushState(null, null, `#${targetSection}`);
    });
  });

  // Handle initial hash on page load
  const handleInitialHash = () => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const targetLink = document.querySelector(`.nav-link[data-section="${hash}"]`);
      if (targetLink) {
        targetLink.click();
      }
    }
  };

  // Handle browser back/forward
  window.addEventListener('popstate', () => {
    handleInitialHash();
  });

  // Initialize
  handleInitialHash();

  // ========================================
  // Email Copy to Clipboard
  // ========================================
  const emailDropdown = document.getElementById('emailDropdown');
  const copySuccess = document.getElementById('copySuccess');
  const email = 'seoho38hwang@gmail.com';

  emailDropdown?.addEventListener('click', async (e) => {
    e.stopPropagation();
    
    try {
      await navigator.clipboard.writeText(email);
      
      // Show success message
      copySuccess.classList.add('show');
      
      // Hide after 1 second
      setTimeout(() => {
        copySuccess.classList.remove('show');
      }, 1000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  });

  // ========================================
  // Projects: Load from JSON and Render
  // ========================================
  const projectsContainer = document.getElementById('projectsContainer');
  const tocList = document.getElementById('tocList');

  // Helper: Generate slug from text
  const slugify = (text) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  // Helper: Create project item HTML
  const createProjectItem = (project, projectId) => {
    const tagsHtml = project.tags.map(tag => 
      `<span class="project-tag">${tag}</span>`
    ).join('');

    return `
      <div class="project-item" id="${projectId}">
        <div class="project-header" data-accordion>
          <div class="project-summary">
            <h5 class="project-name">${project.name}</h5>
            <div class="project-meta">
              <span class="meta-item">📍 ${project.location}</span>
              <span class="meta-item">📅 ${project.period}</span>
            </div>
            <div class="project-tags">${tagsHtml}</div>
          </div>
          <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
        <div class="project-details">
          <p>${project.description}</p>
        </div>
      </div>
    `;
  };

  // Render all projects from JSON data
  const renderProjects = (data) => {
    let html = '';
    
    // Sort years in descending order
    const years = Object.keys(data).sort((a, b) => b - a);
    
    years.forEach(year => {
      const yearId = `year-${year}`;
      const orgs = data[year];
      
      let orgHtml = '';
      Object.keys(orgs).forEach((orgName, orgIndex) => {
        const orgId = `org-${slugify(orgName)}-${year}`;
        const projects = orgs[orgName];
        
        let projectsHtml = '';
        projects.forEach((project, projIndex) => {
          const projectId = `project-${slugify(project.name)}-${year}-${orgIndex}-${projIndex}`;
          projectsHtml += createProjectItem(project, projectId);
        });
        
        orgHtml += `
          <div class="org-group" id="${orgId}">
            <h4 class="org-title">${orgName}</h4>
            ${projectsHtml}
          </div>
        `;
      });
      
      html += `
        <div class="year-group" id="${yearId}">
          <h3 class="year-title">${year}</h3>
          ${orgHtml}
        </div>
      `;
    });
    
    projectsContainer.innerHTML = html;
  };

  // Generate TOC from rendered projects
  const generateTOC = () => {
    tocList.innerHTML = '';
    
    const yearGroups = document.querySelectorAll('.year-group');
    
    yearGroups.forEach(yearGroup => {
      const yearTitle = yearGroup.querySelector('.year-title')?.textContent;
      const yearId = yearGroup.id;
      
      const yearLi = document.createElement('li');
      yearLi.className = 'toc-year';
      
      const yearLink = document.createElement('a');
      yearLink.href = `#${yearId}`;
      yearLink.className = 'toc-link';
      yearLink.textContent = yearTitle;
      yearLi.appendChild(yearLink);
      
      const orgSublist = document.createElement('ul');
      orgSublist.className = 'toc-sublist';
      
      const orgGroups = yearGroup.querySelectorAll('.org-group');
      orgGroups.forEach(orgGroup => {
        const orgTitle = orgGroup.querySelector('.org-title')?.textContent;
        const orgId = orgGroup.id;
        
        const orgLi = document.createElement('li');
        
        const orgLink = document.createElement('a');
        orgLink.href = `#${orgId}`;
        orgLink.className = 'toc-link toc-org';
        orgLink.textContent = orgTitle;
        orgLi.appendChild(orgLink);
        
        const projectSublist = document.createElement('ul');
        projectSublist.className = 'toc-sublist';
        
        const projectItems = orgGroup.querySelectorAll('.project-item');
        projectItems.forEach(projectItem => {
          const projectName = projectItem.querySelector('.project-name')?.textContent;
          const projectId = projectItem.id;
          
          const projectLi = document.createElement('li');
          const projectLink = document.createElement('a');
          projectLink.href = `#${projectId}`;
          projectLink.className = 'toc-link toc-project';
          projectLink.textContent = projectName;
          projectLi.appendChild(projectLink);
          projectSublist.appendChild(projectLi);
        });
        
        orgLi.appendChild(projectSublist);
        orgSublist.appendChild(orgLi);
      });
      
      yearLi.appendChild(orgSublist);
      tocList.appendChild(yearLi);
    });
  };

  // Setup accordion event listeners
  const setupAccordions = () => {
    projectsContainer?.addEventListener('click', (e) => {
      const header = e.target.closest('[data-accordion]');
      if (header) {
        const projectItem = header.closest('.project-item');
        projectItem.classList.toggle('open');
      }
    });
  };

  // TOC smooth scroll (event delegation)
  tocList?.addEventListener('click', (e) => {
    if (e.target.classList.contains('toc-link')) {
      e.preventDefault();
      const targetId = e.target.getAttribute('href').slice(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 60;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });

  // Load and initialize projects
  if (projectsContainer) {
    fetch('data/projects.json')
      .then(response => response.json())
      .then(data => {
        renderProjects(data);
        generateTOC();
        setupAccordions();
      })
      .catch(error => {
        console.error('Failed to load projects:', error);
        projectsContainer.innerHTML = '<p>프로젝트를 불러오는 데 실패했습니다.</p>';
      });
  }
});

