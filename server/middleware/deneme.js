export default defineEventHandler((event) => {
    event.node.res.setHeader('X-FOOOO', 'TEST');
  })