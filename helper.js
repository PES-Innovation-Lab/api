const in_array = ( str_comma_separated, word ) => {
    const delimiter = ',';
    return str_comma_separated.split(delimiter).find((str) =>{                        
        return str.toLowerCase().trim() === word;
    });
};

module.exports = in_array;