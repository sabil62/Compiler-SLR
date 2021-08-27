//função que recebe os parametros para gerar a arvore da sentença reconhecida
function Tree(value, children) 
{
	this.value = value;
	this.children = children;
	this.toString = function() {
		return this.value.toString();
	}
}