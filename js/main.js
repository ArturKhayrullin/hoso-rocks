var isAnimationGoing = false;

$(document).ready(function() {

    if ($(window).width() > 768) {




        // $('html').scrollWithEase({
        //   frameRate: 60,
        //   animationTime: 1000,
        //   stepSize: 120,
        //   pulseAlgorithm: true,
        //   pulseScale: 8,
        //   pulseNormalize: 1,
        //   accelerationDelta: 20,
        //   accelerationMax: 2,
        //   keyboardSupport: true,
        //   arrowScroll: 50
        // });


        $(".logo, .parallaxify").inertiaScroll({
            parent: $(".wrapper"),
            childDelta1: 0.02,
            childDelta2: 0.1,
            parentDelta: 0.08
        });



    }

    function hasTouch() {
        return 'ontouchstart' in document.documentElement ||
            navigator.maxTouchPoints > 0 ||
            navigator.msMaxTouchPoints > 0;
    }

    if (hasTouch() || $(window).width() <= 768) { // remove all :hover stylesheets
        try { // prevent exception on browsers not supporting DOM styleSheets properly
            for (var si in document.styleSheets) {
                var styleSheet = document.styleSheets[si];
                if (!styleSheet.rules) continue;

                for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                    if (!styleSheet.rules[ri].selectorText) continue;

                    if (styleSheet.rules[ri].selectorText.match(':hover')) {
                        styleSheet.deleteRule(ri);
                    }
                }
            }
        } catch (ex) {}
    }

    setTimeout(function() {
        $('.loader_logo').animate({
                opacity: 0
            },
            300,
            function() {
                /* stuff to do after animation is complete */
                $('.loader img').animate({
                        opacity: 0,
                    },
                    300,
                    function() {
                        $('.loader').animate({
                                opacity: 0,
                            },
                            1000,
                            function() {
                                $(this).hide();
                                /* stuff to do after animation is complete */
                            });
                    });
            });
    }, 1000);



    var durationSlider = document.getElementById('duration_slider');
    if (durationSlider) {
        noUiSlider.create(durationSlider, {
            start: [60],
            step: 1,
            connect: true,
            tooltips: [wNumb({ decimals: 0 })],
            range: {
                'min': [60],
                'max': [200]
            }
        });

        var inputs = [document.getElementById('slider_input')];
        console.log(inputs);

        durationSlider.noUiSlider.on('update', function(values, handle) {
            inputs[handle].value = values[handle];
        });
    }

    $('#say_hi_form').submit(function(e) {

        e.preventDefault();
        $.ajax({
                url: './say-hi-form.php',
                type: 'POST',
                data: {
                    first_name: $(this).find('[name=name]').val(),
                    email: $(this).find('[name=email]').val(),
                    message: $(this).find('[name=message]').val()
                }
            })
            .done(function(data) {
                console.log(data);

            })
            .fail(function() {

            })
            .always(function() {
                window.location.replace("/thank-you.html"); 
            });


    });

    $('.step-container form').submit(function(e) {
        e.preventDefault();
        var nextPercentage = ((-100) / 5 * ($(this).closest('.step-container').index() + 1));
        if (nextPercentage <= -100) {


            /*SLIDE 1*/
            var name = $('.step-container input[name="name"]').val();
            var company = $('.step-container input[name="company"]').val();
            var email = $('.step-container input[name="email"]').val();
            var tel = $('.step-container input[name="tel"]').val();

            /*SLIDE 2*/
            var selectedTypes = [];
            $('.step-container input[name="type"]:checked').map(function() {
                selectedTypes.push($(this).val());
            });

            /*SLIDE 3*/

            var startingBudget = $('.step-container input[name="starting_budget"]:checked').val();

            /*SLIDE 4*/
            var desiredDuration = $('.step-container #slider_input').val();

            /*SLIDE 5*/
            var filePath = $('.step-container input[name="file"]')[0].files[0];

            var formData = new FormData();
            formData.append('Name', name);
            formData.append('Company', company);
            formData.append('Email', email);
            formData.append('Tel', tel);

            formData.append('Selected Types', selectedTypes);

            formData.append('Starting Budget', startingBudget);

            formData.append('Desired Duration', desiredDuration);

            formData.append('fileToUpload', filePath);

            $.ajax({
                url: './start-new-form.php',
                data: formData,
                type: 'POST',
                contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
                processData: false, // NEEDED, DON'T OMIT THIS

                success: function(data) {
                    console.log(data);
            window.location.replace("/thank-you.html");                  
                }

            });
            return;
        }

        console.log(nextPercentage);
        $('.slider').css('transform', 'translateX(' + nextPercentage + '%)');

    });


    if ($('.main-swipable').length != 0) {
        $(window).bind('mousewheel', function(event) {
            if (event.originalEvent.wheelDelta >= 0) {

                slideToNextProject();
            } else {

                slideToPrevProject();
            }
        });

        $(window).bind('MozMousePixelScroll', function(event) {
            if (event.detail >= 0) {

                slideToNextProject();
            } else {

                slideToPrevProject();
            }
        });        


        $('.main-swipable').swipe({
            //Generic swipe handler for all directions
            swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                if (direction == "up")
                    slideToPrevProject();
                else if (direction == "down")
                    slideToNextProject();
            }
        });
    }

    //Set some options later
    // $("#test").swipe( {fingers:2} );


    $('html').css('font-size', $(window).width() / 100 + 'px');

    var menuFadeSpeed = 700;
    $('#menu_toggle').click(function() {
        if ($('#menu').hasClass('visible')) {
            // $('.menu_background').removeClass('visible');
            $('#menu').fadeOut(menuFadeSpeed, function() {
                $(this).removeClass('visible');
            });

            $('#menu_toggle').fadeOut(menuFadeSpeed / 2, function() {
                $(this).html('menu');
                $(this).fadeIn(menuFadeSpeed);
            });
        } else {
            // $('.menu_background').addClass('visible');
            $('#menu').fadeIn(menuFadeSpeed, function() {
                $(this).addClass('visible');
            });

            $('#menu_toggle').fadeOut(menuFadeSpeed / 2, function() {
                $(this).html('close');
                $(this).fadeIn(menuFadeSpeed);
            });
        }
    });

    // window.addEventListener("beforeunload", function () {
    //   document.body.classList.add("animate-out");
    // });

    // $('body').on('click','a',function(e) {
    // 	var currentLink=$(this);
    // 	e.preventDefault();
    // 	var url=$(this).attr('href');
    // 	if (url.indexOf('#')>-1)
    // 		return;
    // 	$('body').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
    // 		//window.location.href=url;
    // 		history.pushState({}, "title", url);
    // 		window.history.go(1);
    // 		window.reload();
    // 	});
    // 	document.body.classList.add("animate-out");

    // });


    $('.workslist_content .menu_item').hover(function() {
        var currentItemIndex = $(this).index();
        $('.workslist .background').removeClass('visible').removeClass('zoom-in');
        $('.workslist .background').eq(currentItemIndex).addClass('visible');
    });

    // $('.slider button').click(function() {
    // 	var nextPercentage = ((-100)/5*($(this).closest('.step-container').index()+1))+'%';
    // 	console.log(nextPercentage);
    // 	$('.slider').css('transform','translateX('+nextPercentage+')');
    // });	
});

