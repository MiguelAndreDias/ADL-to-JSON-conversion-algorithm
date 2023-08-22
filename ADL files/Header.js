////////////////////////
//Archetype header match
////////////////////////


/* //Needed to have both import and requires in the same file
import { Console } from "console";
import {createRequire} from "module";
const require = createRequire(import.meta.url);

const fs = require('fs'); */

export function createHeader(dataFile){
    var regexFixe = /archetype[\w\W]*?concept/
    const matchHeader = regexFixe.exec(dataFile)
    var resultadoHeader = matchHeader[0]
    resultadoHeader = resultadoHeader.replace('concept','')
    
    var regexFixe = /openEHR.+\.v\d{1}/
    var matchFixe = regexFixe.exec(resultadoHeader)
    resultadoHeader = resultadoHeader.replace(matchFixe, '"file_name":' + '"'  + matchFixe + '"' + '}}')
    
    var regexFixe = /archetype/
    var matchFixe = regexFixe.exec(resultadoHeader)
    resultadoHeader = resultadoHeader.replace(matchFixe,'{' + '"' + matchFixe + '"' + ':')
    
    
    
    var regexFixe = /[(]adl_version=/
    var matchFixe = regexFixe.exec(resultadoHeader)
    resultadoHeader = resultadoHeader.replace(matchFixe, '{"' + matchFixe[0].substring(1,12) + '"' + ':')
    
    var regexFixe = /uid/
    var matchFixe = regexFixe.exec(resultadoHeader)
    resultadoHeader = resultadoHeader.replace(matchFixe, '"' + matchFixe + '"' + ':')
    
    var regexFixe = /=[\d\D]{8}-[\d\D]{4}-[\d\D]{4}-[\d\D]{4}-[\d\D]{12}[)]/
    var matchFixe = regexFixe.exec(resultadoHeader)
    resultadoHeader = resultadoHeader.replace(matchFixe, '"' + matchFixe[0].substring(1,37) + '"' + ',')
    
    
    resultadoHeader = resultadoHeader.replace(';',',')

    //Tira o specialise que alguns ficheiros têm
    resultadoHeader = resultadoHeader.replace(/specialise\s+openEHR.+/, "")
    return resultadoHeader
  }



 /*   var filename = "rascunho.txt"

try {
    const data = fs.readFileSync(filename, 'utf8')
    filename = data
  } catch (err) {
    console.error(err)
  }

 console.log(filename)
var resultado = createHeader(filename)
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