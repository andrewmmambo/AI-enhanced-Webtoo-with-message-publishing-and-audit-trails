// ExtJS UI components for message publishing form
Ext.define('MessageForm', {
    extend: 'Ext.form.Panel',
    xtype: 'messageform',
    title: 'Message Publishing',
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Message',
        name: 'message'
    }],
    buttons: [{
        text: 'Publish',
        handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
                form.submit({
                    url: '/api/messages',
                    success: function(form, action) {
                        Ext.Msg.alert('Success', action.result.message);
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Failed', action.result.message);
                    }
                });
            }
        }
    }]
});

// ExtJS grid for displaying audit trails
Ext.define('AuditTrailGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'audittrailgrid',
    title: 'Audit Trails',
    store: Ext.create('Ext.data.Store', {
        fields: ['timestamp', 'action', 'user'],
        proxy: {
            type: 'ajax',
            url: '/api/audit-trails',
            reader: {
                type: 'json',
                rootProperty: 'auditTrails'
            }
        },
        autoLoad: true
    }),
    columns: [
        { text: 'Timestamp', dataIndex: 'timestamp' },
        { text: 'Action', dataIndex: 'action' },
        { text: 'User', dataIndex: 'user' }
    ]
});
