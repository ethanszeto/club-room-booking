# db-design-meeting-scheduler
<hr>

# Running the Project

## Technologies Needed:
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [MySQL](https://www.mysql.com/downloads/)

## Protocol:

### Download Project:
<ol>
  <li>Clone this repository to an empty folder in your file directory.</li>
</ol>

### MySQL Setup
1. Open MySQL Workbench or a related MySQL IDE.
2. From the root directory of the project, open the file `/sql/data_dump.sql` in MySQL Workbench.
3. Run the whole script to initialize necessary seeding data.</li>

### Node.js / Docker Setup
1. Open the terminal to folder you cloned the repository to.
2. Run the following commands:

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

3. Navigate to Docker Desktop. Click on the "Containers" tab on the top lefthand side. You should see a newly created conatainer. Either open the subfolder, and click on "5200:5200", or navigate to http://localhost:5200 on your preferred web-browser.
4. Enter your local MySQL Instance username and password into the website prompt.

### Troubleshooting

- User connection issues: Grant Access to Node.js Application:
  - In MySQL Workbench, run the following query, where password is the password for the user named "root"
  - ```sql
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
    flush privileges;
    ```

- Port intersection: If you have another application running on port 5200, you must deactivate it in order to run this project.
