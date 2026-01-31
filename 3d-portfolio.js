// Main 3D Portfolio Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D scene
    init3DScene();

    // Initialize floating particles
    initParticles();

    // Add 3D effects to existing elements
    enhanceWith3DEffects();

    // Add scroll animations
    initScrollAnimations();

    // Add mouse interaction effects
    initMouseInteractions();
});

// Three.js 3D Scene
function init3DScene() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded. Skipping 3D scene initialization.');
        return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const container = document.createElement('div');
    container.id = 'three-container';
    container.appendChild(renderer.domElement);
    document.body.prepend(container);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00d4ff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create floating geometric shapes
    const shapes = [];
    const geometryTypes = [
        new THREE.IcosahedronGeometry(1, 0),
        new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16),
        new THREE.OctahedronGeometry(1, 0),
        new THREE.TorusGeometry(1, 0.4, 16, 100)
    ];

    // Create multiple floating shapes
    for (let i = 0; i < 8; i++) {
        const geometry = geometryTypes[i % geometryTypes.length];
        const material = new THREE.MeshStandardMaterial({
            color: i % 3 === 0 ? 0x00d4ff : (i % 3 === 1 ? 0xff0055 : 0x9d4edd),
            metalness: 0.7,
            roughness: 0.2,
            transparent: true,
            opacity: 0.3
        });

        const mesh = new THREE.Mesh(geometry, material);

        // Random position
        mesh.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10
        );

        // Random scale
        const scale = Math.random() * 0.5 + 0.5;
        mesh.scale.set(scale, scale, scale);

        // Store rotation speed
        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            },
            floatSpeed: Math.random() * 0.02 + 0.01,
            floatAmplitude: Math.random() * 0.5 + 0.3,
            initialY: mesh.position.y
        };

        scene.add(mesh);
        shapes.push(mesh);
    }

    // Camera position
    camera.position.z = 15;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Animate shapes
        shapes.forEach((shape, index) => {
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;

            // Floating animation
            shape.position.y = shape.userData.initialY +
                Math.sin(Date.now() * shape.userData.floatSpeed) *
                shape.userData.floatAmplitude;

            // Gentle rotation based on mouse position
            shape.rotation.y += mouseX * 0.0005;
            shape.rotation.x += mouseY * 0.0005;
        });

        // Camera movement based on mouse
        camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 3 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Start animation
    animate();
}

// Particle.js Background
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#00d4ff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00d4ff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
}

// Enhance existing elements with 3D effects
function enhanceWith3DEffects() {
    // Add 3D cards to all project cards
    document.querySelectorAll('.project-card, .skill-item, .experience-item').forEach(card => {
        card.classList.add('card-3d');
        card.classList.add('float-element');
    });

    // Add glow effect to headings
    document.querySelectorAll('h1, h2').forEach(heading => {
        heading.classList.add('glow-text');
    });

    // Add floating animation to profile image
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.classList.add('float-element');
        profileImg.style.animationDelay = '0.5s';
    }

    // Add particle background container
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-js';
    document.body.prepend(particlesContainer);
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                // Add sequential animation delay
                if (entry.target.classList.contains('card-3d')) {
                    const cards = document.querySelectorAll('.card-3d');
                    const index = Array.from(cards).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);

    // Observe all 3D cards
    document.querySelectorAll('.card-3d').forEach(card => {
        observer.observe(card);
    });
}

// Mouse Interaction Effects
function initMouseInteractions() {
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.card-3d');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = ((centerY - y) / centerY) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;

            // Add glow effect
            const glowIntensity = Math.sqrt(
                Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
            ) / Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

            card.style.boxShadow = `
                0 15px 35px rgba(0, 212, 255, ${0.2 - glowIntensity * 0.1}),
                inset 0 0 20px rgba(0, 212, 255, ${0.1 - glowIntensity * 0.05})
            `;
        });
    });

    // Reset transform when mouse leaves
    document.addEventListener('mouseleave', () => {
        document.querySelectorAll('.card-3d').forEach(card => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
}

// Parallax Scrolling Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    const bgElements = document.querySelectorAll('.bg-parallax');
    bgElements.forEach(element => {
        element.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
});

// 3D Button Effects
document.querySelectorAll('.btn-3d').forEach(button => {
    button.addEventListener('mousedown', () => {
        button.style.transform = 'translateY(4px)';
    });

    button.addEventListener('mouseup', () => {
        button.style.transform = 'translateY(0)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
});
