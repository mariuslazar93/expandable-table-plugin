var OrderPadsComponent = function(options) {

    var $table,
        $firstRows,
        $secondRows,
        $thirdRows,
        $expandFirstRowsBtn,
        $expandSecondRowsBtn;

    function handleExpandFirstRow(e) {
        e.preventDefault();
        var $this = $(this);
        var $thisIcon = $this.find('span');
        var dataToExpandFirstRow = $this.attr('data-expand-target');
        var expandFirstRowSelector = '[data-expand-source='+ dataToExpandFirstRow + ']';
        var $firstRow = $firstRows.siblings(expandFirstRowSelector);

        if ($this.hasClass('js-second-row-collapsed')) {
            $thisIcon.addClass('fa-minus-square').removeClass('fa-plus-square');
            $firstRow.addClass('tr-show');
            $this.removeClass('js-second-row-collapsed');
        } else {
            $firstRow.each(function() {

                var $this = $(this);
                var $btn = $this.find('.btn');
                var $icon = $btn.find('span');
                var dataToExpandSecondRow = $btn.attr('data-expand-target');
                var expandSecondRowSelector = '[data-expand-source='+ dataToExpandSecondRow + ']';

                if (!$btn.hasClass('js-third-row-collapsed')) {
                    $firstRows.siblings(expandSecondRowSelector).removeClass('tr-show');
                    $btn.addClass('js-third-row-collapsed');
                    $icon.addClass('fa-plus-square').removeClass('fa-minus-square');
                }
                $this.removeClass('tr-show');
            });
            $thisIcon.addClass('fa-plus-square').removeClass('fa-minus-square');
            $this.addClass('js-second-row-collapsed');
        }
    }

    function handleExpandSecondRow(e) {
        e.preventDefault();
        var $this = $(this);
        var $thisIcon = $this.find('span');
        var dataToExpandSecondRow = $this.attr('data-expand-target');
        var expandSecondRowSelector = '[data-expand-source='+ dataToExpandSecondRow + ']';

        if ($this.hasClass('js-third-row-collapsed')) {
            $this.removeClass('js-third-row-collapsed');
            $thisIcon.addClass('fa-minus-square').removeClass('fa-plus-square');
            $firstRows.siblings(expandSecondRowSelector).addClass('tr-show');
        } else {
            $thisIcon.addClass('fa-plus-square').removeClass('fa-minus-square');
            $firstRows.siblings(expandSecondRowSelector).removeClass('tr-show');
            $this.addClass('js-third-row-collapsed');
        }
    }

    function bindEvents() {
        $expandFirstRowsBtn.click(handleExpandFirstRow);

        if ($thirdRows.length > 0) {
            $expandSecondRowsBtn.click(handleExpandSecondRow);
        }
    }

    function init(options) {
        var table = options.table ? options.table : '';
        var firstRow = options.firstRowClass ? options.firstRowClass : '.first-row';
        var secondRow = options.secondRowClass ? options.secondRowClass : '.second-row';
        var thirdRow = options.thirdRowClass ? options.thirdRowClass : '.third-row';

        $table = $(table);
        $firstRows = $(firstRow, $table);
        $secondRows = $(secondRow, $table);
        $thirdRows = $(thirdRow, $table);

        if ($table.length > 0 && $secondRows.length > 0) {
                $expandFirstRowsBtn = $firstRows.find('.btn');

                if ($thirdRows.length > 0)
                    $expandSecondRowsBtn = $secondRows.find('.btn');

                bindEvents();
        }
    }
    init(options);
};


var firstTable = new OrderPadsComponent({
    table: '#firstTable'
});

var secondTable = new OrderPadsComponent({
    table: '#secondTable'
});
