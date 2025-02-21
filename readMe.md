### Tech Stack

    - Express JS
    - Typescript
    - Node JS

### This is a the server side of the furniture marketplace system.

    - Users are of two types: Seller and Buyer.
    - Selers can add their furniture to the database,they can view the list,update it
    and delete it.
    - Sellers can also sell their product and view their sales history

    Buyers Can

    - View the furniture list.
    - View Products based on filters and add to cart.
    - Plac order by confirming the cart items
    - Search product based on their name, type or category.
    - Make a polish Request and view the current status.
    - Verify a product based on their product Id and its details

### Clone the repository using the command

    - git clone
    - cd my-repo
    - npm install

### Create a .env file and add the following

    - NODE_ENV = development
    - PORT
    -DATABASE_URL  = mongodb url from the mongodb atlas
    -BCRYPT_SALT_ROUNDS = any value

### Connect to MongoDB using mongoDB driver

### Use the following command to start the application

    - npm run build
    - npm run start

### To check linting issues run

    - npm run lint

### To fix linting issues run

    -npm run lint:fix

### Live Link

    - https://furniture-marketplace-client.vercel.app
