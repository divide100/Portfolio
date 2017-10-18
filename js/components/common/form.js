/* global util,m,app */
var text = function(a) {
    return m('div.form-control.pure-control-group', [
        m('label', {
            for: a.id
        }, a.label),
        m('input', {
            type: 'text',
            id: 'txt-' + a.id,
            placeholder: a.placeholder || ''
        })
    ]);
};

var toggle = function(a) {
    return m('div.form-control.pure-control-group', [
        m('label', a.label), 
        m(app.cmp.common.toggle, {
            id: 'tgl-' + a.id,
            options: a.options
        })
    ]);
};

var buttons = function(a) {
    var cancelBtn = {
        class: 'secondary',
        label: 'Cancel'
    };
    
    var submitBtn = {
        class: 'primary',
        label: 'Submit'
    };
    
    if(a && a.buttons) {
        cancelBtn = a.buttons[0];
        submitBtn = a.buttons[1];
    }
    
    return m('div.button-group', [
        m('button.secondary-button.pure-button', {
            class: cancelBtn.class
        }, cancelBtn.label),
        m('button.primary-button.pure-button.pure-button-primary', {
            class: submitBtn.class,
            type: 'submit'
        }, submitBtn.label)
    ]);
};

app.cmp.common.form = {
    view: function(vnode){
        
        var addButtons = true;
        
        var elements = vnode.attrs.elements.map(function(elem){
            switch(elem.type) {
                case 'text':
                    return text(elem);
                case 'toggle':
                    return toggle(elem);
                case 'buttons':
                    addButtons = false;
                    return buttons(elem);
            }
        });
        
        if(addButtons) elements.push(buttons());
        
        return m('form.pure-form.pure-form-aligned', elements);
    }
};