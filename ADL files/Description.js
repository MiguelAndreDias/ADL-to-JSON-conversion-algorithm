///////////////////
//DESCRIPTION MATCH
///////////////////

import {matchData} from './extraFunctions.js'

//Needed to have both import and requires in the same file
import { Console } from "console";
import {createRequire} from "module";
const require = createRequire(import.meta.url);

const fs = require('fs');




export function createDescription(dataFile){
    var regexDescription = /description[\w\W]*?>\s+definition/
    var matchDesc = regexDescription.exec(dataFile)
    
    var resultadoDescription = matchDesc[0]
    
  
    //Tirar o desnecessario
    var descriptionProps = ["purpose", "misuse", "use", "keywords",  "copyright", "lifecycle_state", "other_contributors"]
    
    for (var i=0 ; i < descriptionProps.length ; i++) {
      var regexDesc = new RegExp( descriptionProps[i] + ' = <[\\d\\D]*?>', 'g' ) 
     
      var matchKeywords = resultadoDescription.match(regexDesc)
     if (matchKeywords == null){

     }
     else{

    
      for (var j=0 ; j < matchKeywords.length; j++) {
        resultadoDescription = resultadoDescription.replaceAll(matchKeywords[j], '')
      }

    }
  
      
    }
    
    resultadoDescription = resultadoDescription.replace(/other_details =[\d\D]+>/, '')
  
    
    
    resultadoDescription = matchData(/description[\w\W]*?definition/,  "definition" ,resultadoDescription)
  
    
  
    var descriptionProps = ["description", "original_author", "details", "language"]
  
  
    for (var i=0 ; i < descriptionProps.length ; i++) {
  
      resultadoDescription = resultadoDescription.replaceAll(descriptionProps[i], '"' + descriptionProps[i] + '"')
  
    }
  
  
    var regexISO = /ISO.+/g
    var matchISO = resultadoDescription.match(regexISO)
    matchISO.forEach( (element) => {
      resultadoDescription = resultadoDescription.replaceAll(element, '"' + element + '"')
  })
  
   
    
    
    //VIRGULA
    
    var regexV = /".*?" : ".*?"/g
    var matchVirgula = resultadoDescription.match(regexV)
    var uniqMatch = [...new Set(matchVirgula)]
    
    
    
    for (var i=0 ; i < uniqMatch.length ; i++) {
      
        resultadoDescription = resultadoDescription.replaceAll(uniqMatch[i],uniqMatch[i] + ",")
      
    }
    
    
   
    
    
    
    
    
    
    //Tirar virgula no ultimo termo
    
    var regexV = /,\s+}/g
    
    var matchVirgula = resultadoDescription.match(regexV)
    
    
    if(matchVirgula == null){
      resultadoDescription = resultadoDescription.replace('",', '"')
    }
    else{
      for (var i=0 ; i < matchVirgula.length ; i++) {
      
        resultadoDescription = resultadoDescription.replace(matchVirgula[i], '}')
      }
    }
    
    
    
    
    
    
    //Por virgula antes de certos termos
    
    var regexV = /}\s+"/g
    
    
    var matchVirgula = resultadoDescription.match(regexV)
    
    
    if(matchVirgula == null){
      
    }
    else{
      for (var i=0 ; i < matchVirgula.length ; i++) {
      
        resultadoDescription = resultadoDescription.replace(matchVirgula[i], matchVirgula[i].slice(0, -1) + ',' + '"' )
      }
    }
    
    
    
    
    resultadoDescription = resultadoDescription.replace(/"description"/, '{' + '"description"' + ':'+ '{')
    resultadoDescription = resultadoDescription + "}}"
  
   
  
    return resultadoDescription
  
  }
 


 //codigo para testar ficheiros no PC 
/* 
  var filename = "rascunho.txt"
try {
    const data = fs.readFileSync(filename, 'utf8')
    filename = data
  } catch (err) {
    console.error(err)
  }



console.log(filename)
var resultado = createDescription(filename)
console.log(resultado)
console.log(111111)
resultado = JSON.parse(resultado)
console.log(22222222)

console.log(JSON.stringify(resultado))
console.log()
console.log(resultado)

console.log()
console.log() */