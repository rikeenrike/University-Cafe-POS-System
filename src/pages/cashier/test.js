
const fetchAll = ref([
    {   
        MainCategory: 'Drinks',
        sub : [
            {
                SubCategory: 'Hot Drinks',
                items: [
                    {
                        ProductID: 1,
                        ProductName: 'Americano',
                        UnitPrice: 50.00,
                        Quantity: 1
                    },
                    {
                        ProductID: 2,
                        ProductName: 'Cappuccino',
                        UnitPrice: 60.00,
                        Quantity: 1
                    }
                ]
            },
            {
                SubCategory: 'Cold Drinks',
                items: [
                    {
                        ProductID: 3,
                        ProductName: 'Iced Coffee',
                        UnitPrice: 70.00,
                        Quantity: 1
                    },
                    {
                        ProductID: 4,
                        ProductName: 'Iced Tea',
                        UnitPrice: 60.00,
                        Quantity: 1
                    }
                ]
            }
        ] 
    },
    {
        MainCategory: 'Food',
        sub : [
            {
                SubCategory: 'Appetizers',
                items: [
                    {
                        ProductID: 5,
                        ProductName: 'Calamari',
                        UnitPrice: 120.00,
                        Quantity: 1
                    },
                    {
                        ProductID: 6,
                        ProductName: 'Cheese Sticks',
                        UnitPrice: 100.00,
                        Quantity: 1
                    }
                ]
            },
            {
                SubCategory: 'Main Course',
                items: [
                    {
                        ProductID: 7,
                        ProductName: 'Pasta Carbonara',
                        UnitPrice: 150.00,
                        Quantity: 1
                    },
                    {
                        ProductID: 8,
                        ProductName: 'Chicken Alfredo',
                        UnitPrice: 180.00,
                        Quantity: 1
                    }
                ]
            }
        ]
    }
]);