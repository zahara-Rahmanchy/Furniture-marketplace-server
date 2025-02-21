import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
// function logRoutes(app: any) {
//   app._router.stack.forEach((middleware: any) => {
//     if (middleware.route) {
//       // Only log the route paths
//       console.log(`Route registered: ${middleware.route.path}`);
//     }
//     // This handles any nested routers
//     else if (middleware.name === 'router') {
//       middleware.handle.stack.forEach((routerMiddleware: any) => {
//         if (routerMiddleware.route) {
//           console.log(`Route registered: ${routerMiddleware.route.path}`);
//         }
//       });
//     }
//   });
// }
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    // logRoutes(app);
    app.listen(process.env.PORT, () => {
      console.log(
        `Furniture Marketplace System listening on port ${config.port}`,
      );
    });
  } catch (error) {
    console.log(error);
  }
}
main();
