FROM nginx:alpine

# copy frontend build
COPY dist /usr/share/nginx/html

# copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copy SSL certificate
COPY /etc/ssl/lgstorageservice/fullchain.pem /etc/ssl/certs/fullchain.pem
COPY /etc/ssl/lgstorageservice/privkey.pem /etc/ssl/private/privkey.pem

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
