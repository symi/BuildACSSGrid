(function () {
    window.levels = [
        {
            blurb: `Hi there. Welcome to Build A CSS Grid, here you can learn new the CSS4 <pre>display: grid</pre> module!
And have some target practice on some presidential candidates.

<pre>display: grid</pre> - Defines the element as a grid container.
<pre>grid-area</pre> - Names a set of elements in the grid.
<pre>grid-template-areas</pre> - Defines an ASCII art style grid. Rows are defined in <pre>" "</pre>, with multiple rows separated by spaces defining columns. Possible values <pre>.</pre> for empty cell and <pre>{grid-area name}</pre> to position a named set.</pre>
e.g. <pre>grid-template-areas: ". . ." ". item ."</pre>.`,
            winBlurbs: [
                '<pre>display: grid</pre>',
                '<pre>grid-area</pre>',
                '<pre>grid-template-areas</pre>'
            ],
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