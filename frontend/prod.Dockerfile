# Use Node.js to build the frontend
FROM node:21-bookworm-slim AS builder
ARG BACKEND_URL
ENV BACKEND_URL=$BACKEND_URL

# Set working directory
WORKDIR /home/node/app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --loglevel warn

# Copy the rest of the application code
COPY . ./

# Build the frontend
RUN npm run build

# Use a lightweight Node.js server for serving static files
FROM node:21-bookworm-slim AS server

# Set working directory
WORKDIR /home/node/app

# Install a lightweight static file server
RUN npm install -g serve

# Copy the built frontend from the builder stage
COPY --from=builder /home/node/app/dist /home/node/app/dist

# Expose port 3000 (default for `serve`)
EXPOSE 3000

# Serve the frontend in production
CMD ["serve", "-s", "dist", "-l", "3000"]