// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Start animations after preloader is gone
            startAnimations();
        }, 500);
    });
    
    // For browsers that might have already loaded the page
    if (document.readyState === 'complete') {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Start animations after preloader is gone
            startAnimations();
        }, 500);
    }
    
    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.menu');
    
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', function() {
            menu.classList.toggle('active');
            menuBtn.classList.toggle('active');
            
            if (menuBtn.classList.contains('active')) {
                menuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }
    
    // Solution tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonialSlider && testimonials.length > 0) {
        let currentSlide = 0;
        const maxSlide = testimonials.length - 1;
        
        // Function to go to a specific slide
        const goToSlide = (slideIndex) => {
            testimonialSlider.style.transform = `translateX(-${slideIndex * 100}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });
            
            currentSlide = slideIndex;
        };
        
        // Initialize slider
        goToSlide(0);
        
        // Next slide
        nextBtn.addEventListener('click', () => {
            currentSlide = currentSlide === maxSlide ? 0 : currentSlide + 1;
            goToSlide(currentSlide);
        });
        
        // Previous slide
        prevBtn.addEventListener('click', () => {
            currentSlide = currentSlide === 0 ? maxSlide : currentSlide - 1;
            goToSlide(currentSlide);
        });
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
        
        // Auto slide (optional)
        let slideInterval = setInterval(() => {
            currentSlide = currentSlide === maxSlide ? 0 : currentSlide + 1;
            goToSlide(currentSlide);
        }, 5000);
        
        // Pause auto slide on hover
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialSlider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentSlide = currentSlide === maxSlide ? 0 : currentSlide + 1;
                goToSlide(currentSlide);
            }, 5000);
        });
    }
    
    // Smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (menu && menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    menuBtn.classList.remove('active');
                    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });
    
    // Animated scroll reveal
    const revealElements = document.querySelectorAll('.service-card, .about-content, .about-image, .solution-tabs, .testimonial, .contact-info, .contact-form');
    
    const revealElement = function() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };
    
    // Add CSS for reveal animation in JS to keep it together
    const revealStyle = document.createElement('style');
    revealStyle.textContent = `
        .service-card, .about-content, .about-image, .solution-tabs, .testimonial, .contact-info, .contact-form {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .service-card.active, .about-content.active, .about-image.active, .solution-tabs.active, .testimonial.active, .contact-info.active, .contact-form.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        .service-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .service-card:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .service-card:nth-child(4) {
            transition-delay: 0.6s;
        }
    `;
    document.head.appendChild(revealStyle);
    
    window.addEventListener('scroll', revealElement);
    
    // Trigger once on page load
    revealElement();
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validate form (basic validation)
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In a real scenario, you would send this data to a server
            // For demo purposes, just show a success message
            const formElements = contactForm.elements;
            for (let i = 0; i < formElements.length; i++) {
                formElements[i].disabled = true;
            }
            
            // Replace form with success message
            contactForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 20px;"></i>
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. We'll get back to you soon!</p>
                </div>
            `;
        });
    }

    // Countdown Timer
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 30); // 30 days from now
    
    function updateCountdown() {
        const currentTime = new Date();
        const difference = countdownDate - currentTime;
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
    // Notification Form
    const notificationForm = document.getElementById('notification-signup');
    
    notificationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = notificationForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        try {
            const response = await fetch('/api/notify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Show success message
                emailInput.value = '';
                showSuccessMessage('Thank you! We will notify you when we launch.');
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    });
    
    // Animated elements on scroll
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.partner-logo, .feature-item');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    }
    
    // Add CSS for animation
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .partner-logo, .feature-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .partner-logo.animated, .feature-item.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .feature-item:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .feature-item:nth-child(3) {
            transition-delay: 0.2s;
        }
        
        .feature-item:nth-child(4) {
            transition-delay: 0.3s;
        }
        
        .partner-logo:nth-child(2) {
            transition-delay: 0.1s;
        }
    `;
    document.head.appendChild(animationStyle);
    
    window.addEventListener('scroll', animateOnScroll);
    
    // Call once on page load
    setTimeout(animateOnScroll, 500);
});

// Success message display
function showSuccessMessage(message) {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>${message}</p>
    `;
    
    // Insert after form
    const notificationForm = document.getElementById('notification-signup');
    notificationForm.parentNode.insertBefore(successDiv, notificationForm.nextSibling);
    
    // Animate with GSAP
    gsap.fromTo(successDiv, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 }
    );
    
    // Remove after 5 seconds
    setTimeout(() => {
        gsap.to(successDiv, { 
            opacity: 0, 
            y: -20, 
            duration: 0.5,
            onComplete: () => successDiv.remove()
        });
    }, 5000);
}

