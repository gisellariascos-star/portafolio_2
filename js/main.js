document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Iconos Lucide
    if (window.lucide) {
        lucide.createIcons();
    }

    // Año actual
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 1. ANIMACIÓN DE TILT 3D EN FOTO DE HERO
    const card = document.getElementById('tiltCard');
    if (card) {
        const container = card.parentElement;
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const tiltX = (y / rect.height) * -20;
            const tiltY = (x / rect.width) * 20;
            card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        container.addEventListener('mouseleave', () => {
            card.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    }

    // 2. REVELADO PROGRESIVO DE TEXTO
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.reveal-text').forEach(el => revealObserver.observe(el));
});

// 3. MODALES Y GALERÍA
const projectsData = {
    packaging: {
        title: "Packaging",
        description: "Diseño de empaques e identidad visual para productos orgánicos y artesanales. Enfoque en la sostenibilidad, elección de paletas cromáticas vibrantes y estructuras innovadoras.",
        images: [
            "images/packaging-1.png",
            
        ]
    },
    afiche: {
        title: "Diseño de Afiches",
        description: "Colección de carteles publicitarios y conceptuales para eventos culturales y festivales artísticos. Exploración tipográfica audaz y jerarquía visual.",
        images: [
            "images/afiche-1.png",
            
        ]
    },
    infografia: {
        title: "Diseño de Infografías",
        description: "Diagramación compleja y síntesis visual de datos y procesos orientados a la comunicación educativa y corporativa.",
        images: [
            "images/infografia-1.png",
            
        ]
    }
};

function openModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;

    const gallery = document.getElementById('modalGallery');
    gallery.innerHTML = '';

    project.images.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = project.title;
        img.className = "w-full h-48 sm:h-56 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity border border-brand-purple/30";
        img.onclick = () => openLightbox(imgSrc);
        gallery.appendChild(img);
    });

    document.getElementById('projectModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('projectModal').classList.add('hidden');
}

function openLightbox(src) {
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightbox').classList.remove('hidden');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.add('hidden');
}

function handleFormSubmit(e) {
    e.preventDefault();
    document.getElementById('contactForm').classList.add('hidden');
    document.getElementById('formSuccess').classList.remove('hidden');
}
