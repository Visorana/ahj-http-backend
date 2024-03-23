const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const cors = require('koa2-cors');
const Tickets = require('./Tickets');

const app = new Koa();

// Middleware
app.use(koaBody({ json: true, text: true, urlencoded: true }));

app.use(
  cors({
    origin: '*',
    credentials: true,
    'Access-Control-Allow-Origin': true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

const router = new Router();
const tickets = new Tickets();

// Route to get all tickets or a ticket by ID
router.get('/tickets', async (ctx) => {
  const { method } = ctx.request.query;
  if (method === 'allTickets') {
    ctx.response.body = tickets.allTickets();
  }

  if (method === 'ticketById') {
    const { id } = ctx.request.query;
    ctx.response.body = tickets.ticketById(id);
  }
});

// Route to create a new ticket
router.post('/tickets', async (ctx) => {
  ctx.response.body = ctx.request.body;
  const { method } = ctx.request.query;
  if (method === 'createTicket') {
    const { name, description } = ctx.request.body;
    tickets.createTicket(name, description);
    ctx.response.status = 204;
  }
});

// Route to delete a ticket by ID
router.delete('/tickets/:id', async (ctx) => {
  const ticketId = Number(ctx.params.id);
  tickets.deleteTicket(ticketId);
  ctx.response.status = 204;
});

// Route to edit a ticket by ID
router.put('/tickets/:id', async (ctx) => {
  const ticketId = Number(ctx.params.id);
  const { name, description } = ctx.request.body;
  if (!name || !description) {
    tickets.changeStatus(ticketId);
  } else {
    tickets.editTicket(ticketId, name, description);
  }
  ctx.response.status = 204;
});

// Register routes
app.use(router.routes()).use(router.allowedMethods());

const port = 7070;
const server = http.createServer(app.callback());

// Start the server
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});