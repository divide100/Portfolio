/* global m,app */
app.cmp.home = {
    view: function(vnode) {
        return m('div#home', [
            m(app.cmp.common.detailBox,{
                header: 'hello',
                content: 'yo',
                class: 'secondary',
                id: 'one'
            })
        ]);
    }
};
