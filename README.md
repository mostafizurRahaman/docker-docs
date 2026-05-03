# Docker Installation Guide for Windows

## ➡️ Step 1: Prepare Windows for Docker

- Open the Windows search box and search for `Turn Windows features on or off`.
- Enable:
   - `Virtual Machine Platform`
   - `Windows Subsystem for Linux`
- Click **OK** and restart your computer if prompted.

## 🧰 Docker Components

Docker includes several core tools:

- **Docker Engine**
- **Docker Desktop**
- **Docker Hub**
- **Docker Compose**

## 🚀 Setup Docker in a Project

Create a file named `Dockerfile` in your project root. Do not add an extension.

```Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

EXPOSE 5000
CMD ["npm", "run", "dev"]
```

## 📦 What is a Docker Image?

- A Docker image is a read-only template that includes your application code,
  runtime, dependencies, and configuration.
- Images are immutable, which means they do not change after being built.
- Images are used to create containers.

## 🚢 What is a Docker Container?

- A container is a running instance of an image.
- It starts from an image and adds a thin writable layer on top.
- Containers are temporary and can be created, stopped, and removed.
- You cannot run a container without an image.

## 🔍 Image vs Container

| Feature      | Docker Image                                  | Docker Container                   |
| :----------- | :-------------------------------------------- | :--------------------------------- |
| Definition   | Read-only template with code and dependencies | Running instance of an image       |
| State        | Inactive, stored on disk                      | Active, running in memory          |
| Mutability   | Immutable                                     | Writable layer on top of the image |
| Analogy      | Blueprint or recipe                           | Finished building or cooked dish   |
| Resource use | Uses disk space                               | Uses CPU, RAM, and disk            |

## 🧪 Common Docker Image Commands

- Build an image: `docker build .`
- Build with a tag: `docker build -t imageName:version .`
- List all images: `docker images -a`
- List available images: `docker images`
- Remove an image: `docker rmi imageID`
- Remove unused images: `docker images prune`

## 📦 Common Docker Container Commands

- List all containers: `docker ps -a`
- List running containers: `docker ps`
- Run a container from an image:
  `docker run -p hostPort:containerPort imageName:tag`

```bash
docker run -p 5000:5000 imageName:tag
```

- Start a stopped container: `docker start containerID`
- Stop a container: `docker stop containerID`
- Run in interactive mode: `docker run -it imageName:tag`
- Remove a container: `docker rm containerID`
- Remove all stopped containers: `docker container prune`

## 🔌 Attach to a Running Container

- Start and attach to a container:

```bash
docker start containerName -a
# or
docker start containerName --attach
```

- Attach to a running container:

```bash
docker attach containerName
```

## 💤 Run a Container in Detached Mode

Use detached mode to run a container in the background:

```bash
docker run -p 5000:5000 --name containerName -d imageName:tag
```

## ☁️ Docker Hub

### Login to Docker Hub

1. Visit `https://hub.docker.com/`
2. Create a repository (public or private)
3. Log in from your terminal:

```bash
docker login
```

### Push an Image to Docker Hub

1. Build an image with your Docker Hub repository name:

```bash
docker build -t username/repoName:v1 .
```

2. Push the image:

```bash
docker push username/repoName:v1
```

- If you omit a tag, Docker uses `latest` by default.

### Pull an Image from Docker Hub

```bash
docker pull username/repoName:v1
```

- After pulling, the image is available locally for running containers.

## ✅ Best Practices

- Pull the latest image before you build, especially when working with a team.
- Use matching repository names and image tags.
- Use `--rm` to remove temporary containers automatically after they stop.
- If the image exists locally, Docker uses the local copy instead of downloading
  it again.

# Data Management in Docker:

## 🦈 Docker volume senario: **Fahim's Blog App**

### Objective:

You build a **Node JS Application** where user uploads images.

- Uploaded Path = **/app/uploads** folders
- **Problem 1** = Uploaded images are removed while removed **container**

### Senario 1: **NO Volume Container**:

1. Build an image with name

```bash
 docker build -t blog_app:v1 .
```

2. Then Run a **container** from the **image** with **`--rm`** flag. **`--rm`**
   flags help to remove container while **stop** the container.

```bash
  docker run -p 5000:5000 --name blogContainer --rm blog_app:v1
```

3. Now the **Container Running**
4. Suppose you **uploaded five images** and You can able to access those images
   url into **/app/uploads** folder
5. Now **Stop** the **Container**. Then Container Automatically removed because
   of **--rm** flag.
6. Run another **container** with **same name and same command**

```bash
   docker run -p 5000:5000 --name blogContainer --rm blog_app:v1
```

7. After trying to access **previous uploaded images** in **/app/uploads**
   folder. **The uploaded images are lost**

