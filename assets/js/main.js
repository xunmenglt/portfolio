const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

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
const previousCard = document.querySelector('.carousel-prev');
const nextCard = document.querySelector('.carousel-next');

if (carousel) {
  const moveCarousel = (direction) => {
    const card = carousel.querySelector('.portfolio-card');
    const distance = (card?.getBoundingClientRect().width || 320) + 16;
    const nextPosition = carousel.scrollLeft + direction * distance;
    const endPosition = carousel.scrollWidth - carousel.clientWidth - 4;
    if (direction > 0 && nextPosition >= endPosition) {
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }
    if (direction < 0 && nextPosition < 4) {
      carousel.scrollTo({ left: endPosition, behavior: 'smooth' });
      return;
    }
    carousel.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };
  previousCard?.addEventListener('click', () => moveCarousel(-1));
  nextCard?.addEventListener('click', () => moveCarousel(1));

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
    const tick = (timestamp) => {
      if (!lastFrame) lastFrame = timestamp;
      const elapsed = Math.min(timestamp - lastFrame, 40);
      lastFrame = timestamp;
      if (!isPaused && loopPoint) {
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
}

const lifeToggle = document.querySelector('.life-toggle');
const lifeGallery = document.querySelector('.life-gallery');
const lifeSection = document.querySelector('.life-section, .identity-life');

if (lifeToggle && lifeGallery && lifeSection) {
  lifeToggle.addEventListener('click', () => {
    const isExpanded = lifeGallery.classList.toggle('expanded');
    lifeSection.classList.toggle('photos-expanded', isExpanded);
    lifeToggle.setAttribute('aria-expanded', String(isExpanded));
    lifeToggle.innerHTML = isExpanded ? '收起照片 <span>↑</span>' : '展开全部 <span>↓</span>';
  });
}
