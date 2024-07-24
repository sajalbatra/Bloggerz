# Use the official Node.js image
FROM node:18-alpine3.20

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

RUN npx prisma generate

# Expose the port Next.js will run on (default is 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
