    //gauge progress bar

    updateGauge('score_step1', 50, 150);

    function updateGauge(id, min, max) {
        const newGaugeDisplayValue = document.getElementById("gaugeValue-" + id).value;
        const newGaugeValue = Math.floor(((newGaugeDisplayValue - min) / (max - min)) * 100);
        document.getElementById(id).style.setProperty('--gauge-display-value', newGaugeDisplayValue);
        document.getElementById(id).style.setProperty('--gauge-value', newGaugeValue);
    }

	// Modal box
	$(".modal-trigger").click(function(e){
		e.preventDefault();
		$(".modal").css({"display":"none"}); //close modal before open another one
		dataModal = $(this).attr("data-modal");
		$("#" + dataModal).css({"display":"block"});
	});

	$(".close-modal, .modal-sandbox").click(function(){
		$(".modal").css({"display":"none"});

		//stop playing video after close modal box
		if( $(".videoWrapper iframe") ) {
            $(".videoWrapper iframe").each(function() {
                var src= $(this).attr('src');
                $(this).attr('src',src);
            });
		}

	});

	// Show/hide password
	$(".icon-visible").on('click', function() {

		const password = $(this).siblings("input");
		const type = password.attr('type') === 'password' ? 'text' : 'password';
		password.attr('type', type);
		this.classList.toggle('off');

	});

	// Tooltip
    $('.tooltip-q').each(function(){

        $(this).data('title',$(this).attr('title'));
        $(this).removeAttr('title');

    });

    /**
     * when abbreviations are mouseover-ed show a tooltip with the data from the title attribute
     */
    $('.tooltip-q').mouseover(function() {

        // first remove all existing abbreviation tooltips
        $('.tooltip-q').next('.tooltip').remove();

        // create the tooltip
        $(this).after('<span class="tooltip">' + $(this).data('title') + '</span>');

        // position the tooltip 4 pixels above and 4 pixels to the left of the abbreviation
        var left = $(this).position().left + $(this).width() + 4;
        var top = $(this).position().top - 4;
        $(this).next().css('left',left);
        $(this).next().css('top',top);

    });

    /**
     * when abbreviations are clicked trigger their mouseover event then fade the tooltip
     * (this is friendly to touch interfaces)
     */
    $('.tooltip-q').click(function(){

        $(this).mouseover();

        // after a slight 2 second fade, fade out the tooltip for 1 second
        $(this).next().animate({opacity: 0.9},{duration: 2000, complete: function(){
                $(this).fadeOut(1000);
            }});

    });

    /**
     * Remove the tooltip on abbreviation mouseout
     */
    $('.tooltip-q').mouseout(function(){

        $(this).next('.tooltip').remove();

    });
