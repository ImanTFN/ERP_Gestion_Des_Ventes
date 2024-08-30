const Joi = require('@hapi/joi');

const validateSchema = function(schema, data) {
    const validator = schema.validate(data);
    if (validator.error) {
        validator.error = validator.error.details[0].message.toUpperCase();
    }
    return validator;
};
const CustomerValidator = (data) => {
    const schema = Joi.object({
        customer_id: Joi.string().required().trim(),
        customer_address: Joi.string().required().trim(),
        customer_mobile: Joi.string().required().trim(),
        customer_email: Joi.string().required().trim(),
    });
    return validateSchema(schema, data);
};

const SalesActualValidator = (data) => {
    const schema = Joi.object({
        DATE: Joi.string().required().trim(),
        supplier_id: Joi.string().required().trim(),
        sub_total: Joi.string().required().trim(),
        no_transection: Joi.string().required().trim(),
    });
    return validateSchema(schema, data);
};

const InvoiceValidator = (data) => {
    const schema = Joi.object({
        invoice_id: Joi.string().required().trim(),
        customer_id: Joi.string().required().trim(),
        total_amount: Joi.string().required().trim(),
        invoice: Joi.string().required().trim(),
        invoice_details: Joi.string().required().trim(),
        status: Joi.string().required().trim(),
    });
    return validateSchema(schema, data);
};

const UserValidator = (data) => {
    const schema = Joi.object({
        user_id: Joi.string().required().trim(),
        username: Joi.string().required().trim(),
        password: Joi.string().required().trim(),
        last_name: Joi.string().required().trim(),
        first_name: Joi.string().required().trim(),
        gender: Joi.string().required().trim(),
        date_of_birth: Joi.string().required().trim(),
        security_code: Joi.string().required().trim(),
        status: Joi.string().required().trim(),
    });
    return validateSchema(schema, data);
};

const SalesReportValidator = (data) => {
    const schema = Joi.object({
        date: Joi.string().required().trim(),
        invoice_id: Joi.string().required().trim(),
        invoice_details_id: Joi.string().required().trim(),
        supplier_id: Joi.string().required().trim(),
        product_id: Joi.string().required().trim(),
        product_model: Joi.string().required().trim(),
        product_name: Joi.string().required().trim(),
        quantity: Joi.string().required().trim(),
        sell_rate: Joi.string().required().trim(),
        supplier_rate: Joi.string().required().trim(),
    });
    return validateSchema(schema, data);
};

const InvoiceDetailValidator = (data) => {
    const schema = Joi.object({
        invoice_details_id: Joi.string().required().trim(),
        invoice_id: Joi.string().required().trim(),
        product_id: Joi.string().required().trim(),
        quantity: Joi.string().required().trim(),
        rate: Joi.string().required().trim(),
        supplier_rate: Joi.string().required().trim(),
        total_price: Joi.string().required().trim(),
        discount: Joi.string().required().trim(),
        discount_per: Joi.string().required().trim(),
        tax: Joi.string().required().trim(),
        paid_amount: Joi.string().required().trim(),
        due_amount: Joi.string().required().trim(),
        status: Joi.string().required().trim(),
    });
    return validateSchema(schema, data);
};

const CustomerLedgerValidator = (data) => {
    const schema = Joi.object({
        id: Joi.string().required().trim(),
        transaction_id: Joi.string().required().trim(),
        customer_id: Joi.string().required().trim(),
        description: Joi.string().required().trim(),
        payment_type: Joi.string().required().trim(),
        cheque_no: Joi.string().required().trim(),
        status: Joi.string().required().trim(),
        d_c: Joi.string().required().trim(),
    });
    return validateSchema(schema, data);
};

const ProductReturnValidator = (data) => {
    const schema = Joi.object({
        return_id: Joi.string().required().trim(),
        product_id: Joi.string().required().trim(),
        invoice_id: Joi.string().required().trim(),
        date_sale: Joi.string().required().trim(),
        date_return: Joi.string().required().trim(),
        customer_id: Joi.string().required().trim(),
        reason: Joi.string().required().trim(),
    });
    return validateSchema(schema, data);
};

module.exports = {
    CustomerValidator,
    SalesActualValidator,
    InvoiceValidator,
    UserValidator,
    SalesReportValidator,
    InvoiceDetailValidator,
    CustomerLedgerValidator,
    ProductReturnValidator,
};
