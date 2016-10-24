$(function() {
        $('.jcarousel').jcarousel({
            wrap: 'circular'
        })
        .jcarouselAutoscroll({
            interval: 4000,
            target: '+=1',
            autostart: true
        });

        $('.jcarousel-control-prev').jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next').jcarouselControl({
                target: '+=1'
            });


        $('.grid').masonry({
         // options
         itemSelector: '.grid-item',
         columnWidth: 300
        });

        function removeResults() {
            $('.discover__search_clear').remove();
        }

        function searchRequest() {
        var $input = $('.discover__search_input').val();
            $.ajax({
            url: "https://pixabay.com/api/?key=3257095-9ba73a171b86ba863f1b822f8&q=" + $input + "&per_page=7",
            // dataType: 'jsonp',
            success: function(data) {
                if ( parseInt(data.totalHits) === 0)  {
                    removeResults();
                    $('.discover__box_grid').append('<p class="discover__search_clear">Search request "' + $input + '" not found </p>');
                    return false;
                } else 
                var pictureList = tmpl($('#box_template').html(), data);
                $('.discover__box_grid').remove();

                $('.discover__box').append(pictureList);
                $('.grid').masonry({
                // options
                itemSelector: '.grid-item',
                columnWidth: 300
                });
            }
        });
    };

    $('.discover__search').submit(function(e) {
        e.preventDefault();
        searchRequest();
        });
    searchRequest();
});

 