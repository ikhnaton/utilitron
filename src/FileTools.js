const fs = require('fs');
const path = require('path');

const requireMultipleFiles = (fpath, type) => {
    
    const parse = (myPath, type) => 
    {
        const files = fs.readdirSync(myPath, {withFileTypes: true});

        return files.reduce((acc, file) => 
        {
            const stat = fs.statSync(path.resolve(myPath,file));
            if (stat.isFile() && file.length > type.length && file.substring(file.length - type.length) === type)
            {
                acc[acc.length] = path.resolve(myPath,file);
            }
            else if (stat.isDirectory())
            {
                acc = [...acc, ...parse(path.resolve(myPath, file), type)];
            }
            return acc;
        }, []);
    };

    const res = parse(fpath, type);
    const final = res.map(item => require(item));

    return final;
}

module.exports = { requireMultipleFiles };
