// Page turn animation and interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Set current date in letter
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = currentDate.toLocaleDateString('en-US', options);
    }

    // Navigation smooth scroll with page turn effect
    const navLinks = document.querySelectorAll('.nav-link');
    const pageOverlay = document.querySelector('.page-turn-overlay');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Trigger page turn animation
            if (pageOverlay) {
                pageOverlay.classList.add('active');
                
                setTimeout(() => {
                    pageOverlay.classList.remove('active');
                }, 600);
            }
            
            // Smooth scroll to section
            setTimeout(() => {
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 300);
        });
    });

    // Sticky notes animation on scroll
    const stickyNotes = document.querySelectorAll('.sticky-note');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    stickyNotes.forEach(note => {
        note.style.opacity = '0';
        observer.observe(note);
    });

    // Polaroid hover effects with rotation
    const polaroids = document.querySelectorAll('.polaroid');
    
    polaroids.forEach(polaroid => {
        polaroid.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(0deg) scale(1.05) translateY(-10px)';
        });
        
        polaroid.addEventListener('mouseleave', function() {
            const originalRotation = this.style.transform.match(/rotate\(([^)]+)\)/);
            if (originalRotation) {
                this.style.transform = `rotate(${originalRotation[1]}) scale(1) translateY(0)`;
            } else {
                this.style.transform = 'rotate(-2deg) scale(1) translateY(0)';
            }
        });

        // Click to view project details (but not on links)
        polaroid.addEventListener('click', function(e) {
            // Don't trigger modal if clicking on the project link
            if (e.target.classList.contains('project-link')) {
                e.stopPropagation();
                return;
            }
            
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            const githubLink = this.querySelector('.project-link');
            showProjectDetails(title, description, githubLink ? githubLink.href : null);
        });
    });

    // Contact items interaction
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const link = this.querySelector('.contact-link');
            if (link && link.href) {
                // Show notification before opening link
                const linkText = link.textContent;
                showNotification(`Opening ${linkText}...`, 'info');
                
                // Open link after a short delay
                setTimeout(() => {
                    window.open(link.href, link.target || '_blank');
                }, 500);
            }
        });
        
        // Add hover effect with animation
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.animation = 'bounce 0.5s ease-out';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });

    // Skill tags interaction
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.animation = 'pulse 0.5s ease-out';
            
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.notebook-header');
        
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Dynamic typing effect for title
    const title = document.querySelector('.handwritten-title');
    if (title) {
        const originalText = title.textContent;
        title.textContent = '';
        let charIndex = 0;
        
        function typeWriter() {
            if (charIndex < originalText.length) {
                title.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    // Social links hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.animation = 'bounce 0.5s ease-out';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });

    // Add notebook paper sound effect simulation (visual feedback)
    let clickSound = false;
    document.addEventListener('click', function(e) {
        if (!clickSound) {
            clickSound = true;
            document.body.style.transition = 'filter 0.1s';
            document.body.style.filter = 'brightness(1.05)';
            
            setTimeout(() => {
                document.body.style.filter = 'brightness(1)';
                clickSound = false;
            }, 100);
        }
    });

    // Add rain drops effect (optional ambient animation)
    createAmbientEffects();
    
    // Animate pixel notebook
    animatePixelNotebook();
});

// Additional animation functions
function showProjectDetails(projectName, description, githubLink) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'project-modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    const modalContent = document.createElement('div');
    modalContent.className = 'project-modal';
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 10px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.8);
        transition: transform 0.3s ease;
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
    `;

    const githubButton = githubLink ? `
        <a href="${githubLink}" target="_blank" style="
            display: inline-block;
            background: linear-gradient(135deg, #333 0%, #000 100%);
            color: white;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 20px;
            font-family: 'Kalam', cursive;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-right: 10px;
        ">View on GitHub 🐙</a>
    ` : '';

    modalContent.innerHTML = `
        <h2 style="font-family: 'Permanent Marker', cursive; color: #2c3e50; margin-bottom: 20px;">${projectName}</h2>
        <p style="font-family: 'Caveat', cursive; font-size: 1.2rem; line-height: 1.6; color: #34495e; margin-bottom: 20px;">
            ${description}
        </p>
        <p style="font-family: 'Caveat', cursive; font-size: 1.1rem; line-height: 1.6; color: #7f8c8d; margin-bottom: 30px;">
            This project demonstrates technical expertise in modern web development, combining innovative solutions with clean, maintainable code. Each project represents unique challenges overcome through creative problem-solving and dedication to quality.
        </p>
        <div style="text-align: center; margin-top: 30px;">
            ${githubButton}
            <button onclick="closeProjectModal()" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 12px 25px;
                border-radius: 20px;
                font-family: 'Kalam', cursive;
                font-size: 1.1rem;
                cursor: pointer;
                transition: all 0.3s ease;
            ">Close</button>
        </div>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    // Animate modal appearance
    setTimeout(() => {
        modalOverlay.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);

    // Close modal on background click
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            closeProjectModal();
        }
    });
}

