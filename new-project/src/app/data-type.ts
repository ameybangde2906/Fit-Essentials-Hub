export interface User{
    firstName:string,
    lastName:string,
    email:string,
    password:string,
}
export interface product{
    productName:string,
    productCost: string,
    productDiscount:String,
    productBrand:string,
    productCategory:string,
    productType:string,
    productImage:string,
    productDescription:string,
    productWeight:string,
    _id:string,
    productId:undefined | string,

}
export interface cart{
    productName:string,
    productBrand:string,
    productCost: number,
    productDiscount:number,
    productCategory:string,
    productType:string,
    productImage:string,
    productDescription:string,
    productWeight:string,
    _id:string | undefined,
    quantity: number,
    userId:string,
    productId:string,

}
export interface wishList{
    productName:string,
    productBrand:string,
    productCost: number,
    productDiscount:number,
    productCategory:string,
    productType:string,
    productImage:string,
    productDescription:string,
    productWeight:string,
    quantity: number,
    userId:string,
    productId:string,
}

export interface priceSummary{
    price: number,
    discount:number,
    tax:number,
    delivery:number,
    total:number,
}

export interface orderDetails{
    firstName:string,
    lastName:string,
    phone:number,
    email:string,
    address:string,
    town:string,
    city:string,
    state:string,
    country:string,
    pincode:number,
    price:number,
    userId:string
}

export interface address{
    _id:string
    firstName:string,
    lastName:string,
    phone:number,
    email:string,
    address:string,
    town:string,
    city:string,
    state:string,
    country:string,
    pincode:number,
    deliverAt:string,
    userId:string
}
