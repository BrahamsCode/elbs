const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.service-tab');
    const empresasGrid = document.getElementById('empresas-grid');
    const gobiernoGrid = document.getElementById('gobierno-grid');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            if (tab.dataset.target === 'empresas') {
                empresasGrid.classList.remove('hidden');
                gobiernoGrid.classList.add('hidden');
            } else {
                empresasGrid.classList.add('hidden');
                gobiernoGrid.classList.remove('hidden');
            }
        });
    });
});

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

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !phone || !service || !message) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }
    
    const phoneRegex = /^9[0-9]{8}$/;
    if (!phoneRegex.test(phone)) {
        alert('Por favor, ingresa un teléfono válido (9 dígitos, empezando con 9).');
        return;
    }
    
    const whatsappMessage = `Hola Eliana,

Mi nombre es *${name}* y me gustaría solicitar una consulta sobre:

*Servicio solicitado:* ${getServiceName(service)}

*Mensaje:* ${message}

*Datos de contacto:*
📧 Email: ${email}
📱 Teléfono: ${phone}

Espero tu respuesta. ¡Gracias!`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/51947360922?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    contactForm.reset();
    alert('¡Mensaje preparado! Se abrirá WhatsApp para enviarlo.');
});

function getServiceName(value) {
    const services = {
        'formalizacion': 'Formalización de negocio',
        'contabilidad': 'Contabilidad mensual',
        'importaciones': 'Gestión de importaciones',
        'licitaciones': 'Asesoría en licitaciones',
        'municipal': 'Servicios municipales',
        'planilla': 'Gestión de planillas',
        'otro': 'Otro servicio'
    };
    return services[value] || value;
}

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

document.querySelectorAll('.service-card').forEach((card) => {
    observer.observe(card);
});

document.querySelectorAll('.timeline-item').forEach((item) => {
    observer.observe(item);
});

document.querySelectorAll('.testimonial-card').forEach((card) => {
    observer.observe(card);
});

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
    .expertise-item {
        opacity: 0;
        transform: translateX(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .expertise-item.animate {
        opacity: 1;
        transform: translateX(0);
    }
    .metric-card {
        opacity: 0;
        transform: scale(0.8);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .metric-card.animate {
        opacity: 1;
        transform: scale(1);
    }
    .hidden {
        display: none !important;
    }
`;
document.head.appendChild(style);

const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    if (e.target.value.length > 9) {
        e.target.value = e.target.value.slice(0, 9);
    }
});

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

const formStyle = document.createElement('style');
formStyle.textContent = `
    .form-group.focused .form-control {
        border-color: var(--accent-color);
        box-shadow: 0 0 0 2px rgba(196, 18, 0, 0.2);
    }
`;
document.head.appendChild(formStyle);

document.querySelectorAll('.expertise-item').forEach((item, index) => {
    setTimeout(() => {
        item.classList.add('animate');
    }, index * 100);
});

const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.metric-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 100);
            });
        }
    });
}, { threshold: 0.1 });

const performanceMetrics = document.querySelector('.performance-metrics');
if (performanceMetrics) {
    metricsObserver.observe(performanceMetrics);
}

const heroText = document.querySelector('.hero h1');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    let index = 0;
    
    function typeWriter() {
        if (index < text.length) {
            heroText.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }
    
    setTimeout(typeWriter, 500);
}

document.querySelectorAll('.testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
    });
});

const urgencyBanner = document.querySelector('.urgency-banner');
if (urgencyBanner) {
    setInterval(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 18 || currentHour < 9) {
            urgencyBanner.style.opacity = '0.7';
        } else {
            urgencyBanner.style.opacity = '1';
        }
    }, 60000);
}

document.querySelectorAll('.btn-primary, .btn-secondary, .btn-urgency').forEach(btn => {
    btn.addEventListener('click', () => {
        const buttonText = btn.textContent.trim();
        console.log(`Button clicked: ${buttonText}`);
        // Here you could add analytics tracking
    });
});