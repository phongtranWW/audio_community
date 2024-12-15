
# Audio Community

This is an API that functions as a server for music streaming applications like Spotify or Apple Music, with full CRUD functionality.

![Daco_4989583](https://github.com/phongtran1905/Audio-community/assets/124645716/171e1408-0c67-43fb-b51c-d24226bd42c0)


## Build with

* Nestjs
* TypeORM
* Docker
* Postgres
* MinIO

## Installation

Clone with SSH 

```bash
git clone git@github.com:phongtran1905/Audio-community.git
cd Audio-community
```

Running 
```bash
docker compose up
```
![Screenshot from 2024-04-29 18-56-00](https://github.com/phongtran1905/Audio-community/assets/124645716/29a6a646-c196-4003-aea8-8d58b5d662d5)

Seeding data (Optional)

- After running the API successfully, open a new terminal tab with the same directory as the current tab.
- Enter Nodejs container
```bash
docker exec -it audio-community-node sh      
```
- Execute seeding
```bash
node dist/seeds/seed.js    
```
![Screenshot from 2024-04-29 18-57-46](https://github.com/phongtran1905/Audio-community/assets/124645716/2ac2a431-536e-458c-9abd-21844ef4d93b)

## SetUp API for Front End
Create new bucket in MinIO

- Open your browser and enter this url
```bash
http://localhost:9090
username: phong
password: phong123
```
![image](https://github.com/phongtran1905/Audio-community/assets/124645716/f12e64bf-a608-48c9-beb0-f533175f82ee)

- Create new bucket
  
![image](https://github.com/phongtran1905/Audio-community/assets/124645716/e16a33c0-7cca-4bd5-9b26-45c12ff431c1)

- Set the policy of this bucket to 'public'
  
![image](https://github.com/phongtran1905/Audio-community/assets/124645716/2f143150-9aae-4a6b-bce0-75ec1087b255)

## Tesing API in Swagger

- Open your browser and enter this url
```bash
http://localhost:3000/docs
```

![image](https://github.com/phongtran1905/Audio-community/assets/124645716/03290c0e-e984-45e4-9a97-6bab7b234bca)



