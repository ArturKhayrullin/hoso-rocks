var isAnimationGoing=false;

$(document).ready(function() {
$(window).bind('mousewheel', function(event) {
    if (event.originalEvent.wheelDelta >= 0) {
       
        slideToNextProject();
    }
    else {
        
        slideToPrevProject();
    }
});

	$('html').css('font-size',$(window).width()/100 + 'px');
});

$(window).resize(function() {
	if ($('.fullheight').height()!=$(window).height()) {
		$('.fullheight').height($(window).height());
	}
});



function slideToNextProject() {
	//debugger;
	if (isAnimationGoing)
		return;

	var projectsCount=$('.project').length;
	//console.log(projectsCount);

	var activeProject=$(".project.active");
	var nextProjectIndex=($(activeProject).index()+1)%projectsCount;
	var nextProject=$(".project").eq(nextProjectIndex);
	console.log('next project number is '+nextProjectIndex);

	$(nextProject).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
	    function(e) {


	    $(activeProject).removeClass('active').off();
	    $(nextProject).addClass('active').off();
	    console.log('animation end triggered');
	    isAnimationGoing=false;
	  });

	$(activeProject).css("opacity","0");
	$(nextProject).css("opacity","1");
	isAnimationGoing=true;
}

function slideToPrevProject() {
	if (isAnimationGoing)
		return;
	//debugger;
	var projectsCount=$('.project').length;
	//console.log(projectsCount);

	var activeProject=$(".project.active");
	var prevProjectIndex=(($(activeProject).index()-1) >=0) ? ($(activeProject).index()-1) : (projectsCount-1);
	var prevProject=$(".project").eq(prevProjectIndex);
	console.log('next project number is '+prevProjectIndex);

	$(prevProject).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',   
	    function(e) {


	    $(activeProject).removeClass('active').off();
	    $(prevProject).addClass('active').off();
	    isAnimationGoing=false;
	    console.log('animation end triggered');

	  });

	$(activeProject).css("opacity","0");
	$(prevProject).css("opacity","1");
	isAnimationGoing=true;
}