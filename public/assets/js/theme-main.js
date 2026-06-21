function rakar_content_load_scripts() {
    var $ = jQuery;
    "use strict";
    /*=================================
        JS Index Here
    ==================================*/ 
    /*
    01. On Load Function
    02. Preloader
    03. Mobile Menu
    04. Sticky fix
    05. Scroll To Top
    06. Set Background Image Color & Mask
    07. Global Slider
    08. Ajax Contact Form
    09. Search Box Popup
    10. Popup Sidemenu
    11. Magnific Popup
    12. Section Position
    13. Filter
    14. Counter Up
    15. Shape Mockup
    16. Progress Bar Animation
    17. Countdown
    18. Image to SVG Code
    00. Woocommerce Toggle
    00. Right Click Disable
    */
    /*=================================
        JS Index End
    ==================================*/
    /*

    /*---------- 03. Mobile Menu ----------*/
    $.fn.thmobilemenu = function (options) {
        var opt = $.extend(
            {
                menuToggleBtn: ".th-menu-toggle",
                bodyToggleClass: "th-body-visible",
                subMenuClass: "th-submenu",
                subMenuParent: "th-item-has-children",
                subMenuParentToggle: "th-active",
                meanExpandClass: "th-mean-expand",
                appendElement: '<span class="th-mean-expand"></span>',
                subMenuToggleClass: "th-open",
                toggleSpeed: 400,
            },
            options
        );

        return this.each(function () {
            var menu = $(this);
    
            function menuToggle() {
                menu.toggleClass(opt.bodyToggleClass);
    
                var subMenu = "." + opt.subMenuClass;
                $(subMenu).each(function () {
                    if ($(this).hasClass(opt.subMenuToggleClass)) {
                        $(this).removeClass(opt.subMenuToggleClass);
                        $(this).css("display", "none");
                        $(this).parent().removeClass(opt.subMenuParentToggle);
                    }
                });
            }
    
            menu.find("li").each(function () {
                var submenu = $(this).find("ul");
                submenu.addClass(opt.subMenuClass);
                submenu.css("display", "none");
                submenu.parent().addClass(opt.subMenuParent);
                submenu.prev("a").append(opt.appendElement);
                submenu.next("a").append(opt.appendElement);
            });
    
            function toggleDropDown($element) {
                var $parent = $($element).parent();
                var $siblings = $parent.siblings(); 

                $siblings.removeClass(opt.subMenuParentToggle);
                $siblings.find("ul").slideUp(opt.toggleSpeed).removeClass(opt.subMenuToggleClass);
    
                $parent.toggleClass(opt.subMenuParentToggle);
                $($element).next("ul").slideToggle(opt.toggleSpeed).toggleClass(opt.subMenuToggleClass);
            }
    
            var expandToggler = "." + opt.meanExpandClass;
            $(expandToggler).each(function () {
                $(this).on("click", function (e) {
                    e.preventDefault();
                    toggleDropDown($(this).parent());
                });
            });
    
            $(opt.menuToggleBtn).each(function () {
                $(this).on("click", function () {
                    menuToggle();
                });
            });
    
            menu.on("click", function (e) {
                e.stopPropagation();
                menuToggle();
            });

            menu.find("div").on("click", function (e) {
                e.stopPropagation();
            });
        });
    };

    $(".th-menu-wrapper").thmobilemenu();

    /*---------- 04. Sticky fix ----------*/
    $(window).scroll(function () {
        var topPos = $(this).scrollTop();
        if (topPos > 500) {
            $('.sticky-wrapper').addClass('sticky');
            $('.category-menu').addClass('close-category');
        } else {
            $('.sticky-wrapper').removeClass('sticky')
            $('.category-menu').removeClass('close-category');
        }
    })

    $(".menu-expand").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            $('.category-menu').toggleClass('open-category');
        });
    });

    /*---------- 05. Scroll To Top ----------*/
    if ($('.scroll-top').length > 0) {
        
        var scrollTopbtn = document.querySelector('.scroll-top');
        var progressPath = document.querySelector('.scroll-top path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';		
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);	
        var offset = 50;
        var duration = 750;
        jQuery(window).on('scroll', function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery(scrollTopbtn).addClass('show');
            } else {
                jQuery(scrollTopbtn).removeClass('show');
            }
        });				
        jQuery(scrollTopbtn).on('click', function(event) {
            event.preventDefault();
            jQuery('html, body').animate({scrollTop: 0}, duration);
            return false;
        })
    }

    /*---------- 06. Set Background Image Color & Mask ----------*/
    if ($("[data-bg-src]").length > 0) {
        $("[data-bg-src]").each(function () {
            var src = $(this).attr("data-bg-src");
            $(this).css("background-image", "url(" + src + ")");
            $(this).removeAttr("data-bg-src").addClass("background-image");
        });
    }

    if ($('[data-bg-color]').length > 0) {
        $('[data-bg-color]').each(function () {
        var color = $(this).attr('data-bg-color');
        $(this).css('background-color', color);
        $(this).removeAttr('data-bg-color');
        });
    };

    $('[data-border]').each(function() {
        var borderColor = $(this).data('border');
        $(this).css('--th-border-color', borderColor);
    });
    
    if ($('[data-mask-src]').length > 0) {
        $('[data-mask-src]').each(function () {
        var mask = $(this).attr('data-mask-src');
        $(this).css({
            'mask-image': 'url(' + mask + ')',
            '-webkit-mask-image': 'url(' + mask + ')'
        });
        $(this).addClass('bg-mask');
        $(this).removeAttr('data-mask-src');
        });
    };


    /*----------- 07. Global Slider ----------*/ 
    $('.th-slider').each(function () {

        var thSlider = $(this);
        var settings = $(this).data('slider-options');

        // Store references to the navigation Slider
        var prevArrow = thSlider.find('.slider-prev');
        var nextArrow = thSlider.find('.slider-next');
        var paginationElN = thSlider.find('.slider-pagination.pagi-number');
        var paginationExternel = thSlider.siblings('.slider-controller').find('.slider-pagination');

        var paginationEl = paginationExternel.length ? paginationExternel.get(0) : thSlider.find('.slider-pagination').get(0);

        var paginationType = settings['paginationType'] ? settings['paginationType'] : 'bullets';

        var autoplayconditon = settings['autoplay'];

        var sliderDefault = {
            slidesPerView: 1,
            spaceBetween: settings['spaceBetween'] ? settings['spaceBetween'] : 24,
            loop: settings['loop'] == false ? false : true,
            speed: settings['speed'] ? settings['speed'] : 1000,
            autoplay: autoplayconditon ? autoplayconditon : {delay: 6000, disableOnInteraction: false},
            navigation: {
                nextEl: nextArrow.get(0),
                prevEl: prevArrow.get(0),  
            },
            pagination: {
                el: paginationEl,
                type: paginationType,
                clickable: true, 
                renderBullet: function (index, className) {
                    var number = index + 1;
                    var formattedNumber = number < 10 ? '0' + number : number;
                    if (paginationElN.length) {
                        return '<span class="' + className + ' number">' + formattedNumber + '</span>';
                    } else {
                        return '<span class="' + className + '" aria-label="Go to Slide ' + formattedNumber + '"></span>';
                    }
                },
                formatFractionCurrent: function (number) {
                    if (number < 10) {
                        return '0' + number;
                    } else {
                        return number;
                    }
                },
                formatFractionTotal: function (number) {
                    if (number < 10) {
                        return '0' + number;
                    } else {
                        return number;
                    }
                }
            },
            on: {
                slideChange: function() {
                    setTimeout(function () {
                        swiper.params.mousewheel.releaseOnEdges = false;
                    }, 500);
                },
                reachEnd: function() {
                    setTimeout(function () {
                        swiper.params.mousewheel.releaseOnEdges = true;
                    }, 750);
                }
            }
        };

        var options = JSON.parse(thSlider.attr('data-slider-options'));
        options = $.extend({}, sliderDefault, options);
        var swiper = new Swiper(thSlider.get(0), options); // Assign the swiper variable

        if ($('.slider-area').length > 0) {
            $('.slider-area').closest(".container").parent().addClass("arrow-wrap");
        }

    });

    // Function to add animation classes
    function animationProperties() {
        $('[data-ani]').each(function () {
            var animationName = $(this).data('ani');
            $(this).addClass(animationName);
        });

        $('[data-ani-delay]').each(function () {
            var delayTime = $(this).data('ani-delay');
            $(this).css('animation-delay', delayTime);
        });
    }
    animationProperties();

    // Add click event handlers for external slider arrows based on data attributes
    $('[data-slider-prev], [data-slider-next]').on('click', function () {
        var sliderSelector = $(this).data('slider-prev') || $(this).data('slider-next');
        var targetSlider = $(sliderSelector);

        if (targetSlider.length) {
            var swiper = targetSlider[0].swiper;

            if (swiper) {
                if ($(this).data('slider-prev')) {
                    swiper.slidePrev(); 
                } else {
                    swiper.slideNext(); 
                }
            }
        }
    });


    /*-------------- 08. Slider Tab -------------*/
    $.fn.activateSliderThumbs = function (options) {
        var opt = $.extend(
            {
                sliderTab: false,
                tabButton: ".tab-btn",
            },
            options
        );
    
        return this.each(function () {
            var $container = $(this);
            var $thumbs = $container.find(opt.tabButton);
            var $line = $('<span class="indicator"></span>').appendTo($container);
    
            var sliderSelector = $container.data("slider-tab");
            var $slider = $(sliderSelector);
    
            var swiper = $slider[0].swiper;
    
            $thumbs.on("click", function (e) {
                e.preventDefault();
                var clickedThumb = $(this);
    
                clickedThumb.addClass("active").siblings().removeClass("active");
                linePos(clickedThumb, $container);
    
                clickedThumb.prevAll(opt.tabButton).addClass('list-active');
                clickedThumb.nextAll(opt.tabButton).removeClass('list-active');
    
                if (opt.sliderTab) {
                    var slideIndex = clickedThumb.index();
                    swiper.slideTo(slideIndex);
                }
            });
    
            if (opt.sliderTab) {
                swiper.on("slideChange", function () {
                    var activeIndex = swiper.realIndex;
                    var $activeThumb = $thumbs.eq(activeIndex);
    
                    $activeThumb.addClass("active").siblings().removeClass("active");
                    linePos($activeThumb, $container);
    
                    $activeThumb.prevAll(opt.tabButton).addClass('list-active');
                    $activeThumb.nextAll(opt.tabButton).removeClass('list-active');
                });
    
                var initialSlideIndex = swiper.activeIndex;
                var $initialThumb = $thumbs.eq(initialSlideIndex);
                $initialThumb.addClass("active").siblings().removeClass("active");
                linePos($initialThumb, $container);

                $initialThumb.prevAll(opt.tabButton).addClass('list-active');
                $initialThumb.nextAll(opt.tabButton).removeClass('list-active');
            }
    
            function linePos($activeThumb) {
                var thumbOffset = $activeThumb.position();
    
                var marginTop = parseInt($activeThumb.css('margin-top')) || 0;
                var marginLeft = parseInt($activeThumb.css('margin-left')) || 0;
    
                $line.css("--height-set", $activeThumb.outerHeight() + "px");
                $line.css("--width-set", $activeThumb.outerWidth() + "px");
                $line.css("--pos-y", thumbOffset.top + marginTop + "px");
                $line.css("--pos-x", thumbOffset.left + marginLeft + "px");
            }
        });
    };
    
    if ($(".testi-box-tab").length) {
        $(".testi-box-tab").activateSliderThumbs({
            sliderTab: true,
            tabButton: ".tab-btn",
        });
    }

    if ($(".product-thumb").length) {
        $(".product-thumb").activateSliderThumbs({
            sliderTab: true,
            tabButton: ".tab-btn",
        });
    }
    

  /*----------- 09. Ajax Contact Form ----------*/
    
   /*---------- 10. Popup Sidemenu ----------*/
   function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
        // Sidebar Popup
        $($sideMunuOpen).on('click', function (e) {
            e.preventDefault();
            $($sideMenu).addClass($toggleCls);
        });
        // $($sideMenu).on('click', function (e) {
        //     e.stopPropagation();
        //     $($sideMenu).removeClass($toggleCls)
        // });
        var sideMenuChild = $sideMenu + ' > div';
            $(sideMenuChild).on('click', function (e) {
            e.stopPropagation();
            $($sideMenu).addClass($toggleCls)
        });
        $($sideMenuCls).on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($sideMenu).removeClass($toggleCls);
        });
    };
    popupSideMenu( ".popup-search-box", ".searchBoxToggler", ".searchClose", "show" );
    popupSideMenu('.sidemenu-cart', '.sideMenuToggler', '.sideMenuCls', 'show');
    popupSideMenu('.sidemenu-info', '.sideMenuInfo', '.sideMenuCls', 'show');

    /*----------- 11. Magnific Popup ----------*/
    /* magnificPopup img view */
    $(".popup-image").magnificPopup({
        type: "image",
        mainClass: 'mfp-zoom-in', 
        removalDelay: 260,
        gallery: {
            enabled: true,
        },
    });

    /* magnificPopup video view */
    $(".popup-video").magnificPopup({
        type: "iframe",
    });

    /* magnificPopup video view */
    $(".popup-content").magnificPopup({
        type: "inline",
        midClick: true,
    });
    
    /*---------- 12. Section Position ----------*/
    // Interger Converter
    function convertInteger(str) {
        return parseInt(str, 10);
    }

    $.fn.sectionPosition = function (mainAttr, posAttr) {
        $(this).each(function () {
            var section = $(this);

            function setPosition() {
                var sectionHeight = Math.floor(section.height() / 2), // Main Height of section
                    posData = section.attr(mainAttr), // where to position
                    posFor = section.attr(posAttr), // On Which section is for positioning
                    topMark = "top-half", // Pos top
                    bottomMark = "bottom-half", // Pos Bottom
                    parentPT = convertInteger($(posFor).css("padding-top")), // Default Padding of  parent
                    parentPB = convertInteger($(posFor).css("padding-bottom")); // Default Padding of  parent

                if (posData === topMark) {
                    $(posFor).css(
                        "padding-bottom",
                        parentPB + sectionHeight + "px"
                    );
                    section.css("margin-top", "-" + sectionHeight + "px");
                } else if (posData === bottomMark) {
                    $(posFor).css(
                        "padding-top",
                        parentPT + sectionHeight + "px"
                    );
                    section.css("margin-bottom", "-" + sectionHeight + "px");
                }
            }
            setPosition(); // Set Padding On Load
        });
    };

    var postionHandler = "[data-sec-pos]";
    if ($(postionHandler).length) {
        $(postionHandler).imagesLoaded(function () {
            $(postionHandler).sectionPosition("data-sec-pos", "data-pos-for");
        });
    }

       /*----------- 13. Filter ----------*/
       $(".filter-active").imagesLoaded(function () {
        var $filter = ".filter-active",
            $filterItem = ".filter-item",
            $filterMenu = ".filter-menu-active";

        if ($($filter).length > 0) {
            var $grid = $($filter).isotope({
                itemSelector: $filterItem,
                filter: "*",
                masonry: {
                    columnWidth: $filterItem,
                },
            });

            // filter items on button click
            $($filterMenu).on("click", "button", function () {
                var filterValue = $(this).attr("data-filter");
                $grid.isotope({
                    filter: filterValue,
                });
            });

            // Menu Active Class
            $($filterMenu).on("click", "button", function (event) {
                event.preventDefault();
                $(this).addClass("active");
                $(this).siblings(".active").removeClass("active");
            });
        }
        $('.load-more-btn').on('click', function() {
            var $icon = $(this).find('i');
            $icon.addClass('fa-spin-pulse');
            
            setTimeout(function() {
                $icon.removeClass('fa-spin-pulse');
            }, 1000);
            
            var $button = $(this);
            setTimeout(function() {
                var $closestLoadMoreActive = $button.prev('.load-more-active');
                if ($closestLoadMoreActive.length === 0) {
                    $closestLoadMoreActive = $button.closest('.container').find('.load-more-active');
                }
                $closestLoadMoreActive.find('.filter-item.d-none, .accordion-card.d-none').removeClass('d-none');
                
                var $grid = $($filter).isotope({
                    filter: "*",
                });
            }, 700);
        });
    });

    $(".masonary-active, .woocommerce-Reviews .comment-list").imagesLoaded(function () {
        var $filter = ".masonary-active, .woocommerce-Reviews .comment-list",
            $filterItem = ".filter-item, .woocommerce-Reviews .comment-list li";

        if ($($filter).length > 0) {
            $($filter).isotope({
                itemSelector: $filterItem,
                filter: "*",
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: 1,
                },
            });
        }
        $('[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
            $($filter).isotope({
                filter: "*",
            });
        });
    });

    /*----------- 14. Counter Up ----------*/
    $(".counter-number").counterUp({
        delay: 10,
        time: 1000,
    });

    /*----------- 15. Hover Item ----------*/
    $(".hover-item").hover(function() {
        $(this).addClass("item-active");
        $(this).siblings().removeClass("item-active");
    });

    /*----------- 16. Shape Mockup ----------*/
    $.fn.shapeMockup = function () {
        var $shape = $(this);
        $shape.each(function() {
          var $currentShape = $(this),
          shapeTop = $currentShape.data('top'),
          shapeRight = $currentShape.data('right'),
          shapeBottom = $currentShape.data('bottom'),
          shapeLeft = $currentShape.data('left');
          $currentShape.css({
            top: shapeTop,
            right: shapeRight,
            bottom: shapeBottom,
            left: shapeLeft,
          }).removeAttr('data-top')
          .removeAttr('data-right')
          .removeAttr('data-bottom')
          .removeAttr('data-left')
          .closest('.elementor-widget').css('position', 'static')
          .closest('.e-parent').addClass('shape-mockup-wrap');
        });
    };

    if ($('.shape-mockup')) {
        $('.shape-mockup').shapeMockup();
    }

    /*----------- 17. Progress Bar Animation ----------*/
    $('.progress-bar').waypoint(function() {
        $('.progress-bar').css({
        animation: "animate-positive 1.8s",
        opacity: "1"
        });
    }, { offset: '75%' });

    /*----------- 18. Countdown ----------*/
    $.fn.countdown = function () {
        $(this).each(function () {
            var $counter = $(this),
                countDownDate = new Date($counter.data("offer-date")).getTime(), // Set the date we're counting down toz
                exprireCls = "expired";

            // Finding Function
            function s$(element) {
                return $counter.find(element);
            }

            // Update the count down every 1 second
            var counter = setInterval(function () {
                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                var minutes = Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                );
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Check If value is lower than ten, so add zero before number
                days < 10 ? (days = "0" + days) : null;
                hours < 10 ? (hours = "0" + hours) : null;
                minutes < 10 ? (minutes = "0" + minutes) : null;
                seconds < 10 ? (seconds = "0" + seconds) : null;

                // If the count down is over, write some text
                if (distance < 0) {
                    clearInterval(counter);
                    $counter.addClass(exprireCls);
                    $counter.find(".message").css("display", "block");
                } else {
                    // Output the result in elements
                    s$(".day").html(days);
                    s$(".hour").html(hours);
                    s$(".minute").html(minutes);
                    s$(".seconds").html(seconds);
                }
            }, 1000);
        });
    };

    if ($(".counter-list").length) {
        $(".counter-list").countdown();
    }

    /*---------- 19. Hero 2 Animation ----------*/
    if ($('.hero-2').length > 0) {
        window.addEventListener('scroll', function() {
        let value = window.scrollY;
            $('.line').css('width', "calc(" + 'var(--size)' + " - " + value * 0.1 + 'px'  +  ")");
        })
    };

    /*----------- 21. Overlay Direction ----------*/
    if ($('.overlay-direction').length > 0) {
        if (window.innerWidth > 767) {
            const nodes = [].slice.call(document.querySelectorAll(".overlay-direction .filter-item"), 0);
            const directions = { 
                0: "top",
                1: "right",
                2: "bottom",
                3: "left"
            };
            const classNames = ["in", "out"].map(p => Object.values(directions).map(d => `${p}-${d}`)).reduce((a, b) => a.concat(b));
            const getDirectionKey = (ev, node) => {
                const {
                    width,
                    height,
                    top,
                    left
                } = node.getBoundingClientRect();
                const l = ev.pageX - (left + window.pageXOffset);
                const t = ev.pageY - (top + window.pageYOffset);
                const x = l - width / 2 * (width > height ? height / width : 1);
                const y = t - height / 2 * (height > width ? width / height : 1);
                return Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
            };
            class Item {
                constructor(element) {
                    this.element = element;
                    this.element.addEventListener("mouseover", ev => this.update(ev, "in"));
                    this.element.addEventListener("mouseout", ev => this.update(ev, "out"));
                }
                update(ev, prefix) {
                    this.element.classList.remove(...classNames);
                    this.element.classList.add(`${prefix}-${directions[getDirectionKey(ev, this.element)]}`);
                }
            }
            nodes.forEach(node => new Item(node));
        }
    }

    /*----------- 22. Indicator ----------*/
    // Indicator
    $.fn.indicator = function () {
        // Loop through each .indicator-active element
        $(this).each(function () {
            var $menu = $(this),
                $linkBtn = $menu.find("a"),
                $btn = $menu.find("button");

            // Append indicator
            $menu.append('<span class="indicator"></span>');
            var $line = $menu.find(".indicator");

            // Check which type button is Available
            var $currentBtn;
            if ($linkBtn.length) {
                $currentBtn = $linkBtn;
            } else if ($btn.length) {
                $currentBtn = $btn;
            }

            // On Click Button Class Remove
            $currentBtn.on("click", function (e) {
                e.preventDefault();
                $(this).addClass("active");
                $(this).siblings(".active").removeClass("active");
                linePos();
            });

            // Indicator Position
            function linePos() {
                var $btnActive = $menu.find(".active"),
                    $height = $btnActive.css("height"),
                    $width = $btnActive.css("width"),
                    $top = $btnActive.position().top + "px",
                    $left = $btnActive.position().left + "px";

                $(window).on('resize', function () {
                    $top = $btnActive.position().top + "px",
                    $left = $btnActive.position().left + "px";
                });

                $line.get(0).style.setProperty("--height-set", $height);
                $line.get(0).style.setProperty("--width-set", $width);
                $line.get(0).style.setProperty("--pos-y", $top);
                $line.get(0).style.setProperty("--pos-x", $left);
            }

            linePos();
            $(window).on('resize', function () {
                linePos();
            });
        });
    };

    if ($(".indicator-active").length) {
        $(".indicator-active").indicator();
    }


    /*----------- 20. image Slider ----------*/ 
    $("#compslider").on("input change", (e) => {
        const sliderPos = e.target.value;
        $('.foreground-img').css('width', `${sliderPos}%`) 
        $('.slider-button').css('left', `calc(${sliderPos}% - 32px)`) 
    });

    /*----------- 00. Color Scheme ----------*/
    $('.color-switch-btns button').each(function () {
        // Get color for button
        const button = $(this);
        const color = button.data('color');
        button.css('--theme-color', color);

        // Change theme color on click
        button.on('click', function () {
            const clickedColor = $(this).data('color');
            $(':root').css('--theme-color', clickedColor);
        });
    });

    // Handle color picker change event
    $('#thcolorpicker').on('input', function () {
        const pickedColor = $(this).val();
        updateThemeColor(pickedColor);
    });

    function updateThemeColor(color) {
        $(':root').css('--theme-color', color);
    }

    $(document).on('click','.switchIcon',function() {
        $('.color-scheme').toggleClass('active');
    });


    /*----------- 00. Woocommerce Toggle ----------*/
    // Ship To Different Address
    $("#ship-to-different-address-checkbox").on("change", function () {
        if ($(this).is(":checked")) {
            $("#ship-to-different-address")
                .next(".shipping_address")
                .slideDown();
        } else {
            $("#ship-to-different-address").next(".shipping_address").slideUp();
        }
    });

    // Woocommerce Payment Toggle
    $('.wc_payment_methods input[type="radio"]:checked')
        .siblings(".payment_box")
        .show();
    $('.wc_payment_methods input[type="radio"]').each(function () {
        $(this).on("change", function () {
            $(".payment_box").slideUp();
            $(this).siblings(".payment_box").slideDown();
        });
    });

    // Woocommerce Rating Toggle
    $(".rating-select .stars a").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            $(this).siblings().removeClass("active");
            $(this).parent().parent().addClass("selected");
            $(this).addClass("active");
        });
    });

    // Quantity Plus Minus ---------------------------
    $(document).on('click', '.quantity-plus, .quantity-minus', function (e) {
        e.preventDefault();
        // Get current quantity values
        var qty = $(this).closest('.quantity, .product-quantity').find('.qty-input');
        var val = parseFloat(qty.val());
        var max = parseFloat(qty.attr('max'));
        var min = parseFloat(qty.attr('min'));
        var step = parseFloat(qty.attr('step'));

        // Change the value if plus or minus
        if ($(this).is('.quantity-plus')) {
            if (max && (max <= val)) {
                qty.val(max);
            } else {
                qty.val(val + step);
            }
        } else {
            if (min && (min >= val)) {
                qty.val(min);
            } else if (val > 0) {
                qty.val(val - step);
            }
        }
        $('.cart_table button[name="update_cart"]').prop('disabled', false);
    });

    /*----------- Search Masonary ----------*/
    $('.search-active').imagesLoaded(function () {
        var $filter = '.search-active',
        $filterItem = '.filter-item';

        if ($($filter).length > 0) {
        var $grid = $($filter).isotope({
            itemSelector: $filterItem,
            filter: '*',
            // masonry: {
            // // use outer width of grid-sizer for columnWidth
            //     columnWidth: 1
            // }
        });
        };
    });

    
}


