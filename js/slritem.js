// only check if grammar type is SLR
function Item(rule, dotIndex) {
  extend(this, new BasicItem(rule, dotIndex));
  this.lookAheads = rule.grammar.follows[rule.nonterminal];
}

Item.prototype.grammarType = "SLR";
