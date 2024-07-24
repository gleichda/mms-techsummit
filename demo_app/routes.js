import { createClient } from 'redis'

async function redisConnect() {
  const client = createClient({
    url: `redis://${process.env.REDISHOST || 'localhost'}`,
    socket: {
      connectTimeout: 5000,
      reconnectStrategy: false,
    },
      disableOfflineQueue: true
    });
    client.on('error', (error) => {
      throw error
    });
    await client.connect();
    return client;
}

export default async function routes(f) {
  f.post('/healthz', async function (request, response) {
    response.send(200)
  })

    const client = await redisConnect();
  
    const schema = {
      body: {
        type: 'object',
        required: ['id', 'vote'],
        properties: {
          id: { type: 'string' },
          vote: {
            type: 'number',
            minimum: -1,
            maximum: 1
          }
        }
      }
    }
    f.post('/vote', { schema }, async function (request, response) {
      let { id, vote } = request.body
      console.log(`Voting on [${id}]: ${vote}`)
      let result = await client.zIncrBy("products", vote, id);
      response.send(JSON.stringify({ id, votes: result }))
    })

    f.get('/top-products', async function (request, response) {
      let result = await client.zRangeWithScores(
        "products", 0, 2, { REV: true }
      );
      response.send(JSON.stringify(result));
    })
}