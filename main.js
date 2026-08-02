window.addEventListener("DOMContentLoaded", () => {
    const flowers = document.getElementById('flowersContainer');
    const textContainer = document.getElementById('textContainer');
    const loveLetter = document.getElementById('loveLetter');
    const audio = document.getElementById('bgMusic');

    if (audio) {
        audio.volume = 0.35;
        audio.load();

        const startMusic = () => {
            audio.play().catch(() => {
                // Browser autoplay restrictions may still block playback until the user interacts.
            });
        };

        document.addEventListener('pointerdown', startMusic, { once: true });
        document.addEventListener('keydown', startMusic, { once: true });
    }

    if (!flowers || !textContainer || !loveLetter) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const startDelay = 10000;
    const letterDelay = 1000;
    const scrollDuration = isMobile ? 60000 : 50000;
    const fadeDuration = 3000;

    loveLetter.style.setProperty('--scroll-duration', `${scrollDuration / 1000}s`);
    loveLetter.style.setProperty('--scroll-start', isMobile ? '5%' : '18%');
    loveLetter.style.setProperty('--scroll-end', isMobile ? '-55%' : '-72%');

    flowers.classList.remove('fade-out');
    textContainer.classList.remove('visible');
    textContainer.classList.remove('ending');
    loveLetter.classList.remove('scroll-text');

    setTimeout(() => {
        flowers.classList.add('fade-out');

        setTimeout(() => {
            textContainer.classList.add('visible');
            loveLetter.classList.add('scroll-text');
        }, letterDelay);
    }, startDelay);

    const endFadeStart = startDelay + letterDelay + scrollDuration - fadeDuration;
    const finalReset = startDelay + letterDelay + scrollDuration + 300;

    setTimeout(() => {
        textContainer.classList.add('ending');
    }, endFadeStart);

    setTimeout(() => {
        loveLetter.classList.remove('scroll-text');
        textContainer.classList.remove('visible');
        textContainer.classList.remove('ending');
        flowers.classList.remove('fade-out');
    }, finalReset);
});
