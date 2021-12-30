const fs = require('fs');
const path = require('path');
const File = require('./file');

class Folder {

    folderPath = "";

    constructor(dirPath) {

        this.folderPath = dirPath;
        
    }

    isIgnored() {

        return new RegExp(global.eafSettings.ignore).test(this.folderPath);

    }

    countLines() {

        // Check if Folder Should be Ignored
        if (this.isIgnored()) return 0;

        var count = 0;
        var subfolders = this.getFolders();
        var files = this.getFiles();
        
        subfolders.forEach((folder) => {

            count += folder.countLines();

        });

        files.forEach((file) => {

            count += file.countLines();

        });

        return count;

    }

    countLineComments() {

        // Check if Folder Should be Ignored
        if (this.isIgnored()) return 0;

        var count = 0;
        var subfolders = this.getFolders();
        var files = this.getFiles();
        
        subfolders.forEach((folder) => {

            count += folder.countLineComments();

        });

        files.forEach((file) => {

            count += file.countLineComments();

        });

        return count;
        
    }

    getFolders() {

        // Create Output
        var output = [];
        var filesAndFolders = fs.readdirSync(this.folderPath, { withFileTypes: true });

        // Loop through Each
        filesAndFolders.forEach((item) => {

            if (item.isDirectory()) 
                output.push(new Folder(path.join(this.folderPath, item.name)));

        });

        // Return the Output
        return output;

    }

    getFiles() {

        // Create Output
        var output = [];
        var filesAndFolders = fs.readdirSync(this.folderPath, { withFileTypes: true });

        // Loop through Each
        filesAndFolders.forEach((item) => {

            // If Its a File, Add It to the List
            if (!item.isDirectory()) 
                output.push(new File(path.join(this.folderPath, item.name)));

        });

        // Return the Output
        return output;

    }

}

module.exports = Folder;