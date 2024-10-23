# Use an official Node runtime as a parent image
FROM node:20.12.2

# Set the working directory in the container to /mybudget
WORKDIR /mybudget

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Copy the rest of the code necessary for your API
COPY . .

RUN yarn build

ENV NODE_ENV=production

# Define the command to run your app using CMD which turns your container into an executable
CMD [ "yarn", "start" ]