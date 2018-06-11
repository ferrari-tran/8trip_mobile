// Button reverse place choosen
$('.m-btn-switch').click(function(e) {
	e.preventDefault();

	var target1 = $(e.currentTarget).data('target-1'),
			target2 = $(e.currentTarget).data('target-2');

	var value1 = $('[data-ref="' + target1 + '"]').val(),
			value2 = $('[data-ref="' + target2 + '"]').val();

	if (value1 && value2) {
		value2 = [value1, value1 = value2][0];
		setTimeout(function() {
			$('[data-ref="' + target1 + '"]').val(value1);
			$('[data-ref="' + target2 + '"]').val(value2);
		}, 10);
	}
});

// Double radio
$(document).ready(function() {
	var gRadio = $('.m-double-radio');
	if (gRadio.length > 0) {
		var bar = $(gRadio).find('.m-double-radio-bar');

		$('input[type=radio]').on('change', function(e) {
			var label = $(e.currentTarget).parent();
			$(gRadio).find('label').toggleClass('active');

			if ($(label).index() === 0) {
				$(bar).css('left', '0');
			} else {
				$(bar).css('left', '50%');
			}
		});
	}
});

// Tab
$(document).ready(function() {
	var switcher = UIkit.switcher($('.uk-switcher'), {
		active: 0,
		connect: true,
		swiping: true,
		animation: 'slide-left-small'
	});
});


$('.m-input-number-increment').bind('tap click', function(e) {
    var $input = $(this).siblings('input'),
        val = parseInt($input.val()),
        max = parseInt($input.attr('max')),
        step = parseInt($input.attr('step'));

    var temp = val + step;
    $input.val(temp <= max ? temp : max);
    console.log(temp);
});

$('.m-input-number-decrement').bind('tap click', function(e) {
    var $input = $(this).siblings('input'),
        val = parseInt($input.val()),
        min = parseInt($input.attr('min')),
        step = parseInt($input.attr('step'));

    var temp = val - step;
    $input.val(temp >= min ? temp : min);
  
    console.log(temp);
});

// Toggle round trip in form
$(document).ready(function() {
	var toggle = $('input[name=round_trip]');
	if(toggle.length > 0) {
		$(toggle).on('change', function() {
			var value = $(this).val();
			var target = $(this).data('target');
			value === '1 chiều' ? $('[data-ref="' + target + '"]').slideUp() : $('[data-ref="' + target + '"]').slideDown();
		});
	}
});

// Booking
$(document).ready(function() {
	$('.m-button-booking[data-booking="departure-flight"]').click(function(e) {
		e.preventDefault();
		var switcher = $('#m-booking-switcher');
		var departureTab = $(switcher).children()[0];
		$(departureTab).find('.m-result-list').hide();

		var result = $(departureTab).find('.m-ticket-chosen');
		// Trước khi show ra thì set lại các thông tin bên trong.
		// do something...
		$(result).toggle();


		// Close modal
		var modal = $(e.target).closest('[uk-modal]');
		UIkit.modal(modal).hide();
		UIkit.switcher(switcher).show(2);
	});

	$('.m-button-return-search').click(function(e) {
		e.preventDefault();
		var parent = $(e.target).closest('.m-ticket-chosen');
		var resultArea = $(parent).prev();
		$(parent).toggle();
		$(resultArea).toggle();
	});
});

// Offcanvas city
$(function() {
	$('.m-offcanvas-city').map(function(index, offCanvas) {
		UIkit.util.on(offCanvas, 'show', function (event, offCanvas) {
			var target 		= event.target,
					city 		= $(target).find('.m-city-item'),
					key 			= $(event.target).attr('id'),
					button 		= $(target).find('.uk-button')[0],
					targetInput = $(target).data('target'),
					inputSearch = $(target).find('.uk-input')[0];

			// Set focus to input search after show Off-canvas
			inputSearch.focus();

			// Click city to choose
			$(city).click(function(e) {
				e.preventDefault();
				var cityName 					= $(this).text();
				UIkit.offcanvas(target).hide();
				$('[data-ref="' + targetInput + '"]').val(cityName);
			});

			// Choose city to set in input outside
			$(button).click(function(e) {
				e.preventDefault();
				var cityName = $(e.target).prev().find('.uk-input').val();
				UIkit.offcanvas(target).hide();
				$('[data-ref="' + targetInput + '"]').val(cityName);
			});
		});
	});
});

// Datepicker

// Reset để tránh nhận event của uikit javascript
$(document).on('click', '.ui-datepicker-next', function(e) {
	e.preventDefault();
});

$(document).on('click', '.ui-datepicker-prev', function(e) {
	e.preventDefault();
});

$(function() {
	var input;
	$('.m-select-datepicker').click(function(e) {
		input = $(e.target);
		console.log(input);
		input.blur();
	});

	var selectionDatepicker = $('.m-offcanvas-date');
	if (selectionDatepicker.length > 0) {
		selectionDatepicker.map(function(index, sDatepicker) {
			UIkit.util.on(sDatepicker, 'show', function(event, element) {
				var dateToday = new Date();
				var datepicker = $('.m-datepicker');

				if (datepicker.length > 0 && typeof $.datepicker !== undefined) {
					var dates = datepicker.datepicker({
						defaultDate: '+1w',
						dateFormat: 'dd/mm/yy',
						minDate: dateToday,
						onSelect: function(selectedDate, self) {
							var option 		= $(input).data('date') === 'day-out' ? 'minDate' : 'maxDate',
									instance 	= $(this).data('datepicker'),
									date 			= $.datepicker.parseDate(instance.settings.dateFormat || $.datepicker._defaults.dateFormat, selectedDate, instance.settings);
									dates.not(this).datepicker('option', option, date);
							input.val(selectedDate);

							var offCanvas = $(this).closest('[uk-offcanvas]');
							UIkit.offcanvas(offCanvas).hide();
						}
					});
				}
			});
		})
		
	}
});

// Pick another date
$(function() {
	var listOtherDate = $('.m-list-ticket-date');
	if (listOtherDate.length > 0) {
		listOtherDate.find('li').map(function(index, li) {
			$(li).click(function() {
				// Do anything before close off canvas
				 
				var offCanvas = $(li).closest('[uk-offcanvas]');
				UIkit.offcanvas(offCanvas).hide();
			});
		});
	}
});