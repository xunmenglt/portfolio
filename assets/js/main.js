const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

const lucideGlyphs = {
  '←': 'arrow-left',
  '→': 'arrow-right',
  '↑': 'arrow-up',
  '↓': 'chevron-down',
  '↗': 'arrow-up-right',
  '↖': 'corner-up-left',
};

const refreshLucideIcons = () => {
  window.lucide?.createIcons({
    icons: window.lucide.icons,
    attrs: { 'aria-hidden': 'true', 'stroke-width': '1.8' },
  });
};

const replaceTextGlyphsWithIcons = () => {
  const matcher = /[←→↑↓↗↖]/g;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parentTag = node.parentElement?.tagName;
      if (!node.nodeValue?.match(matcher) || ['SCRIPT', 'STYLE', 'SVG'].includes(parentTag)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    node.nodeValue.split(/([←→↑↓↗↖])/).forEach((part) => {
      if (lucideGlyphs[part]) {
        const icon = document.createElement('i');
        icon.dataset.lucide = lucideGlyphs[part];
        icon.className = 'lucide-icon';
        fragment.append(icon);
      } else if (part) {
        fragment.append(document.createTextNode(part));
      }
    });
    node.replaceWith(fragment);
  });
  refreshLucideIcons();
};

if (window.lucide) {
  replaceTextGlyphsWithIcons();
} else {
  const lucideScript = document.createElement('script');
  lucideScript.src = 'https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js';
  lucideScript.async = true;
  lucideScript.addEventListener('load', replaceTextGlyphsWithIcons);
  document.head.append(lucideScript);
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const carousel = document.querySelector('.portfolio-carousel');
const portfolioViewToggle = document.querySelector('.portfolio-view-toggle');

if (carousel) {
  let pauseAutoScroll = () => {};
  let resumeAutoScroll = () => {};

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const sourceCards = [...carousel.querySelectorAll('.portfolio-card')];
    sourceCards.forEach((card) => {
      const copy = card.cloneNode(true);
      copy.classList.add('portfolio-card-copy');
      copy.setAttribute('aria-hidden', 'true');
      copy.setAttribute('tabindex', '-1');
      carousel.append(copy);
    });

    carousel.classList.add('is-continuous');
    let isPaused = false;
    let lastFrame;
    let loopPoint = 0;
    let virtualScroll = 0;
    const updateLoopPoint = () => {
      loopPoint = carousel.querySelector('.portfolio-card-copy')?.offsetLeft || 0;
      virtualScroll = carousel.scrollLeft;
    };
    const pause = () => { isPaused = true; };
    const resume = () => {
      isPaused = false;
      lastFrame = undefined;
      virtualScroll = carousel.scrollLeft;
    };
    pauseAutoScroll = pause;
    resumeAutoScroll = resume;
    const tick = (timestamp) => {
      if (!lastFrame) lastFrame = timestamp;
      const elapsed = Math.min(timestamp - lastFrame, 40);
      lastFrame = timestamp;
      if (!isPaused && !carousel.classList.contains('is-grid') && loopPoint) {
        virtualScroll += elapsed * 0.024;
        if (virtualScroll >= loopPoint) virtualScroll -= loopPoint;
        carousel.scrollLeft = virtualScroll;
      }
      window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(() => {
      updateLoopPoint();
      window.requestAnimationFrame(tick);
    });
    window.addEventListener('resize', updateLoopPoint);
    carousel.addEventListener('mouseenter', pause);
    carousel.addEventListener('mouseleave', resume);
    carousel.addEventListener('focusin', pause);
    carousel.addEventListener('focusout', resume);
    carousel.addEventListener('touchstart', pause, { passive: true });
    carousel.addEventListener('touchend', () => window.setTimeout(resume, 1000), { passive: true });
  }

  portfolioViewToggle?.addEventListener('click', () => {
    const isGrid = carousel.classList.toggle('is-grid');
    portfolioViewToggle.setAttribute('aria-expanded', String(isGrid));
    portfolioViewToggle.innerHTML = isGrid
      ? '返回循环浏览 <i data-lucide="corner-up-left" class="lucide-icon" aria-hidden="true"></i>'
      : '查看全部 <i data-lucide="arrow-up-right" class="lucide-icon" aria-hidden="true"></i>';
    refreshLucideIcons();
    if (isGrid) {
      pauseAutoScroll();
      carousel.scrollLeft = 0;
    } else {
      resumeAutoScroll();
    }
  });
}

const lifeToggle = document.querySelector('.life-toggle');
const lifeGallery = document.querySelector('.life-gallery');
const lifeSection = document.querySelector('.life-section, .identity-life');

if (lifeToggle && lifeGallery && lifeSection) {
  lifeToggle.addEventListener('click', () => {
    const isExpanded = lifeGallery.classList.toggle('expanded');
    lifeSection.classList.toggle('photos-expanded', isExpanded);
    lifeToggle.setAttribute('aria-expanded', String(isExpanded));
    lifeToggle.innerHTML = isExpanded
      ? '收起照片 <i data-lucide="chevron-up" class="lucide-icon" aria-hidden="true"></i>'
      : '展开全部 <i data-lucide="chevron-down" class="lucide-icon" aria-hidden="true"></i>';
    refreshLucideIcons();
  });
}
