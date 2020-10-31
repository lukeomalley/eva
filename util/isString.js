function isString(expr) {
  return (
    typeof expr === 'string' && expr[0] === '"' && expr[expr.length - 1] === '"'
  );
}

module.exports = isString;
