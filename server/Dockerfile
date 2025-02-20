# Use the official Node.js image
FROM node:22
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Start the server
EXPOSE 5000
CMD ["npm", "run", "dev"]
