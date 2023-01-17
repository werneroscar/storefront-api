FROM node:16-alpine
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# COPY yarn.lock ./
RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production
COPY . .
# RUN yarn run initdb
# Bundle app source
RUN yarn run build 
EXPOSE 3000
CMD [ "node", "dist/server.js" ]