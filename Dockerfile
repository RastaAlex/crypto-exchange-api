FROM node:14 AS builder

# Create app directory
WORKDIR /app
 
COPY package*.json ./
COPY prisma .src/database/

# Install app dependencies
RUN npm install

COPY . .

RUN npm run build

FROM node:14

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/database ./prisma

EXPOSE 3000

CMD [  "npm", "run", "start:migrate:prod" ]
