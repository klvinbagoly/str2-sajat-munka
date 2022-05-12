const fParser = (fStr) => {
  if (fStr.startsWith('function')) { fStr = fStr.slice(8).trim() };
  const args = fStr.slice(1, fStr.indexOf(')')).split(',').map(arg => arg.trim())
  let body = fStr.slice(fStr.indexOf(')') + 1).trim()
  if (body.startsWith('=>')) { body = body.slice(2).trim();
   if (!body.startsWith('{') && !body.endsWith('}')) {
     body = "return " + body
   }
  }
  return new Function(...args, body)
}

const fParserWithBinding = (fStr, parentObj) => {
  if (fStr.startsWith('function')) { fStr = fStr.slice(8).trim() };
  const args = fStr.slice(1, fStr.indexOf(')')).split(',').map(arg => arg.trim())
  let body = fStr.slice(fStr.indexOf(')') + 1).trim()
  if (body.startsWith('=>')) { body = body.slice(2).trim();
   if (!body.startsWith('{') && !body.endsWith('}')) {
     body = "return " + body
   }
  }
  return new Function(...args, body).bind(parentObj)
}