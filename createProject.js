const { exec } = require("child_process");
const fs = require("node:fs");
const process = require("process");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const path = require("path");

let projectName = process.argv[2] || "";

function checkName(name) {
  return name && name[0].match(/[a-zA-Z]/);
}

function askForName(callback) {
  readline.question("Enter a Project Name: ", (input) => {
    const name = input;
    projectName = name; // Set the projectName here
    callback(projectName);
  });
}

function askForProjectType() {
  return new Promise((resolve) => {
    readline.question(
      'Specify the project type (e.g., "Express") and the default files (index.html, style.css, script.js). Press Enter for default or provide custom values:',
      (input) => {
        resolve(input);
      }
    );
  });
}

async function handleSuccessfulInput(name) {
  console.log("Project Name is:", name);

  exec(`cd ~/Desktop && mkdir ${name}`, async (error, stdout, stderr) => {
    if (error) {
      console.log(
        "Project Name exists on your Desktop. Please choose another name."
      );
      askForName((newName) => {
        projectName = newName;
        if (checkName(projectName)) {
          handleSuccessfulInput(projectName);
        } else {
          handleInvalidInput();
        }
      });
    } else {
      const projectType = await askForProjectType();
      // if Project type if Express
      if (projectType.toUpperCase() === "EXPRESS") {
        const desktopPath = `${process.env.HOME}/Desktop`;
        const projectPath = path.join(desktopPath, name);

        await exec(
          `cd ~/Desktop/${name} && touch index.js && mkdir views public views/includes && cd views/includes && touch head.ejs foot.ejs && cd ~/Desktop/${name}/public && mkdir css js && cd css && touch style.css && cd ../js && touch script.js && cd ~/Desktop/${name}/views && touch index.ejs && cd`,
          async (error) => {
            console.error(error);
          }
        );

        let index = `// Require necessary modules
        const express = require('express');
        const app = express();
        const path = require('path');
        const mongoose = require('mongoose');
        const methodOverride = require('method-override');
        
        // Set view engine and views folder
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'ejs');
        
        // Middleware for handling form submissions (urlencoded or json)
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        
        // Method override middleware
        app.use(methodOverride('_method'));
        
        // Set the public file directory
        app.use(express.static(path.join(__dirname, '/public')));
        
        
        // Set up Mongoose connection
        mongoose.connect('mongodb://127.0.0.1:27017/<CollectionName>')
            .then(() => {
                // console.log('Connected to the database');
            })
            .catch((err) => {
                console.error(err);
            });
        
        
            // main route
        app.get('/',(req,res)=>{
            res.render('index.ejs');
        });
        
        
        let port = <port>;
        app.listen(port, () => {
            console.log("Listening on " + port);
        });
        `;

        fs.writeFileSync(path.join(projectPath, "index.js"), index);
      } else {
        await exec(
          `cd ~/Desktop/${name} && touch index.html style.css script.js`,
          async (error) => {
            console.log(
              `Couldn't Create files, Please Check the folder path : /Desktop/${name}`
            );
          }
        );

        // HTML template
        let contentHtml = `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <title>${projectName}</title>
                    <link rel="stylesheet" href="/style.css">
                    <link rel="icon" href="/favicon.ico" type="image/x-icon">
                  </head>
                  <body>
                    <main>
                        <h1>Project ${projectName}</h1>  
                    </main>
                    <script src="/script.js"></script>
                  </body>
                </html>`;
        let contentCss = `/*************************************************
                **************************************************
                
                Website Name: 
                Website URL: 
                Website Author: 
                Author URL: 
                Copyright 2024. All Rights Reserved.
                
                Color Guide
                ***************
                
                
                *************************************************
                
                Type Guide
                ***************
                
                
                Debugging Tools
                ***************
                border: 1px solid #fff;
                
                *************************************************/
                
                /************************************************
                *************************************************
                0. CSS Reset ------------------------ 
                1. Universal Styles -----------------
                2. Header & Nav Styles -------------- 
                3. Main Body Styles ----------------- 
                4. Sidebar Styles ------------------- 
                5. Widget Styles --------------------
                6. Footer Styles -------------------- 
                7. Comments & Form Styles ----------- 
                8. Generic Styles ----------- 
                *************************************************
                ************************************************/
                
                /*----------------------------------------------
                ------------------------------------------------
                0. CSS Reset
                ------------------------------------------------
                ----------------------------------------------*/
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                /*----------------------------------------------
                ------------------------------------------------
                1. Universal Styles
                ------------------------------------------------
                ----------------------------------------------*/
                body {
                  font-family:;
                }
                /*----------------------------------------------
                ------------------------------------------------
                2. Header & Nav Styles
                ------------------------------------------------
                ----------------------------------------------*/
                
                /*----------------------------------------------
                ------------------------------------------------
                3. Main Body Styles
                ------------------------------------------------
                ----------------------------------------------*/
                
                /*----------------------------------------------
                ------------------------------------------------
                4. Sidebar Styles
                ------------------------------------------------
                ----------------------------------------------*/
                
                /*----------------------------------------------
                ------------------------------------------------
                5. Widget Styles
                ------------------------------------------------
                ----------------------------------------------*/
                
                /*----------------------------------------------
                ------------------------------------------------
                6. Footer Styles
                ------------------------------------------------
                ----------------------------------------------*/
                
                /*----------------------------------------------
                ------------------------------------------------
                7. Comments & Form Styles
                ------------------------------------------------
                ----------------------------------------------*/
                
                /*----------------------------------------------
                ------------------------------------------------
                8. Generic Styles
                ------------------------------------------------
                ----------------------------------------------*/`;
        try {
          await fs.writeFileSync(
            `${process.env.HOME}/Desktop/${name}/index.html`,
            contentHtml
          );
          await fs.writeFileSync(
            `${process.env.HOME}/Desktop/${name}/style.css`,
            contentCss
          );
        } catch (e) {
          console.error(e);
        }
      }

      readline.close();
    }
  });
}

function handleInvalidInput() {
  console.log(
    "Input is not valid. Kindly provide a Project Name, ensuring that it starts with a letter."
  );
  askForName((name) => {
    projectName = name;
    if (checkName(projectName)) {
      handleSuccessfulInput(projectName);
    } else {
      handleInvalidInput();
    }
  });
}

function processUserInput() {
  if (checkName(projectName)) {
    handleSuccessfulInput(projectName);
  } else {
    handleInvalidInput();
  }
}

// Check if projectName is provided as a command-line argument
if (projectName === "") {
  askForName((name) => {
    projectName = name;
    processUserInput();
  });
} else {
  processUserInput();
}

readline.on("close", () => {
  console.log("\nHappy Coding!");
  console.log("\nExiting...");
  process.exit(0);
});
