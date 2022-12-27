# FROM node:latest
# RUN mkdir /app
# WORKDIR /app
# RUN mkdir /.next
# COPY ./.next ./.next
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install
# EXPOSE 2048
# CMD ["npm", "run", "start"]

# FROM node:latest
# RUN mkdir /app
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm run build
# EXPOSE 2048
# CMD ["npm", "run", "start"]

FROM node:latest
RUN mkdir /app
WORKDIR /app
COPY . .
EXPOSE 2080
EXPOSE 2443
CMD ["npm","start"]

# FROM nginx
# RUN rm /etc/nginx/conf.d/default.conf
# COPY ./blogweb.conf /etc/nginx/conf.d
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]