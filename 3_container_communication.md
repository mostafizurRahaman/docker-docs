# 3 Application Example:

---

## Create a common `network` and run those application on this network :

- Run This command:

```bash
docker network bd_network
```

- Then by using `--network` flag with network name `run` the `containers`

---

---

## DB : `MongoDB (APP 1)`

### Run a docker container within `same network`

- `docker run` to run the container
- `--name` to assign a name. the container name is `mongodb`
- `--rm` auto remove container after stop
- `-v mongo_data_volume:/data/db`: to persist data create a volume `/data/db`.
  `/data/db` container path.
- Assign `Environment variable` for `Root` for security.
- `-e MONGO_INITDB_ROOT_USERNAME=userName -e MONGO_INITDB_ROOT_PASSWORD=password `
- `image` name is `mongo`

```bash
   docker run  --name mongodb \
      -v mongo_data_volume:/data/db \
      -e MONGO_INITDB_ROOT_USERNAME=mostafiz \
      -e MONGO_INITDB_ROOT_PASSWORD=password \
      --rm mongo
```

- Now you can use this as db url:

```bash
   DB_URL=mongodb://mostafiz:password@mongodb:27017/dockerts?authSource=admin
```

- To skip any error you can use: `authSource=admin` into query.

---

## `Backend App`:

- Create `Dockerfile`:

```dockerfile
FROM node:20

WORKDIR /app

COPY package.json .

RUN npm  install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
```

- Add `.dockerignore` file:

```dotenv
node_modules
dist
.vscode
.vercel
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.git
Dockerfile

# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz
.vscode

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

```

- Now you can create `.devcontainer` folder > `devcontainer.json` OR `command`:
- `Dev docker setup :`

```json
{
   "name": "ts-container",
   "image": "node:20",
   "workspaceFolder": "/app",
   "mounts": [
      // Bind mount for your local project
      "source=/c/Projects/next-level/Docker/docker-with-typescipt-backend,target=/app,type=bind",

      // Named volume for logs (similar to: -v ts-docker-logs://app/logs)
      "source=ts-docker-logs,target=/app/logs,type=volume"

      // Anonymous volume for node_modules (similar to: -v //app/node_modules)
      "target=/app/node_modules,type=volume"
   ],
   "runArgs": [
      "--name",
      "ts-container", // container name:
      "-p",
      "5000:5000",
      "--network",
      "--env-file"
      ".env" // your env file
      "bd_network", // Network name:
      "--rm" // Automatically remove the container after exiting VS Code
   ],
   "postCreateCommand": "npm install"
}
```

- Or `Terminal command`:

```bash
   # Build docker image:
   docker build -t dockerts:v1 .

   # Run Container from docker image:
   docker run -p 5000:5000 \
         --name containerName
         -w //app \ #Working directory
         -v logsVolume://app/logs \ # Volume1 for logs
         -v "//$(pwd)"://app \ # Bind mount project folder
         -v //app/node_modules \ # Anonymous volume
         --env-file .env \ # env file:
         --network netWorkName \ # Network name
         --rm imageName:tags

```

- update `dev` command. Add `--poll` flag if you are using `ts-node-dev` to run
  the server. ![Docker Command Be](./docker_image_Be.png)

---

## `Next JS App`:

- Create `Dockerfile`:

```dockerfile
FROM node:20

WORKDIR /app

COPY package.json .

RUN npm  install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
```

- Create a `.dockerignore` file:

```dotenv
node_modules
dist
.vscode
.vercel
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.git
Dockerfile

# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz
.vscode

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

- Now create an `.devcontainer/devcontainer.json` file:

```json
{
   "name": "next_js_container",
   "image": "node:20",
   "workspaceFolder": "/app",
   "mounts": [
      // Bind mount:
      "source=/c/Users/mosta/OneDrive/Desktop/docker-with-nextjs-frontend,target=/app,type=bind",

      //  Anonymous  volume to persist container node_modules:
      "target=/app/node_modules,type=volume"
   ],
   "runArgs": [
      "--name",
      "next_js_container",
      "-p",
      "3000:3000",
      "-e", # Env  file for watching changes inside container
      "WATCHPACK_POLLING=true",
      "--env-file",
      ".env",
      "--network",
      "bd_network",
      "--rm"
   ],
   "postCreateCommand": "npm install"
}
```

- In `Command line`:

```bash
docker run -p 3001:3000 \
    --name ts_fe_container  \
    -w //app \
    -v "//$(pwd)"://app \
    -v //app/node_modules \
    --env-file .env \
    -e WATCHPACK_POLLING=true \
    --network bd_network \
    --rm dockerfe:v1
```
