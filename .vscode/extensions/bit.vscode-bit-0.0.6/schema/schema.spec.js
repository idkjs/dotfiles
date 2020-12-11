// import Ajv from 'ajv';
const Ajv = require('ajv');

const ajv = new Ajv()
var validate = ajv.compile({a: 'b'});
console.log(validate)

// "environment": {
//     "type": "object",
//     "patternProperties": {
//       "^.*$": {
//         "type": "object",
//         "properties": {
//           "options": {
//             "type": "object",
//             "properties": {
//               "file": {
//                 "type": "string"
//               }
//             }
//           },
//           "files": {
//             "type": "array",
//             "items": {
//               "type": "string"
//             }
//           },
//           "config": {
//             "type": "string"
//           }
//         }
//       }
//     }
//   },
//   "extensions": {
//     "type": "object",
//     "patternProperties": {
//       "^.*$": {
//         "type": "object",
//         "properties": {
//           "options": {
//             "type": "object",
//             "properties": {
//               "file": {
//                 "type": "string"
//               },
//               "config": {
//                 "type": "string"
//               }
//             }
//           }
//         }
//       }
//     }
//   },
//   "env": {
//     "type": "object",
//     "properties": {
//       "compiler": {
//         "anyOf": [
//           {"$ref": "#/definitions/environment"},
//           {"type": "string"}
//         ]
//       },
//       "tester": {
//         "anyOf": [
//           {"$ref": "#/definitions/environment"},
//           {"type": "string"}
//         ]
//       }
//     }
//   },
//   "overrides": {
//     "type": "object",
//     "patternProperties": {
//       "^.*$": {
//         "type": "object",
//         "properties": {
//           "dependencies": { "$ref": "#/definitions/dependencies" },
//           "peerDependencies": { "$ref": "#/definitions/dependencies" },
//           "devDependencies": { "$ref": "#/definitions/dependencies" },
//           "env": {
//             "$ref": "#/definitions/env"
//           }
//         }
//       }
//     }
//   }