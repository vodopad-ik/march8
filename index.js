'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');

    envelope.addEventListener('click', () => {
        envelope.classList.toggle('open');

        // Добавляем небольшую вибрацию при клике (Haptic feedback для мобилок)
        if (window.navigator.vibrate) {
            window.navigator.vibrate(20);
        }
    });

    // Генерация дополнительных лепестков программно для разнообразия
    const decor = document.querySelector('.background-decor');
    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
        petal.style.animationDelay = (Math.random() * 10) + 's';
        petal.style.width = (Math.random() * 10 + 10) + 'px';
        petal.style.height = (Math.random() * 10 + 15) + 'px';
        decor.appendChild(petal);
    }
});