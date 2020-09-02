(() => {
    sw = window.sw || {};
    
    sw.parallax = {
        init() {
            const elm = document.querySelectorAll('.parallax');
		
            if (elm) {
                requestAnimationFrame(() => {
                    this.handlePara(elm);
                });
            }
        },

        handlePara(elm) {
            elm.forEach((item) => {
                const scrollPos = window.pageYOffset;
                const elmTop = item.getBoundingClientRect().top;
                if (scrollPos - elmTop/2 > 0) {
                    const trfValue = elmTop / 2;
                    const speed = item.getAttribute('data-parallax-speed') ? item.getAttribute('data-parallax-speed') : .1;
                        item.style.transform = `translate3d(0, ${trfValue * speed}px, 0)`;	
                }
                
            });
            requestAnimationFrame(() => {
                this.handlePara(elm);
            });
        }
    };

    sw.parallax.init();
})();
