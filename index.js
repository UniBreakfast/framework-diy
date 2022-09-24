const { writeFile, mkdir } = require('fs').promises

createProjectFolders().then(() => {
  createIndexFile()
  createStyleFile()
  createScriptFile()
  createReadmeFile()
})

async function createProjectFolders() {
  await mkdir('project')
  
  return Promise.all([
    mkdir('project/components'),
    mkdir('project/data'),
    mkdir('project/routes'),
    mkdir('project/templates'),
  ])
}

function createIndexFile() {
  return writeFile('project/index.html', `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">

  <!-- <link rel="stylesheet" href="reset.css"> -->
  <!-- <link rel="stylesheet" href="base.css"> -->
  <link rel="stylesheet" href="style.css">

  <script src="script.js" defer></script>
  <!-- <script src="app.js" type="module"></script> -->

  <title>Framework - Do It Yourself</title>
</head id="head">

<body id="body">
  
</body>

</html>
  `)
}

function createStyleFile() {
  return writeFile('project/styles.css', ``)
}

function createScriptFile() {
  return writeFile('project/app.js', ``)
}

function createReadmeFile() {
  return writeFile('project/README.md', `
# Framework - Do It Yourself

What should a framework do:

1.  Provide a way to create a new project
2.  Define a project structure
3.  Templating system
4.  Component system
5.  State management
6.  Reactivity of UI components (binding)
7.  Rules for applying CSS
8.  Routing
  `)
}
