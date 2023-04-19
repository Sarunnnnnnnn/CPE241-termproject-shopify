interface Product {
    id: number;
    name: string;
    image: string;
    variation: string;
    price: number;
    quantity:number
  }


interface Order {
    id: number;
    customerName: string;
    customerAddress: string;
    orderTotal: number;
    date: Date;
    status: string;
    products: Product[];
  }
  
  interface Props {
    orders: Order[];
  }
  

  export const orders: Order[] = [
    {
      id: 1,
      products: [
        {
          id: 1,
          name: "Product A",
          image: "https://via.placeholder.com/150",
          price: 100,
          quantity:1,
          variation: "Category A",
        },
        {
          id: 2,
          name: "Product B",
          image: "https://via.placeholder.com/150",
          price: 50,
          quantity:1,
          variation: "Category B",
        },
      ],
      customerName: "John Smith",
      customerAddress: "123 Main St. Anytown, USA",
      orderTotal: 150,
      date: new Date("2022-01-01T12:00:00Z"),
      status: "Completed",
    },
    {
      id: 2,
      products: [
        {
          id: 3,
          name: "Product C",
          image: "https://via.placeholder.com/150",
          price: 75,
          quantity:1,
          variation: "Category C",
        },
      ],
      customerName: "Jane Doe",
      customerAddress: "456 Oak St. Anytown, USA",
      orderTotal: 75,
      date: new Date("2022-02-01T12:00:00Z"),
      status: "Delivered",
    },
    {
      id: 1,
      products: [
        {
          id: 1,
          name: "Product A",
          image: "https://via.placeholder.com/150",
          price: 100,
          quantity:1,
          variation: "Category A",
        },
        {
          id: 2,
          name: "Product B",
          image: "https://via.placeholder.com/150",
          price: 50,
          quantity:1,
          variation: "Category B",
        },
      ],
      customerName: "John Smith",
      customerAddress: "123 Main St. Anytown, USA",
      orderTotal: 150,
      date: new Date("2022-01-01T12:00:00Z"),
      status: "Delivered",
    },
  ];
