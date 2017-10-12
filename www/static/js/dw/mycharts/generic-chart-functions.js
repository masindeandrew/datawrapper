define(function(require){
    var $ = require('jquery'),
        twig = require('./twig_globals'),
        cft;

    return function(reloadLink) {
        cft = window['ChartFolderTree'];
        if (twig.globals.user2) {
            $('.thumbnail > a').click(function(e) {
                e.preventDefault();
                dw.backend.popupChart($(e.target).parents('.chart').data('id'), true);
            });

            $('a.edit').click(function(e) {
                e.preventDefault();
                var chart = $(e.target).parents('.chart');
                location.href = $('.thumbnail > a', chart).attr('href');
            });
        }

        $('a.delete').click(function(e) {
            e.preventDefault();
            var chart = $(e.target).parents('.chart'),
                id = chart.data('id');
            if (window.confirm(twig.globals.strings.confirm_chart_delete)) {
                 $.ajax({
                    url: '/api/charts/'+id,
                    type: 'DELETE',
                    success: function(data) {
                        chart.remove();
                        cft.removeChartFromCurrent();
                    }
                });
            };
        });

        $('.chart a.duplicate').click(function(e) {
            e.preventDefault();
            var id = $(e.target).parents('.chart').data('id');
            $.ajax({
                url: '/api/charts/'+id+'/copy',
                type: 'POST',
                success: function(data) {
                    try {
                        if (data.status == "ok") {
                            // redirect to copied chart
                            reloadLink(location.path);
                            // location.href = '/chart/'+data.data.id+'/visualize';
                        } else {
                            console.warn(data);
                        }
                    } catch (e) {
                        console.warn(data);
                    }
                }
            });
        });
    };
});
