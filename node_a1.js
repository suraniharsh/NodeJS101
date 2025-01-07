// Note: Each operation should be perfomed synchronously as well as asynchronously. Take screenshots too for the PR
const fs = require('fs');

// 1. Create a folder space_project
fs.mkdirSync('space_project');

// 2. Inside the folder, create a file log.txt and add the line "ISRO is planning Gaganyaan mission, ie an Indian crewed orbital spacecraft."
fs.writeFileSync('space_project/log.txt', 'ISRO is planning Gaganyaan mission, ie an Indian crewed orbital spacecraft.');

// 3.Now, replace the line in the log.txt file with "ISRO has started working on Gaganyaan."
fs.writeFileSync('space_project/log.txt', 'ISRO has started working on Gaganyaan.');

// 4. Append another line to the log.txt file " The current Aditya-L1 team of scientists is mentoring new talent for working on the Gaganyaan mission."
fs.appendFileSync('space_project/log.txt', ' The current Aditya-L1 team of scientists is mentoring new talent for working on the Gaganyaan mission.');

// 5. Rename the log.txt file to update.txt
fs.renameSync('space_project/log.txt', 'space_project/update.txt');

// 6. Read the update.txt file and display the data. Additionally print a line "We are excited" using console.log() after the read operation
const data = fs.readFileSync('space_project/update.txt', 'utf8');

// 7. Delete the file update.txt
fs.unlinkSync('space_project/update.txt');

// 8. Delete the folder space_project
fs.rmdirSync('space_project');