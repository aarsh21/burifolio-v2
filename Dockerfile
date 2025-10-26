FROM oven/bun:1 AS base
WORKDIR /app

COPY . .

RUN bun install
RUN bun run build

ENV HOST=0.0.0.0
ENV PORT=6969
EXPOSE 6969
CMD ["bun", "./dist/server/entry.mjs"]
