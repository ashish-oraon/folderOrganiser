const fs = require('fs');
const path = require('path');
const folderName = "files";
let dirNames = [];
fs.readdir(path.join(__dirname, folderName), (err, files) => {
    // console.log(files);
    files.forEach(element => {
        dir = element.split('.')[1];
        let src = path.join(__dirname, folderName, element);
        let destDir = path.join(__dirname, 'sorted', dir);
        let dest = path.join(destDir, element);
        if (fs.existsSync(destDir)) {
            if (fs.existsSync(dest)) {
                console.log(`${destDir} folder created already\n`);
                fs.copyFile(src, dest, (err) => {
                    if (err) throw err;
                    console.log(`${element} copied into ${destDir}.\n\n`);
                });
            }
        }
        else {
            console.log(`creating folder ${destDir}\n`);
            fs.mkdir(destDir, { recursive: true }, (err) => {
                if (err) throw (err);
                fs.copyFile(src, dest, (err) => {
                    if (err) throw err;
                    console.log(`${element} copied into after creation ${destDir}.\n\n`);
                });
            });
        }
    });
});