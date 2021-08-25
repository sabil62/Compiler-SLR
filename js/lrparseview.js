//ANALISA A ENTRADA - NO PROCESSO DE RECONHECIMENTO DE SENTENÇA
function parseInput() {
	
	var stack = [0]; //inicia a pilha em 0
	
	function stateIndex() {
		return stack[2 * ((stack.length - 1) >> 1)];
	}
	
	//declara as variaveis para a criação da tabela de reconhecimento de entrada
	var tokens = ($element('input').value.trim() + ' $').split(' ');
	var maximumStepCount = parseInt($element('maximumStepCount').value);
	var tokenIndex = 0;
	var token = tokens[tokenIndex];
	var state = lrTable.states[stateIndex()];
	var action = state[token];
	var actionElement = chooseActionElement(state, token);
	var rows = "<tr><td>1</td><td>" + formatStack(stack) + "</td><td>" + tokens.slice(tokenIndex).join(' ') + "</td><td>" + formatAction(state, token, false) + "</td></tr>\n";
	var i = 2;
	
	//monta a tabela - reconhecendo a entrada
	while (i <= maximumStepCount && action != undefined && actionElement != 'r0') {
		if (actionElement.actionType == 's') {
			stack.push(tokens[tokenIndex++]);
			stack.push(parseInt(actionElement.actionValue));
		} else if (actionElement.actionType == 'r') {
			var ruleIndex = actionElement.actionValue;
			var rule = lrTable.grammar.rules[ruleIndex];
			var removeCount = isElement(EPSILON, rule.development) ? 0 : rule.development.length * 2;
			var removedElements = stack.splice(stack.length - removeCount, removeCount);
			var node = new Tree(rule.nonterminal, []);
			
			for (var j = 0; j < removedElements.length; j += 2) {
				node.children.push(removedElements[j]);
			}
			
			stack.push(node);
		} else {
			stack.push(parseInt(actionElement));
		}
		
		var state = lrTable.states[stateIndex()];
		var token = stack.length % 2 == 0 ? stack[stack.length - 1] : tokens[tokenIndex];
		action = state[token];
		actionElement = chooseActionElement(state, token);
		
		rows += "<tr><td>" + i + "</td><td>" + formatStack(stack) + "</td><td>" + tokens.slice(tokenIndex).join(' ') + "</td><td>" + formatAction(state, token, false) + "</td></tr>\n";
		++i;
	}



	
	$element('traceAndTreeRows').innerHTML = rows;
	$element('tree').rowSpan = i + 1;
	$element('tree').innerHTML = "&nbsp";
	
	$element('maximumStepCount').style.color = 'black';
	
	if (action == 'r0') {
		$element('input').style.color = 'green';
		$element('tree').innerHTML = formatTree(stack[1]);
	} else if (action == undefined) {
		$element('input').style.color = 'red';
	} else {
		$element('input').style.color = 'orange';
		$element('maximumStepCount').style.color = 'orange';
	}
}


//estrutura da tabela - HTML
function formatInitialParseView(input, maximumStepCount) {
	var result = "<p><b>Sentença a ser reconhecida: </b><input class='form-control' id=\"input\" type=\"text\" size=\"" + input.length + "\" onkeyup=\"resize(this, 1);\" onchange=\"parseInput();\" value=\"" + input + "\"></p>";
	result += "<p><input class='form-control' id=\"maximumStepCount\" type=\"hidden\" size=\""+ maximumStepCount.toString().length + "\" onkeyup=\"resize(this, 1);\" onchange=\"parseInput();\" value=\"" + maximumStepCount + "\"></p>";
	result += "<input type=\"button\" class=\"btn btn-success btn-gerar btn-lg\" value=\"Reconhecer Entrada\"><br><br>";
	result += "<br>";
	result += "<table class='table table-bordered'>";
	result += "<thead>";
	result += "<tr><th colspan=\"4\">Reconhecimento de Entrada</th></tr>";
	result += "<tr><th>Passo</th><th>Pilha</th><th>Fita de Entrada</th><th>Ação</th></tr>";
	result += "</thead>";
	result += "<tbody id=\"traceAndTreeRows\">";
	result += "</tbody>";
	result += "</table>";
	result += "</div>";
	result += "</td></tr></tbody></table>";
	
	return result;
}


//pilha 
function formatStack(stack) {
	var result = stack.slice(0);
	
	for (var i = 0; i < result.length; i += 2) {
		result[i] = "<span style=\"color: black;\">" + result[i] + "</span>";
	}
	
	return result.join(' ');
}