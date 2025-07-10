document.addEventListener('DOMContentLoaded', function() {

    // --- Sticky Header die verschijnt bij omhoog scrollen ---
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Naar beneden scrollen
            header.style.top = '-80px'; // Verberg header
        } else {
            // Naar omhoog scrollen
            header.style.top = '0'; // Toon header
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, false);


    // --- Simpele 'fade-in' animatie voor secties bij scrollen ---
    const fadeInElements = document.querySelectorAll('section, .service-card, .gallery-item, .usp-item, .intro-grid > div');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optioneel: stop met observeren na eerste keer
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Hoeveel % van het element zichtbaar moet zijn
    });

    fadeInElements.forEach(el => {
        el.classList.add('fade-in'); // Voeg initiële class toe
        observer.observe(el);
    });


    // --- Contactformulier Feedback ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Voorkom daadwerkelijke verzending
            
            const feedbackEl = document.getElementById('form-feedback');
            feedbackEl.style.color = 'var(--secondary-color)';
            feedbackEl.textContent = 'Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.';

            // Reset het formulier na een paar seconden
            setTimeout(() => {
                contactForm.reset();
                feedbackEl.textContent = '';
            }, 5000);
        });
    }

});