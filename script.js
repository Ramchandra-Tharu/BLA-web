document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Section Image Slider ---
    const heroSection = document.querySelector('.hero-section');

    // Add image URLs here
    const images = [
        'school-banner.jpg',
        'https://placehold.co/1920x1080/2ecc71/ffffff?text=Computer+Lab',
        'https://placehold.co/1920x1080/3498db/ffffff?text=Classroom',
        'https://placehold.co/1920x1080/e74c3c/ffffff?text=Students'
    ];

    let currentImageIndex = 0;

    // Set the first image
    heroSection.style.backgroundImage = `url('${images[0]}')`;
    heroSection.style.backgroundSize = 'cover';
    heroSection.style.backgroundPosition = 'center';
    heroSection.style.transition = 'background-image 1s ease-in-out';

    // Change image every 3 seconds
    function changeBackgroundImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        heroSection.style.backgroundImage = `url('${images[currentImageIndex]}')`;
    }

    setInterval(changeBackgroundImage, 3000);

    // --- Dynamic Stats Counter ---
    const counters = document.querySelectorAll('.counter');

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 3000;
        let startTime = null;

        const animateCount = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const currentValue = Math.floor(progress * target);
            counter.innerText = currentValue;

            if (progress < 1) {
                requestAnimationFrame(animateCount);
            } else {
                counter.innerText = target;
            }
        };

        requestAnimationFrame(animateCount);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});
