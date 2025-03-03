const typeDefs = `
type Customer {
    _id: ID!
    name: String
    email: String
    age: Int
    location: String
    gender: String
}

type Product {
    _id: ID!
    name: String
    category: String
    price: Float
    stock: Int
}

type Order {
    _id: ID!
    customerId: ID!
    products: [OrderProduct]
    totalAmount: Float
    orderDate: String
    status: String
}

type OrderProduct {
    productId: String
    quantity: Int 
    priceAtPurchase: Float
}
type CustomerSpending {
    customerId: ID!
    totalSpent: Float
    averageOrderValue: Float
    lastOrderDate: String
}

type TopSellingProduct {
    productId: ID!
    name: String
    totalSold: Int
}

type CategoryRevenue {
    category: String
    revenue: Float
}

type RevenueStats {
    totalRevenue: Float
    completedOrders: Int
    categoryBreakdown: [CategoryRevenue]
}

type Query {
   getCustomerSpending(customerId: ID!): [CustomerSpending],
   getTopSellingProducts : [TopSellingProduct],
   getSalesAnalytics(startDate: String!, endDate: String!): [RevenueStats]
}
`
module.exports = typeDefs