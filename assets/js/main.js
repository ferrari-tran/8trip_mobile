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

// Customize input number
(function() {
	window.inputNumber = function(el) {

		var min = el.attr('min') || false;
		var max = el.attr('max') || false;

		var els = {};

		els.dec = el.prev();
		els.inc = el.next();

		el.each(function() {
			init($(this));
		});

		function init(el) {

			els.dec.on('click', decrement);
			els.inc.on('click', increment);

			function decrement() {
				var value = el[0].value;
				value--;
				if(!min || value >= min) {
					el[0].value = value;
				}
			}

			function increment() {
				var value = el[0].value;
				value++;
				if(!max || value <= max) {
					el[0].value = value++;
				}
			}
		}
	}
})();

$(document).ready(function() {
	$('.m-input-number').each(function(index, input) {
		inputNumber($(input));
	});
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

