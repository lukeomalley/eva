function isVariableName(expr) {
  return typeof expr === 'string' && /^[+\-*%/<>=a-zA-Z0-9_]+$/.test(expr);
}

module.exports = isVariableName;
