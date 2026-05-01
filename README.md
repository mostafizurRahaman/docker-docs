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
