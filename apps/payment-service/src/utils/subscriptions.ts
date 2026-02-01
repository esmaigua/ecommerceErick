import { consumer } from "./kafka"
import { createStripeProduct, deleteStripeProductPrice } from "./stripeProduct"

export const runKafkaSuscriptions = async () =>{
    consumer.subscribe("product.created", async (message)=>{
        const product = message.value
        console.log("Received message: product.created", product)

        await createStripeProduct(product)
    })

    consumer.subscribe("product.created", async (message)=>{
        const productId = message.value
        console.log("Received message: product.deleted", productId)

        await deleteStripeProductPrice(productId)
    })
}