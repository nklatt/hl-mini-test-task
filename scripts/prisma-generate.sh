#!/usr/bin/env sh

set -eu

cd -- "$( dirname -- "$0" )/.."

# Generate the prisma client once in haven.
docker compose exec haven yarn prisma generate

# Copy the generated client into front (same schema, so no need to regenerate).
rm -rf front/node_modules/.prisma/client front/node_modules/@prisma/client
mkdir -p front/node_modules/.prisma front/node_modules/@prisma
cp -r haven/node_modules/.prisma/client front/node_modules/.prisma/client
cp -r haven/node_modules/@prisma/client front/node_modules/@prisma/client