$(window).resize(function() {
    // if ($('.fullheight').height()!=$(window).height()) {
    // 	$('.fullheight').height($(window).height());
    // }



});



function slideToNextProject() {
    //debugger;
    if (isAnimationGoing)
        return;

    var projectsCount = $('.project').length;
    //console.log(projectsCount);

    var activeProject = $(".project.active");
    var nextProjectIndex = ($(activeProject).index() + 1) % projectsCount;
    var nextProject = $(".project").eq(nextProjectIndex);
    console.log('next project number is ' + nextProjectIndex);

    $(nextProject).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
        function(e) {


            $(activeProject).removeClass('active').off();
            $(nextProject).addClass('active').off();
            console.log('animation end triggered');
            isAnimationGoing = false;
        });

    $(activeProject).css("opacity", "0");
    $(nextProject).css("opacity", "1");
    isAnimationGoing = true;
}

function slideToPrevProject() {
    if (isAnimationGoing)
        return;
    //debugger;
    var projectsCount = $('.project').length;
    //console.log(projectsCount);

    var activeProject = $(".project.active");
    var prevProjectIndex = (($(activeProject).index() - 1) >= 0) ? ($(activeProject).index() - 1) : (projectsCount - 1);
    var prevProject = $(".project").eq(prevProjectIndex);
    console.log('next project number is ' + prevProjectIndex);

    $(prevProject).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
        function(e) {


            $(activeProject).removeClass('active').off();
            $(prevProject).addClass('active').off();
            isAnimationGoing = false;
            console.log('animation end triggered');

        });

    $(activeProject).css("opacity", "0");
    $(prevProject).css("opacity", "1");
    isAnimationGoing = true;
}