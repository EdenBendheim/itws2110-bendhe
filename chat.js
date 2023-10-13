$(document).ready(function() {
    // Hide all sections initially except the "Home" section.
    $(".section").not("#home").hide();

    // Handle navigation link clicks.
    $("nav ul li a").click(function(e) {
        e.preventDefault();

        // Get the ID of the clicked link and show the corresponding section.
        var target = $(this).attr("href");
        $(".section").hide();
        $(target).show();
    });
});