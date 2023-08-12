FROM node:16.14.0-alpine as build-stage
COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage ./build /build
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]