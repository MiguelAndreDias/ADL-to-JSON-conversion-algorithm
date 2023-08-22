import {createHeader} from "./Header.js"
import {createConcept} from "./Concept.js"
import {createLanguage} from "./Language.js"
import {createDescription} from "./Description.js"

//import {createOntology} from "./Ontology.js"
import {createOntology} from "./Ontology2.js"
import {createAllMatches} from "./Definition.js"

import {convert64} from "./extraFunctions.js"

//Needed to have both import and requires in the same file
import { Console } from "console";
import {createRequire} from "module";
const require = createRequire(import.meta.url);

const fs = require('fs');
import fetch, { Headers } from 'node-fetch';

//read data file and put into a string

//var filename = "openEHR-EHR-CLUSTER.waveform.v0.adl.txt"




//Abrir ficheiros por fetch request


/* const url = "https://api.github.com/"
const getRepoContent = "repos/gestaopedidosehr/CKM-mirror/contents/"
const path = "local/archetypes/cluster/openEHR-EHR-CLUSTER.waveform.v0.adl"



await fetch(url + getRepoContent + path , {
headers: new Headers({
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': 'Bearer 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',
    
    })
}).then(res => res.json()).then(json => {
  filename = json.content
  console.log(filename)
  filename = convert64(filename)

  
  


}) */









//Abrir ficheiros no diretorio

export var filename = "Rascunho.txt"

try {
    const data = fs.readFileSync(filename, 'utf8')
    filename = data
  } catch (err) {
    console.error(err)
  }



  

export function createJson(dataFile){



  
    var Header = createHeader(dataFile)
    var Concept = createConcept(dataFile)
    var Language = createLanguage(dataFile)
    var Description = createDescription(dataFile)
    var objDefinitionInicial = createAllMatches(dataFile)
    var objOntology = createOntology(dataFile)
    


    var objHeader = JSON.parse(Header)
    var objConcept = JSON.parse(Concept)
    var objLanguage = JSON.parse(Language)
    var objDescription = JSON.parse(Description)
    //var objOntology = JSON.parse(Ontology)


    var objDefinitionFinal = {"definition" : {}}
    objDefinitionFinal.definition = objDefinitionInicial


    const mergedObject = {
      ...objHeader,
      ...objConcept,
      ...objLanguage,
      ...objDescription,
      ...objDefinitionFinal,
      ...objOntology
      
    };
    
    
    return mergedObject

}



var resultado = createJson(filename)
console.log(111111)
console.log(resultado)
console.log(JSON.stringify(resultado))
console.log(111111)