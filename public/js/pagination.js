jQuery(function($) {
    // Grab whatever we need to paginate
    var pageParts = $(".paginate");

    // How many parts do we have?
    var numPages = pageParts.length;
    // How many parts do we want per page?
    var selectValue = parseInt(document.getElementById("mySelect").value);
    var perPage = selectValue;
    var start = 0;
    var end = perPage;
    // When the document loads we're on page 1
    // So to start with... hide everything else
    //pageParts.slice(perPage).hide();
    pageParts.hide().slice(start, end).show();
    // Apply simplePagination to our placeholder
    $("#page-nav").pagination({
        items: numPages,
        itemsOnPage: perPage,
        cssStyle: "compact-theme",
        // We implement the actual pagination
        //   in this next function. It runs on
        //   the event that a user changes page
        onPageClick: function(pageNum) {
            // Which page parts do we show?
            var start = perPage * (pageNum - 1);
            var end = start + perPage;

            // First hide all page parts
            // Then show those just for our page
            pageParts.hide()
                     .slice(start, end).show();
        }
    });
});


$('#mySelect').change(function(){
var selectValue = parseInt(document.getElementById("mySelect").value);

  var pageParts = $(".paginate");
  var numPages = pageParts.length;
  var perPage = selectValue;
  var start = 0;
    var end = perPage;
    pageParts.hide()
             .slice(start, end).show();
     

    $("#page-nav").pagination({
        items: numPages,
        itemsOnPage: perPage,
        cssTheme: "light-theme",
       
        onPageClick: function(pageNum) {
        var start = perPage * (pageNum - 1);
            var end = start + perPage;
        
            pageParts.hide()
                     .slice(start, end).show();
        }
    });
});