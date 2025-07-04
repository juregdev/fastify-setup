import { ImplementationConfig } from './@types/implementation.config';
/**
 * @param {ImplementationConfig} config
 * @param {string[][]} config.controllersPath - array of paths to controllers with routes
 * @param {string} config.host - host to listen (default 'undefined')
 * @param {string} config.nameCookieTimezone - name of cookie to store timezone (default 'timezone')
 * @param {number} config.port - port to listen
 *
 */
export default function implementation(config: ImplementationConfig): Promise<void>;
