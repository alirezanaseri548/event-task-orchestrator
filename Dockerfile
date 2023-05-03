# Dockerfile
# Use an official Node.js runtime as a parent image
FROM node:14 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages specified in package.json
RUN npm install

# Make the container's port 8080 available to the outside
EXPOSE 8080

# Run index.js when the container launches
CMD [ "node", "src/index.js" ]
