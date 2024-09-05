# Self note

## Environment
- node version: `20.5.0`
```bash
# administrator:
nvm install 20.5.0
nvm use 20.5.0
npm install -g npm@10.8.3 # optional
npm install -g nx
npm i
```
## init source and copy into `this` project
```bash
cd ../
nx g @nrwl/nest:app my-app
# copy src of `my-app` into this project
```

## run and test
- run: `npm start`
- goto: [localhost:3333](http://localhost:3333/api/v1)
```json
{"message":"Welcome to my-app!"}
```