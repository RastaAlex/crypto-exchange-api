FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma migrate dev --schema src/database/schema.prisma
RUN npm run build
EXPOSE ${PORT}
CMD ["npm", "run", "start:prod"]