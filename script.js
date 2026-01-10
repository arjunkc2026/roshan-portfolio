// ===================================
// ROSHAN KUMAR YADAV PORTFOLIO
// Interactive JavaScript 🔥
// ===================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initScrollProgress();
    initBackToTop();
    initCustomCursor();
    initNavigation();
    initParticles();
    initTypingEffect();
    initScrollAnimations();
    initFormSubmission();
    initSmoothScroll();
    initMetricCounters();
    
    // Mobile optimizations
    initMobileOptimizations();
    initViewportFix();
});

// ===================================
// Loading Screen
// ===================================
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 2000);
    });
}

// ===================================
// Scroll Progress Bar
// ===================================
function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight);
        scrollProgress.style.transform = `scaleX(${scrolled})`;
    });
}

// ===================================
// Back to Top Button
// ===================================
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Custom Cursor - Simple Smoke Effect
// ===================================
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation with slower trail
    function animateFollower() {
        const speed = 0.1; // Slower for smoke effect
        
        followerX += (mouseX - followerX) * speed;
        followerY += (mouseY - followerY) * speed;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Simple hover effect
    const interactiveElements = document.querySelectorAll('a, button');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.3)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// ===================================
// Navigation
// ===================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ===================================
// Particle Canvas Animation
// ===================================
function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = this.getRandomColor();
        }
        
        getRandomColor() {
            const colors = ['#00f5ff', '#ff006e', '#ffbe0b'];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Mouse interaction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                this.x -= Math.cos(angle) * 2;
                this.y -= Math.sin(angle) * 2;
            }
            
            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    // Create particles
    function createParticles() {
        const particleCount = window.innerWidth < 768 ? 30 : 60;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    createParticles();
    
    // Track mouse position
    canvas.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Connect particles
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.strokeStyle = `rgba(0, 245, 255, ${0.2 * (1 - distance / 150)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animate);
    }
    animate();
}

// ===================================
// Typing Effect
// ===================================
function initTypingEffect() {
    const typedTextElement = document.querySelector('.typed-text');
    if (!typedTextElement) return;
    
    const texts = [
        'Digital Marketing Strategist',
        'SEO Specialist',
        'PPC Expert',
        'Social Media Guru',
        'Growth Hacker'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

// ===================================
// Scroll Animations
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements
    const animateElements = document.querySelectorAll(
        '.expertise-card, .achievement-item, .contact-method, .metric-item'
    );
    
    animateElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Counter animation for metrics
    const metricNumbers = document.querySelectorAll('.metric-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    metricNumbers.forEach(el => counterObserver.observe(el));
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const number = parseFloat(text.replace(/[^0-9.]/g, ''));
    
    let current = 0;
    const increment = number / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (number % 1 !== 0) {
            displayValue = current.toFixed(1);
        }
        
        element.textContent = displayValue + (hasPercent ? '%' : '') + (hasPlus ? '+' : '');
    }, stepTime);
}

// ===================================
// Metric Counters
// ===================================
function initMetricCounters() {
    const metricNumbers = document.querySelectorAll('.metric-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMetricCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    metricNumbers.forEach(el => counterObserver.observe(el));
}

function animateMetricCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const hasM = text.includes('M');
    
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        element.textContent = displayValue + (hasM ? 'M' : '') + (hasPercent ? '%' : '') + (hasPlus ? '+' : '');
    }, stepTime);
}

// ===================================
// Smooth Scroll
// ===================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Form Submission
// ===================================
function initFormSubmission() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Button loading state
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission (replace with actual API call)
        await simulateFormSubmission(data);
        
        // Success state
        submitBtn.querySelector('span').textContent = 'Message Sent! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc88 100%)';
        
        // Reset form
        form.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.background = '';
        }, 3000);
    });
}

// Simulate form submission
function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        console.log('Form data:', data);
        setTimeout(resolve, 1500);
    });
}

// ===================================
// Parallax Effect
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for floating orbs
    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.05;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===================================
// Performance Optimization
// ===================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for frequent events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// Easter Egg: Konami Code
// ===================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Create rainbow effect
    document.body.style.animation = 'rainbow 2s infinite';
    
    // Add rainbow keyframes if not exists
    if (!document.getElementById('rainbow-style')) {
        const style = document.createElement('style');
        style.id = 'rainbow-style';
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show message
    const message = document.createElement('div');
    message.textContent = '🎉 You found the secret! 🎉';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #00f5ff, #ff006e);
        padding: 30px 60px;
        border-radius: 20px;
        font-size: 28px;
        font-weight: 800;
        color: #000;
        z-index: 10000;
        animation: bounce 0.6s ease infinite;
    `;
    document.body.appendChild(message);
    
    // Remove after 3 seconds
    setTimeout(() => {
        message.remove();
        document.body.style.animation = '';
    }, 3000);
}

// ===================================
// Image Lazy Loading
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// Performance Monitoring
// ===================================
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            console.log('Performance:', entry.name, entry.duration);
        }
    });
    
    perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
}

// ===================================
// Dark/Light Mode Toggle (Optional)
// ===================================
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ===================================
// Mobile Optimizations
// ===================================
function initMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Hide custom cursor on mobile
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
        
        // Reduce particle opacity for better performance
        const canvas = document.getElementById('particleCanvas');
        if (canvas) canvas.style.opacity = '0.3';
        
        // Add mobile class to body
        document.body.classList.add('mobile-device');
    }
    
    // Prevent double-tap zoom on iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });
}

// ===================================
// Viewport Height Fix for Mobile Browsers
// ===================================
function initViewportFix() {
    function setViewportHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    setViewportHeight();
    
    // Update on resize and orientation change
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(setViewportHeight, 100);
    });
}

// ===================================
// Console Message
// ===================================
console.log('%c🔥 Welcome to Roshan\'s Portfolio! 🔥', 'color: #00f5ff; font-size: 24px; font-weight: bold;');
console.log('%cLooking for something? Try the Konami Code! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'color: #ff006e; font-size: 14px;');

// ===================================
// Export functions for testing
// ===================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initCustomCursor,
        initNavigation,
        initParticles,
        initTypingEffect,
        initScrollAnimations,
        initFormSubmission
    };
}