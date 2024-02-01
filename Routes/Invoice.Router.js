import express from 'express';

import { createInvoice, deleteInvoice, getAllInvoices, getInvoiceById, updateInvoice } from '../Controllers/Invoice.Controller.js';

const InvoiceRouter = express.Router();

// Route to create a new invoice
InvoiceRouter.post('/', createInvoice);

// Route to get all invoices
InvoiceRouter.get('/', getAllInvoices);

// Route to get invoice by ID
InvoiceRouter.get('/:id', getInvoiceById);

// Route to update invoice by ID
InvoiceRouter.put('/:id', updateInvoice);

// Route to delete invoice by ID
InvoiceRouter.delete('/:id', deleteInvoice);

export default InvoiceRouter;
