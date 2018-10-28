FROM mhart/alpine-node:8 AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn dist

FROM alpine:latest
WORKDIR /app
ENV NODE_ENV=production

# install required libs
RUN apk update && apk add --no-cache libstdc++ libgcc

# copy prebuilt binary from previous step
COPY --from=build /app/dist/api.bin .
EXPOSE 4000
CMD ["/app/api.bin"]
