// Theme toggle, ripple effect, and current year

const DEFAULT_THEME = 'dark'; // Change this to 'light' for light theme by default

document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const icon = themeToggle?.querySelector('.material-symbols-outlined');
    const savedTheme = localStorage.getItem('theme');
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (icon) {
            icon.textContent = theme === 'light' ? 'light_mode' : 'dark_mode';
            icon.classList.remove('theme-anim');
            void icon.offsetWidth; // trigger reflow for animation
            icon.classList.add('theme-anim');
        }
    }
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(DEFAULT_THEME); // Use variable for default theme
    }
    themeToggle?.addEventListener('click', function() {
        const current = document.documentElement.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    // Ripple effect for buttons
    document.querySelectorAll('.md-btn').forEach(btn => {
        btn.addEventListener('mousedown', function(e) {
            const ripple = btn.querySelector('.ripple');
            if (!ripple) return;
            ripple.classList.remove('show');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
            ripple.classList.add('show');
            setTimeout(() => ripple.classList.remove('show'), 500);
        });
    });
});

// Ripple animation
const style = document.createElement('style');
style.textContent = `
.md-btn .ripple {
    pointer-events: none;
    opacity: 0;
    transform: scale(0);
    transition: opacity 0.3s, transform 0.3s;
}
.md-btn .ripple.show {
    opacity: 0.4;
    transform: scale(2.5);
    transition: opacity 0.5s, transform 0.5s;
}
.theme-toggle .material-symbols-outlined.theme-anim {
    animation: theme-icon-flip 0.4s cubic-bezier(.4,2,.6,1) both;
}
@keyframes theme-icon-flip {
    0% { transform: rotateY(0deg); opacity: 1; }
    50% { transform: rotateY(90deg); opacity: 0.2; }
    51% { opacity: 0.2; }
    100% { transform: rotateY(0deg); opacity: 1; }
}
`;
document.head.appendChild(style);
