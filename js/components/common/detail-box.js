/* global util,m,app */
app.cmp.common.detailBox = {
    oninit: function(vnode) {
        vnode.state.hidden = true;
    },
    show: function(vnode){
        util.v('#db-' + vnode.attrs.id + ' .detail-box-body', 'slideDown');
        vnode.state.hidden = false;
    },
    hide: function(vnode){
        util.v('#db-' + vnode.attrs.id + ' .detail-box-body', 'slideUp');
        vnode.state.hidden = true;
    },
    toggle: function(vnode){
        if(vnode.state.hidden) {
            this.show(vnode);
        } else {
            this.hide(vnode);
        }
    },
    view: function(vnode) {
        return m('div.detail-box', {
                id: 'db-' + vnode.attrs.id,
                class: vnode.state.hidden ? 'detail-box-hidden' : ''
            },
            m('div.detail-box-header', {
                class: vnode.attrs.class,
                onclick: this.toggle.bind(this, vnode)
            }, m('i.detail-box-knob', {
                class: 'fa fa-chevron-down'
            }),
            vnode.attrs.header),
            m('div.detail-box-body', vnode.attrs.content || m(app.cmp.common.form, vnode.attrs.form))
        );
    }
};