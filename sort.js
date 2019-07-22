const fs = require('fs');
const path = require('path');
fs.readdir(__dirname, (err, files) => {
    // console.log(files);
    files.forEach(element => {
        console.log(`====filename:${element}======`);

        if (fs.statSync(path.join(__dirname, element)).isFile()) {
            let temparr = element.split('.');
            let dir = temparr[temparr.length - 1]
            let src = path.join(__dirname, element);
            let destDir = path.join(__dirname, 'sorted', dir);
            let dest = path.join(destDir, element);
            if (fs.existsSync(destDir)) {
                if (!fs.existsSync(dest)) {
                    console.log(`${destDir} folder created already\n`);
                    fs.copyFile(src, dest, (err) => {
                        if (err) throw err;
                        console.log(`${element} copied into ${destDir}.\n\n`);
                        fs.unlinkSync(src);
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
                        fs.unlinkSync(src);
                    });
                });
            }
        }
    });
});