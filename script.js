document.addEventListener('DOMContentLoaded', () => {
    const rainContainer = document.getElementById('rain-container');
    const forgiveBtn = document.getElementById('forgive-btn');
    const sadContent = document.getElementById('sad-content');
    const happyContent = document.getElementById('happy-content');
    const body = document.body;

    // --- Magic Particles ---
    function createMagicParticles(x, y) {
        const particleCount = 20; // Reduced count for performance
        const container = document.createElement('div');
        container.id = 'magic-particles';
        document.body.appendChild(container);

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('magic-particle');

            // Random spread
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 50;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist;

            // Use transform for positioning to avoid layout thrashing
            particle.style.left = '0';
            particle.style.top = '0';
            particle.style.transform = `translate(${x}px, ${y}px)`;

            const size = Math.random() * 6 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            container.appendChild(particle);

            // Animate using Web Animations API for better performance
            particle.animate([
                { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 },
                { transform: `translate(${x + tx}px, ${y + ty - 10}px) scale(1)`, opacity: 1, offset: 0.2 },
                { transform: `translate(${x + tx}px, ${y + ty - 50}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1500,
                easing: 'ease-out',
                fill: 'forwards'
            }).onfinish = () => particle.remove();
        }

        // Cleanup container
        setTimeout(() => container.remove(), 2000);
    }

    // --- Rain Animation ---
    function createRain() {
        const dropCount = 60; // Reduced from 100 for performance
        const fragment = document.createDocumentFragment(); // Use fragment

        for (let i = 0; i < dropCount; i++) {
            const drop = document.createElement('div');
            drop.classList.add('drop');
            // Use left % is okay for static placement, but animation is CSS transform
            drop.style.left = Math.random() * 100 + 'vw';
            drop.style.animationDuration = Math.random() * 1 + 0.5 + 's';
            drop.style.animationDelay = Math.random() * 2 + 's';
            fragment.appendChild(drop);
        }
        rainContainer.appendChild(fragment);
    }

    createRain();

    // --- Interaction ---
    forgiveBtn.addEventListener('click', (e) => {
        // 0. Sound & Visuals
        // soundManager.playMagicalChime(); // Removed: soundManager not implemented

        const rect = forgiveBtn.getBoundingClientRect();
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;

        // Set coordinates for the mask origin
        body.style.setProperty('--btn-x', btnX + 'px');
        body.style.setProperty('--btn-y', btnY + 'px');

        createMagicParticles(btnX, btnY);

        // 1. Trigger Reveal Animation
        requestAnimationFrame(() => {
            body.classList.add('revealing');
            body.classList.add('sunny');
        });

        // 2. Stop Rain
        rainContainer.style.transition = 'opacity 1s ease';
        rainContainer.style.opacity = '0';

        // 3. Switch Content
        sadContent.style.opacity = '0';

        setTimeout(() => {
            sadContent.classList.add('hidden');
            happyContent.classList.remove('hidden');
            happyContent.classList.add('visible');

            // Trigger Confetti
            fireConfetti();
        }, 800);
    });

    // --- Confetti ---
    function fireConfetti() {
        const colors = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#e67e22', '#ff6b9d', '#00d9ff'];
        const shapes = ['circle', 'square', 'heart', 'star'];
        const emojis = ['❤️', '💕', '💖', '✨', '⭐', '🌟', '💫'];

        // Reduced bursts and particles per burst
        for (let burst = 0; burst < 3; burst++) {
            setTimeout(() => {
                const fragment = document.createDocumentFragment();
                for (let i = 0; i < 25; i++) {
                    const confetti = document.createElement('div');
                    const shape = shapes[Math.floor(Math.random() * shapes.length)];
                    const useEmoji = Math.random() > 0.6;

                    confetti.style.position = 'absolute';
                    // Start from center, but we will use transform
                    confetti.style.left = '0';
                    confetti.style.top = '0';
                    // Initial position at center of screen
                    const startX = window.innerWidth / 2;
                    const startY = window.innerHeight / 2;

                    confetti.style.zIndex = '1000';
                    confetti.style.pointerEvents = 'none';
                    confetti.style.willChange = 'transform';

                    if (useEmoji) {
                        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                        confetti.style.fontSize = '20px';
                    } else {
                        const size = Math.random() * 10 + 8;
                        confetti.style.width = size + 'px';
                        confetti.style.height = size + 'px';
                        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                        if (shape === 'circle') confetti.style.borderRadius = '50%';
                        else if (shape === 'square') confetti.style.borderRadius = '2px';
                        else {
                            confetti.textContent = shape === 'heart' ? '💖' : '⭐';
                            confetti.style.backgroundColor = 'transparent';
                            confetti.style.fontSize = size + 'px';
                        }
                    }

                    fragment.appendChild(confetti);

                    const angle = Math.random() * Math.PI * 2;
                    const velocity = Math.random() * 200 + 100;
                    const tx = Math.cos(angle) * velocity;
                    const ty = Math.sin(angle) * velocity - 50;
                    const rotation = Math.random() * 720 - 360;

                    confetti.animate([
                        { transform: `translate(${startX}px, ${startY}px) scale(0) rotate(0deg)`, opacity: 1 },
                        { transform: `translate(${startX + tx}px, ${startY + ty}px) scale(1.2) rotate(${rotation * 0.5}deg)`, opacity: 1, offset: 0.3 },
                        { transform: `translate(${startX + tx * 1.5}px, ${startY + ty * 1.5 + 100}px) scale(0.8) rotate(${rotation}deg)`, opacity: 0 }
                    ], {
                        duration: 2000 + Math.random() * 1000,
                        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        fill: 'forwards'
                    }).onfinish = () => confetti.remove();
                }
                document.body.appendChild(fragment);
            }, burst * 300);
        }
    }
});
