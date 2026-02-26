'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const container = document.querySelector('.container');

    // Звуковой эффект (используем публичный URL для примера)
    const openSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    openSound.volume = 0.5;

    let hasFiredSalute = false;

    envelope.addEventListener('click', () => {
        const isOpen = envelope.classList.contains('open');
        envelope.classList.toggle('open');

        if (!isOpen) {
            openSound.play().catch(e => console.log('Audio play failed:', e));

            // Запуск салюта при первом открытии
            if (!hasFiredSalute && window.confetti) {
                const count = 200;
                const defaults = {
                    origin: { y: 0.7 },
                    zIndex: 1000,
                    colors: ['#6a1b9a', '#8e24aa', '#ab47bc', '#ce93d8', '#f8bbd0'] // Фиолетовый градиент
                };

                function fire(particleRatio, opts) {
                    confetti(Object.assign({}, defaults, opts, {
                        particleCount: Math.floor(count * particleRatio)
                    }));
                }

                fire(0.25, { spread: 26, startVelocity: 55 });
                fire(0.2, { spread: 60 });
                fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
                fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
                fire(0.1, { spread: 120, startVelocity: 45 });

                hasFiredSalute = true;
            }
        }

        if (window.navigator.vibrate) {
            window.navigator.vibrate(20);
        }
    });

    // --- ПАРАЛЛАКС ЭФФЕКТ ---

    // 1. Для десктопа (движение мыши)
    document.addEventListener('mousemove', (e) => {
        if (envelope.classList.contains('open')) return; // Отключаем при открытии для стабильности

        const x = (window.innerWidth / 2 - e.pageX) / 25;
        const y = (window.innerHeight / 2 - e.pageY) / 25;

        envelope.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    });

    // 2. Для мобилок (наклон устройства)
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
            if (envelope.classList.contains('open')) return;

            // Ограничиваем наклон
            const tiltX = Math.min(Math.max(e.beta - 45, -20), 20); // Наклон вперед-назад
            const tiltY = Math.min(Math.max(e.gamma, -20), 20);      // Наклон влево-вправо

            envelope.style.transform = `rotateY(${tiltY}deg) rotateX(${tiltX}deg)`;
        });
    }

    // --- ДИНАМИЧЕСКИЙ ТЕКСТ (УНИКАЛИЗАЦИЯ) ---
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || '';
    const text = params.get('text');
    const photo = params.get('photo');

    if (name) {
        document.getElementById('user-name').innerText = name;
    } else {
        document.getElementById('greeting-title').innerText = 'С 8 Марта! 🌷';
    }

    if (text) {
        document.getElementById('user-text').innerText = text;
    }

    if (photo) {
        const photoEl = document.getElementById('recipient-photo');
        // Если в photo указано просто имя файла (например, masha.jpg), 
        // то добавляем путь к папке photos/
        const fullPhotoUrl = (photo.includes('/') || photo.includes('http')) ? photo : `photos/${photo}`;

        photoEl.style.backgroundImage = `url('${fullPhotoUrl}')`;
        photoEl.style.display = 'block';
    }
    const decor = document.querySelector('.background-decor');
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 5 + 7) + 's';
        petal.style.animationDelay = (Math.random() * 10) + 's';
        petal.style.width = (Math.random() * 10 + 10) + 'px';
        petal.style.height = (Math.random() * 10 + 15) + 'px';
        petal.style.opacity = Math.random() * 0.6 + 0.2;
        decor.appendChild(petal);
    }
});