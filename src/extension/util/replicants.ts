import type NodeCG from 'nodecg/types';
import type { Schemas } from '../../types/index.js';
import { nodecg } from './nodecg.js';

// Wrapper for replicants that have a default (based on schema).
function hasDefault<T>(name: string) {
  return nodecg.Replicant<T>(name) as unknown as NodeCG.default.ServerReplicantWithSchemaDefault<T>;
}
// Wrapper for replicants that don't have a default (based on schema).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function hasNoDefault<T>(name: string) {
  return nodecg.Replicant<T>(name) as NodeCG.default.ServerReplicant<T>;
}
