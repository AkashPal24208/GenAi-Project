# Build stage 

FROM node:20-alpine AS build

WORKDIR /app

# copy package files 
COPY  package*.json ./

# 1. Install dependencies 
RUN npm install 

# 2. copy the rest of the code 
COPY  . .


# 3. build the frontend app 
RUN npm run build 

# step 2: web server stage 
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# copy react prduction build 
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80


# Command to run NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]