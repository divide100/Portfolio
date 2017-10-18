/* global m,app,util */
app.cmp.common.toggle = {
    oninit: function(vnode) {
        vnode.state.options = vnode.attrs.options || [
            { label: 'ON', class: 'primary', selected: true },
            { label: 'OFF', class: 'secondary' }
        ];
        
        vnode.state.on = true;
        
        if(vnode.state.options[1].selected) {
            vnode.state.on = false;
        }
    },
    view: function(vnode) {
        var optA = vnode.state.options[0];
        var optB = vnode.state.options[1];
        
        return m('div.toggle-wrapper', [
            m('label.toggle-switch', {
                id: vnode.attrs.id
            }, [
                m('div.toggle-option', {
                    class: optA.class
                }, optA.label),
                m('div.toggle-separator'),
                m('div.toggle-option', {
                    class: optB.class
                }, optB.label),
                m('input', {
                    type: 'checkbox',
                    checked: vnode.state.on,
                    onchange: m.withAttr('checked', function() {
                        vnode.state.on = !vnode.state.on;
                        util.v('#' + vnode.attrs.id, {
                            left: vnode.state.on ? '0px' : '-56px'
                        })
                    })
                }),
                m('div.toggle-content', {
                })
            ])
        ]);
    }
};
