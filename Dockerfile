FROM node:22.11.0 AS build
WORKDIR /usr/src/app
COPY package.json .
COPY index.html .
RUN npm install --force
COPY . .
RUN npm run build

FROM nginx:alpine
COPY conf /etc/nginx/conf.d
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
