import { createEnforcement } from '../factory';
import { getClientIp } from '../../getClientIp';

export const enforceByIp = createEnforcement((req) => `ip:${getClientIp(req)}`);
