document.addEventListener('DOMContentLoaded', () => {
    const whatsappLink = document.querySelector('.btn-whatsapp') || document.createElement('a');
    const whatsappMessage = 'Hola, quiero solicitar información sobre los servicios de AIR ENERGY ECO-GLOBAL.';

    if (!whatsappLink.parentElement) {
        document.body.append(whatsappLink);
    }

    whatsappLink.className = 'btn-whatsapp';
    whatsappLink.href = `https://wa.me/573013742479?text=${encodeURIComponent(whatsappMessage)}`;
    whatsappLink.target = '_blank';
    whatsappLink.rel = 'noopener noreferrer';
    whatsappLink.setAttribute('aria-label', 'Escribir por WhatsApp a AIR ENERGY ECO-GLOBAL');
    whatsappLink.innerHTML = '<span class="whatsapp-icon" aria-hidden="true"><svg viewBox="0 0 32 32" focusable="false"><path d="M27.2 4.7A15.65 15.65 0 0 0 2.94 23.56L1.5 30.5l7.1-1.4A15.64 15.64 0 0 0 27.2 4.7Zm-11.17 22.7a12.7 12.7 0 0 1-6.47-1.77l-.47-.28-4.2.83.87-4.1-.3-.48A12.73 12.73 0 1 1 16.03 27.4Zm6.97-9.55c-.38-.2-2.23-1.1-2.57-1.23-.34-.12-.59-.2-.84.2-.25.37-.97 1.22-1.19 1.47-.22.25-.44.28-.82.1a10.3 10.3 0 0 1-3.03-1.87 11.37 11.37 0 0 1-2.1-2.62c-.22-.37 0-.57.17-.75.17-.17.38-.44.57-.66.18-.22.25-.37.37-.62.12-.25.06-.47-.03-.66-.1-.18-.84-2.03-1.15-2.78-.3-.72-.6-.62-.84-.63h-.72c-.25 0-.66.1-1 .47-.35.37-1.32 1.28-1.32 3.12s1.35 3.62 1.54 3.87c.18.25 2.65 4.04 6.42 5.67.9.39 1.6.62 2.15.79.9.28 1.72.24 2.37.15.72-.1 2.23-.91 2.54-1.78.31-.87.31-1.62.22-1.78-.1-.16-.35-.25-.72-.44Z" fill="currentColor"/></svg></span><span class="whatsapp-tooltip" role="tooltip">¿Necesitas ayuda? Escríbenos</span>';

    const footer = document.querySelector('.site-footer, body > footer');
    if (footer && !footer.querySelector('.brochure-download')) {
        const brochureDownload = document.createElement('a');
        const brochurePath = window.location.pathname.includes('/pages/')
            ? '../assets/documents/brochure-air-energy-eco-global.pdf'
            : 'assets/documents/brochure-air-energy-eco-global.pdf';

        brochureDownload.className = 'brochure-download';
        brochureDownload.href = brochurePath;
        brochureDownload.download = 'brochure-air-energy-eco-global.pdf';
        brochureDownload.textContent = 'Descargar brochure PDF';
        footer.append(brochureDownload);
    }

    const menuButton = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('#primary-nav');

    if (menuButton && navigation) {
        const isInternalPage = window.location.pathname.includes('/pages/');
        const pagePath = (page, section) => `${isInternalPage ? '' : 'pages/'}${page}${section ? `#${section}` : ''}`;
        const submenuTargets = {
            'Home': `${isInternalPage ? '../' : ''}index.html#inicio`,
            'Quiénes somos': pagePath('nosotros.html', 'quienes-somos'),
            'Valores': pagePath('nosotros.html', 'valores'),
            'Certificaciones ISO': pagePath('certificaciones.html', 'certificaciones'),
            'Climatización y refrigeración': pagePath('servicios.html', 'climatizacion'),
            'Sistemas eléctricos y energía solar': pagePath('servicios.html', 'energia-solar'),
            'Facilidades y soporte logístico': pagePath('servicios.html', 'soporte-logistico'),
            'Servicios de salud en campo': pagePath('servicios.html', 'salud-campo'),
            'Señalización vial y gestión ambiental': pagePath('servicios.html', 'senalizacion-ambiental'),
            'Big data y consultoría estratégica': pagePath('servicios.html', 'consultoria-estrategica'),
            'Clientes atendidos': pagePath('experiencia.html', 'clientes'),
            'Sectores atendidos': pagePath('experiencia.html', 'sectores'),
            'Proyectos y actividades en campo': pagePath('galeria.html', 'galeria'),
            'Formulario': pagePath('contacto.html', 'formulario'),
            'Mapa': pagePath('contacto.html', 'mapa'),
            'Líneas de atención': pagePath('contacto.html', 'lineas-atencion')
        };

        navigation.querySelectorAll('.nav-submenu span').forEach((item) => {
            const label = item.textContent.trim();
            const parentLink = item.closest('.nav-item-has-menu')?.querySelector(':scope > a');
            const target = label === 'Certificaciones ISO' && parentLink?.getAttribute('href')?.includes('nosotros.html')
                ? pagePath('nosotros.html', 'certificaciones')
                : submenuTargets[label];

            if (!target) return;

            const link = document.createElement('a');
            link.href = target;
            link.textContent = label;
            item.replaceWith(link);
        });

        menuButton.addEventListener('click', () => {
            const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', String(!isOpen));
            menuButton.setAttribute('aria-label', isOpen ? 'Abrir menú de navegación' : 'Cerrar menú de navegación');
            navigation.classList.toggle('is-open', !isOpen);
        });

        const menuItems = Array.from(navigation.querySelectorAll('.nav-item-has-menu'));
        const closeSubmenus = (exceptItem) => {
            menuItems.forEach((item) => {
                if (item === exceptItem) return;

                item.classList.remove('is-submenu-open');
                item.querySelector(':scope > a')?.setAttribute('aria-expanded', 'false');
            });
        };

        menuItems.forEach((item, index) => {
            const menuLink = item.querySelector(':scope > a');
            const submenu = item.querySelector(':scope > .nav-submenu');

            if (!menuLink || !submenu) return;

            submenu.id ||= `header-submenu-${index}`;
            menuLink.setAttribute('aria-controls', submenu.id);
            menuLink.setAttribute('aria-expanded', 'false');
            menuLink.setAttribute('aria-haspopup', 'true');

            menuLink.addEventListener('click', (event) => {
                if (!window.matchMedia('(min-width: 801px)').matches) return;

                event.preventDefault();
                const shouldOpen = !item.classList.contains('is-submenu-open');
                closeSubmenus(item);
                item.classList.toggle('is-submenu-open', shouldOpen);
                menuLink.setAttribute('aria-expanded', String(shouldOpen));
            });
        });

        document.addEventListener('click', (event) => {
            if (!window.matchMedia('(min-width: 801px)').matches || navigation.contains(event.target)) return;
            closeSubmenus();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') return;
            closeSubmenus();
        });

        navigation.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                menuButton.setAttribute('aria-expanded', 'false');
                menuButton.setAttribute('aria-label', 'Abrir menú de navegación');
                navigation.classList.remove('is-open');
            });
        });
    }

    const slides = Array.from(document.querySelectorAll('.hero-slide'));
    const slideButtons = Array.from(document.querySelectorAll('.hero-dots button'));
    const previousSlide = document.querySelector('.hero-arrow-prev');
    const nextSlide = document.querySelector('.hero-arrow-next');

    if (slides.length && slideButtons.length) {
        let currentSlide = 0;
        let carouselTimer;

        const showSlide = (index) => {
            currentSlide = (index + slides.length) % slides.length;
            slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === currentSlide));
            slideButtons.forEach((button, buttonIndex) => {
                button.classList.toggle('is-active', buttonIndex === currentSlide);
                button.setAttribute('aria-current', buttonIndex === currentSlide ? 'true' : 'false');
            });
        };

        const restartCarousel = () => {
            window.clearInterval(carouselTimer);
            carouselTimer = window.setInterval(() => showSlide(currentSlide + 1), 6000);
        };

        previousSlide?.addEventListener('click', () => { showSlide(currentSlide - 1); restartCarousel(); });
        nextSlide?.addEventListener('click', () => { showSlide(currentSlide + 1); restartCarousel(); });
        slideButtons.forEach((button, index) => button.addEventListener('click', () => { showSlide(index); restartCarousel(); }));
        restartCarousel();
    }

    document.querySelectorAll('.auto-card-carousel').forEach((serviceCardCarousel) => {
        const serviceCards = Array.from(serviceCardCarousel.querySelectorAll('.service-card, .certification-card, .partner-card'));
        let serviceCardTimer;

        const updateCardDepth = () => {
            const carouselCenter = serviceCardCarousel.getBoundingClientRect().left + serviceCardCarousel.clientWidth / 2;
            let closestCard;
            let closestDistance = Number.POSITIVE_INFINITY;

            serviceCards.forEach((card) => {
                const cardCenter = card.getBoundingClientRect().left + card.clientWidth / 2;
                const distance = cardCenter - carouselCenter;
                const absoluteDistance = Math.abs(distance);

                if (absoluteDistance < closestDistance) {
                    closestCard = card;
                    closestDistance = absoluteDistance;
                }

                card.classList.toggle('is-before', distance < -20);
                card.classList.toggle('is-after', distance > 20);
            });

            serviceCards.forEach((card) => card.classList.toggle('is-featured', card === closestCard));
        };

        const advanceServiceCards = () => {
            if (document.hidden) return;

            const card = serviceCards[0];
            const cardWidth = card ? card.getBoundingClientRect().width : 0;
            const gap = Number.parseFloat(getComputedStyle(serviceCardCarousel).gap) || 0;
            const maximumScroll = serviceCardCarousel.scrollWidth - serviceCardCarousel.clientWidth;
            const nextPosition = serviceCardCarousel.scrollLeft + cardWidth + gap;
            const destination = nextPosition >= maximumScroll - 2
                ? (serviceCardCarousel.scrollLeft < maximumScroll - 2 ? maximumScroll : 0)
                : nextPosition;

            serviceCardCarousel.scrollTo({
                left: destination,
                behavior: 'smooth'
            });
        };

        const startServiceCards = () => {
            window.clearInterval(serviceCardTimer);
            serviceCardTimer = window.setInterval(advanceServiceCards, 4000);
        };

        const pauseServiceCards = () => window.clearInterval(serviceCardTimer);

        serviceCardCarousel.addEventListener('mouseenter', pauseServiceCards);
        serviceCardCarousel.addEventListener('mouseleave', startServiceCards);
        serviceCardCarousel.addEventListener('focusin', pauseServiceCards);
        serviceCardCarousel.addEventListener('focusout', startServiceCards);
        serviceCardCarousel.addEventListener('touchstart', pauseServiceCards, { passive: true });
        serviceCardCarousel.addEventListener('touchend', startServiceCards, { passive: true });
        serviceCardCarousel.addEventListener('scroll', updateCardDepth, { passive: true });
        window.addEventListener('resize', updateCardDepth);
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) pauseServiceCards();
            else startServiceCards();
        });
        updateCardDepth();
        startServiceCards();
    });

    document.querySelectorAll('img:not(header img)').forEach((image) => {
        image.loading = 'lazy';
        image.decoding = 'async';
    });

    const selectors = [
        '.page-intro', '.content-split', '.principles', '.value-grid article',
        '.service-row', '.certification-grid article', '.metrics article',
        '.project-grid article', '.industries', '.gallery-grid figure',
        '.team-gallery-grid figure', '.gallery-team-grid figure', '.contact-layout',
        '.clientes-section', '.services-carousel-heading', '.partners-carousel-section'
    ];
    const elements = document.querySelectorAll(selectors.join(','));
    elements.forEach((element) => element.setAttribute('data-reveal', ''));

    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elements.forEach((element) => element.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: .12, rootMargin: '0px 0px -32px' });
    elements.forEach((element) => observer.observe(element));
});