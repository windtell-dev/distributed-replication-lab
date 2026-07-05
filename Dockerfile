FROM node:24

# sets working directory inside container
WORKDIR /app

# copy everything from my current project folder into the container’s current folder
COPY . .

# when the container starts, run server.js
CMD ["node", "server.js"]