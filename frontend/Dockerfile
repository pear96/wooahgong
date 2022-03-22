FROM node:16.14.0-alpine as build-stage
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine as production-stage
RUN rm /etc/nginx/conf.d/default.conf
COPY ./app.conf /etc/nginx/conf.d/app.conf
COPY --from=build-stage ./app/build /usr/share/nginx/html/app
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]