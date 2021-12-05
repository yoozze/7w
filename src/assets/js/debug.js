$(document).ready(function () {
    // Add grid.
    var style = {
        grid: 'top: 0; right: 0; bottom: 0; left: 0; z-index: 9999;',
        col: 'background-color: rgba(0, 255, 255, 0.25);'
    };
    var $grid = $(`
        <div class="design-grid position-fixed" style="${style['grid']}">
            <div class="container-fluid container-xl h-100">
                <div class="row mx-n1 mx-sm-n2 h-100">
                    <div class="col px-1 px-sm-2"><div class="w-100 h-100" style="${style['col']}"></div></div>
                    <div class="col px-1 px-sm-2"><div class="w-100 h-100" style="${style['col']}"></div></div>
                    <div class="col px-1 px-sm-2"><div class="w-100 h-100" style="${style['col']}"></div></div>
                    <div class="col px-1 px-sm-2"><div class="w-100 h-100" style="${style['col']}"></div></div>
                    <div class="col px-1 px-sm-2"><div class="w-100 h-100" style="${style['col']}"></div></div>
                    <div class="col px-1 px-sm-2"><div class="w-100 h-100" style="${style['col']}"></div></div>
                    <div class="col px-1 px-sm-2"><div class="w-100 h-100" style="${style['col']}"></div></div>
                    <div class="col px-1 px-sm-2"><div class="w-100 h-100" style="${style['col']}"></div></div>
                    <div class="col px-1 px-sm-2"><div class="w-100 h-100" style="${style['col']}"></div></div>
                    <div class="col px-1 px-sm-2"><div class="w-100 h-100" style="${style['col']}"></div></div>
                    <div class="col px-1 px-sm-2"><div class="w-100 h-100" style="${style['col']}"></div></div>
                    <div class="col px-1 px-sm-2"><div class="w-100 h-100" style="${style['col']}"></div></div>
                </div>
            </div>
        </div>'
    `).on({
        'click': function (e) {
            $(e.currentTarget).toggle();
        }
    });
    
    $('body').append($grid);
    $('html').on({
        'dblclick': function (e) {
            $grid.toggle();
        }
    });
});
