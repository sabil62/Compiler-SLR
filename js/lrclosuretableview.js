//exibe a tabela closure - HTML - conteudo da tabela
function formatLRClosureTable(lrClosureTable) {
	var result = "<table border=\"1\" class='table table-bordered'>";
	result += "<thead><tr><th colspan=\"4\">" + Item.prototype.grammarType + " - Tabela Closure </th></tr><tr><th> GOTO </th><th>Itens Canônicos</th><th>Estado</th><th>Closure</th></tr></thead>";
	result += "<tbody id=\"lrClosureTableRows\">";
	
	var kernel0 = lrClosureTable.kernels[0];
	
	result += "<tr><td></td><td>{" + formatItems(kernel0.items) +
			"}</td><td style=\"color: black;\">" + 0 + "</td><td>{" + formatItems(kernel0.closure) + "}</td></tr>";
	
	var done = [0];
	
	for (var i in lrClosureTable.kernels) {
		var kernel = lrClosureTable.kernels[i];
		
		for (var j in kernel.keys) {
			var key = kernel.keys[j];
			var targetKernel = lrClosureTable.kernels[kernel.gotos[key]];
			result += "<tr><td>goto(" + kernel.index + ", " + key + ")</td><td>{" + formatItems(targetKernel.items) +
					"}</td><td style=\"color: black;\">" + targetKernel.index + "</td><td>" +
					(isElement(targetKernel.index, done) ? "&nbsp;" : "{" + formatItems(targetKernel.closure) + "}") +
					"</td></tr>";
			addUnique(targetKernel.index, done);
		}
	}
	
	result += "</tbody>";
	result += "</table>";
	
	return result; //retorna a tabela montada
}


//formata os itens da tabela 
function formatItems(items) {
	var formattedItems = [];
	
	for (var i in items) {
		var item = items[i];
		var itemIsFinal = item.dotIndex == item.rule.development.length || EPSILON == item.rule.development[0];
		
		formattedItems.push(itemIsFinal ? "<span style=\"color: black;\">" + item + "</span>" : item);
	}
	
	return formattedItems.join('; ');
}