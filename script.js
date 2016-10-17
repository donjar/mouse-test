$(document).ready(function() {
	var timer = false;
	var win = false;
	var play = false;

	function mult(num, str) {
		return (num * parseInt(str, 10)) + 'px';
	}

	function change_color(str) {
		$('body').css('background-color', str);
	}

	function start_timer() {
		if (!timer) {
			timer = setInterval(function() {
				$('.timer').text(parseInt($('.timer').text(), 10) + 1);
			}, 100);
		}
	}

	function stop_timer() {
		clearInterval(timer);
		timer = false;
	}

	function reset_timer() {
		$('.timer').text('0');
	}

	$('.puzzle').each(function() {
		$(this).append('<div class="path right"></div> <div class="end"></div> <div class="path down"></div> <div class="start"></div>');
	});

	$('.puzzle').each(function() {
		var l = $(this).data('size');
		$(this).find('.start').css('width', l).css('height', l);
		$(this).find('.end').css('width', l).css('height', l);
		$(this).find('.right').css('width', mult(6, l)).css('height', l);
		$(this).find('.down').css('width', l).css('height', mult(5, l));
	});

	$('body').mouseover(function(e) {
		var cls = e.target.className;
		var tag = e.target.localName;
		if (tag === 'body' || cls === 'puzzle') {
			if (!win) {
				change_color('#f00');
				stop_timer();
				play = false;
				win = false;
			}
		} else if (cls === 'start') {
			change_color('#fff');
			reset_timer();
			play = true;
			win = false;
		} else if (cls === 'end') {
			if (play) {
				change_color('#0f0');
				stop_timer();
				play = false;
				win = true;
			}
		} else if (cls.slice(0, 4) === 'path') {
			if (play) {
				start_timer();
			}
		}
	});
});
