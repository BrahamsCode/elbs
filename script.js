// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Form validation and submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !phone || !service || !message) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }
    
    // Phone validation (Peru format)
    const phoneRegex = /^9[0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
        alert('Por favor, ingresa un teléfono válido (9 dígitos, empezando con 9).');
        return;
    }
    
    // Create WhatsApp message
    const whatsappMessage = `Hola Eliana,

Mi nombre es ${name} y me gustaría solicitar una consulta sobre:

Servicio solicitado: ${getServiceName(service)}
Mensaje: ${message}

Datos de contacto:
- Email: ${email}
- Teléfono: ${phone}`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/51947360922?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    contactForm.reset();
    alert('¡Mensaje preparado! Se abrirá WhatsApp para enviarlo.');
});

// Helper function to get service name
function getServiceName(value) {
    const services = {
        'formalizacion': 'Formalización de negocio',
        'contabilidad': 'Contabilidad mensual',
        'importaciones': 'Gestión de importaciones',
        'licitaciones': 'Asesoría en licitaciones',
        'otro': 'Otro servicio'
    };
    return services[value] || value;
}

// Add active state to navigation on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card').forEach((card) => {
    observer.observe(card);
});

document.querySelectorAll('.timeline-item').forEach((item) => {
    observer.observe(item);
});

document.querySelectorAll('.testimonial-card').forEach((card) => {
    observer.observe(card);
});

// Add CSS classes for animations
const style = document.createElement('style');
style.textContent = `
    .service-card, .timeline-item, .testimonial-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .service-card.animate, .timeline-item.animate, .testimonial-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Phone number formatter
const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    if (e.target.value.length > 9) {
        e.target.value = e.target.value.slice(0, 9);
    }
});

// Add character counter to message textarea
const messageTextarea = document.getElementById('message');
const charCounter = document.createElement('div');
charCounter.style.textAlign = 'right';
charCounter.style.fontSize = '0.8rem';
charCounter.style.color = '#6b7280';
charCounter.style.marginTop = '0.25rem';
messageTextarea.parentNode.appendChild(charCounter);

messageTextarea.addEventListener('input', () => {
    const charCount = messageTextarea.value.length;
    charCounter.textContent = `${charCount} caracteres`;
});

// Add form field focus effects
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Enhanced CSS for form focus effects
const formStyle = document.createElement('style');
formStyle.textContent = `
    .form-group.focused .form-control {
        border-color: var(--accent-color);
        box-shadow: 0 0 0 2px rgba(196, 18, 0, 0.2);
    }
`;
document.head.appendChild(formStyle);