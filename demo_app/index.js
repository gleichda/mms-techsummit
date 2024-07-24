import Fastify from 'fastify'
const fastify = Fastify({
  logger: { level: 'error' }
})

import serveStatic from '@fastify/static'
fastify.register(serveStatic, {
  root: new URL('public', import.meta.url),
  prefix: '/',
})

import routes from "./routes.js"
fastify.register(routes);

const port = process.env.PORT || '8080'
const host = "0.0.0.0"
fastify.listen({ port, host }, (error, address) => {
  console.log("Server listen on:", address)
  if (error) {
    console.log(error)
    process.exit(1);
  }
})