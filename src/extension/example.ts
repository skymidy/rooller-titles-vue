import { nodecg } from './util/nodecg.js'

// Example code:
// Log to show things are working.
nodecg.log.info('Extension code working!')
// Access this bundle's configuration with no type assertion needed.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const configProperty = nodecg.bundleConfig.exampleProperty
// Access/set a replicant (also see ./util/replicants).
