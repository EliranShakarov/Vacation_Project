#Images
# build image :                 docker build -t eliranshakarov/myvacations:1.0 .
# display all images:           docker images
# remove image :                docker image rm eliranshakarov/myvacations:1.0
# login to docker registry :    docker login 
# logou from docker registry :  docker logout
# push image to the hub :       docker push eliranshakarov/myvacations:1.0
# pull image from the hub :     docker pull eliranshakarov/myvacations:1.0

# containers
# create container : docker create --name myvacations -p 4000:3100 eliranshakarov/myvacations:1.0
# display all containers: docker ps -a
# start container : docker start myvacations
# stop container : docker stop myvacations
# remove non-running containers : docker rm myvacations
# remove running containers : docker rm myvacations -f
# create and start container : docker run -d --name myvacations -p 4000:3100 eliranshakarov/myvacations

# to fix SQL probelm (mysql client is need to be upgraded)
# ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY '12345678';
# flush privileges;
# Inherit current image from an alpone image containing node (for latest versions use node:alpine)
FROM node:18-alpine

# install ts-node globally (-g) for running typescript
RUN npm install -g npm@9.1.1
RUN npm i -g ts-node
RUN npm i -g nodemon


# Create an empty directory for the project files and set it as the Current directory
WORKDIR /vacations/backend

# copy local package.json & package-lock.json into /app
COPY package*.json /vacations/backend

# Install NPM dependencies & devDependencies
RUN npm i

# copy project local files (first dot) into /app
COPY . /vacations/backend

# Execute "npm run server" inside /app (workdir) when container starts:
ENTRYPOINT npm run server