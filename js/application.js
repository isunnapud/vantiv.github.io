// Mobile Detection
function isMobile(){return ((navigator.userAgent.match(/Android/i)) ||(navigator.userAgent.match(/webOS/i)) || (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/BlackBerry/)));}

// ANIMATIONS
if(!isMobile()) {
	$(window).scroll(function() {
		$('#markets .mkt').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+800) {$(this).addClass("expandUp");}
		});
		$('.indicator').each(function(){
			var imagePos = $(this).offset().top;
			var topOfWindow = $(window).scrollTop();
			if (imagePos < topOfWindow+800) {$(this).addClass("fadeIn");}
		});
	});
}
else{
	$('#markets .mkt').css('visibility','visible');
	$('.indicator').css('visibility','visible');
};

// Client Slider 
$("#client-list").flexisel({
	visibleItems: 5,
        enableResponsiveBreakpoints: true,
        responsiveBreakpoints: { 
            portrait: { changePoint:480, visibleItems: 1 }, 
            landscape: { changePoint:640,  visibleItems: 2 },
            tablet: { changePoint:768, visibleItems: 3 }
        }
});

//Email Spam Protection - Example Markup: <span class="email">name[at]domain[dot]com</span>
$(document).ready(function($) {   
    $('.showemail').each(function() {
        var $email = $(this);
        var address = $email.text()
        .replace(/\s*\[at\]\s*/, '@')
        .replace(/\s*\[dot\]\s*/g, '.');
        $email.html('<a class="btn btn-danger pull-right" href="mailto:' + address + '">Schedule a Meeting</a>');
    });
});

// Form Validation 
$(document).ready(function(){
	$('#free-evaluation-form').on('submit', function(e) {
		var form = $(this);
		$(form).validate({
			rules: { firstName: {minlength: 2,required: true},lastName: {minlength: 2, required: true},company: {minlength: 2,required: true},	phone: {minlength:7, required:true},emailAddress: {required: true, email: true}},
			messages: {firstName:  "Please enter your first name",lastName:  "Please enter your last name",company:  "Please enter your company",phone: "Please enter your phone number",emailAddress:  "Please enter your email address"},
			highlight:  function(label){$(label).closest('.form-group').addClass('error');}
		});
		if($(form).valid()){
			$.ajax({
				type: 'POST',
				url: 'https://s2167.t.eloqua.com/e/f2',
				cache: false,
				global: false,
				dataType: 'json',
				data: $(form).serialize()
			});
			$('#form').fadeOut(function(){$('#thanks').fadeIn();});
		}
		e.preventDefault();
	});
	$('#contact-form').on('submit', function(e) {
		var form = $(this);
		$(form).validate({
			rules: { 
				firstName: {minlength: 2,required: true},
				lastName: {minlength: 2, required: true},
				company: {minlength: 2,required: true},	
				emailAddress: {required: true, email: true},
				inquiryType:{required: true},
				comments:{required:true, minlength:5}
			},
			messages: {
				firstName:  "Please enter your first name",
				lastName:  "Please enter your last name",
				company:  "Please enter your company",
				emailAddress:  "Please enter your email address",
				comments: "Please type your message"
			}
		});
		if($(form).valid()){
			$.ajax({
				type: 'POST',
				url: 'https://s2167.t.eloqua.com/e/f2',
				cache: false,
				global: false,
				dataType: 'json',
				data: $(form).serialize()
			});
			$('.form-container > form').fadeOut(function(){$('.form-container').html('<div class="text-center"><h2>THANKS!</h2><p>Someone will get right back to you.</p></div>').fadeIn();});
		}
		e.preventDefault();
	});
	$('#partner-contact').on('submit', function(e) {
		var form = $(this);
		$(form).validate({
			rules: { 
				firstName: {minlength: 2,required: true},
				lastName: {minlength: 2, required: true},
				company: {minlength: 2,required: true},	
				emailAddress: {required: true, email: true}
			},
			messages: {
				firstName:  "Please enter your first name",
				lastName:  "Please enter your last name",
				company:  "Please enter your company",
				emailAddress:  "Please enter your email address",
			}
		});
		if($(form).valid()){
			$.ajax({
				type: 'POST',
				url: 'https://s2167.t.eloqua.com/e/f2',
				cache: false,
				global: false,
				dataType: 'json',
				data: $(form).serialize()
			});
			$('.partner-form-container > form').fadeOut(function(){$('.partner-form-container').html('<div class="text-center"><h2>THANKS!</h2><p>Someone will get right back to you.</p></div>').fadeIn();});
		}
		e.preventDefault();
	});
	
	$('#Career-Application-Form').on('submit', function() {
		$('.form-container > form').fadeOut(function(){$('.form-container').html('<div class="text-center"><h2>THANKS!</h2><p>Someone will get right back to you.</p></div>').fadeIn();});
	});
});

/*  Navigation Scrolling  */
function scrollToSection(){
	$('a[href^="#"]').on('click',function (e) {
		e.preventDefault();
	    	var target = this.hash,
	    	$target = $(target);
	    	if ($target.length > 0) {
		    	$('html, body').stop().animate({
		        	'scrollTop': $target.offset().top
		    	}, 900, 'swing', function () {
		        	window.location.hash = target;
		    	});
	    	}
	});
}
$(document).ready(function(){scrollToSection();});
$("a[href$='pdf']").each(function(index) {
      pdfLabel = $(this).attr('href');
      pdfOnClick = "ga('send', 'event', 'PDF', 'Download', '" + pdfLabel + "');";
      $(this).attr("onClick", pdfOnClick);
});