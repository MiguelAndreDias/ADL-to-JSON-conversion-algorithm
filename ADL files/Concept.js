//////////////////////////
//Archetype concept match
//////////////////////////

/* //Needed to have both import and requires in the same file
import { Console } from "console";
import {createRequire} from "module";
const require = createRequire(import.meta.url);

const fs = require('fs'); */

export function createConcept(dataFile){
    var regexFixe = /concept[\w\W]*?language/
  const matchConcept = regexFixe.exec(dataFile)
  var resultadoConcept = matchConcept[0]
  resultadoConcept = resultadoConcept.replace('language','')

  resultadoConcept = resultadoConcept.replace(/concept/, '{' + '"concept"' + ':')
  var regexAT = /\[at.+?\]/
  var matchAT = resultadoConcept.match(regexAT)
  matchAT = matchAT[0]
  matchAT = matchAT.replace("[", "")
  matchAT = matchAT.replace("]", "")

  resultadoConcept = resultadoConcept.replace(/\[at.+\]/, '{' + '"' + matchAT + '"' + ':')


  var regexFixe = /-- \D.+/
  var matchFixe = regexFixe.exec(resultadoConcept)
  resultadoConcept = resultadoConcept.replace(matchFixe, '"' + matchFixe[0].substring(3) + '"' + '}}')

return resultadoConcept

}



/* 
var filename = "rascunho.txt"

try {
    const data = fs.readFileSync(filename, 'utf8')
    filename = data
  } catch (err) {
    console.error(err)
  }


console.log(filename)
var resultado = createConcept(filename)
console.log(resultado)
console.log(111111)
resultado = JSON.parse(resultado)
console.log(22222222)

console.log(JSON.stringify(resultado))
console.log()
console.log(resultado)

console.log()
console.log()
  */