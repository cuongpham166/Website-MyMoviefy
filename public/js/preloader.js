$(document).ready(function() {
		//Preloader
		$(window).on("load", function() {
		preloaderFadeOutTime = 700;
		function hidePreloader() {
		var preloader = $('.sk-folding-cube-wrapper');
		preloader.fadeOut(preloaderFadeOutTime);
		}
		hidePreloader();
		});
});