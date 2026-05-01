# Docker installation Guide in Windows:

## ➡️ 1. Prepare windows for installation:

- Search `Turn on windows features` on windows search box:
- Enable: `Virtual Mechine platform` & `Windows Sub system for linux`
- Save and wait for update

## Docker Tools:

-  1. Docker Engine
-  2. Docker Desktop
-  3. Docker Hub
-  4. Docker Compose

# SETUP DOCKER IN A PROJECT:

- Create a docker file without any extension:
- Filename = `Dockerfile`

```Dockerfile

      FROM image:tag

      WORKDIR /app

      COPY package.json

      RUN npm install

      COPY . .

      EXPOSE 5000

      CMD ["npm", "run", "dev"]
```

## What is docker image ?

- Docker image is a file or template, which contains code, runtime, environment
  variables and configuration files to run the application.
- Images are immutable (Read only)
- Create multliple container by using an docker image.
- আপনি যদি একটি কম্পিউটার গেমের কথা চিন্তা করেন, তবে ডকার ইমেজ হলো সেই গেমের
  ইন্সটলেশন ফাইল বা ISO ফাইল। এটি নিজে নিজে চলতে পারে না, কিন্তু এটি ব্যবহার করে
  গেমটি ইন্সটল বা রান করা যায়।

## What is container:

- A docker container is a running instance of image.
- A container has been created after running an image.
- Containers are immutable (Writable)
- Without an image you cannot create a container

Here are concise notes on the differences between **Docker Images** and **Docker
Containers**, structured specifically for quick reading and study.

---

## **Quick Comparison: Image vs. Container**

| Feature        | Docker Image                                                                   | Docker Container                                            |
| :------------- | :----------------------------------------------------------------------------- | :---------------------------------------------------------- |
| **Definition** | A static, read-only template containing the application code and dependencies. | A live, functional instance of an image.                    |
| **State**      | **Inactive** (Stored on disk).                                                 | **Active** (Running in memory/RAM).                         |
| **Mutability** | **Immutable** (Cannot be changed once built).                                  | **Mutable** (Has a thin writable layer for temporary data). |
| **Analogy**    | The **Blueprint** or the **Recipe**.                                           | The **Building** or the **Finished Dish**.                  |
| **Storage**    | Occupies disk space.                                                           | Occupies CPU, RAM, and disk space.                          |

---
