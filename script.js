// Initialize Lenis for Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    mouseMultiplier: 1,
});

// Synchronize Lenis with GSAP Ticker
function raf(time) {
    lenis.raf(time * 1000); // Convert to milliseconds
}

gsap.ticker.add(raf);

// Disable lag smoothing to prevent jumps
gsap.ticker.lagSmoothing(0);

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"], a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Handle links like "index.html#home" when already on index.html
        const targetId = href.includes('#') ? href.split('#')[1] : null;
        const targetPath = href.split('#')[0];
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';

        // Check if the link is for the current page
        if (targetId && (targetPath === '' || targetPath === currentPath)) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                e.preventDefault();
                lenis.scrollTo(targetElement, {
                    offset: 0, // Adjust if you have a fixed header
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        }
    });
});

// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// 1. Loader / Hero Animation
window.addEventListener('load', () => {
    const tl = gsap.timeline();

    tl.to(".line span", {
        y: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out"
    })
        .to(".scroll-indicator", {
            opacity: 1,
            duration: 1,
            y: 0,
            ease: "power2.out"
        }, "-=1");
});



// 3. About Section Geometric Drawing
// 3. Geometric Drawing Animation
const shapes = document.querySelectorAll('.geometric-shape');
shapes.forEach(shape => {
    const paths = shape.querySelectorAll('path');

    // Determine trigger: use .about-visual (index.html) if present, else self (ui_ux_design.html)
    let triggerElement = shape;
    let startPos = "top 80%";
    let endPos = "bottom 20%";

    const aboutVisual = shape.closest('.about-visual');
    if (aboutVisual) {
        triggerElement = aboutVisual;
        startPos = "top 70%";
        endPos = "bottom 70%";
    }

    paths.forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length; // Start hidden

        gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: triggerElement,
                start: startPos,
                end: endPos,
                scrub: 1
            }
        });
    });
});

// About Text Reveal
// About Text Reveal (Word-by-word Scroll Effect)
// About Text Reveal (Word-by-word Scroll Effect)
const revealTexts = document.querySelectorAll(".reveal-text");

revealTexts.forEach(revealText => {
    // Split text into words
    const text = revealText.textContent;
    const words = text.split(" ");
    revealText.innerHTML = "";

    words.forEach(word => {
        const span = document.createElement("span");
        span.textContent = word + " ";
        span.style.color = "rgba(255, 255, 255, 0.1)"; // Start with much dimmer color
        span.style.opacity = "1";
        revealText.appendChild(span);
    });

    // Animate words on scroll
    gsap.to(revealText.querySelectorAll("span"), {
        color: "#ffffff",
        stagger: 0.03, // Smoother wave-like flow
        ease: "none", // Linear equal distribution
        scrollTrigger: {
            trigger: revealText, // Trigger based on the element itself
            start: "top 80%",
            end: "bottom 30%", // Adjusted for timing
            scrub: true, // Smooth scrub
        }
    });
});


// 4. Services Animation
gsap.utils.toArray('.service-item').forEach((item, i) => {
    gsap.from(item, {
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: item,
            start: "top 90%"
        }
    });
});

// 5. Testimonial Marquee (Infinite Loop)
const track = document.querySelector('.marquee-track');
const cards = document.querySelectorAll('.review-card');

// Clone items for seamless loop
cards.forEach(card => {
    let clone = card.cloneNode(true);
    track.appendChild(clone);
});
// Double clone for wide screens
cards.forEach(card => {
    let clone = card.cloneNode(true);
    track.appendChild(clone);
});

// Animate Marquee with GSAP
gsap.to(track, {
    xPercent: -50, // Move left by half (since we doubled content)
    ease: "none",
    duration: 25,
    repeat: -1
});

// Pause marquee on hover



// 6. FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        // Close others
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            }
        });

        // Toggle current
        item.classList.toggle('active');
        const answer = item.querySelector('.faq-answer');
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});

// 7. Contact Section Animations
gsap.from(".contact-info", {
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".contact",
        start: "top 75%"
    }
});

gsap.from(".contact-right-column", {
    x: 100,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    delay: 0.2,
    scrollTrigger: {
        trigger: ".contact",
        start: "top 75%"
    }
});

// 8. Back to Top Logic
const backToTopBtn = document.querySelector('.back-to-top');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        lenis.scrollTo(0, { duration: 1.5 });
    });
}

