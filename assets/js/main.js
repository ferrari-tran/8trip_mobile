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

		$('[name=round_way]').on('change', function(e) {
			var label = $(e.currentTarget).parent();
			if ($(label).index() === 0) {
				$(bar).css('left', '0');
			} else {
				$(bar).css('left', '50%');
			}
		});
	}
});
