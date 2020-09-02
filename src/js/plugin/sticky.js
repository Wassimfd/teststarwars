
(() => {
    sw = window.sw || {};

    sw.sticky =  {
        init() {
            // Check elements on page
            const elms = document.querySelectorAll('.sticky-panel');
    
            if (elms) {
                elms.forEach(item => {
                    this.handleSticky(item);
                });
            }
        },
        handleSticky(elm) {
            // Nav is sticky, we don't want our sticky panel to be over the menu
            const navHeight = document.querySelector('.nav').getBoundingClientRect().height;
            const stickyElm = elm.querySelector('[isSticky]');
    
    
            // If one element gets sticky
            if (stickyElm && !sw.isMobile()) {
                // Need firsts rect
                const initialRect = stickyElm.getBoundingClientRect();
                stickyElm.style.width = `${initialRect.width}px`;
    
                window.addEventListener('scroll', sw.debounce(() => {
                    let stickyRect = stickyElm.getBoundingClientRect();
                    let elmHeight = stickyRect.height;

                    let parentRect = elm.getBoundingClientRect();
                    let parentTop = parentRect.top;
                    let parentBottom = parentRect.bottom;
    
                    // When sticky elm reaches top
                    if (parentTop < navHeight) {
                        stickyElm.classList.add('js-sticky');
                        elm.style.paddingRight = `${initialRect.width}px`;
                        stickyElm.style.top = `${navHeight}px`;
                        stickyElm.style.left = `${initialRect.left}px`;

                        // When the sticky elm reaches bottom of parent div
                        if (parentBottom < elmHeight) {
                            stickyElm.classList.add('js-absolute');
                            stickyElm.style.left = 'auto';
                            stickyElm.style.top = 'auto';
                            stickyElm.style.right = 0;
                            stickyElm.style.width = initialRect.width;
                        } else {
                            stickyElm.classList.remove('js-absolute');
                        }
                    } else {
                        stickyElm.classList.remove('js-sticky');
                        elm.style.paddingRight = 0;
                    }
                }), 150);
            }
        }
    };    

    sw.sticky.init();
})();