(function ($) {

    /*---------- 01. On Load Function ----------*/
    $(window).on("load", function () {
        $(".preloader").fadeOut();
        $(".th-slider").addClass('fade-ani');
    });

    /*---------- 02. Preloader ----------*/
    if ($(".preloader").length > 0) {
        $(".preloaderCls").each(function () {
            $(this).on("click", function (e) {
                e.preventDefault();
                $(".preloader").css("display", "none");
            });
        });
    }

    $(document).ready(function () {
        setTimeout(function () {
            $('#loader').addClass('loaded');
            // Once the container has finished, the scroll appears
            if ($('#loader').hasClass('loaded')) {
                // It is so that once the container is gone, the entire preloader section is deleted
                $('#preloader').delay(9000).queue(function () {
                    $(this).remove();
                });
            }
        }, 3000);
    });

    /*---------- Sticky Footer ----------*/
    function checkHeight() {
        if ($('body').height() < $(window).height()) {
          $('.footer-sitcky').addClass('sticky-footer');
        } else {
          $('.footer-sitcky').removeClass('sticky-footer');
        }
    }

    $(window).on('load resize', function () {
        checkHeight();
    });
    
    // Elementor Frontend Load
    $(window).on('elementor/frontend/init', function () {
        if (elementorFrontend.isEditMode()) {
            elementorFrontend.hooks.addAction('frontend/element_ready/global', function () {
                setTimeout(function () {
                    rakar_content_load_scripts();
                    $(".th-slider").addClass('fade-ani');
                }, 500);
            });
        }
    });

    // Window Load
    $(window).on('load', function () {
        rakar_content_load_scripts();
          /*---------- 18. Image to SVG Code ----------*/
            const cache = {};

            $.fn.inlineSvg = function fnInlineSvg() {
                this.each(imgToSvg);

                return this;
            };

            function imgToSvg() {
                const $img = $(this);
                const src = $img.attr("src");

                // fill cache by src with promise
                if (!cache[src]) {
                    const d = $.Deferred();
                    $.get(src, (data) => {
                        d.resolve($(data).find("svg"));
                    });
                    cache[src] = d.promise();
                }

                // replace img with svg when cached promise resolves
                cache[src].then((svg) => {
                    const $svg = $(svg).clone();

                    if ($img.attr("id")) $svg.attr("id", $img.attr("id"));
                    if ($img.attr("class")) $svg.attr("class", $img.attr("class"));
                    if ($img.attr("style")) $svg.attr("style", $img.attr("style"));

                    if ($img.attr("width")) {
                        $svg.attr("width", $img.attr("width"));
                        if (!$img.attr("height")) $svg.removeAttr("height");
                    }
                    if ($img.attr("height")) {
                        $svg.attr("height", $img.attr("height"));
                        if (!$img.attr("width")) $svg.removeAttr("width");
                    }

                    $svg.insertAfter($img);
                    $img.trigger("svgInlined", $svg[0]);
                    $img.remove();
                });
            }

            $(".svg-img").inlineSvg();
    });

    // Cart count with ajax
    jQuery(function ($) {
        $(document).on('click', '.add_to_cart_button', function (e) {
            e.preventDefault();
            var $button = $(this);
            var product_id = $button.data('product_id');
    
            $.ajax({
                type: 'POST',
                url: wc_add_to_cart_params.ajax_url,
                data: {
                    'action': 'update_cart_count',
                    'product_id': product_id
                },
                success: function (response) {
                    $('.cart_badge').text(response);
                }
            });
        });
    });
        
    
})(jQuery);