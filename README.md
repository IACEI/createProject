# createProject

## Description
"createProject" is a simple Node.js script designed to create a project structure based on user input. If a project name is not provided as a command-line argument, the script prompts the user to enter one. Additionally, the user is asked to specify the project type. If the project type is "express," the script creates the necessary directories and starter files for an Express.js project. Otherwise, it creates default files (index.html, style.css, and script.js) with basic content and linking.

## Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/[ACE]/createProject.git
   cd createProject
## Run the script:
``` node createProject.js ```

Follow the prompts to provide the project name and type.

## Features
If a project name is not provided as a command-line argument, the script prompts the user for input.
Asks the user to specify the project type: "express" or default.

## Project Structure

- Express Project:
```bash
/projectName
├── views
│   ├── includes
│   │   ├── head.ejs
│   │   └── foot.ejs
│   └── index.ejs
├── public
│   ├── css
│   │   └── style.css
│   └── js
│       └── script.js
└── index.js 

```
- Default Project:

```
/projectName
├── index.html
├── style.css
└── script.js
```
## Contributing
Feel free to contribute by opening issues or creating pull requests. Your feedback and suggestions are highly appreciated.

## License
This project is licensed under the [GNU General Public License (GPL)](LICENSE).


