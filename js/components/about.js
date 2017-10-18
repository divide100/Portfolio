/* global m,app */
app.cmp.about = {
    view: function(vnode) {
        var dbs = [1];
        return m('div#about', dbs.map(function(e) {
            return m('div', [
                m(app.cmp.common.detailBox,{
                    header: 'hello',
                    content: 'yo',
                    class: 'secondary',
                    id: 'one-' + e
                }),
                m(app.cmp.common.detailBox,{
                    header: 'Hello',
                    class: 'primary',
                    id: 'two-' + e,
                    form: {
                        elements: [
                            { type: 'text', label: 'Hello', id: 'hello' },
                            { type: 'toggle', label: 'Hola', id: 'hola' },
                            { type: 'toggle', label: 'Hello', id: 'hello' },
                            { type: 'buttons' }
                        ]
                    }
                })
            ])
        }));
    }
};
