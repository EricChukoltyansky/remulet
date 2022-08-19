# Remult-React-Todo

This project is based on the remult tutorial  [Todo App with React
](https://remult.github.io/guide/setup-react.html) and saves all the work of doing the step by step setup.

Simply open a command line and run the following commands to setup:
```sh
git clone https://github.com/remult/remult-react-todo.git
cd remult-react-todo
npm i
```

Once it's done, open two terminals to run:
1. The api server
   ```
   npm run dev-node
   ```
2. The React dev cli
   ``` 
   npm run dev-react
   ```

And proceed to the [Entities](https://remult.github.io/guide/setup-remult.html#entities) section of the tutorials

# What does it do?
You can see the diff using [github compare](https://github.com/remult/remult-react-todo/compare/first-commit...master)


# To add swagger and graphql
```sh
npm i graphql express-graphql swagger-ui-express
npm i --save-dev @types/swagger-ui-express
```
And replace index.ts with:
```ts
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';
import { remultGraphql } from 'remult/graphql';
import { remultExpress } from 'remult/remult-express';

let app = express();
let api = remultExpress();
app.use(api);

app.use('/api/docs', swaggerUi.serve,
    swaggerUi.setup(api.openApiDoc({ title: 'remult-react-todo' })));

const { schema, rootValue } = remultGraphql(api);
app.use('/api/graphql', graphqlHTTP({
    schema: buildSchema(schema),
    rootValue,
    graphiql: true,
}));

app.listen(3002, () => console.log("Server started"));
```