function closeProjectModal() {
    const modal = document.querySelector('.project-modal-overlay');
    if (modal) {
        modal.style.opacity = '0';
        const modalContent = modal.querySelector('.project-modal');
        modalContent.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        font-family: 'Kalam', cursive;
        font-size: 1.1rem;
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;

    // Set color based on type
    const colors = {
        success: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
        error: 'linear-gradient(135deg, #f44336 0%, #da190b 100%)',
        info: 'linear-gradient(135deg, #2196f3 0%, #0976d2 100%)'
    };

    notification.style.background = colors[type] || colors.info;
    notification.style.color = 'white';
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function createAmbientEffects() {
    // Create floating elements for ambient animation
    const ambientContainer = document.createElement('div');
    ambientContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 0;
    `;

    // Create floating shapes
    for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        const size = Math.random() * 30 + 20;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        shape.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${duration}s ease-in-out ${delay}s infinite;
        `;
        
        ambientContainer.appendChild(shape);
    }

    document.body.appendChild(ambientContainer);
}

function animatePixelNotebook() {
    const writingPixels1 = document.querySelectorAll('.pixel.writing1');
    const writingPixels2 = document.querySelectorAll('.pixel.writing2');
    const writingPixels3 = document.querySelectorAll('.pixel.writing3');
    const writingPixels4 = document.querySelectorAll('.pixel.writing4');
    
    // Hardcore sequential writing animation
    function animateWritingGroup(pixels, delay) {
        pixels.forEach((pixel, index) => {
            pixel.style.opacity = '0';
            pixel.style.animation = 'none';
            
            setTimeout(() => {
                pixel.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                pixel.style.opacity = '1';
                
                setTimeout(() => {
                    const animationName = pixel.classList[1].replace('writing', 'hardcoreWriting');
                    pixel.style.animation = `${animationName} 3s ease-in-out infinite`;
                }, 300);
            }, index * 100);
        });
    }
    
    // Stagger the writing groups
    animateWritingGroup(writingPixels1, 0);
    setTimeout(() => animateWritingGroup(writingPixels2, 500), 500);
    setTimeout(() => animateWritingGroup(writingPixels3, 1000), 1000);
    setTimeout(() => animateWritingGroup(writingPixels4, 1500), 1500);
    
    // Add intense sparkles to the notebook
    setInterval(() => {
        const paperPixels = document.querySelectorAll('.pixel.paper');
        const randomCount = Math.floor(Math.random() * 3) + 1;
        
        for (let i = 0; i < randomCount; i++) {
            const randomPixel = paperPixels[Math.floor(Math.random() * paperPixels.length)];
            if (randomPixel) {
                const colors = ['#fffacd', '#ffd700', '#ffeb3b', '#fff9c4', '#ffecb3'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                
                randomPixel.style.background = randomColor;
                randomPixel.style.boxShadow = `0 0 10px ${randomColor}`;
                randomPixel.style.transform = 'scale(1.2)';
                
                setTimeout(() => {
                    randomPixel.style.background = 'linear-gradient(135deg, #faf8f0 0%, #f5f3e8 100%)';
                    randomPixel.style.boxShadow = 'inset 0 0 1px rgba(0, 0, 0, 0.1)';
                    randomPixel.style.transform = 'scale(1)';
                }, 600);
            }
        }
    }, 2000);
    
    // Add border glow effect
    setInterval(() => {
        const borderPixels = document.querySelectorAll('.pixel.border');
        const randomBorder = borderPixels[Math.floor(Math.random() * borderPixels.length)];
        if (randomBorder) {
            randomBorder.style.background = '#8b4513';
            randomBorder.style.boxShadow = '0 0 5px #8b4513';
            
            setTimeout(() => {
                randomBorder.style.background = '#4a2c1a';
                randomBorder.style.boxShadow = 'inset 0 0 1px rgba(0, 0, 0, 0.5)';
            }, 400);
        }
    }, 1500);
    
    // Add 3D perspective effect on hover
    const notebook = document.querySelector('.notebook-pixels');
    if (notebook) {
        notebook.addEventListener('mousemove', (e) => {
            const rect = notebook.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            notebook.style.transform = `perspective(300px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        notebook.addEventListener('mouseleave', () => {
            notebook.style.transform = 'perspective(200px) rotateX(5deg)';
        });
    }
}

// Add custom keyframe animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0) translateX(0); }
        25% { transform: translateY(-20px) translateX(10px); }
        50% { transform: translateY(10px) translateX(-10px); }
        75% { transform: translateY(-10px) translateX(5px); }
    }
`;

document.head.appendChild(styleSheet);