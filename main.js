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

    // Shorter defaults and robust reveal tied to the actual end of the flowers' fade
    const startDelay = 800;      // small pause before starting the fade-out of the flowers
    const fallbackLetterDelay = 150;     // fallback delay to reveal text if no end event fires
    const scrollDuration = 180000;
    const fadeDuration = 3000;

    // reset classes (idempotent)
    flowers.classList.remove('fade-out');
    textContainer.classList.remove('visible');
    textContainer.classList.remove('ending');
    loveLetter.classList.remove('scroll-text');

    // Helper to show the text (idempotent)
    const showText = () => {
        if (!textContainer.classList.contains('visible')) {
            textContainer.classList.add('visible');
            loveLetter.classList.add('scroll-text');
        }
    };

    // Start the sequence: fade flowers then reveal text when the fade actually finishes
    setTimeout(() => {
        flowers.classList.add('fade-out');

        // Listen for animationend/transitionend on the flowers container and reveal text immediately
        const onFinish = (e) => {
            // ensure we only react to events coming from the flowers element itself
            if (e && e.target !== flowers) return;
            showText();
        };

        flowers.addEventListener('animationend', onFinish, { once: true });
        flowers.addEventListener('transitionend', onFinish, { once: true });

        // Small fallback in case no animation/transition event fires
        setTimeout(() => {
            showText();
        }, fallbackLetterDelay);
    }, startDelay);

    // compute timeouts for ending & final reset using the shorter fallbackLetterDelay
    const endFadeStart = startDelay + fallbackLetterDelay + scrollDuration - fadeDuration;
    const finalReset = startDelay + fallbackLetterDelay + scrollDuration + 1000;

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
