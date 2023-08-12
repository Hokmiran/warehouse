const asyncHandler = require("express-async-handler");
const PurchaseRequest = require('../models/PurchaseRequest');

// Yeni satın alma talebi oluşturma
const createRequest = asyncHandler(async (req, res) => {
    try {
        const { department, createdBy, product, quantity } = req.body;
        const purchaseRequest = await PurchaseRequest.create({
            department,
            createdBy,
            product,
            quantity,
        });
        res.status(201).json(purchaseRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Tüm satın alma taleplerini listeleme
const getRequest = asyncHandler(async (req, res) => {
    try {
        const purchaseRequests = await PurchaseRequest.find();
        res.json(purchaseRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Belirli bir satın alma talebini güncelleme
const updateRequest = asyncHandler(async (req, res) => {
    try {
        const { product, quantity } = req.body;
        const updatedPurchaseRequest = await PurchaseRequest.findByIdAndUpdate(
            req.params.id,
            { product, quantity },
            { new: true }
        );
        if (!updatedPurchaseRequest) {
            return res.status(404).json({ message: 'Satın alma talebi bulunamadı' });
        }
        res.json(updatedPurchaseRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Belirli bir satın alma talebini silme
const deleteRequest = asyncHandler(async (req, res) => {
    try {
        const deletedPurchaseRequest = await PurchaseRequest.findByIdAndDelete(
            req.params.id
        );
        if (!deletedPurchaseRequest) {
            return res.status(404).json({ message: 'Satın alma talebi bulunamadı' });
        }
        res.json({ message: 'Satın alma talebi başarıyla silindi' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
    createRequest,
    getRequest,
    updateRequest,
    deleteRequest
};
