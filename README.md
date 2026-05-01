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