// GSAP Animations
function startAnimations() {
    // Hero section animation
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .from('.logo', { 
            opacity: 0, 
            y: -50, 
            duration: 1 
        })
        .from('h1', { 
            opacity: 0, 
            y: 50, 
            duration: 0.8 
        }, '-=0.5')
        .from('.tagline', { 
            opacity: 0, 
            y: 30, 
            duration: 0.8 
        }, '-=0.5')
        .from('.feature-item', { 
            opacity: 0, 
            y: 30, 
            stagger: 0.2, 
            duration: 0.5 
        }, '-=0.3')
        .from('.countdown-item', { 
            opacity: 0, 
            scale: 0.8, 
            stagger: 0.15, 
            duration: 0.6,
            ease: "back.out(1.7)" 
        }, '-=0.2')
        .from('.notification-form', { 
            opacity: 0, 
            y: 30, 
            duration: 0.8 
        }, '-=0.3')
        .from('.robot-image', { 
            opacity: 0, 
            x: 100, 
            duration: 1 
        }, '-=1')
        .from('.pulse-dot', { 
            opacity: 0, 
            scale: 0, 
            stagger: 0.2, 
            duration: 0.6,
            ease: "elastic.out(1, 0.3)" 
        }, '-=0.5');
    
    // Partner logo animations
    gsap.from('.partner-logo', { 
        scrollTrigger: {
            trigger: '.brand-partners',
            start: 'top 80%'
        },
        opacity: 0,
        y: 50,
        stagger: 0.3,
        duration: 0.8
    });
    
    // Logo hover animations
    const partnerLogos = document.querySelectorAll('.partner-logo');
    
    partnerLogos.forEach(logo => {
        logo.addEventListener('mouseenter', () => {
            gsap.to(logo.querySelector('.partner-img'), {
                y: -10,
                rotation: 5,
                duration: 0.3
            });
        });
        
        logo.addEventListener('mouseleave', () => {
            gsap.to(logo.querySelector('.partner-img'), {
                y: 0,
                rotation: 0,
                duration: 0.3
            });
        });
    });
    
    // Footer animations
    gsap.from('.social-links a', {
        scrollTrigger: {
            trigger: 'footer',
            start: 'top 90%'
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.5
    });
    
    // Animated background
    animateCircuitBackground();
}

// Circuit background animation
function animateCircuitBackground() {
    // Create circuit lines
    const circuitContainer = document.querySelector('.circuit-animation');
    
    for (let i = 0; i < 15; i++) {
        const line = document.createElement('div');
        line.className = 'circuit-line';
        line.style.left = `${Math.random() * 100}%`;
        line.style.top = `${Math.random() * 100}%`;
        line.style.width = `${Math.random() * 100 + 50}px`;
        line.style.height = `2px`;
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        circuitContainer.appendChild(line);
        
        gsap.fromTo(line, 
            { opacity: 0, scale: 0 },
            { 
                opacity: 0.2, 
                scale: 1, 
                duration: 0.5 + Math.random(),
                delay: Math.random() * 2,
                repeat: -1,
                yoyo: true,
                repeatDelay: Math.random() * 5
            }
        );
    }
} 