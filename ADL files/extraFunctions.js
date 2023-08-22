export function matchData(regex, remove, string){
    const matchSomething = regex.exec(string)
    var resultado = matchSomething[0]
  
    resultado = resultado.replace(remove || null,'')
    resultado = resultado.replace(/<>/g, '""')
  
    resultado = resultado.replace(/=/g,':')
  
    resultado = resultado.replace(/\s>\s/g,'}')
    resultado = resultado.replace(/\s<\s/g,'{')
  
    resultado = resultado.replace(/>/g,'')
    resultado = resultado.replace(/</g,'')
  
    resultado = resultado.replace(/]/g,'')
    resultado = resultado.replace(/[[]/g,'')
    return resultado
  
  }


export function convert64(base64encoded){
    var utf8encoded = Buffer.from(base64encoded, 'base64').toString('utf8');
    return utf8encoded

}
