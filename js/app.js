(function () {
    window.currentLevel = 0;
    window.fillpoint = /(\n{{.+?}}\n)/g;
    var _win = false;
    Object.defineProperty(window, 'win', {
        get: function () {
            return _win;
        },
        set: function(val) {
            _win = val;

            if (val) {
                showWinDialog();
            }           
        }
    });

    var prev = $('<button><</button>'),
        next = $('<button>></button>');

    function showWinDialog() {        
        $('#level-number').text(window.currentLevel + 1);
        var winBlurbs = window.levels[window.currentLevel].winBlurbs.map(function (winBlurb) {
            return '<li>' + winBlurb + '</li>';    
        }).join('');
        $('#learn-list').html(winBlurbs);
        $('.popup').show();
    }

    function renderLevels() {
        var levels = $('#levels');           

        levels.append(prev);

        prev.on('click', function () {
            loadLevel(window.currentLevel - 1);
        });

        window.levels.forEach(function (level, index) {
            var levelEl = $('<button class="level">' + (index + 1) + '</button>')
            levels.append(levelEl);

            levelEl.on('click', function () {
                loadLevel(index);
            })
        });   

        levels.append(next);

        next.on('click', function () {
            loadLevel(window.currentLevel + 1);
        });
    }

    function loadLevel(levelNumber, init) {
        if (levelNumber === window.currentLevel && !init) {
            return;
        }

        var level = window.levels[levelNumber],
            code = level.code.split(fillpoint),
            codeContainer = $('#code'),
            answerContainer = $('.answer-container'),
            resultContainer = $('.result-container');;

        window.win = false;

        codeContainer.children().remove();

        code.forEach(function (codeBlock) {
            var matches = codeBlock.match(/{{(.+)}}/) || [];

            if (matches.length > 1) {
                var codeEditor = $('<textarea></textarea>');
                codeContainer.append(codeEditor);
                codeEditor.on('keyup', _.debounce(function () {
                    if (matches[1] === 'target') {
                        $('.target').attr('style', codeEditor.val().split('\n').join('\n;'));
                    } else if (matches[1] === 'container') {
                        $('.result-container').attr('style', codeEditor.val().split('\n').join('\n;'));
                    }

                    checkResult();
                }, 300))
            } else {
                codeContainer.append($('<div>' + codeBlock + '</div>'));
            }
        });

        $('#blurb').text(level.blurb);

        answerContainer.children().remove();
        resultContainer.children().remove();

        answerContainer.removeAttr('style');
        resultContainer.removeAttr('style');

        Object.keys(level.setup.container).forEach(function (attribute) {
            answerContainer.css(attribute, level.setup.container[attribute]);
        });

        level.setup.clintons.forEach(function (clinton) {
            var clintonEl = $('<div class="clinton"></div>');
            answerContainer.append(clintonEl);
            Object.keys(clinton).forEach(function (attribute) {
                clintonEl.css(attribute, clinton[attribute]);
            });
        });

        level.setup.trumps.forEach(function (trump) {
            var trumpEl = $('<div class="trump"></div>');
            answerContainer.append(trumpEl);
            Object.keys(trump).forEach(function (attribute) {
                trumpEl.css(attribute, trump[attribute]);
            });
        });

        Array.from({length: level.setup.clintons.length})
            .forEach(function () {
                resultContainer.append($('<div class="target"></div>'))
        });
        
        window.currentLevel = levelNumber;

        prev.prop('disabled', false);
        next.prop('disabled', false);

        if (window.currentLevel === 0) {
            prev.prop('disabled', true);
        } else if (window.currentLevel === window.levels.length - 1) {
            next.prop('disabled', true);
        }       
    }

    function checkResult() {
        var trumpPositions = [],
            clintonPositions = [],
            targetPositions = [];

        $('.trump').each(function() {
            trumpPositions.push({
                top: $(this).position().top,
                left: $(this).position().left
            });
        });

        $('.clinton').each(function() {
            clintonPositions.push({
                top: $(this).position().top,
                left: $(this).position().left
            });
        });

        $('.target').each(function() {
            targetPositions.push({
                top: $(this).position().top,
                left: $(this).position().left
            });
        });

        targetPositions.forEach(function (position) {
            clintonPositions = clintonPositions.filter(function(clintonPosition) {
                return position.top !== clintonPosition.top 
                    || position.left !== clintonPosition.left;
            });

            trumpPositions = trumpPositions.filter(function(trumpPosition) {
                return position.top !== trumpPosition.top 
                    || position.left !== trumpPosition.left;
            });
        });

        if (clintonPositions.length === 0 
            || trumpPositions.length === 0) {
                window.win = true;
            }
    }

    function loadDialog() {
        $('#next-level').on('click', function () {
            loadLevel(window.currentLevel + 1);
            $('.popup').hide();
        });
    }

    renderLevels();
    loadDialog()
    loadLevel(window.currentLevel, true);
})();