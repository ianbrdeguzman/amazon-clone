# MERN Amazon Clone

Check it out [here!](https://trusting-banach-dba1ca.netlify.app/)

## Created using:

-   Frontend
    -   React
    -   TailwindCSS
    -   Redux
    -   Axios
-   Backend
    -   Nodejs
    -   Expressjs
    -   JWT
    -   Mongoose
    -   MongoDB Atlas

## Features Implemented:

-   Home Page
    -   Image Carousel
    -   Product List
-   Login Page
    -   Login using email & password
-   Create Account Page
    -   Create a new account
-   Product Page
    -   Show product image & description
    -   Change quantity
    -   Add to cart
-   Cart Page
    -   Shows cart items
    -   Add to cart & Remove from cart
    -   Change quantity
    -   Show price and total price
    -   Shipping Address Page
    -   Submit shipping address
-   Payment Method Page
    -   PayPal payment method
-   Place Order Page
    -   Shows summary of order items, shipping details and order total
-   Order Page
    -   Shows order created
    -   PayPal checkout
-   Order History Page
    -   Shows list of orders
-   User Profile Page
    -   Update user details
    -   Sign out

## TODOs:

-   Admin Dashboard
-   Search Feature
-   Stripe checkout

## Challenges:

-   Deploying to Heroku

    -   App encountered buffer timeout error when fetching product list
    -   Found out that Mongoose lets you start using your models immediately, without waiting for mongoose to establish a connection to MongoDB.
    -   Solution I came up with is to have multiple connection for each model
    -   ```
        const conn = await mongoose.createConnection(
            mongodb_uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            }
        );
        const Model = conn.model('Model', modelSchema);
        ```
