
## DB : `MongoDB`

### `OPTOIN 1`: `RUN MONGODB` by publishing a `port 27017`:

- `Pull` the `mongo` image from remote.

```bash
   docker pull mongo

```

- Then Run a container with port publishing

```bash
docker run --name mongodb -p 27017:27017 --rm mongo
```

- We can access this from host machine.

```bash
# Containarized mongodb url after exposed  port:
DB_URL=mongodb://localhost:27017/dockerts
```
