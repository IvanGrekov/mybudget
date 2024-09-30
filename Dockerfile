# Use an official Node runtime as a parent image
FROM node:21.7.3

# Set the working directory in the container to /mybudget
WORKDIR /mybudget

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN yarn install

# Copy the rest of the code necessary for your API
COPY . .

# Define the command to run your app using CMD which turns your container into an executable
CMD [ "yarn", "dev" ]