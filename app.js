/* --- EDITORIAL PORTFOLIO CORE ENGINE --- */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initSmoothScrolling();
  initMobileMenu();
  initLayoutHotspots();
  renderZenithHomepage();
  initProjectDrawer();
  initContactForm();
  initScrollAnimations();
  initReviewsSystem();
});

/* --- NAVBAR EVENT TRANSITIONS & SCROLLSPY --- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links li');

  window.addEventListener('scroll', () => {
    // Height compression on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scrollspy active trigger
    let activeSection = '';
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (window.pageYOffset >= top - 140) {
        activeSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.querySelector('a').getAttribute('href');
      if (href === `#${activeSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --- programmatic smooth scrolling & file:// origin bypass --- */
function initSmoothScrolling() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  anchors.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Prevent default browser hash change which causes the unique origin frame warning on file:// protocol
        e.preventDefault();
        
        // Account for sticky mobile or desktop navbar height offsets
        const headerOffset = window.innerWidth <= 1024 ? 70 : 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* --- VISUAL INSPECTOR LAYOUT HOTSPOTS --- */
function initLayoutHotspots() {
  const hotspots = document.querySelectorAll('.hotspot');
  const defaultPane = document.querySelector('.inspector-default');
  const activePane = document.getElementById('inspector-active-block');

  if (hotspots.length === 0) return;

  const annotationData = {
    typography: {
      title: "Asymmetric Typography Scale",
      type: "TYPOGRAPHY",
      metric: "Clamp Scales",
      contrast: "14.2:1 (AAA compliance)",
      critique: "Evaluates the proportional scale of the large serif header relative to base margins. Applying fluid clamp expressions ensures letters scale dynamically without overlapping or creating massive horizontal line-breaks under tight browser aspect ratios.",
      designImpact: "Ensures front-end developers have precise clamp boundaries to implement fluid layouts that scale perfectly without breaking text flow."
    },
    spacing: {
      title: " whitespace breathing room",
      type: "SPACING",
      metric: "Vertical Rhythm",
      contrast: "24px Consistent Paddings",
      critique: "Assessments focused on grid gaps and whitespace consistency. Ensures cards maintain safe, proportional distances from main body grids, creating an elegant visual layout that feels clean and balanced.",
      designImpact: "Establishes a predictable visual rhythm across all viewports, simplifying CSS declaration maps and ensuring robust card layouts."
    },
    contrast: {
      title: "Active State Color Pairing",
      type: "ACCESSIBILITY",
      metric: "WCAG Contrast Safe",
      contrast: "8.5:1 (AAA High Pass)",
      critique: "Evaluates active highlights utilizing warm terracotta tags against alabaster backgrounds. Contrast checks ensure the color combination remains legible for visually impaired users.",
      designImpact: "Guarantees a premium, high-accessibility layout that conforms strictly to elite agency and corporate compliance standards."
    },
    grid: {
      title: "Asymmetric Layout Column System",
      type: "LAYOUT DESIGN",
      metric: "CSS Grid Ratio",
      contrast: "Ratio: 1.5fr / 1fr Grid Matrix",
      critique: "Critiques structural proportion balance across dynamic widths. Ensures grids collapse gracefully into vertical columns under smaller screens without visual truncation.",
      designImpact: "Aligns front-end column divisions with structural mockup guides, leading to a highly consistent visual brand presentation."
    }
  };

  hotspots.forEach(spot => {
    spot.addEventListener('click', () => {
      // Toggle hotspot active state
      hotspots.forEach(s => s.classList.remove('active'));
      spot.classList.add('active');

      // Hide default sidebar state
      defaultPane.style.display = 'none';

      // Load specific visual specs
      const key = spot.dataset.critiqueKey;
      const data = annotationData[key];

      if (!data) return;

      // Update pane values
      activePane.querySelector('.inp-tag-type').textContent = data.type;
      activePane.querySelector('.inp-tag-metric').textContent = data.metric;
      activePane.querySelector('.inspector-title').textContent = data.title;
      activePane.querySelector('.inspector-desc').textContent = data.critique;
      activePane.querySelector('.critique-box-desc').textContent = data.designImpact;
      activePane.querySelector('.meta-contrast').textContent = data.contrast;

      // Color tags based on specs
      const typeTag = activePane.querySelector('.inp-tag-type');
      typeTag.className = 'inp-tag inp-tag-type';
      if (data.type === 'TYPOGRAPHY' || data.type === 'LAYOUT DESIGN') {
        typeTag.classList.add('highlight');
      }

      // Show inspector block
      activePane.classList.add('active');
    });
  });
}

