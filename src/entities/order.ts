export interface Order {
    _id?: string;
    firstName: string;
    address: string;
    product?: string;
    deliveryDate?: string;
    deliveryTime?: string;
    deliveryMethod?: string;
    sendNotification?: boolean;
}