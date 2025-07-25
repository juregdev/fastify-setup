import type { FastifyInstance } from 'fastify';

export type { FastifyInstance };
export { default as fastify } from 'fastify';

import {
	CookieSerializeOptions,
	FastifyCookie,
	FastifyCookieOptions,
	ParseOptions,
	SerializeOptions,
	Sign,
	Signer,
	SignerFactory,
	Unsign,
	UnsignResult,
	fastifyCookie,
	sign,
	signerFactory,
	unsign,
} from '@fastify/cookie';

export type {
	CookieSerializeOptions,
	FastifyCookie,
	FastifyCookieOptions,
	ParseOptions,
	SerializeOptions,
	Sign,
	Signer,
	SignerFactory,
	Unsign,
	UnsignResult,
};

export { fastifyCookie, sign, signerFactory, unsign };

import {
	FastifyHelmetOptions,
	FastifyHelmetRouteOptions,
	fastifyHelmet,
} from '@fastify/helmet';

export type { FastifyHelmetOptions, FastifyHelmetRouteOptions };
export { fastifyHelmet };

import {
	FastifyMiddieOptions,
	Handler,
	IncomingMessageExtended,
	NextFunction,
	NextHandleFunction,
	SimpleHandleFunction,
	fastifyMiddie,
} from '@fastify/middie';

export type {
	FastifyMiddieOptions,
	Handler,
	IncomingMessageExtended,
	NextFunction,
	NextHandleFunction,
	SimpleHandleFunction,
};
export { fastifyMiddie };

export { default as defineRoutes } from './fastify.define-routes';
export { default as commonRoutes } from './fastify.common-routes';
export { default as implementation } from './fastify.implementation';

export * from './@types/implementation.config';
