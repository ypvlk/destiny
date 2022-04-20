# #!/bin/sh
# # Shell strict mode:
# # - Abort if process return non-zero exit code
# # - Show undefined variable error
# # - Abort pipeline if process return non-zero exit code
# set -euo pipefail

# (npm run docker:orm:migration:run || exit 1) \
# && (npm run docker:microservice:migration:run || exit 1) \
# && [[ "${NODE_ENV}" = "development" -o "${NODE_ENV}" = 'test' ]] \
# && npm run docker:orm:seeds:run || echo "NODE_ENV=$NODE_ENV, so seeds will not run" \
# && node ./src/server.js
