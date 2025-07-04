import Fastify from 'fastify';
import fastifyCookie, { FastifyCookieOptions } from '@fastify/cookie';
import fastifyHelmet from '@fastify/helmet';
import fastifyMiddie from '@fastify/middie';

import defineRoutes from './fastify.define-routes';
import commonRoutes from './fastify.common-routes';
import { ImplementationConfig } from './@types/implementation.config';

/**
 * @param {ImplementationConfig} config
 * @param {string[][]} config.controllersPath - array of paths to controllers with routes
 * @param {string} config.host - host to listen (default 'undefined')
 * @param {string} config.nameCookieTimezone - name of cookie to store timezone (default 'timezone')
 * @param {number} config.port - port to listen
 *
 */
export default async function implementation(config: ImplementationConfig) {
	const fastify = Fastify({
		logger: {
			transport: {
				target: 'pino-pretty',
				options: {
					translateTime: 'HH:MM:ss Z',
				},
			},
		},
	});

	fastify
		.register(fastifyCookie, {
			parseOptions: { sameSite: true },
		} as FastifyCookieOptions)
		.register(fastifyHelmet, { global: true, contentSecurityPolicy: false })
		.register(fastifyMiddie);

	await defineRoutes(fastify, config.controllersPath);
	commonRoutes(fastify, { timezone: config.nameCookieTimezone || 'timezone' });

	try {
		await fastify.listen({ port: config.port, host: config.host });
		fastify.log.info(`server listening on http://localhost:${config.port}`);
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
}
