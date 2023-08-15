FROM node:16.14.0-alpine as build-stage
# npm install이 너무 오래걸려서 package 먼저 copy함
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
# 빌드를 위해선 결국 다 복사하긴 해야됨
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage ./build /build
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]