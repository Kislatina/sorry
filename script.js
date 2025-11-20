document.addEventListener('DOMContentLoaded', () => {
    const rainContainer = document.getElementById('rain-container');
    const forgiveBtn = document.getElementById('forgive-btn');
    const sadContent = document.getElementById('sad-content');
    const happyContent = document.getElementById('happy-content');
    const body = document.body;

    // Create Rain
    function createRain() {
        const dropCount = 100;
        for (let i = 0; i < dropCount; i++) {
            const drop = document.createElement('div');
            drop.classList.add('drop');
            drop.style.left = Math.random() * 100 + 'vw';
            drop.style.animationDuration = Math.random() * 1 + 0.5 + 's';
            drop.style.animationDelay = Math.random() * 2 + 's';
            rainContainer.appendChild(drop);
        }
    }

    createRain();

    // Handle Forgive Button Click
    forgiveBtn.addEventListener('click', () => {
        // 1. Stop Rain (fade out)
        rainContainer.style.transition = 'opacity 1s ease';
        rainContainer.style.opacity = '0';

        // 2. Change Background to Sunny
        body.classList.add('sunny');

        // 3. Switch Content
        sadContent.style.opacity = '0';
        setTimeout(() => {
            sadContent.classList.add('hidden');
            happyContent.classList.remove('hidden');
            happyContent.classList.add('visible');
            
            // Trigger Confetti
            fireConfetti();
        }, 500);
    });

    // Enhanced Confetti Effect
    function fireConfetti() {
        const colors = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#e67e22', '#ff6b9d', '#00d9ff'];
        const shapes = ['circle', 'square', 'heart', 'star'];
        const emojis = ['❤️', '💕', '💖', '✨', '⭐', '🌟', '💫'];

        // Create multiple bursts for better effect
        for (let burst = 0; burst < 3; burst++) {
            setTimeout(() => {
                for (let i = 0; i < 30; i++) {
                    const confetti = document.createElement('div');
                    const shape = shapes[Math.floor(Math.random() * shapes.length)];
                    const useEmoji = Math.random() > 0.6;

                    confetti.style.position = 'absolute';
                    confetti.style.left = '50%';
                    confetti.style.top = '50%';
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

                        if (shape === 'circle') {
                            confetti.style.borderRadius = '50%';
                        } else if (shape === 'square') {
                            confetti.style.borderRadius = '2px';
                        } else if (shape === 'heart') {
                            confetti.textContent = '💖';
                            confetti.style.backgroundColor = 'transparent';
                            confetti.style.fontSize = size + 'px';
                        } else if (shape === 'star') {
                            confetti.textContent = '⭐';
                            confetti.style.backgroundColor = 'transparent';
                            confetti.style.fontSize = size + 'px';
                        }
                    }

                    document.body.appendChild(confetti);

                    const angle = Math.random() * Math.PI * 2;
                    const velocity = Math.random() * 150 + 100;
                    const tx = Math.cos(angle) * velocity;
                    const ty = Math.sin(angle) * velocity - 50;
                    const rotation = Math.random() * 720 - 360;

                    confetti.animate([
                        {
                            transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
                            opacity: 1
                        },
                        {
                            transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.2) rotate(${rotation * 0.5}deg)`,
                            opacity: 1,
                            offset: 0.3
                        },
                        {
                            transform: `translate(calc(-50% + ${tx * 1.5}px), calc(-50% + ${ty * 1.5 + 100}px)) scale(0.8) rotate(${rotation}deg)`,
                            opacity: 0
                        }
                    ], {
                        duration: 2000 + Math.random() * 1000,
                        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        fill: 'forwards'
                    }).onfinish = () => confetti.remove();
                }
            }, burst * 200);
        }

        // Add floating hearts
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                const heart = document.createElement('div');
                heart.textContent = '❤️';
                heart.style.position = 'absolute';
                heart.style.left = Math.random() * 80 + 10 + '%';
                heart.style.bottom = '-50px';
                heart.style.fontSize = Math.random() * 20 + 25 + 'px';
                heart.style.zIndex = '1000';
                heart.style.pointerEvents = 'none';
                heart.style.willChange = 'transform';
                document.body.appendChild(heart);

                heart.animate([
                    {
                        transform: 'translateY(0) rotate(0deg) scale(0.5)',
                        opacity: 0
                    },
                    {
                        transform: 'translateY(-100px) rotate(10deg) scale(1)',
                        opacity: 1,
                        offset: 0.1
                    },
                    {
                        transform: 'translateY(-300px) rotate(-10deg) scale(1.1)',
                        opacity: 1,
                        offset: 0.5
                    },
                    {
                        transform: `translateY(-${window.innerHeight + 100}px) rotate(15deg) scale(0.8)`,
                        opacity: 0
                    }
                ], {
                    duration: 4000 + Math.random() * 2000,
                    delay: i * 300,
                    easing: 'ease-out',
                    fill: 'forwards'
                }).onfinish = () => heart.remove();
            }
        }, 500);
    }
});
