(function(params) {
    var settings = params.settings,
        list_element = params.list_element;

    if (!list_element) {
        return;
    }

    // создаёт div с указанным 'swiper'-классом
    function div(class_name_suffix, parent) {
        var div = document.createElement('div');
        div.className = 'swiper-' + class_name_suffix;
        if (parent) {
            parent.appendChild(div);
        }
        return div;
    }

    // заменяет цвет из стандартных стилей Swiper (#007aff) на var(--tpl-color-foreground-accent)
    function replace_color_in_svg_background(element) {
        var styles = getComputedStyle(element),
            replacement_color = encodeURIComponent(styles.getPropertyValue('--tpl-color-foreground-accent').trim());
        if (replacement_color) {
            element.style.backgroundImage = styles.backgroundImage.replace(/fill%3D'[^']+/, "fill%3D'" + replacement_color);
        }
    }

    // добавляет alpha к rgb()
    function change_background_color_alpha(element, opacity) {
        var styles = getComputedStyle(element);
        element.style.backgroundColor = styles.backgroundColor.replace(/rgba?\((\d+, \d+, \d+)(,.+?)?\)/, 'rgba($1, ' + opacity);
    }

    // Добавление необходимой для swiper разметки и классов
    // <div class="swiper-container">       <!-- добавляется динамически -->
    //     <div class="swiper-wrapper">     <!-- = list_element -->
    //         <div class="swiper-slide">Slide 1</div>
    //     </div>
    //     <div class="swiper-pagination"></div>
    //     <div class="swiper-button-prev"></div>
    //     <div class="swiper-button-next"></div>
    //     <div class="swiper-scrollbar"></div>
    // </div>
    var slides = list_element.childNodes,
        swiper_container = div('container'),
        slides_per_view = settings.slides_per_view,
        swiper_options = {
            slidesPerView: slides_per_view,
            spaceBetween: parseInt(settings.space_between || 0, 10),
            speed: settings.speed || 300,
            loop: !!settings.loop,
            loopedSlides: parseInt(slides_per_view, 10) || 4,
            effect: settings.effect,
            on: {
                // обновление положения тулбаров и т. п. в режиме редактирования
                transitionEnd: function() {
                    window.$nc && $nc('.swiper-slide-active', list_element).trigger('mouseenter');
                }
            }
        };

    list_element.className += ' swiper-wrapper' +
        // также добавляем собственный класс swiper-nc-auto-slides-per-view,
        // без этих дополнительных стилей не получается получить нужный эффект (Swiper 4.4.6)
        (slides_per_view === 'auto' ? ' swiper-nc-auto-slides-per-view' : '');
    list_element.parentNode.insertBefore(swiper_container, list_element);
    swiper_container.appendChild(list_element);

    for (var i = 0; i < slides.length; i++) {
        if (slides[i].className !== 'resize-sensor') { // play along with ElementQueries’ ResizeSensor.js
            slides[i].className += ' swiper-slide';
        }
    }

    if (settings.show_arrows) {
        var prev = div('button-prev', swiper_container),
            next = div('button-next', swiper_container);
        replace_color_in_svg_background(prev);
        replace_color_in_svg_background(next);
        swiper_options.navigation = { prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' };
    }

    if (settings.pagination_type) {
        div('pagination', swiper_container);
        swiper_options.pagination = {
            el: '.swiper-pagination',
            type: settings.pagination_type
        };
    }

    var scrollbar;
    if (settings.show_scrollbar) {
        scrollbar = div('scrollbar', swiper_container);
        swiper_options.scrollbar = {
            el: '.swiper-scrollbar',
            draggable: true,
            hide: settings.show_scrollbar !== 'always'
        };
    }

    if (settings.autoplay) {
        swiper_options.autoplay = { delay: settings.autoplay_delay * 1000 };
    }

    new Swiper(swiper_container, swiper_options);

    if (scrollbar) {
        change_background_color_alpha(scrollbar, 0.1);
        change_background_color_alpha(scrollbar.querySelector('.swiper-scrollbar-drag'), 0.5);
    }
});