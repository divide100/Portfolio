/* global util,m,app,Velocity */
app.cmp.common.menu = {
    oninit: function(vnode) {
        vnode.state.visible = false;
        var left = 'left';
        app.shared.swipe.add('show-menu', {
            direction: left ? 'right' : 'left',
            callback: this.show.bind(this, vnode),
            selector: '#menu-one',
            ignore: '#menu-btn .overlay',
            drag: {
                cancel: this.hide.bind(this, vnode),
                selector: '#menu-one',
                left: {
                    xMin: -300,
                    xMax: 0,
                    update: left || 'right'
                },
                right: {
                    xMin: -300,
                    xMax: 0,
                    update: left || 'right'
                }
            }
        });
        
        app.shared.swipe.add('hide-menu', {
            direction: left || 'right',
            callback: this.hide.bind(this, vnode),
            drag: {
                cancel: this.show.bind(this, vnode),
                selector: '#menu-one',
                update: function(percentage) {
                  util.v('#menu-wrapper .overlay', {
                      backgroundColor: 'background-color: rgba(0, 0, 0, ' + (percentage * .3) + ');'
                  });  
                },
                left: {
                    xMin: -300,
                    xMax: 0,
                    update: left || 'right'
                },
                right: {
                    xMin: -300,
                    xMax: 0,
                    update: left || 'right'
                }
            }
        });
    },
    show: function(vnode) {
        util.v('#menu-wrapper .overlay', 'fadeIn');
        util.v('#menu-one', {'left': '0px'});
        vnode.state.visible = true;
    },
    hide: function(vnode) {
        util.v('#menu-wrapper .overlay', 'fadeOut');
        util.v('#menu-one', {'left': '-300px'});
        vnode.state.visible = false;
    },
    reroute: function(vnode, item, evt) {
        if(m.route.get() === item.href) return;
        
        evt.preventDefault();
        util.v('#menu-wrapper .overlay', 'fadeOut');
        util.v('#content', 'fadeOut');
        util.v('#loading', 'fadeIn');
        util.q('#header').className = item.class;
        util.v('#menu-one', {'left': '-300px'});
        util.v('#header span', { fontSize: 0 }).then(function(el) {
            el[0].textContent = item.title;
            vnode.state.visible = false;
            util.v('#loading', 'fadeOut');
            return Velocity(el[0], 'reverse', 250);
        }).then(function() {
            util.v('#content', 'fadeIn');
            document.location.href = '/#!' + item.href;
        });
    },
    view: function(vnode) {
        return m('div#menu-wrapper', [
            m('div.overlay', {
                onclick: vnode.tag.hide.bind(this, vnode)
            }),
            m('i#menu-btn.fa.fa-bars', {
                onclick: vnode.tag.show.bind(this, vnode)
            }),
            m('div.menu#menu-one', {
                style: 'left: ' + (vnode.state.visible ? '0px' : '-300px')
            }, [
                m('ul', Object.keys(vnode.attrs.items).map(function(key, index) {
                    var item = vnode.attrs.items[key];
                    item['href'] = key;
                    return m('li', { role: 'presentation' },
                        m('a', {
                            class: (m.route.get() === key ? '' : 'inverse-') + item.class,
                            onclick: vnode.tag.reroute.bind(this, vnode, item)
                        }, [
                            m('i.menu-icon', {
                                class: 'fa fa-' + item.icon + ' fa-lg'
                            }),
                            m('span.menu-item-title', item.title)
                        ])
                    );
                }))
            ])
        ]);
    }
};
