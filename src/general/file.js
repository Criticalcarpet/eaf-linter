const fs = require('fs');

class File {

    fileData = "";

    constructor(filePath) {

        this.fileData = fs.readFileSync(filePath, 'ascii');

    }

    countLines() {

        return this.fileData.split("\n").length;

    }

    countLineComments() {

        // Split the File into Lines and Begin Count
        var fileLines = this.fileData.split("\n");
        var commentCount = 0;
    
        // If the file is empty, no comments
        if (fileLines.length == 0) return 0;
    
        // Loop through Each Line
        fileLines.forEach((line) => {
    
            if (line.includes("//")) 
                commentCount++;
    
        });
    
        // Return the Count
        return commentCount;
    
    }

}

module.exports = File;