/* --- ZENITH GENERATIVE POSTER COMPOSER ENGINE --- */
function renderZenithHomepage() {
  const container = document.getElementById('homepage-zenith-wrapper');
  if (!container) return;

  const liveMock = document.createElement('div');
  liveMock.className = 'zenith-live-mockup';
  liveMock.innerHTML = `
    <div class="zenith-header">
      <span class="zenith-logo">ZENITH // POSTER COMPOSER</span>
      <span class="zenith-status">SYSTEM LIVE</span>
    </div>
    <div class="zenith-body">
      <div class="zenith-canvas-wrapper">
        <canvas class="zenith-canvas"></canvas>
        <div class="zenith-poster-frame theme-swiss" id="poster-frame-element">
          <div class="poster-header-grid">
            <span>VOL. 04 / COMPOSER</span>
            <span class="poster-meta-serial">CH-902-SWISS</span>
          </div>
          <div class="poster-content-area">
            <h1 class="poster-title-layer" id="poster-title-text" style="font-size: 3.6rem; letter-spacing: 8px;">ZENITH</h1>
            <p class="poster-description-layer" id="poster-desc-text">
              Generative typographical layout designed with fluid spacing boundaries and strict horizontal alignment column structures.
            </p>
          </div>
          <div class="poster-footer-grid">
            <span>PROTUS STUDIO</span>
            <span>©2024 // GRID SPEC: 12_COL</span>
          </div>
        </div>
      </div>
      <div class="zenith-controls">
        <div class="zenith-controls-title">Poster Curation</div>
        
        <div class="zenith-theme-selector">
          <div class="zenith-control-label">Design Era Theme</div>
          <div class="theme-buttons-row">
            <button class="zenith-theme-btn active" data-theme="swiss">Swiss Grid</button>
            <button class="zenith-theme-btn" data-theme="bauhaus">Bauhaus 23</button>
            <button class="zenith-theme-btn" data-theme="editorial">Ink Serif</button>
            <button class="zenith-theme-btn" data-theme="cyber">Cyber Kinetic</button>
          </div>
        </div>

        <div class="zenith-control-group">
          <div class="zenith-control-label">
            <span>Text Scale</span>
            <span class="ctrl-scale-val">3.6rem</span>
          </div>
          <div class="zenith-control-slider-bg" id="control-scale">
            <div class="zenith-control-slider-fill" style="width: 50%;"></div>
          </div>
        </div>
        
        <div class="zenith-control-group">
          <div class="zenith-control-label">
            <span>Character Spacing</span>
            <span class="ctrl-tracking-val">8px</span>
          </div>
          <div class="zenith-control-slider-bg" id="control-tracking">
            <div class="zenith-control-slider-fill" style="width: 45%;"></div>
          </div>
        </div>

        <div class="zenith-control-group">
          <div class="zenith-control-label">
            <span>Grid Complexity</span>
            <span class="ctrl-grids-val">6 Cols</span>
          </div>
          <div class="zenith-control-slider-bg" id="control-grids">
            <div class="zenith-control-slider-fill" style="width: 50%;"></div>
          </div>
        </div>

        <div class="zenith-poster-actions">
          <button class="zenith-action-btn primary-action" id="action-shuffle">Shuffle Composition ⊙</button>
          <button class="zenith-action-btn" id="action-export">Export Print</button>
        </div>

        <div class="zenith-stats-panel">
          <div class="zenith-stat-box">
            <span class="zenith-stat-name">Format Status</span>
            <span class="zenith-stat-val spec-format-val">AAA PASS</span>
          </div>
          <div class="zenith-stat-box">
            <span class="zenith-stat-name">Alignment Check</span>
            <span class="zenith-stat-val spec-align-val">100% SNAP</span>
          </div>
        </div>

      </div>
    </div>
    <div class="zenith-footer">
      <span>SYSTEM: GENERATIVE COMPOSER v3.0</span>
      <span>©2024</span>
    </div>
  `;
  container.appendChild(liveMock);

  const canvas = liveMock.querySelector('.zenith-canvas');
  const canvasWrapper = liveMock.querySelector('.zenith-canvas-wrapper');
  if (canvas && canvasWrapper) {
    initZenithPosterStudio(canvas, canvasWrapper, liveMock);
  }
}

