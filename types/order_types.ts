import { singleCartType } from "./cart_types"

export type singleOrderType = {
    id:number,
    orderDate:string,
    status:'waiting' | 'success' | 'cancel',
    itemList:[
        singleCartType
    ]
}