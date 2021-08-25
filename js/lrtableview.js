//TABELA SINTATICA LR - ACTION e GOTO

//formata a tabela - HTML
function formatLRTable(lrTable) {
	var result = "<h3 align='center'><b>Com as informações acima, geramos a Tabela Sintática LR dessa gramática:</b></div><table border=\"1\" class='table table-bordered'>";
	var grammar = lrTable.grammar;
	result += "<thead>";
	result += "<tr><th colspan=\"" + (1 + grammar.terminals.length + 1 + grammar.nonterminals.length) + "\">Tabela Sintática LR</th></tr><tr><th rowspan=\"2\"> Estado </th><th rowspan=\"1\" colspan=\"" + (grammar.terminals.length + 1) + "\"> Ação (action) </th><th colspan=\"" + grammar.nonterminals.length + "\"> Desvio (goto) </th></tr>\n<tr>";
	
	for (var i in grammar.terminals) {
		result += "<th>" + grammar.terminals[i] + "</th>";
	}
	
	result += "<th>$</th>";
	
	for (var i in grammar.nonterminals) {
		result += "<th>" + grammar.nonterminals[i] + "</th>";
	}
	
	result += "</tr>";
	result += "</thead>";
	result += "<tbody>";
	
	for (var i in lrTable.states) {
		var state = lrTable.states[i];
		
		result += "<tr><td style=\"color: black;\">" + i + "</td>";
		
		for (var j in grammar.terminals) {
			var terminal = grammar.terminals[j];
			
			result += "<td>" + formatAction(state, terminal, true) + "</td>";
		}
		
		result += "<td>" + formatAction(state, '$', true) + "</td>";
		
		for (var j in grammar.nonterminals) {
			var nonterminal = grammar.nonterminals[j];
			
			result += "<td>" + formatAction(state, nonterminal, true) + "</td>";
		}
		
		result += "</tr>\n";
	}
	
	result += "</tbody>";
	result += "</table>";
	
	return result;
}


//action
function formatAction(state, token, isInTable) {
	var action = state[token];
	
	if (action == undefined) {
		return "&nbsp;";
	}
	
	var formattedActionElements = [];
	
	if (1 < action.length && isInTable) {
		for (var i in action) {
			formattedActionElements.push("<input type=\"radio\" name=\"" + state.index + "_" + token + "\" " + (i == 0 ? "checked=\"true\"" : "") + " onchange=\"parseInput();\">" + formatActionElement(action[i]) + "</input>");
		}
	} else {
		formattedActionElements.push(formatActionElement(chooseActionElement(state, token)));
	}
	
	var result = formattedActionElements.join(" / ");
	
	if (1 < action.length) {
		result = "<span style=\"background-color: black;\">" + result + "</span>";
	}
	
	return result;
}


	
function formatActionElement(actionElement) {
	return actionElement.toString()
			.replace("r0", "<span style=\"color: black;\">ACEITA</span>")
			.replace(/(s|\b)([0-9]+)/g, "$1<span style=\"color: black;\">$2</span>")
			.replace(/r([0-9]+)/g, "r<sub style=\"color: black;\">$1</sub>");
}