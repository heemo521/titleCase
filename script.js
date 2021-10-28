/* 
            How to implement title case 
            
            In title case, capitalize the following words in a title or heading:
              1. the first word of the title or heading, even if it is a minor word such as The” or A” the first word of a subtitle
              2. the first word after a colon, em dash, or end punctuation in a heading
              3. major words, including the second part of hyphenated major words (e.g., “Self-Report,” not “Self-report”) 
              4. words of four letters or more (e.g., “With,” “Between,” “From”)
            
            Lowercase only minor words that are:
              1. Three letters or fewer in a title or heading, except the first word in a title or subtitle 
              or the first word after a colon(:), em dash(-), or end punctuation ("!", "?",".") in a heading
              
              ex) short conjunctions (e.g., “and,” “as,” “but,” “for,” “if,” “nor,” “or,” “so,” “yet”)
              ex) articles (“a,” “an,” “the”)
              ex) short prepositions (e.g., “as,” “at,” “by,” “for,” “in,” “of,” “off,” “on,” “per,” “to,” “up,” “via”) 
            
              Reference: 
              https://apastyle.apa.org/style-grammar-guidelines/capitalization/title-case
              https://titlecaseconverter.com/ 
              */

/* NOTE:
              - This is NOT a true title case! NOT YET!

              - Rule #2 If a word ends with a specialCase, next word should be capitalize. 
              - Use exceptions for lowercase
                - Then check, if true, check if the word is the first word after the specialCase
              
    IDEA:
        - build a simple html with textarea and button
        - use options for different styles, also different options to modify the converter output
        - use it as a part of a auto format program that formats professional papers, etc. 
              */
const convertTitleCase = function (title) {
    const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
    const lowerCase = (str) => str[0].toLowerCase() + str.slice(1);
    const specialCase = ['—', ':', '!', '?', '.'];
    const exceptions = [
        ...['and', 'as', 'but', 'for', 'if', 'nor', 'or', 'so', 'yet'],
        ...['a', 'an', 'the'],
        ...['as', 'at', 'by', 'for', 'in', 'of', 'off', 'on', 'per', 'to', 'up', 'via'],
    ];

    let foundC = false;
    let foundI = 10;

    let newWords = title
        .toLowerCase()
        .split(' ')
        .map((word) => word.split(''))
        .map((arr1) => {
            let newArray = arr1
                .map((arr) => {
                    if (specialCase.includes(arr)) {
                        foundC = !foundC;
                        let num = arr1.indexOf(arr);
                        if (num < 4) {
                            foundI = num;
                        }
                        return arr;
                    } else if (foundC) {
                        foundC = !foundC;
                        return arr.toUpperCase();
                    } else {
                        return arr;
                    }
                })
                .join('');
            newArray = newArray.length <= 3 ? newArray : capitalize(newArray);
            newArray = foundI <= 3 ? lowerCase(newArray) : newArray;
            console.log(foundI < 4 ? `${foundI}: ${newArray}` : `${foundI}: ${newArray}`);
            foundI = 10;
            foundC = false;
            return newArray;
        })
        .join(' ');
    return capitalize(newWords);
};

// Test Data:
// console.log(convertTitleCase('this is A some title'));
// console.log(convertTitleCase('A-LONG title- not-to: lon'));
// console.log(convertTitleCase('Here's another title: Go go go! '));
