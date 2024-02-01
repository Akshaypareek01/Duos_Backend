import Invoice from "../Models/Invoice.Model.js";


// Controller function to create a new invoice
export const createInvoice = async (req, res) => {
  try {
    const newInvoice = await Invoice.create(req.body);
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get all invoices
export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('worker job');
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get invoice by ID
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('worker job');
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update invoice by ID
export const updateInvoice = async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('worker job');
    if (!updatedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete invoice by ID
export const deleteInvoice = async (req, res) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!deletedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
