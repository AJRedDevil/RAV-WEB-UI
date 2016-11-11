$( function() {
    $('.ui.accordion').accordion();

    $('.dropdown').dropdown();

    $('.ui.checkbox').checkbox();

    $('.ui.button').popup({
            hoverable  : false,
            position   : 'bottom right',
            on    : 'click'
        });

    $('.floating.dropdown.button')
        .dropdown({
            direction: 'auto'
        })
    ;

    $( ".show-message" ).on( "click", function() {
        $(this).parents().next().toggleClass("is-visible");
    });

    $( ".show-review-message" ).on( "click", function() {
        $('inline-message-review').toggleClass("is-visible");
    });
} );

$(function() {
    $("#chart-wrapper").stick_in_parent();
});

// $(document).ready(function() {
//     var dxcodes = ["--DXCODE--", "DX123", "DX234", "DX456", "DX154", "DX174", "DX194", "DX019"];
//     var cptcodes = ["--CPTCODE--", "CPT123", "CPT234", "CPT456", "CPT154", "CPT174", "CPT194", "CPT019"];
//     var description = ["--Description--", "This is DX123", "This is DX234", " This is DX456", " This is DX154", "This is DX174", "This is DX194", "This is DX019"];
//     var cptdescs = ["--Description--", "This is CPT123", "This is CPT234", "This is CPT456", "This is CPT154", "This is CPT174", "This is CPT194", "This is CPT019"];
//     var doctors = ["--Providers--", "Dr. Tam", "Dr. Shyam", " Dr. Ram", "Dr. Hareram", "Dr. Radheshyam", "Dr. Manuram", "Dr. Krishna"];
//     $(".dxcode").select2({
//         data: dxcodes
//     });
//     $(".description").select2({
//         data: description
//     });
//     $(".doctors").select2({
//         data: doctors
//     });
//     $(".cptcodes").select2({
//         data: cptcodes
//     });
//     $(".cpt-desc").select2({
//         data: cptdescs
//     });
// });
