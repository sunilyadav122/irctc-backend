FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

EXPOSE 3001

ENV PORT=3001
ENV NODE_ENV=development
ENV LOG_LEVEL=info
ENV ALLOWED_ORIGIN=http://localhost:3001
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379

CMD ["sh", "-c", "sleep 20 && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npm run dev"]