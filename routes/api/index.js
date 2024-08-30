const router = require('express').Router();

const customerRouter = require('./customer');
router.use('/customers', customerRouter);

const salesActualRouter = require('./salesActual');
router.use('/salesActuals', salesActualRouter);

const invoiceRouter = require('./invoice');
router.use('/invoices', invoiceRouter);

const userRouter = require('./user');
router.use('/users', userRouter);

const loginRouter = require('./login');
router.use('/logins', loginRouter);

const salesReportRouter = require('./salesReport');
router.use('/salesReports', salesReportRouter);

const invoiceDetailRouter = require('./invoiceDetail');
router.use('/invoiceDetails', invoiceDetailRouter);

const customerLedgerRouter = require('./customerLedger');
router.use('/customerLedgers', customerLedgerRouter);

const productReturnRouter = require('./productReturn');
router.use('/productsReturns', productReturnRouter);



module.exports = router;
