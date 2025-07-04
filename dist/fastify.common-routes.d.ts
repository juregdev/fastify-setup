import { FastifyInstance } from 'fastify';
export default function commonRoutes(app: FastifyInstance, cookiesName: {
    timezone: string;
}): void;
