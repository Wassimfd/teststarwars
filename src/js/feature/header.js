(() => {
    window.sw = window.sw || {};
    
    sw.navigation = {
        init() {
            const toggleNav = document.querySelector('.js-toggle-nav');
            const nav = document.querySelector('.nav');
            
            // We assume nav and toggle nav is present on everypage
            toggleNav.addEventListener('click', () => {
                toggleNav.classList.toggle('js-active');
                nav.classList.toggle('js-active');
                // aria-roles a11y
                toggleNav.setAttribute('aria-expanded', toggleNav.classList.contains('js-active'));
            });
        },
    };

    sw.navigation.init();
})();
