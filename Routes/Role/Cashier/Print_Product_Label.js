exports.getProductPrintLabelPage = (req, res) => {
    const settings = res.locals.settings;
    const title = 'PRINT PRODUCT LABEL - ' + settings.text_footer;
    const your_page = 'Manage_Products';
    const error = req.flash('error');
    const success = req.flash('success');

    const dataQuery = `
        SELECT 
            Products.product_id, 
            Products.product_name, 
            Products.product_price,
            Products.product_unit_number,
            Categories.cat_id, 
            Categories.cat_name_main, 
            Categories.cat_name_sub 
        FROM 
            Products 
        INNER JOIN 
            Categories 
        ON 
            Products.cat_id = Categories.cat_id 
        ORDER BY 
            Categories.cat_name_main ASC, Products.time_order DESC
    `;

    db.query(dataQuery, (err, result) => {
        if (err) {
            res.redirect('Role/Cashier/Manage_Products');
        } else {
            res.render('Role/Cashier/Print_Product_Label', {
                title, 
                your_page,
                error: error[0], 
                success: success[0],
                products: result
            });
        }
    });
};