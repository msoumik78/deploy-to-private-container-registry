FROM node:slim
COPY . .
RUN npm install
EXPOSE 4200
CMD ["node", "server.js"]