export const testObject = '{"moduleName":"MAJOR IN THE SOCIOLOGY OF POPULATION, AGING, AND HEALTH - admission discontinued","lines":{"1":{"courses":"5.5","operator":"OR","courseList":[{"courseName":"COMPSCI","courseNumber":"3999","courseLetter":["A","B"]}],"subjectToLevelMapping":[{"subjectCode":"COMPSCI","level":"3000+"},{"subjectCode":"ENG","level":"2199-3000"}]},"2":{"courses":"5.5","operator":"OR","courseList":[{"courseName":"COMPSCI","courseNumber":"3999","courseLetter":["A","B"]}],"subjectToLevelMapping":"null"}}}';

export function testJSON() {
    var obj = JSON.parse(testObject);
    console.log(obj);

    console.log(obj.lines[1].subjectToLevelMapping);
}

testJSON();