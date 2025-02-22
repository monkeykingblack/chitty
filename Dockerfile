ARG NODE_VERSION=22.13.1

###################################################################
# Stage 1: Install all workspaces (dev)dependencies               #
#          and generates node_modules folder(s)                   #
###################################################################

FROM node:${NODE_VERSION}-bookworm AS deps
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack@latest
RUN corepack enable

WORKDIR /workspace-install

COPY --link package.json ./

RUN pnpm fetch

COPY --link . .

RUN pnpm install --prefer-offline --frozen-lockfile

###################################################################
# Stage 2: Build the app                                          #
###################################################################

FROM deps AS builder

ENV NODE_ENV=production 

WORKDIR /app

COPY --from=deps --link /workspace-install ./

RUN NODE_OPTIONS=--max-old-space-size=8192 pnpm run build

##################################################################
# Stage 4: Extract a minimal image from the build                #
##################################################################

FROM node:${NODE_VERSION}-bookworm-slim AS runner

ENV TZ=UTC \
    NODE_ENV=production \
    PORT=4000

RUN set -ex; \
    apt-get update; \
    apt-get install -y --no-install-recommends curl openssl; \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN set -ex; \
    addgroup --system --gid 1001 nodejs; \
    adduser --system --uid 1001 nodejs; \
# Set the correct permission for local cache
    mkdir .assets; \
    mkdir .temporary; \
    chown -R nodejs:nodejs /app

COPY --from=builder --chown=nodejs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/dist/server ./server
COPY --from=builder --chown=nodejs:nodejs /app/dist/client ./client

# Switch to non-root user
USER nodejs

EXPOSE ${PORT}

ENTRYPOINT ["node", "./server/main.js"]
