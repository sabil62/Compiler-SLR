//somente verifica se o tipo da gramatica é SLR
function Item(rule, dotIndex)
{
	extend(this, new BasicItem(rule, dotIndex));
	this.lookAheads = rule.grammar.follows[rule.nonterminal];
}

Item.prototype.grammarType = 'SLR';