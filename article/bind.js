// es6
Function.prototype.myBind = function(context, ...args) {
  const _this = this
  
  const result = function(...innerArgs) {
    return _this.apply(this instanceof _this ? this : context, args.concat(innerArgs))
  }
  result.prototype = Object.create(_this.prototype)
  return result
}
// es3
Function.prototype.bindMy = function(context) {
	var self = this
	var args = [].prototype.slice(arguments, 1)
	var fNOP = function() {}
	var result = function() {
		var innerArgs = [].prototype.slice(arguments)
		return self.apply(this instanceof self ? this : context, args.concat(innerArgs))
	}
	result.prototype = new fNOP()
	fNOP.prototype = self.prototype
	return result
}

Function.prototype.myApply = function(context) {
	
}
// es3

Function.prototype.myCall = function(context) {
	context = context || window
	context.fn = this
	var args = []
	for (var i = 1; i < arguments.length; i++) {
		args.push('arguments[' + i + ']')
	}
	var result = eval('context.fn(' + args + ')')
	delete context.fn
	return result
}

