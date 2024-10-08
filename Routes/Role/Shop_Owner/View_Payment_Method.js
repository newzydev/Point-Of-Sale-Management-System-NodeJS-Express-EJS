exports.getViewPaymentMethodPage = (req, res) => {
    const settings = res.locals.settings;
    const title = 'VIEW PAYMENT METHOD - ' + settings.text_footer;
    const your_page = 'Manage_Payment_Methods';
    const pay_id = req.params.pay_id;
    
    const dataQuery = `
        SELECT * FROM 
        Payment_Options 
        WHERE pay_id = ?
    `;
    
    db.query(dataQuery, [pay_id], (err, result) => {
        if (err) {
            res.redirect('/Role/Shop_Owner/Page/Manage_Payment_Methods');
        } else {
            res.render('Role/Shop_Owner/View_Payment_Method', { 
                title, 
                your_page,
                pay_method: result[0] 
            });
        }
    });
};