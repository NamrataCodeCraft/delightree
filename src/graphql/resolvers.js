const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;
const Order = require("../models/orders");
const resolvers = {
    Query: {
        getCustomerSpending: async (_, { customerId }) => {
            if (!ObjectId.isValid(customerId)) {
                throw new Error("Invalid customerId");
            }
            const data = await Order.aggregate([
                {
                    $match: {
                        customerId: new ObjectId(customerId),
                    },
                },
                {
                    $group: {
                        _id: "$customerId",
                        totalSpent: { $sum: "$totalAmount" },
                        avgSpent: { $avg: "$totalAmount" },
                        lastOrderDate: { $max: "$orderDate" },
                    },
                },
                {
                    $project: {
                        customerId: { $toString: "$_id" },
                        totalSpent: 1,
                        averageOrderValue: "$avgSpent",
                        lastOrderDate: 1,
                        _id: 0,
                    },
                },
            ]);
            return data;
        },
        getTopSellingProducts: async () => {
            const data = await Order.aggregate([
                {
                    $match: {
                        status: "completed",
                    },
                },
                {
                    $unwind: "$products",
                },
                {
                    $group: {
                        _id: "$products.productId",
                        totalSold: {
                            $sum: "$products.quantity",
                        },
                    },
                },
                {
                    $set: {
                        _id: {
                            $toObjectId: "$_id",
                        },
                    },
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "_id",
                        foreignField: "_id",
                        as: "productDetails",
                    },
                },
                {
                    $unwind: "$productDetails",
                },
                {
                    $project: {
                        _id: 0,
                        productId: {
                            $toString: "$_id",
                        },
                        name: "$productDetails.name",
                        totalSold: 1,
                    },
                },
                {
                    $sort: {
                        totalSold: -1,
                    },
                },
                {
                    $limit: 10,
                },
            ]);
            return data;
        },
        getSalesAnalytics: async (_, { startDate, endDate }) => {
            const data = await Order.aggregate([
                {
                    $match: {
                        status: "completed",
                        orderDate: {
                            $gte: new Date(startDate),
                            $lte: new Date(endDate),
                        },
                    },
                },
                {
                    $unwind: "$products",
                },
                {
                    $set: {
                        "products.productId": {
                            $toObjectId: "$products.productId",
                        },
                    },
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "products.productId",
                        foreignField: "_id",
                        as: "productDetails",
                    },
                },
                {
                    $unwind: "$productDetails",
                },
                {
                    $group: {
                        _id: "$productDetails.category",
                        revenue: {
                            $sum: {
                                $multiply: [
                                    "$products.quantity",
                                    "$products.priceAtPurchase",
                                ],
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalRevenue: {
                            $sum: "$revenue",
                        },
                        completedOrders: {
                            $sum: 1,
                        },
                        categoryBreakdown: {
                            $push: {
                                category: "$_id",
                                revenue: "$revenue",
                            },
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        totalRevenue: 1,
                        completedOrders: 1,
                        categoryBreakdown: 1,
                    },
                },
            ]);
            console.log([
                {
                    $match: {
                        status: "completed",
                        orderDate: {
                            $gte: new Date(startDate),
                            $lte: new Date(endDate),
                        },
                    },
                },
                {
                    $unwind: "$products",
                },
                {
                    $set: {
                        "products.productId": {
                            $toObjectId: "$products.productId",
                        },
                    },
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "products.productId",
                        foreignField: "_id",
                        as: "productDetails",
                    },
                },
                {
                    $unwind: "$productDetails",
                },
                {
                    $group: {
                        _id: "$productDetails.category",
                        revenue: {
                            $sum: {
                                $multiply: [
                                    "$products.quantity",
                                    "$products.priceAtPurchase",
                                ],
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        totalRevenue: {
                            $sum: "$revenue",
                        },
                        completedOrders: {
                            $sum: 1,
                        },
                        categoryBreakdown: {
                            $push: {
                                category: "$_id",
                                revenue: "$revenue",
                            },
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        totalRevenue: 1,
                        completedOrders: 1,
                        categoryBreakdown: 1,
                    },
                },
            ])
            // console.log(data);
            return data;
        }
    }
}

module.exports = resolvers