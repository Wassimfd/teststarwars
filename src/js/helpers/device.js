(() => {
    window.sw = window.sw || {};

    sw.isMobile = () => {
        return window.innerWidth <= 768;
    }
})();