    //gauge progress bar

    let elements = $('.js-score-bar');

    elements.each(function() {

        var id = this.getAttribute('id');
        var min = this.getAttribute('min');
        var max = this.getAttribute('max');

        updateGauge(id, min, max);

    });

    function updateGauge(id, min, max) {
        const newGaugeDisplayValue = document.getElementById(id).getAttribute('value');
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


    //custom range slider


    //checkbox

    $('.slider-range input[type="checkbox"]').click(function(e) {




        if ($(this).is(':checked')){
            $( this ).closest(".slider-range").find(".input-range").prop('disabled', true);
            $( this ).closest(".slider-range").find(".input-range ~ .current-value").text('N/A');
            // $('.slider-range').WBslider();
        } else {
            $( this ).closest(".slider-range").find(".input-range").prop('disabled', false);
            $('.slider-range').WBslider();
        }








    });

    $.fn.WBslider = function() {
        return this.each(function() {
            var $_this = $(this),
                $_input = $('.input-range', $_this),
                $_current_value = $('.current-value', $_this),
                $_min_value = $_input.attr('min'),
                $_max_value = $_input.attr('max'),
                thumbwidth = 30; // set this to the pixel width of the thumb




            // set range max to current year
            $_input.attr('max', $_max_value);
            $('.max-value span', $_this).text($_max_value);




            $_input.on('input change keyup', function() {
                var $_this = $(this),
                    val = parseInt($_input.val(), 10);

                if (val < 30) {
                    val = '< 31';
                }
                if (val === '') { // Stop IE8 displaying NaN
                    val = 0;
                }

                $_current_value.text( val );

                var pos = (val - $_input.attr('min'))/($_input.attr('max') - $_input.attr('min'));

                // position the title with the thumb
                var thumbCorrect = thumbwidth * (pos - 0.5) * -1,
                    titlepos = Math.round( ( pos * $_input.width() ) - thumbwidth/4 + thumbCorrect );

                $_current_value.css({'left': titlepos});

                // show "progress" on the track
                pos = Math.round( pos * 99 ); // to hide stuff behide the thumb



                // if ($_this.attr('disabled')) {
                //     console.log('disabled');
                //     var grad = 'linear-gradient(90deg, #a1a1a1 ' + pos + '%,#dbdcde ' + (pos+1) + '%)';
                // }
                //
                // else  {
                //     console.log('enabled');
                //     var grad = 'linear-gradient(90deg, #1f5e9e ' + pos + '%,#dbdcde ' + (pos+1) + '%)';
                // }

                var grad = 'linear-gradient(90deg, #1f5e9e ' + pos + '%,#dbdcde ' + (pos+1) + '%)';



                $_input.css({'background': grad});

            }).on('focus', function() {
                if ( isNaN( $(this).val() ) ) {
                    $(this).val(0);
                }
            }).trigger('change');

            $(window).on('resize', function() {
                $_input.trigger('change');
            });
        });
    };

    $(function() {

        $('.slider-range').WBslider();

    });