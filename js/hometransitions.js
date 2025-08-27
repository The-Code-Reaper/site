document.addEventListener('DOMContentLoaded', () => {
    const panels = document.querySelectorAll('.panel');

    // ===== Background + central fade-in =====
    document.body.classList.add('loaded');

    // After fade-in, show panels
    setTimeout(() => {
        document.body.classList.add('panels-ready');
    }, 1500); // after body + center done

    // After panels, show corner boxes
    setTimeout(() => {
        document.body.classList.add('boxes-ready');
    }, 2500); // wait a bit longer for corner fade-in

    // ===== Panel click expand =====
    panels.forEach(panel => {
        panel.addEventListener('click', (event) => {
            event.preventDefault();
            const targetUrl = panel.href;

            panel.classList.add('expand');

            setTimeout(() => {
                window.location.href = targetUrl;
            }, 600);
        });
    });
});
