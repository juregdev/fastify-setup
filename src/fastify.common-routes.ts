import { FastifyInstance } from 'fastify';

export default function commonRoutes(app: FastifyInstance, cookiesName: { timezone: string }) {
  app.get('/', async (_, res) => res.redirect('https://jureg.dev/'));
  app.get('/health', async (req, res) => {
    const cookieTimeZone = req.cookies[cookiesName.timezone] ? JSON.parse(String(req.cookies[cookiesName.timezone])) : null;

    res
      .status(200)
      .type('application/json')
      .send({
        status: true,
        date: new Intl.DateTimeFormat('pt-BR', {
          dateStyle: 'full',
          timeStyle: 'long',
          timeZone: cookieTimeZone ? cookieTimeZone : 'America/Sao_Paulo',
        }).format(new Date()),
      });
  });
}