function initZenithPosterStudio(canvas, wrapper, rootElement) {
  const ctx = canvas.getContext('2d');
  let active = true;
  let timeVal = 0;
  const mouse = { x: null, y: null };
  
  // Design state machine parameters
  const state = {
    activeTheme: 'swiss',
    titleScale: 3.6,     // rem
    letterSpacing: 8,    // px
    gridComplexity: 6,   // dashed columns
    layoutSeed: 0        // incremented on shuffles
  };

  const themeDefaults = {
    swiss: {
      title: "ZENITH",
      desc: "Generative typographical layout designed with fluid spacing boundaries and strict horizontal alignment column structures.",
      serial: "CH-902-SWISS",
      scale: 3.6,
      tracking: 8,
      grids: 6
    },
    bauhaus: {
      title: "KINETIC",
      desc: "Asymmetric structural synthesis merging diagonal geometry with raw primary sans-serif layouts.",
      serial: "BH-1923-CORE",
      scale: 3.4,
      tracking: -2,
      grids: 8
    },
    editorial: {
      title: "L'Art Noir",
      desc: "Elegant minimal layout exploring charcoal ink dividers, balanced serif contrast margins, and deep spatial whitespace breathing room.",
      serial: "ED-009-SERIF",
      scale: 3.2,
      tracking: 4,
      grids: 4
    },
    cyber: {
      title: "NEBULA",
      desc: "Glow-mapped vector nodes rendering neon grid divisions and real-time cursor coordinate calculations.",
      serial: "CB-804-NODE",
      scale: 3.8,
      tracking: 12,
      grids: 12
    }
  };

  const shufflePools = {
    swiss: ["ZENITH", "MINIMAL", "GRID", "SYSTEM", "STRUCTURE"],
    bauhaus: ["KINETIC", "BAUHAUS", "ASYM", "SYNTH", "ERA-23"],
    editorial: ["L'Art Noir", "Les Mots", "L'Espace", "Chambre", "Curation"],
    cyber: ["NEBULA", "MATRIX", "VECTOR", "CYBER", "KINETIC"]
  };

  // Node Element Selectors
  const posterFrame = rootElement.querySelector('#poster-frame-element');
  const posterTitle = rootElement.querySelector('#poster-title-text');
  const posterDesc = rootElement.querySelector('#poster-desc-text');
  const posterSerial = rootElement.querySelector('.poster-meta-serial');

  // Sliders fills and value indicators
  const scaleSlider = rootElement.querySelector('#control-scale');
  const trackingSlider = rootElement.querySelector('#control-tracking');
  const gridsSlider = rootElement.querySelector('#control-grids');

  const scaleFill = scaleSlider ? scaleSlider.querySelector('.zenith-control-slider-fill') : null;
  const trackingFill = trackingSlider ? trackingSlider.querySelector('.zenith-control-slider-fill') : null;
  const gridsFill = gridsSlider ? gridsSlider.querySelector('.zenith-control-slider-fill') : null;

  const scaleValDisplay = rootElement.querySelector('.ctrl-scale-val');
  const trackingValDisplay = rootElement.querySelector('.ctrl-tracking-val');
  const gridsValDisplay = rootElement.querySelector('.ctrl-grids-val');

  // Action Buttons
  const shuffleBtn = rootElement.querySelector('#action-shuffle');
  const exportBtn = rootElement.querySelector('#action-export');

  // Stats text
  const formatStat = rootElement.querySelector('.spec-format-val');
  const alignStat = rootElement.querySelector('.spec-align-val');

  // Theme changing trigger
  const themeBtns = rootElement.querySelectorAll('.zenith-theme-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      themeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const theme = btn.dataset.theme;
      applyTheme(theme);
    });
  });

  function applyTheme(themeKey) {
    state.activeTheme = themeKey;
    const defaults = themeDefaults[themeKey];
    if (!defaults) return;

    // Apply class tags to frame
    posterFrame.className = `zenith-poster-frame theme-${themeKey}`;

    // Load defaults into state variables
    state.titleScale = defaults.scale;
    state.letterSpacing = defaults.tracking;
    state.gridComplexity = defaults.grids;

    // Load strings into poster fields
    posterTitle.textContent = defaults.title;
    posterDesc.textContent = defaults.desc;
    posterSerial.textContent = defaults.serial;

    // Reset offsets on shuffle
    posterTitle.style.paddingLeft = '0px';
    posterTitle.style.transform = 'none';

    // Synchronize sliders visually
    syncSliders();
    redrawCanvas();
  }

  function syncSliders() {
    // Sync Scale (Range: 1.8rem to 5.4rem)
    const scalePct = (state.titleScale - 1.8) / (5.4 - 1.8);
    if (scaleFill) scaleFill.style.width = `${scalePct * 100}%`;
    if (scaleValDisplay) scaleValDisplay.textContent = `${state.titleScale.toFixed(1)}rem`;
    if (posterTitle) posterTitle.style.fontSize = `${state.titleScale}rem`;

    // Sync Tracking (Range: -6px to 24px)
    const trackingPct = (state.letterSpacing - (-6)) / (24 - (-6));
    if (trackingFill) trackingFill.style.width = `${trackingPct * 100}%`;
    if (trackingValDisplay) trackingValDisplay.textContent = `${state.letterSpacing}px`;
    if (posterTitle) posterTitle.style.letterSpacing = `${state.letterSpacing}px`;

    // Sync Grids (Range: 0 to 12 columns)
    const gridsPct = state.gridComplexity / 12;
    if (gridsFill) gridsFill.style.width = `${gridsPct * 100}%`;
    if (gridsValDisplay) gridsValDisplay.textContent = `${state.gridComplexity} Cols`;
  }

  // Set up mouse click listeners on slider track nodes
  if (scaleSlider) {
    scaleSlider.addEventListener('click', (e) => {
      const rect = scaleSlider.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      state.titleScale = 1.8 + pct * (5.4 - 1.8); // 1.8 to 5.4rem range
      syncSliders();
    });
  }

  if (trackingSlider) {
    trackingSlider.addEventListener('click', (e) => {
      const rect = trackingSlider.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      state.letterSpacing = Math.round(-6 + pct * (24 - (-6))); // -6 to 24px range
      syncSliders();
    });
  }

  if (gridsSlider) {
    gridsSlider.addEventListener('click', (e) => {
      const rect = gridsSlider.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      state.gridComplexity = Math.round(pct * 12); // 0 to 12 cols range
      syncSliders();
      redrawCanvas();
    });
  }

  // Shuffle Action
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      state.layoutSeed++;
      
      // Shuffle Title text
      const pool = shufflePools[state.activeTheme];
      const randomText = pool[Math.floor(Math.random() * pool.length)];
      posterTitle.textContent = randomText;

      // Asymmetric alignment offset shuffles
      const alignOffset = (Math.random() * 20 - 10).toFixed(0);
      if (Math.random() > 0.5) {
        posterTitle.style.paddingLeft = `${Math.max(0, alignOffset)}px`;
        posterTitle.style.transform = `skewX(${alignOffset / 2}deg)`;
      } else {
        posterTitle.style.paddingLeft = '0px';
        posterTitle.style.transform = 'none';
      }

      // Add elegant flash animation
      posterTitle.style.opacity = '0.3';
      setTimeout(() => {
        posterTitle.style.opacity = '1';
      }, 120);

      // Random alignment metrics
      const snapPct = (95 + Math.random() * 5).toFixed(1);
      if (alignStat) alignStat.textContent = `${snapPct}% SNAP`;

      redrawCanvas();
    });
  }

  // Export action
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const prevText = exportBtn.textContent;
      exportBtn.disabled = true;
      exportBtn.textContent = "PRINTING... 🖨";
      
      // Glow border print flash effect
      posterFrame.style.transition = 'all 0.2s ease';
      posterFrame.style.boxShadow = '0 0 35px rgba(255, 75, 31, 0.6)';
      
      if (formatStat) formatStat.textContent = "QUEUE DEPLOYED";

      setTimeout(() => {
        posterFrame.style.boxShadow = '';
        posterFrame.style.transition = 'background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.8s cubic-bezier(0.16, 1, 0.3, 1), color 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        exportBtn.textContent = "QUEUED IN OUTBOX ✔";
        
        setTimeout(() => {
          exportBtn.disabled = false;
          exportBtn.textContent = prevText;
          if (formatStat) formatStat.textContent = "AAA PASS";
        }, 1500);
      }, 1000);
    });
  }

  // Handle Canvas Resizes
  function handleResize() {
    const rect = wrapper.getBoundingClientRect();
    canvas.width = rect.width || 350;
    canvas.height = rect.height || 240;
    redrawCanvas();
  }
  
  handleResize();
  
  let ro = null;
  if (window.ResizeObserver) {
    ro = new ResizeObserver(() => {
      handleResize();
    });
    ro.observe(wrapper);
  } else {
    window.addEventListener('resize', handleResize);
  }

  // Track cursor
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Generative Art Graphics Render Loop
  
  function redrawCanvas() {
    if (!active) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;

    // 1. Draw dashed grid background lines based on Complexity
    if (state.gridComplexity > 0) {
      ctx.strokeStyle = state.activeTheme === 'editorial' ? 'rgba(188, 166, 133, 0.08)' : 
                        state.activeTheme === 'cyber' ? 'rgba(14, 165, 233, 0.08)' : 'rgba(21, 21, 21, 0.05)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);

      const steps = state.gridComplexity + 1;
      for (let i = 1; i < steps; i++) {
        const xCoord = (w / steps) * i;
        ctx.beginPath();
        ctx.moveTo(xCoord, 0);
        ctx.lineTo(xCoord, h);
        ctx.stroke();
      }
      ctx.setLineDash([]); // clear dash spec
    }

    // 2. Draw specific background vector graphics depending on Theme
    if (state.activeTheme === 'swiss') {
      // Swiss grid: Bold minimal circle and crosshairs
      ctx.strokeStyle = '#FF4B1F';
      ctx.lineWidth = 1;
      
      const centerX = w * 0.75 + Math.sin(timeVal * 0.02) * 15;
      const centerY = h * 0.25 + Math.cos(timeVal * 0.02) * 15;

      // Draw crosshairs
      ctx.beginPath();
      ctx.moveTo(centerX - 35, centerY);
      ctx.lineTo(centerX + 35, centerY);
      ctx.moveTo(centerX, centerY - 35);
      ctx.lineTo(centerX, centerY + 35);
      ctx.stroke();

      // Solid color fills
      ctx.fillStyle = 'rgba(255, 75, 31, 0.08)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 24 + state.layoutSeed * 2, 0, Math.PI * 2);
      ctx.fill();

      // Cursor connection line
      if (mouse.x !== null && mouse.y !== null) {
        ctx.strokeStyle = 'rgba(21, 21, 21, 0.12)';
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();
      }

    } else if (state.activeTheme === 'bauhaus') {
      // Bauhaus: Concentric thick geometry
      const cX = w * 0.25;
      const cY = h * 0.75 + Math.cos(timeVal * 0.01) * 12;

      ctx.fillStyle = 'rgba(165, 113, 86, 0.15)'; // Warm Terracotta shade
      ctx.beginPath();
      ctx.arc(cX, cY, 45, 0, Math.PI * 1.5);
      ctx.lineTo(cX, cY);
      ctx.fill();

      // Bold yellow/orange geometric strip
      ctx.fillStyle = 'rgba(255, 75, 31, 0.2)';
      ctx.beginPath();
      ctx.rect(w * 0.6, h * 0.1 + Math.sin(timeVal * 0.02) * 10, 40, h * 0.45);
      ctx.fill();

      if (mouse.x !== null && mouse.y !== null) {
        ctx.strokeStyle = 'rgba(165, 113, 86, 0.3)';
        ctx.beginPath();
        ctx.arc(cX, cY, Math.max(10, Math.min(120, Math.abs(mouse.x - cX))), 0, Math.PI * 2);
        ctx.stroke();
      }

    } else if (state.activeTheme === 'editorial') {
      // Editorial Ink: Beautiful flowing curves
      ctx.strokeStyle = 'rgba(188, 166, 133, 0.22)'; // Ochre sand curve
      ctx.lineWidth = 1.5;
      
      ctx.beginPath();
      ctx.moveTo(0, h * 0.35);
      ctx.bezierCurveTo(
        w * 0.35 + Math.sin(timeVal * 0.01) * 30, h * 0.05, 
        w * 0.65 + Math.cos(timeVal * 0.01) * 30, h * 0.95, 
        w, h * 0.65
      );
      ctx.stroke();

      // Draw elegant fine coordinate ticks
      ctx.fillStyle = 'rgba(110, 106, 98, 0.4)';
      ctx.font = '7px monospace';
      ctx.fillText(`RATIO: 1.618 // SHUFFLE_${state.layoutSeed}`, 15, h - 15);

    } else if (state.activeTheme === 'cyber') {
      // Cyber nodes: connected micro grid nodes
      ctx.fillStyle = '#0EA5E9';
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.18)';
      ctx.lineWidth = 0.8;

      const nodes = [
        { x: w * 0.2, y: h * 0.2 },
        { x: w * 0.7, y: h * 0.15 },
        { x: w * 0.85, y: h * 0.75 },
        { x: w * 0.35, y: h * 0.65 },
        { x: w * 0.6, y: h * 0.85 }
      ];

      nodes.forEach((n, idx) => {
        // sway nodes subtly
        n.x += Math.sin(timeVal * 0.02 + idx) * 8;
        n.y += Math.cos(timeVal * 0.02 + idx) * 8;

        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // draw connections to next node
        const nextNode = nodes[(idx + 1) % nodes.length];
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(nextNode.x, nextNode.y);
        ctx.stroke();

        // draw cursor tether line
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(14, 165, 233, ${Math.max(0, 0.35 - dist / 130)})`;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      });
    }
  }

  // Animation ticks
  function loop() {
    if (!active) return;
    timeVal++;
    
    // Smooth dynamic redraw ticks
    redrawCanvas();
    
    requestAnimationFrame(loop);
  }

  // Kickstart animation loop
  requestAnimationFrame(loop);

  // Return destructor
  return {
    destroy: () => {
      active = false;
      if (ro) {
        ro.disconnect();
      } else {
        window.removeEventListener('resize', handleResize);
      }
    }
  };
}

/* --- SELECTED PORTFOLIO DRAWER --- */
function initProjectDrawer() {
  const triggers = document.querySelectorAll('.showroom-browser-container, .showroom-cta-btn');
  const drawer = document.getElementById('project-drawer');
  const overlay = document.getElementById('drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close');

  if (!drawer || !overlay) return;

  const projectDetails = {
    aether: {
      title: "Aether Journal",
      tagline: "Architecture visualization and digital design journal.",
      category: "Digital Journal / Editorial",
      date: "August 2023",
      stack: "HTML5 Semantic Grid, Custom Typography Scales",
      image: "aether_mockup.png",
      colors: [
        { hex: "#FAF8F5", label: "Alabaster Cream", use: "Base Canvas Background" },
        { hex: "#151515", label: "Charcoal Ink", use: "Main Typography Headers" },
        { hex: "#BCA685", label: "Warm Ochre Sand", use: "Fine Accents & Details" }
      ],
      insight: "Designed a clean, modern spatial journal showcasing architecture. Focused on strict grid alignments and spacious margins that let high-resolution layouts breath.",
      critique: "Annotated standard column alignments and margins. Cured layout scaling grids to prevent overlapping text containers on custom browser ratios."
    },
    monolith: {
      title: "Monolith Stoneware",
      tagline: "Minimalist e-commerce catalog for premium ceramics.",
      category: "E-Commerce / Minimalist Catalog",
      date: "January 2024",
      stack: "CSS Variable Architecture, Fluid Flexbox Gaps",
      image: "monolith_mockup.png",
      colors: [
        { hex: "#FFFFFF", label: "Pure Alabaster", use: "Card Background Base" },
        { hex: "#A57156", label: "Warm Terracotta", use: "Link Highlights" },
        { hex: "#6E6A62", label: "Muted Clay", use: "Secondary copy color" }
      ],
      insight: "Built an e-commerce catalog demonstrating elegant asymmetry and high typographic font weight contrast. Text width constrained strictly to 65ch.",
      critique: "Evaluated HSL contrast scales of product details tags. Refined padding boundaries to keep product tiles balanced under dynamic mobile stacks."
    },
    vesper: {
      title: "Vesper Identity",
      tagline: "Custom typography-driven brand identity and logo system.",
      category: "Graphic Design / Brand Identity",
      date: "March 2024",
      stack: "Outfit / Cormorant Typography, Vector Geometry Outlines",
      image: "vesper_mockup.png",
      colors: [
        { hex: "#151515", label: "Charcoal Ink", use: "Primary Monogram Fill" },
        { hex: "#FAF8F5", label: "Alabaster Cream", use: "Secondary Contrast Background" },
        { hex: "#BCA685", label: "Warm Ochre Sand", use: "Fine Accents & Highlights" }
      ],
      insight: "Designed a premium monogram and logo branding package. Emphasized custom typography styling, balanced letterform curves, and a warm terracotta/ochre color scheme to feel warm and human-made.",
      critique: "Evaluated readability thresholds of monogram serifs at large scales. Refined letter proportions to sit perfectly within tight margins on packaging collateral."
    },
    zenith: {
      title: "Zenith Poster Studio",
      tagline: "Generative typography layout engine and dynamic poster designer.",
      category: "Web Development / Front-end Art",
      date: "June 2024",
      stack: "HTML5 Layout Grids, Fluid Spacing, 2D Canvas Graphics",
      image: "vesper_mockup.png", // Just a fallback, won't be shown since canvas renders
      colors: [
        { hex: "#FAF8F5", label: "Alabaster Cream", use: "Swiss Layout Canvas BG" },
        { hex: "#FF4B1F", label: "Volcanic Red", use: "Swiss Geometry Highlights" },
        { hex: "#151515", label: "Charcoal Ink", use: "Main Typography Letters" }
      ],
      insight: "Engineered an interactive typographic design system utilizing custom column grid rules, fluid clamp scaling, and era-based aesthetic themes (Swiss Minimal, Bauhaus, Ink Serif, Cyber).",
      critique: "Validated layout alignments under variable viewport configurations. Contrast ratios and typography scale remain compliant with WCAG AAA guidelines."
    }
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const row = trigger.closest('.showroom-row');
      if (!row) return;
      const key = row.dataset.projectKey;
      const data = projectDetails[key];

      if (!data) return;

      // Populate text
      drawer.querySelector('.drawer-title').textContent = data.title;
      drawer.querySelector('.drawer-tagline').textContent = data.tagline;
      drawer.querySelector('.drawer-meta-category').textContent = data.category;
      drawer.querySelector('.drawer-meta-date').textContent = data.date;
      drawer.querySelector('.drawer-meta-stack').textContent = data.stack;
      drawer.querySelector('.drawer-insight-p').textContent = data.insight;
      drawer.querySelector('.drawer-critique-p').textContent = data.critique;

      // Populate Visual Showcase Mockup
      const mockupImg = drawer.querySelector('.drawer-showcase-image');
      const mockupFilename = drawer.querySelector('.drawer-showcase-filename');
      const showcaseWrapper = drawer.querySelector('.drawer-showcase-image-wrapper');
      
      if (mockupFilename) {
        mockupFilename.textContent = data.image;
      }

      // Cleanup any active drawer loop
      if (window.drawerZenithCleanup) {
        window.drawerZenithCleanup.destroy();
        window.drawerZenithCleanup = null;
      }

      if (key === 'zenith') {
        // Hide standard static image frame
        if (mockupImg) {
          mockupImg.style.display = 'none';
        }

        // Render/display the stunning live vector layout for Zenith Poster Studio
        let liveZenith = showcaseWrapper.querySelector('.zenith-live-mockup');
        if (!liveZenith) {
          liveZenith = document.createElement('div');
          liveZenith.className = 'zenith-live-mockup';
          liveZenith.innerHTML = `
            <div class="zenith-header">
              <span class="zenith-logo">ZENITH // POSTER COMPOSER</span>
              <span class="zenith-status">SYSTEM LIVE</span>
            </div>
            <div class="zenith-body" style="grid-template-columns: 1fr; justify-content: center; justify-items: center;">
              <div class="zenith-canvas-wrapper" style="min-height: 320px; width: 100%; max-width: 320px;">
                <canvas class="zenith-canvas"></canvas>
                <div class="zenith-poster-frame theme-swiss" style="max-height: 280px; max-width: 210px; padding: 1rem;">
                  <div class="poster-header-grid">
                    <span>VOL. 04 / COMPOSER</span>
                    <span class="poster-meta-serial">CH-902-SWISS</span>
                  </div>
                  <div class="poster-content-area" style="margin: 0.5rem 0;">
                    <h1 class="poster-title-layer" style="font-size: 2.8rem; letter-spacing: 6px;">ZENITH</h1>
                    <p class="poster-description-layer" style="font-size: 0.5rem; line-height: 1.4; margin-top: 0.5rem;">
                      Generative typographical layout designed with fluid spacing boundaries and strict horizontal alignment column structures.
                    </p>
                  </div>
                  <div class="poster-footer-grid">
                    <span>PROTUS STUDIO</span>
                    <span>©2024 // GRID SPEC: 12_COL</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="zenith-footer">
              <span>SYSTEM: DRAWER PREVIEW v3.0</span>
              <span>©2024</span>
            </div>
          `;
          showcaseWrapper.appendChild(liveZenith);
        } else {
          liveZenith.style.display = 'flex';
        }

        // Initialize Poster Studio on drawer canvas
        const dCanvas = liveZenith.querySelector('.zenith-canvas');
        const dWrapper = liveZenith.querySelector('.zenith-canvas-wrapper');
        if (dCanvas && dWrapper) {
          window.drawerZenithCleanup = initZenithPosterStudio(dCanvas, dWrapper, liveZenith);
        }

      } else {
        // Show standard image and hide Zenith live mockup
        if (mockupImg) {
          mockupImg.style.display = 'block';
          mockupImg.src = data.image;
          mockupImg.alt = `${data.title} Interface Specification Mockup`;
        }
        
        const liveZenith = showcaseWrapper.querySelector('.zenith-live-mockup');
        if (liveZenith) {
          liveZenith.style.display = 'none';
        }
      }

      // Color swatches
      const swatchesRow = drawer.querySelector('.swatches-row');
      swatchesRow.innerHTML = '';
      data.colors.forEach(col => {
        const swatch = document.createElement('div');
        swatch.className = 'swatch-item';
        swatch.innerHTML = `
          <div class="swatch-color" style="background-color: ${col.hex};"></div>
          <span class="swatch-hex">${col.hex}</span>
          <span class="swatch-lbl">${col.label}</span>
        `;
        swatchesRow.appendChild(swatch);
      });

      // Show drawer
      drawer.classList.add('open');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';

    // Cleanup drawer canvas simulation loop
    if (window.drawerZenithCleanup) {
      window.drawerZenithCleanup.destroy();
      window.drawerZenithCleanup = null;
    }
  }

  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);
}

/* --- EDITORIAL CONTACT FORM VALIDATIONS --- */
function initContactForm() {
  const form = document.getElementById('editorial-contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form || !feedback) return;

  // IMPORTANT: The placeholder below needs to be replaced with a real Formspree endpoint
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('msg').value.trim();

    if (!name || !email || !msg) {
      feedback.style.color = 'var(--accent-terracotta)';
      feedback.textContent = "Please fill out all digital fields.";
      return;
    }

    const submitBtn = form.querySelector('.btn-primary');
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending Envelope...";

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message: msg })
      });

      if (response.ok) {
        feedback.style.color = 'var(--text-ink)';
        feedback.textContent = `Thank you, ${name}. Your correspondence packet has been securely delivered.`;
        
        // Clear fields
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('msg').value = '';
      } else {
        throw new Error('Formspree rejected the request');
      }
    } catch (error) {
      feedback.style.color = 'var(--accent-terracotta)';
      feedback.textContent = "Transmission failed. Please ensure the Formspree ID is set up correctly.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Correspondence";
    }
  });
}

/* --- SCROLL ANIMATIONS (INTERSECTION OBSERVER) --- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.showroom-row, .skill-card, .method-flow-step, .philosophical-card');

  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

/* --- MOBILE MENU EVENT HANDLERS --- */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  function openMenu() {
    toggle.classList.add('active');
    navLinks.classList.add('open');
  }

  function closeMenu() {
    toggle.classList.remove('active');
    navLinks.classList.remove('open');
  }
}

/* --- REVIEWS & RATINGS SYSTEM --- */
function initReviewsSystem() {
  const form = document.getElementById('review-form');
  const feed = document.getElementById('reviews-feed');
  const avgRatingEl = document.getElementById('avg-rating');
  const totalReviewsEl = document.getElementById('total-reviews-count');
  const starSelectContainer = document.getElementById('rating-stars-select');
  const ratingValueInput = document.getElementById('review-rating-value');

  if (!feed) return;

  // Set default reviews
  const defaultReviews = [
    {
      name: "Emily Vance, Design Lead",
      meta: "Safari on macOS",
      rating: 5,
      text: "Protus's attention to layout grids and typographic systems is incredible. The developer handoffs are always flawless.",
      avatar: "avatar_emily.png",
      date: "May 12, 2024"
    },
    {
      name: "Marcus Thorne, Founder",
      meta: "Chrome on Windows",
      rating: 5,
      text: "An exceptional eye for minimalist design. The stoneware catalog he crafted for us has elevated our brand identity to new levels.",
      avatar: "avatar_marcus.png",
      date: "April 28, 2024"
    },
    {
      name: "David K., Product Manager",
      meta: "Firefox on macOS",
      rating: 4,
      text: "Excellent work on the Zenith Poster Studio layout tool. The interactive canvas runs exceptionally well, and the typography scales are robust.",
      avatar: null,
      date: "April 02, 2024"
    }
  ];

  // Load reviews from localStorage
  let reviews = JSON.parse(localStorage.getItem('protus_portfolio_reviews'));
  
  // Clean loaded reviews of any corrupted or invalid structures
  if (reviews && Array.isArray(reviews)) {
    reviews = reviews.filter(r => r && typeof r === 'object' && typeof r.name === 'string');
  }

  // Force reset if empty, outdated, or missing metadata details
  if (!reviews || !Array.isArray(reviews) || reviews.length === 0 || !reviews.some(r => r.hasOwnProperty('avatar')) || !reviews[0].hasOwnProperty('meta')) {
    reviews = defaultReviews;
    localStorage.setItem('protus_portfolio_reviews', JSON.stringify(reviews));
  }

  // Initial render
  renderReviews();

  // Helper: Get OS & Browser info to personalize the review without authentication
  function getClientMetadata() {
    const ua = navigator.userAgent;
    let os = "Device";
    if (ua.indexOf("Win") !== -1) os = "Windows";
    else if (ua.indexOf("Mac") !== -1) os = "macOS";
    else if (ua.indexOf("Linux") !== -1) os = "Linux";
    else if (ua.indexOf("Android") !== -1) os = "Android";
    else if (ua.indexOf("like Mac") !== -1) os = "iOS";

    let browser = "Browser";
    if (ua.indexOf("Chrome") !== -1) browser = "Chrome";
    else if (ua.indexOf("Safari") !== -1) browser = "Safari";
    else if (ua.indexOf("Firefox") !== -1) browser = "Firefox";
    else if (ua.indexOf("Edge") !== -1) browser = "Edge";
    
    return `${browser} on ${os}`;
  }

  // Star Rating Picker handler inside form
  if (starSelectContainer) {
    const starBtns = starSelectContainer.querySelectorAll('.star-btn');
    
    // Set default rating active state
    updateStarSelection(ratingValueInput.value);

    starBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const rating = btn.getAttribute('data-rating');
        ratingValueInput.value = rating;
        updateStarSelection(rating);
      });
    });

    function updateStarSelection(rating) {
      starBtns.forEach(btn => {
        const btnRating = parseInt(btn.getAttribute('data-rating'));
        if (btnRating <= parseInt(rating)) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  }

  // Form submission handler
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameValInput = document.getElementById('review-name').value.trim();
      const ratingVal = parseInt(ratingValueInput.value);
      const textVal = document.getElementById('review-text').value.trim();

      // Zero friction: fall back to Anonymous if name is empty
      const finalName = nameValInput ? nameValInput : "Anonymous Designer";
      const metadata = getClientMetadata();

      const newReview = {
        name: finalName,
        meta: metadata,
        rating: ratingVal,
        text: textVal,
        avatar: null, // Initial badge is dynamically generated
        date: getFormattedTodayDate()
      };

      reviews.unshift(newReview); // Add to the top
      localStorage.setItem('protus_portfolio_reviews', JSON.stringify(reviews));

      // Clear form
      document.getElementById('review-name').value = '';
      document.getElementById('review-text').value = '';
      ratingValueInput.value = '5';
      if (starSelectContainer) {
        const starBtns = starSelectContainer.querySelectorAll('.star-btn');
        starBtns.forEach(btn => btn.classList.add('active')); // Reset to 5 stars
      }

      renderReviews();
    });
  }

  function getFormattedTodayDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  }

  function renderReviews() {
    feed.innerHTML = '';
    let totalScore = 0;

    reviews.forEach(review => {
      totalScore += review.rating;
      
      const item = document.createElement('div');
      item.className = 'review-item';
      
      let starsHtml = '';
      for (let i = 1; i <= 5; i++) {
        if (i <= review.rating) {
          starsHtml += '★';
        } else {
          starsHtml += '☆';
        }
      }

      const authorName = review.name ? String(review.name).trim() : "Anonymous Designer";
      const initial = authorName ? authorName.charAt(0).toUpperCase() : 'A';
      
      // Generate clean pastel color initials badge dynamically
      const colors = ['#E07A5F', '#3D405B', '#81B29A', '#F2CC8F', '#FF4B1F', '#D4A373', '#CCD5AE'];
      const colorIndex = Math.abs(authorName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % colors.length;
      const badgeBg = colors[colorIndex];

      const avatarHtml = review.avatar 
        ? `<img src="${review.avatar}" alt="${authorName}" class="review-avatar-img">`
        : `<span class="review-avatar-initial" style="background: ${badgeBg}; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; border-radius: 50%; color: #ffffff; font-weight: 600; font-size: 1.15rem; text-transform: uppercase;">${initial}</span>`;

      const subtitle = review.meta ? `${review.meta}` : 'Verified Collaborator';

      item.innerHTML = `
        <div class="review-avatar-wrapper" style="width: 44px; height: 44px; border-radius: 50%; overflow: hidden; flex-shrink: 0;">
          ${avatarHtml}
        </div>
        <div class="review-item-content">
          <div class="review-item-header">
            <div style="display: flex; flex-direction: column;">
              <span class="review-item-author">${review.name}</span>
              <span style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase; margin-top: 0.15rem;">${subtitle}</span>
            </div>
            <span class="review-item-stars">${starsHtml}</span>
          </div>
          <p class="review-item-text">${review.text}</p>
          <span class="review-item-date">Published // ${review.date}</span>
        </div>
      `;
      feed.appendChild(item);
    });

    // Update Average Rating and Total count
    const average = (totalScore / reviews.length).toFixed(1);
    if (avgRatingEl) avgRatingEl.textContent = average;
    if (totalReviewsEl) totalReviewsEl.textContent = `${reviews.length} Review${reviews.length !== 1 ? 's' : ''}`;
  }
}