8. **Note 1 :-** To keep the **uploaded images** we need **VOLUME**.

9. **Note 2 :-** If you run the container without **--rm** flag. After stop
   **Container** will not removed after stopped. In this case **/app/uploads**
   folder's images will **persist** until **container removed**

```bash
   docker run -p 5000:5000 --name blogContainer  blog_app:v1
```

### Senario 2: **Anonymous Volume**

1. You can define **anonymous volume** **two** ways:
2. **First Approch** into **Dockerfile**

```Dockerfile

FROM node:18-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

VOLUME ["/app/uploads"]

EXPOSE 5000
CMD ["npm", "run", "dev"]

```

3. **Second Approch :** into command line with **-v flag** without providing
   **Volume Name** while run **Container**:

```bash
docker run -p 5000:5000 --name blogContainer -v /app/logs blog_app
```

4. **Anonymous Volume** are removed with **container** automatically.
5. **Anonymous Volume** locations unknown
6. **Anonymous Volume** is **not reusable** with another **container**
7. **Anonymous Volume** has no **fixed name** provide an **long length string**
   as name

### Senario 3: **Named Volume**

1. **Named volume** has a name
2. **Named volume**'s location unknown in physical computer.
3. **Named volume** can be **reused** with multiple **Container**
4. **Named volume** persist after **Deleteing Container**. But **Anonymous** are
   not persisting.
5. Create **Named Volume** while running container:

```bash
  docker run -p 5000:5000 --name blogContainer -v volumeName:/app/uploads blog_app
```

6. **OR** you can create an volume first with name:

```bash
  docker volume create myVolume
```

7. Then **assign** while running the **container**

```bash
  docker run -p 5000:5000 --name blogContainer -v myVolume:/app/uploads blog_app
```

**Note 1:-** Now your **/app/uploads** images will persists.

## Bind Mount:

- Bind mount helps to connect **your local machine (host machine) folder to**
  with **Container some folder**.
- Both folder are getting synchronous.
- If you change in local that will reflect inside container
- If you change inside container that will reflect in your local

### How can we implement bind mount:

1. You have to `mount` a your `local folder` with `container` by using `volume`
2. use this syntax: `-v local_folder_path:container_folder_path`

```bash
   -v "//c/Users/mosta/OneDrive/Desktop/docker-with-typescript-backend"://app

   #OR

   -v "//$(pwd)"://app

```



### Difference between `Named Volume` and `Bind Mount`

- Named Volume uses a `volume name `and `a container path`
- Bind Mount uses `a host location` and `a container path`
- In `Named Volume`, we do not know or control the exact `host directory `where data
  is stored
- In Bind Mount, we `explicitly` provide the `host path` that is connected to the
  `container path`



## 🚀 Bind Mount with Express App (Docker)

#### 🧾 Run Container

```bash
docker run -p 5000:5000 \
  --name dockerContainerName \
  -v logVolumes:/app/logs \
  -w /app \
  -v $(pwd):/app \
  -v /app/node_modules \
  --rm dockerImageName:tag
```


### 🔍 Explanation

   #### 🔹 `-p 5000:5000`

   * Maps **host port → container port**
   * Access the app via: `http://localhost:5000`



   #### 🔹 `--name dockerContainerName`

   * Assigns a custom name to the container
   * Helps in managing container easily (`stop`, `logs`, etc.)

   

   #### 🔹 `-v logVolumes:/app/logs` (Named Volume)

   * Creates a **named volume** called `logVolumes`
   * Mounted to `/app/logs` inside container
   * Used for **persistent data (e.g., logs)**
   * Data remains even after container is removed

   

   #### 🔹 `-w /app`

   * Sets the **working directory** inside container
   * Equivalent to running:

   ```bash
   cd /app
   ```

   

   #### 🔹 `-v $(pwd):/app` (Bind Mount)

   * Mounts current project directory into container
   * Syncs **host ↔ container** in real-time

   👉 Any code change on host is instantly reflected in container



   #### 🔹 `-v /app/node_modules` (Anonymous Volume)

   * Prevents overwriting of `node_modules` by bind mount
   * Keeps container dependencies isolated

   👉 Important when using bind mount in Node.js apps

   

   #### 🔹 `--rm`

   * Automatically removes the container when it stops
   * Useful for **temporary/dev environments**

   

   #### 🔹 `dockerImageName:tag`

   * Specifies which Docker image to run
   * Example:

   ```bash
   my-express-app:latest
   ```

   

   ### 🧠 Architecture Overview

   ```text
   Host Machine
   │
   ├── Project Folder  ───────▶  /app (Bind Mount)
   │
   ├── (Docker Managed) ─────▶  /app/logs (Named Volume)
   │
   └── (Isolated Volume) ────▶  /app/node_modules (Anonymous Volume)
   ```
---