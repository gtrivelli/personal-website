/* ===================================================================
 * Ceevee 2.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function(html) {

    "use strict";
    
    html.className = html.className.replace(/\bno-js\b/g, '') + ' js ';


   /* Preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;

        window.addEventListener('load', function() {
            
            document.querySelector('body').classList.remove('ss-preload');
            document.querySelector('body').classList.add('ss-loaded');

            preloader.addEventListener('transitionend', function(e) {
                if (e.target.matches("#preloader")) {
                    this.style.display = 'none';
                }
            });

        });

        // force page scroll position to top at page refresh
        // window.addEventListener('beforeunload' , function () {
        //     window.scrollTo(0, 0);
        // });

    }; // end ssPreloader


   /* Parallax
    * -------------------------------------------------- */
    const ssParallax = function() { 

        const rellax = new Rellax('.rellax');

    }; // end ssParallax


   /* Move header menu
    * -------------------------------------------------- */
    const ssMoveHeader = function () {

        const hdr = document.querySelector('.s-header');
        const hero = document.querySelector('#home');
        let triggerHeight;

        if (!(hdr && hero)) {
            return;
        }

        setTimeout(function(){
            triggerHeight = hero.offsetHeight - 170;
        }, 300);

        window.addEventListener('scroll', function () {

            let loc = window.scrollY;
           
            // Add scrolled class for frosted glass effect
            if (loc > 50) {
                hdr.classList.add('scrolled');
            } else {
                hdr.classList.remove('scrolled');
            }

        });

    }; // end ssMoveHeader


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.s-header__menu-toggle');
        const headerNavWrap = document.querySelector('.s-header__nav-wrap');
        const siteBody = document.querySelector("body");

        if (!(toggleButton && headerNavWrap)) return;

        toggleButton.addEventListener('click', function(event){
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        headerNavWrap.querySelectorAll('.s-header__nav a').forEach(function(link) {
            link.addEventListener("click", function(evt) {

                // at 800px and below
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 800px
            if (window.matchMedia('(min-width: 801px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains("is-clicked")) toggleButton.classList.remove("is-clicked");
            }
        });

    }; // end ssMobileMenu


   /* Highlight active menu link on pagescroll
    * ------------------------------------------------------ */
    const ssScrollSpy = function() {

        const sections = document.querySelectorAll(".target-section");

        // Add an event listener listening for scroll
        window.addEventListener("scroll", navHighlight);

        function navHighlight() {
        
            // Get current scroll position
            let scrollY = window.pageYOffset;
            let currentSectionId = null;
            let maxVisibleArea = 0;
            const viewportHeight = window.innerHeight;
            const headerOffset = 150;
        
            // First, remove all current classes
            sections.forEach(function(section) {
                const sectionId = section.getAttribute("id");
                const navLink = document.querySelector(".s-header__nav a[href*=" + sectionId + "]");
                if (navLink) {
                    navLink.parentNode.classList.remove("current");
                }
            });
        
            // Find the section with the most visible area
            sections.forEach(function(section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionBottom = sectionTop + sectionHeight;
                const sectionId = section.getAttribute("id");
                
                // Calculate how much of this section is visible in the viewport
                const visibleTop = Math.max(scrollY + headerOffset, sectionTop);
                const visibleBottom = Math.min(scrollY + viewportHeight, sectionBottom);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                
                // Only consider sections that have meaningful visibility
                if (visibleHeight > 100 && visibleHeight > maxVisibleArea) {
                    maxVisibleArea = visibleHeight;
                    currentSectionId = sectionId;
                }
            });
            
            // If no section was found, default to the first section (home)
            if (!currentSectionId && sections.length > 0) {
                currentSectionId = sections[0].getAttribute("id");
            }
            
            // Highlight the current section
            if (currentSectionId) {
                const navLink = document.querySelector(".s-header__nav a[href*=" + currentSectionId + "]");
                if (navLink) {
                    navLink.parentNode.classList.add("current");
                }
            }
        }

    }; // end ssScrollSpy


   /* Swiper
    * ------------------------------------------------------ */ 
    const ssSwiper = function() {

        const mySwiper = new Swiper('.swiper-container', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },          
            breakpoints: {
                // when window width is >= 401px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is >= 801px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 48
                }
            }
         });

    }; // end ssSwiper


   /* Lightbox
    * ------------------------------------------------------ */
    const ssLightbox = function() {

        const folioLinks = document.querySelectorAll('.folio-item a');
        const modals = [];

        folioLinks.forEach(function(link) {
            let modalbox = link.getAttribute('href');
            // Only create lightbox for modal selectors (starting with #), skip external URLs
            if (modalbox && modalbox.startsWith('#')) {
                let instance = basicLightbox.create(
                    document.querySelector(modalbox),
                    {
                        onShow: function(instance) {
                            //detect Escape key press
                            document.addEventListener("keydown", function(evt) {
                                evt = evt || window.event;
                                if(evt.keyCode === 27){
                                instance.close();
                                }
                            });
                        }
                    }
                )
                modals.push(instance);
            }
        });

        // Only add click handlers for modal links
        let modalIndex = 0;
        folioLinks.forEach(function(link) {
            let modalbox = link.getAttribute('href');
            if (modalbox && modalbox.startsWith('#')) {
                let currentIndex = modalIndex;
                link.addEventListener("click", function(e) {
                    e.preventDefault();
                    modals[currentIndex].show();
                });
                modalIndex++;
            }
        });

    };  // end ssLightbox


   /* Alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box) {

            box.addEventListener('click', function(e){
                if (e.target.matches(".alert-box__close")) {
                    e.stopPropagation();
                    e.target.parentElement.classList.add("hideit");

                    setTimeout(function() {
                        box.style.display = "none";
                    }, 500)
                }    
            });

        })

    }; // end ssAlertBoxes


   /* Smoothscroll
    * ------------------------------------------------------ */
    const ssSmoothScroll = function () {
        
        const triggers = document.querySelectorAll(".smoothscroll");
        let currentJump = null; // Track current animation

        triggers.forEach(function(trigger) {
            trigger.addEventListener("click", function(e) {
                e.preventDefault(); // Prevent default anchor behavior
                
                // Remove focus from the clicked element to prevent persistent highlight
                trigger.blur();
                
                const target = trigger.getAttribute("href");
                const targetElement = document.querySelector(target);
                
                if (!targetElement) return;
                
                // Check if we're already at or very close to the target section
                const targetTop = targetElement.offsetTop;
                const currentScroll = window.scrollY;
                const threshold = 100; // Allow 100px tolerance
                
                if (Math.abs(currentScroll - targetTop) < threshold) {
                    return; // Don't scroll if already at target
                }
                
                // Cancel any existing animation
                if (currentJump && currentJump.stop) {
                    currentJump.stop();
                }

                // Start new animation and store reference
                currentJump = Jump(target, {
                    duration: 1200,
                    callback: function() {
                        currentJump = null; // Clear reference when done
                    }
                });
            });
        });

    }; // end ssSmoothScroll



   /* Hero fade in
    * ------------------------------------------------------ */
    const heroFadeIn = function() {
        console.log('heroFadeIn called');
        const heroContent = document.querySelector('.s-hero__content');
        console.log('heroContent element:', heroContent);
        
        setTimeout(function() {
            if (heroContent) {
                console.log('Adding fade-in class');
                heroContent.classList.add('fade-in');
                console.log('Classes after adding:', heroContent.className);
            }
        }, 200);
    };

   /* initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssParallax();
        ssMoveHeader();
        ssMobileMenu();
        ssScrollSpy();
        ssSwiper();
        ssLightbox();
        ssAlertBoxes();
        ssSmoothScroll();
        heroFadeIn();

    })();

})(document.documentElement);