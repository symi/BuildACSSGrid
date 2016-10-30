(function () {
    window.levels = [
        {
            blurb: 'some text',
            winBlurbs: ['some text'],
            code: `.container {
    display:grid;
{{container|3}}
}

.target {
{{target|1}}
}`,
            setup: {
                container: {
                    'grid-template-columns': 'repeat(2, 100px)',
                    'grid-template-rows': 'repeat(2, 100px)',
                    'grid-template': '". trump" "clinton ."'
                },
                clintons: [
                    {
                        'grid-area': 'clinton'
                    }
                ],
                trumps: [
                    {
                        'grid-area': 'trump'
                    }
                ] 
            }
        },
        {
            blurb: 'some text2',
            winBlurbs: ['some text2'],
            code: `.container {
    display:grid;
{{container|3}}
}

.target {
{{target|1}}
}`,
            setup: {
                container: {
                    'grid-template-columns': 'repeat(2, 100px)',
                    'grid-template-rows': 'repeat(4, 100px)',
                    'grid-template': '"clinton trump" "clinton trump"'
                },
                clintons: [
                    {
                        'grid-area': 'clinton'
                    },
                    {
                        'grid-area': 'clinton'
                    }

                ],
                trumps: [
                    {
                        'grid-area': 'trump'
                    },
                    {
                        'grid-area': 'trump'
                    }
                ] 
            }
        }
    ];
})();