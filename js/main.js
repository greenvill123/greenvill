(function ($) {
    "use strict";
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 90) {
            $('.nav-bar').addClass('nav-sticky');
            $('.carousel, .page-header').css("margin-top", "73px");
        } else {
            $('.nav-bar').removeClass('nav-sticky');
            $('.carousel, .page-header').css("margin-top", "0");
        }
    });
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // // Modal Video
    // $(document).ready(function () {
    //     var $videoSrc;
    //     $('.btn-play').click(function () {
    //         $videoSrc = $(this).data("src");
    //     });
    //     console.log($videoSrc);

    //     $('#videoModal').on('shown.bs.modal', function (e) {
    //         $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
    //     })

    //     $('#videoModal').on('hide.bs.modal', function (e) {
    //         $("#video").attr('src', $videoSrc);
    //     })
    // });


    // // Testimonial Slider
    // $('.testimonial-slider').slick({
    //     infinite: true,
    //     autoplay: true,
    //     arrows: false,
    //     dots: false,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     asNavFor: '.testimonial-slider-nav'
    // });
    // $('.testimonial-slider-nav').slick({
    //     arrows: false,
    //     dots: false,
    //     focusOnSelect: true,
    //     centerMode: true,
    //     centerPadding: '22px',
    //     slidesToShow: 3,
    //     asNavFor: '.testimonial-slider'
    // });
    // $('.testimonial .slider-nav').css({"position": "relative", "height": "160px"});
    
    
    // // Blogs carousel
    // $(".related-slider").owlCarousel({
    //     autoplay: true,
    //     dots: false,
    //     loop: true,
    //     nav : true,
    //     navText : [
    //         '<i class="fa fa-angle-left" aria-hidden="true"></i>',
    //         '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    //     ],
    //     responsive: {
    //         0:{
    //             items:1
    //         },
    //         576:{
    //             items:1
    //         },
    //         768:{
    //             items:2
    //         }
    //     }
    // });
      

})(jQuery);

// const functions = require('firebase-functions');
//    const admin = require ('firebase-admin');
//    const Mailgun = require('mailgun.js');
//    const formData = require('form-data');

//    // Initialize Firebase Admin SDK
//    admin.initializeApp();

//    // Initialize Mailgun
//    const mailgun = new Mailgun(formData);
//    const mg = mailgun.client({
//        username: 'api',
//        key: 'b1fcba455e330e3c94f6f9f3f796271e-d8df908e-8795a47c', // Replace with your Mailgun API key
//    });

//    // Trigger when a new form submission is added to the database
//    exports.sendEmailNotification = functions.database
//        .ref('/contactFormSubmissions/{submissionId}')
//        .onCreate((snapshot, context) => {
//            const formData = snapshot.val();

//            const emailData = {
//                from: 'info@greenvillassociates.com', // Replace with your verified sender email
//                to: 'greenvillassociates@gmail.com', // Replace with your notification email
//                subject: `New Contact Form Submission from ${formData.name}`,
//                text: `
//                    Name: ${formData.name}
//                    Email: ${formData.email}
//                    Phone: ${formData.phone}
//                    Message: ${formData.message}
//                    Timestamp: ${formData.timestamp}
//                `,
//            };

//            return mg.messages.create('https://app.mailgun.com/app/sending/domains/sandbox2bf5c8b05aef4d5088943637970ed406.mailgun.org', emailData) // Replace with your Mailgun domain
//                .then(() => {
//                    console.log('Email sent successfully');
//                })
//                .catch((error) => {
//                    console.error('Error sending email:', error);
//                });
//        });