// 9. Phone Layer Pop Animation
if (document.querySelector(".phone-wrapper")) {
    const phoneWrapper = document.querySelector(".phone-wrapper");

    phoneWrapper.addEventListener("mouseenter", () => {
        phoneWrapper.classList.add("pop-active");
    });

    phoneWrapper.addEventListener("mouseleave", () => {
        phoneWrapper.classList.remove("pop-active");
    });
}

// 10. Mobile Menu Logic
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');

        // Lock/Unlock Scroll & Animate Items
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            gsap.fromTo(navLinksItems,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out", delay: 0.2 }
            );
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Reset on window resize (larger than mobile)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// 11. Works Section Slider
const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    const slides = document.querySelectorAll('.project-slide');
    const nextBtn = document.querySelector('.nav-control.next');
    const prevBtn = document.querySelector('.nav-control.prev');

    let currentIndex = 0;
    let isAnimating = false;

    // Initial State: Ensure only first is visible
    gsap.set(slides, { autoAlpha: 0, position: 'absolute' });
    gsap.set(slides[0], { autoAlpha: 1, position: 'relative' }); // Relative for first to give height

    function updateSlide(direction) {
        if (isAnimating) return;
        isAnimating = true;

        const currentSlide = slides[currentIndex];

        // Calculate next index
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % slides.length;
        } else {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        }

        const nextSlide = slides[currentIndex];

        // Animation config
        const slideDistance = 100;
        const outX = direction === 'next' ? -slideDistance : slideDistance;
        const inX = direction === 'next' ? slideDistance : -slideDistance;

        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating = false;
                // Reset positions for cleanliness, though not strictly necessary if handled well
                gsap.set(currentSlide, { position: 'absolute' });
                gsap.set(nextSlide, { position: 'relative' }); // Ensure container height adapts
            }
        });

        // Animate Out
        tl.to(currentSlide, {
            opacity: 0,
            xPercent: outX, // Move slightly out
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
                gsap.set(currentSlide, { autoAlpha: 0, xPercent: 0 }); // Reset
            }
        })
            // Animate In (Overlap slightly)
            .fromTo(nextSlide,
                { autoAlpha: 0, xPercent: inX, position: 'absolute' },
                { autoAlpha: 1, xPercent: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
            );
    }

    if (nextBtn) nextBtn.addEventListener('click', () => updateSlide('next'));
    if (prevBtn) prevBtn.addEventListener('click', () => updateSlide('prev'));

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') updateSlide('next');
        if (e.key === 'ArrowLeft') updateSlide('prev');
    });


    // Accessibility: Activate on Enter/Space
    [nextBtn, prevBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (btn === nextBtn) updateSlide('next');
                    if (btn === prevBtn) updateSlide('prev');
                }
            });
        }
    });
}

// 12. Contact Form Submission
const contactForm = document.querySelector('.contact-form');
const successMessage = document.querySelector('.success-message');

if (contactForm && successMessage) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Hide form with fade out effect (optional, or just display: none)
        gsap.to(contactForm, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';

                // Animate success message in
                gsap.fromTo(successMessage,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                );
            }
        });
    });
}

// 13. UI/UX Page: "See More" Toggle
const seeMoreBtn = document.getElementById('see-more-btn');
const extraReasons = document.querySelector('.extra-reasons');

if (seeMoreBtn && extraReasons) {
    seeMoreBtn.addEventListener('click', () => {
        const isHidden = extraReasons.style.display === 'none';

        if (isHidden) {
            // Show
            extraReasons.style.display = 'block';
            gsap.fromTo(extraReasons,
                { height: 0, opacity: 0 },
                { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out", onStart: () => { extraReasons.style.overflow = "hidden"; } }
            );

            // Animate items in slightly later
            gsap.fromTo(extraReasons.children,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.1, ease: "power2.out" }
            );

            // Change button text
            seeMoreBtn.innerHTML = 'See Less <i class="fas fa-chevron-up"></i>';
        } else {
            // Hide
            gsap.to(extraReasons.children, {
                y: 20,
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.in"
            });

            gsap.to(extraReasons, {
                height: 0,
                opacity: 0,
                duration: 0.5,
                delay: 0.2, // Wait for children to fade slightly
                ease: "power2.inOut",
                onComplete: () => {
                    extraReasons.style.display = 'none';
                    extraReasons.style.height = ''; // Reset height for next open
                    extraReasons.style.opacity = '';
                    seeMoreBtn.innerHTML = 'See More <i class="fas fa-chevron-down"></i>';
                }
            });
        }
    });
}
