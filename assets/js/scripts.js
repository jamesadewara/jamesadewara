class PortfolioExplorer {
  constructor() {
    this.hardcodedProjects = [
      {
        name: "James Resume",
        media: "pdf",
        url: "https://jamesadewara.github.io/jamesadewara/assets/files/james_resume.pdf",
      },
      {
        name: "James - GitHub Portfolio",
        media: "github",
        url: "https://github.com/jamesadewara/jamesadewara/blob/main/README.md",
      },
      {
        name: "James LinkedIn",
        media: "linkedin",
        url: "https://ng.linkedin.com/in/adewara-james-074989257",
      },
    ];

    this.projects = [];
    this.filteredProjects = [];
    this.currentProject = null;
    this.sidebarCollapsed = false;
    this.isMobile = window.innerWidth <= 992;
    this.scrollTimeout = null;

    this.initializeElements();
    this.initializeTheme();
    this.bindEvents();
    this.loadProjects();
    this.setupScrollHiding();
  }

  initializeElements() {
    this.sidebar = document.getElementById("sidebar");
    this.mainContent = document.getElementById("main-content");
    this.projectsContainer = document.getElementById("projects-container");
    this.searchInput = document.getElementById("search-input");
    this.welcomeScreen = document.getElementById("welcome-screen");
    this.projectFrame = document.getElementById("project-frame");
    this.loadingScreen = document.getElementById("loading-screen");
    this.statusBar = document.getElementById("status-bar");
    this.currentUrl = document.getElementById("current-url");
    this.floatingControls = document.getElementById("floating-controls");
    this.mobileOverlay = document.getElementById("mobile-overlay");
    this.toast = document.getElementById("toast");
    this.toastMessage = document.getElementById("toast-message");
    this.frameControls = document.getElementById("frame-controls");
    this.collapseBtn = document.getElementById("collapse-btn");
    
    // Add external content message elements
    this.externalContentMessage = document.getElementById("external-content-message") || this.createExternalContentMessage();
    this.externalOpenBtn = document.getElementById("external-open-btn") || document.createElement("a");
    this.externalBackBtn = document.getElementById("external-back-btn") || document.createElement("button");
  }

  // Create external content message if it doesn't exist
  createExternalContentMessage() {
    const messageDiv = document.createElement("div");
    messageDiv.id = "external-content-message";
    messageDiv.style.display = "none";
    messageDiv.style.position = "absolute";
    messageDiv.style.top = "0";
    messageDiv.style.left = "0";
    messageDiv.style.width = "100%";
    messageDiv.style.height = "100%";
    messageDiv.style.background = "var(--bg-primary)";
    messageDiv.style.zIndex = "15";
    messageDiv.style.flexDirection = "column";
    messageDiv.style.alignItems = "center";
    messageDiv.style.justifyContent = "center";
    messageDiv.style.padding = "20px";
    messageDiv.style.textAlign = "center";
    
    messageDiv.innerHTML = `
      <div style="font-size: 4rem; color: var(--primary); margin-bottom: 20px;">
        <i class="fas fa-external-link-alt"></i>
      </div>
      <div>
        <h2 style="font-size: 2rem; margin-bottom: 12px;">External Content</h2>
        <p style="color: var(--text-secondary); max-width: 600px; line-height: 1.6; margin-bottom: 20px;">
          This content cannot be displayed directly in the portfolio viewer due to security restrictions. 
          You can open it in a new tab or go back to the portfolio.
        </p>
        <div style="display: flex; gap: 12px; justify-content: center;">
          <a id="external-open-btn" href="#" target="_blank" style="padding: 10px 20px; border-radius: 6px; background: var(--primary); color: white; text-decoration: none; display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-external-link-alt"></i> Open in New Tab
          </a>
          <button id="external-back-btn" style="padding: 10px 20px; border-radius: 6px; background: var(--bg-secondary); color: var(--text-primary); border: 1px solid var(--border-color); cursor: pointer; display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-arrow-left"></i> Back to Portfolio
          </button>
        </div>
      </div>
    `;
    
    document.querySelector(".content-area").appendChild(messageDiv);
    return messageDiv;
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem("theme") || "system";
    this.setTheme(savedTheme);

    document.querySelectorAll(".theme-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const theme = btn.dataset.theme;
        this.setTheme(theme);
      });
    });
  }

  setTheme(theme) {
    localStorage.setItem("theme", theme);

    document.querySelectorAll(".theme-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.theme === theme);
    });

    if (theme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }

  async loadProjects() {
    try {
      this.projectsContainer.innerHTML = `
        <div class="loading-screen">
          <div class="spinner"></div>
          <div>Loading projects...</div>
        </div>
      `;

      const response = await fetch("assets/js/urls.json");
      if (!response.ok) {
        throw new Error("Failed to load projects");
      }

      this.projects = await response.json();
      this.filteredProjects = [...this.projects];
      this.renderProjects();
      this.showToast("Projects loaded successfully");
    } catch (error) {
      console.error("Error loading projects, using hardcoded version:", error);
      this.projects = [...this.hardcodedProjects];
      this.filteredProjects = [...this.hardcodedProjects];
      this.renderProjects();
      this.showToast("Using default projects", "info");
    }
  }

  bindEvents() {
    document.getElementById("toggle-sidebar").addEventListener("click", () => {
      this.toggleSidebar();
    });

    this.collapseBtn.addEventListener("click", () => {
      this.toggleSidebarCollapse();
    });

    document.getElementById("fullscreen-btn").addEventListener("click", () => {
      this.toggleFullscreen();
    });

    this.searchInput.addEventListener("input", (e) => {
      this.filterProjects(e.target.value);
    });

    document.getElementById("refresh-btn").addEventListener("click", () => {
      this.refreshCurrentProject();
    });

    document.getElementById("copy-btn").addEventListener("click", () => {
      this.copyCurrentUrl();
    });

    document.getElementById("external-btn").addEventListener("click", () => {
      this.openInNewTab();
    });

    document.getElementById("back-btn").addEventListener("click", () => {
      if (this.projectFrame.contentWindow) {
        this.projectFrame.contentWindow.history.back();
      }
    });

    document.getElementById("forward-btn").addEventListener("click", () => {
      if (this.projectFrame.contentWindow) {
        this.projectFrame.contentWindow.history.forward();
      }
    });

    document.getElementById("reload-btn").addEventListener("click", () => {
      this.refreshCurrentProject();
    });

    this.mobileOverlay.addEventListener("click", () => {
      this.hideSidebar();
    });

    // Bind events for external content buttons
    this.externalBackBtn.addEventListener("click", () => {
      this.hideExternalContentMessage();
    });

    window.addEventListener("resize", () => {
      this.handleResize();
    });
  }

  renderProjects() {
    const container = this.projectsContainer;
    container.innerHTML = "";

    if (this.filteredProjects.length === 0) {
      container.innerHTML = `
        <div class="no-results">
          <div class="no-results-icon">
            <i class="fas fa-search"></i>
          </div>
          <div class="no-results-text">No projects found</div>
          <div class="no-results-subtext">Try adjusting your search terms</div>
        </div>
      `;
      return;
    }

    this.filteredProjects.forEach((project, index) => {
      const projectEl = document.createElement("div");
      projectEl.className = "project-item";
      projectEl.dataset.index = index;

      const icon = this.getProjectIcon(project);
      const mediaType = project.media || "website";

      projectEl.innerHTML = `
        <div class="project-icon">
          <i class="${icon}"></i>
        </div>
        <div class="project-info">
          <div class="project-name" title="${project.name}">${project.name}</div>
          <div class="project-meta">
            <span class="media-badge">${mediaType}</span>
          </div>
        </div>
      `;

      projectEl.addEventListener("click", () => {
        this.selectProject(project, projectEl);
      });

      container.appendChild(projectEl);
    });
  }

  getProjectIcon(project) {
    const mediaType = project.media || "website";
    const icons = {
      website: "fas fa-globe",
      desktop: "fas fa-desktop",
      mobile: "fas fa-mobile-alt",
      github: "fab fa-github",
      pdf: "fas fa-file-pdf",
      linkedin: "fab fa-linkedin",
      plugin: "fas fa-puzzle-piece",
      article: "fas fa-newspaper"
    };

    if (project.url.includes("github")) return "fab fa-github";
    if (project.url.includes("youtube") || project.url.includes("youtu.be"))
      return "fab fa-youtube";

    return icons[mediaType] || "fas fa-globe";
  }

  selectProject(project, element) {
    document.querySelectorAll(".project-item").forEach((item) => {
      item.classList.remove("active");
    });
    element.classList.add("active");

    this.currentProject = project;
    this.loadProject(project);

    if (this.isMobile) {
      this.hideSidebar();
    }
  }

  loadProject(project) {
    this.loadingScreen.classList.add("show");
    this.welcomeScreen.style.display = "none";
    this.projectFrame.style.display = "none";
    this.frameControls.style.display = "none";
    this.hideExternalContentMessage();

    this.statusBar.style.display = "flex";
    this.currentUrl.textContent = project.url;

    // Check if this is a URL that likely can't be embedded
    if (this.isExternalContent(project.url)) {
      this.showExternalContentMessage(project);
      this.hideLoading();
      return;
    }

    if (
      project.media === "desktop" ||
      project.url.includes("youtube") ||
      project.url.includes("youtu.be")
    ) {
      window.open(project.url, "_blank");
      this.hideLoading();
      this.showToast("Opening in new tab...");
      return;
    }

    this.projectFrame.onload = () => {
      this.hideLoading();
      this.projectFrame.style.display = "block";
      this.frameControls.style.display = "flex";
    };

    this.projectFrame.onerror = () => {
      this.hideLoading();
      this.showExternalContentMessage(project);
    };

    this.projectFrame.src = project.url;
  }

  isExternalContent(url) {
    // List of domains that typically block iframe embedding
    const externalDomains = [
      'github.com',
      'linkedin.com',
      'medium.com',
      'youtube.com',
      'youtu.be'
    ];
    
    // Check if URL is a PDF
    if (url.toLowerCase().endsWith('.pdf')) {
      return true;
    }
    
    // Check if URL matches external domains
    return externalDomains.some(domain => url.includes(domain));
  }

  showExternalContentMessage(project) {
    this.externalOpenBtn.href = project.url;
    this.externalContentMessage.style.display = "flex";
    this.statusBar.style.display = "flex";
  }

  hideExternalContentMessage() {
    this.externalContentMessage.style.display = "none";
    this.welcomeScreen.style.display = "none";
    this.statusBar.style.display = "none";
  }

  hideLoading() {
    this.loadingScreen.classList.remove("show");
  }

  filterProjects(query) {
    const searchTerm = query.toLowerCase().trim();

    if (!searchTerm) {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm) ||
          project.url.toLowerCase().includes(searchTerm) ||
          (project.media && project.media.toLowerCase().includes(searchTerm))
      );
    }

    this.renderProjects();
  }

  toggleSidebar() {
    if (this.isMobile) {
      if (this.sidebar.classList.contains("show")) {
        this.hideSidebar();
      } else {
        this.showSidebar();
      }
    } else {
      this.toggleSidebarCollapse();
    }
  }

  toggleSidebarCollapse() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.sidebar.classList.toggle("collapsed", this.sidebarCollapsed);

    const collapseIcon = this.collapseBtn.querySelector("i");
    collapseIcon.className = this.sidebarCollapsed
      ? "fas fa-chevron-right"
      : "fas fa-chevron-left";
    this.collapseBtn.title = this.sidebarCollapsed
      ? "Expand Sidebar"
      : "Collapse Sidebar";
  }

  showSidebar() {
    this.sidebar.classList.add("show");
    this.mobileOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  hideSidebar() {
    this.sidebar.classList.remove("show");
    this.mobileOverlay.classList.remove("show");
    document.body.style.overflow = "";
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      if (this.currentProject) {
        this.projectFrame.requestFullscreen?.() ||
          this.projectFrame.webkitRequestFullscreen?.() ||
          this.projectFrame.msRequestFullscreen?.();
      } else {
        document.documentElement.requestFullscreen?.() ||
          document.documentElement.webkitRequestFullscreen?.() ||
          document.documentElement.msRequestFullscreen?.();
      }
    } else {
      document.exitFullscreen?.() ||
        document.webkitExitFullscreen?.() ||
        document.msExitFullscreen?.();
    }
  }

  refreshCurrentProject() {
    if (this.currentProject) {
      this.loadProject(this.currentProject);
      this.showToast("Project refreshed");
    }
  }

  copyCurrentUrl() {
    if (this.currentProject) {
      navigator.clipboard
        .writeText(this.currentProject.url)
        .then(() => {
          this.showToast("URL copied to clipboard!");
        })
        .catch(() => {
          this.showToast("Failed to copy URL", "error");
        });
    }
  }

  openInNewTab() {
    if (this.currentProject) {
      window.open(this.currentProject.url, "_blank");
      this.showToast("Opened in new tab");
    }
  }

  setupScrollHiding() {
    let isScrolling = false;
    let scrollTimer = null;

    const handleScroll = () => {
      if (!isScrolling) {
        this.floatingControls.classList.add("hidden");
        isScrolling = true;
      }

      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        this.floatingControls.classList.remove("hidden");
        isScrolling = false;
      }, 1000);
    };

    this.projectFrame.addEventListener("load", () => {
      try {
        const iframeDocument =
          this.projectFrame.contentDocument ||
          this.projectFrame.contentWindow.document;
        iframeDocument.addEventListener("scroll", handleScroll, {
          passive: true,
        });
      } catch (e) {
        console.log("Cannot access iframe scroll events (cross-origin)");
      }
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  handleResize() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 992;

    if (wasMobile !== this.isMobile) {
      if (this.isMobile) {
        this.sidebar.classList.remove("collapsed");
        this.sidebar.classList.remove("show");
        this.hideSidebar();
      } else {
        this.sidebar.classList.remove("show");
        this.mobileOverlay.classList.remove("show");
        document.body.style.overflow = "";
      }
    }
  }

  showToast(message, type = "success") {
    this.toastMessage.textContent = message;

    const icon = this.toast.querySelector(".toast-icon i");
    if (type === "error") {
      icon.className = "fas fa-exclamation-circle";
      this.toast.style.background = "linear-gradient(135deg, #ef4444, #dc2626)";
    } else if (type === "info") {
      icon.className = "fas fa-info-circle";
      this.toast.style.background = "linear-gradient(135deg, #3b82f6, #2563eb)";
    } else {
      icon.className = "fas fa-check";
      this.toast.style.background =
        "linear-gradient(135deg, var(--primary), var(--primary-dark))";
    }

    this.toast.classList.add("show");

    setTimeout(() => {
      this.toast.classList.remove("show");
    }, 3000);
  }

  showError(message) {
    this.showToast(message, "error");
    this.hideLoading();

    if (!this.currentProject) {
      this.welcomeScreen.style.display = "flex";
      this.statusBar.style.display = "none";
      this.frameControls.style.display = "none";
    }
  }
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  const explorer = new PortfolioExplorer();
});

document.addEventListener("fullscreenchange", () => {
  const fullscreenBtn = document.getElementById("fullscreen-btn");
  const icon = fullscreenBtn.querySelector("i");

  if (document.fullscreenElement) {
    icon.className = "fas fa-compress";
    fullscreenBtn.title = "Exit Fullscreen";
  } else {
    icon.className = "fas fa-expand";
    fullscreenBtn.title = "Fullscreen";
  }
});

document.addEventListener("contextmenu", (e) => {
  if (e.target.tagName === "IFRAME") {
    e.preventDefault();
  }
});