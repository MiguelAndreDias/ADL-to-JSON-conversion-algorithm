////////////////
//ONTOLOGY MATCH
////////////////

import {matchData} from './extraFunctions.js'


//Needed to have both import and requires in the same file
import { Console } from "console";
import {createRequire} from "module";
import { match } from 'assert';
const require = createRequire(import.meta.url);

const fs = require('fs');






function matchDefinitions(objOntology,string){

    //faz match de cada language
 
    let regexLang = /\["[a-z-]+"\] =\s+<.+?>(?=\s+\["[a-z-]+"\] =|$)/gs
    let matchLang = string.match(regexLang)
    let definition = ""

    if(string.includes("term_definitions")){
         definition = "term_definitions"
    }
    else if(string.includes("constraint_definitions")){
         definition = "constraint_definitions"
         objOntology["ontology"]["constraint_definitions"] = {}
    }

    for (var i = 0 ; i < matchLang.length; i++){

        //Faz o match do codigo da lingua e adiciona ao objecto ontology
        let regexLangCode = /(?<=\[")\D+(?="\])/
        let matchLangCode = matchLang[i].match(regexLangCode)
        matchLangCode = matchLangCode[0]
       
      


        objOntology["ontology"][definition][matchLangCode] = {}
        objOntology["ontology"][definition][matchLangCode]["items"] = {}

        //Faz o match dos codigos AT e respetivas descrições e adiciona ao objecto
        let regexAT = /\["a[tc][\d\.]+"\] =\s+<.+?>(?=\s+\["a[tc][\d\.]+"\] =|$)/gs 
        let matchAT = matchLang[i].match(regexAT)
     
        for(var j = 0 ; j < matchAT.length; j++){

            //Match do codigo AT e adiciona ao objecto
            let regexCode = /a[tc][\d\.]+/
            let matchCode = matchAT[j].match(regexCode)
            matchCode = matchCode[0]
            objOntology["ontology"][definition][matchLangCode]["items"][matchCode] = {}

            //Match de text
            let regexDescription = /(?<=<").+[^<>]+(?=">)/g
            let matchDescription = matchAT[j].match(regexDescription)
            
            if (matchDescription !== null){

           
            objOntology["ontology"][definition][matchLangCode]["items"][matchCode]["text"] = matchDescription[0]
            objOntology["ontology"][definition][matchLangCode]["items"][matchCode]["description"] = matchDescription[1]

            if(matchDescription.length !== 2){
                objOntology["ontology"][definition][matchLangCode]["items"][matchCode]["comment"] = matchDescription[2]
                objOntology["ontology"][definition][matchLangCode]["items"][matchCode]["source"] = matchDescription[3]
    
            }
        }
        else{}

        }

    }

    return objOntology
}



export function createOntology(dataFile){
    
    let objOntology = {}
    objOntology["ontology"] = {}
    objOntology["ontology"]["term_definitions"] = {}

    let regexConstraint = /constraint_definitions .+>/gs
    let constraintExists = dataFile.match(regexConstraint)
    

    if(constraintExists){
        dataFile = dataFile.replace(/constraint_definitions .+>/gs, '')

    }
    
    
   

    //faz match do ontology
    let regex = /ontology[\w\W]*>/
    let matchSomething = regex.exec(dataFile)
    matchSomething = matchSomething[0]

    let terms = matchDefinitions(objOntology, matchSomething)
    
    if(constraintExists){
        let constraints = matchDefinitions(objOntology, constraintExists[0])
    
    }
  

  
  
    //console.log(objOntology.ontology.term_definitions.en)
    
    return objOntology
    
}




var filename = "rascunho.txt"

try {
    const data = fs.readFileSync(filename, 'utf8')
    filename = data
  } catch (err) {
    console.error(err)
  }


var resultado = createOntology(filename)



