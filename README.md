# db-design-meeting-scheduler
<hr>

## Running the Project

### Technologies Needed:
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [MySQL](https://www.mysql.com/downloads/)

### Protocol:
1. Clone the repository to an empty folder in your file directory.
2. Open the terminal to folder you cloned the repository to.
3. Run the following commands:

```properties
npm i
```
```properties
docker build -t database-project-container .
```
```properties
docker compose build
```
```properties
docker compose up -d
```

4. Navigate to Docker Desktop. Click on the "Containers" tab on the top lefthand side. You should see a newly created conatainer. Either open the subfolder, and click on "5200:5200", or navigate to http://localhost:5200 on your preferred web-browser.

### Troubleshooting

- User connection issues: Grant Access to Node.js Application:
  - In MySQL Workbench, run the following query, where password is the password for the user named "root"
  - ```sql
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
    flush privileges;
    ```

- Port intersection: If you have another application running on port 4321, you must deactivate it in order to run this project.
