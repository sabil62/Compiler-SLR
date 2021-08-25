//funcao que cria a tabela closure e os itens canonicos, recebendo a gramatica como parametro
function LRClosureTable(grammar) {
	
	this.grammar = grammar;
	this.kernels = [];
	
	this.kernels.push(new Kernel(0, [new Item(grammar.rules[0], 0)], grammar));
	
	for (var i = 0; i < this.kernels.length;) {
		var kernel = this.kernels[i];
		
		updateClosure(kernel);
		
		if (addGotos(kernel, this.kernels)) {
			i = 0;
		} else {
			++i;
		}
	}
	
	//atualiza informacoes do closure
	function updateClosure(kernel) {
		for (var i = 0; i < kernel.closure.length; ++i) {
			var newItemsFromSymbolAfterDot = kernel.closure[i].newItemsFromSymbolAfterDot();
			
			for (var j in newItemsFromSymbolAfterDot) {
				newItemsFromSymbolAfterDot[j].addUniqueTo(kernel.closure);
			}
		}
	}
	
	
	//gera GOTOs
	function addGotos(kernel, kernels) {
		var lookAheadsPropagated = false;
		var newKernels = new Object();
		
		for (var i in kernel.closure) {
			var item = kernel.closure[i];
			var newItem = item.newItemAfterShift();
			
			if (newItem != undefined) {
				var symbolAfterDot = item.rule.development[item.dotIndex];
				
				addUnique(symbolAfterDot, kernel.keys);
				newItem.addUniqueTo(getOrCreateArray(newKernels, symbolAfterDot));
			}
		}
		
		for (var i in kernel.keys) {
			var key = kernel.keys[i];
			var newKernel = new Kernel(kernels.length, newKernels[key], grammar);
			var targetKernelIndex = indexOfUsingEquals(newKernel, kernels);
			
			if (targetKernelIndex < 0) {
				kernels.push(newKernel);
				targetKernelIndex = newKernel.index;
			} else {
				for (var j in newKernel.items) {
					lookAheadsPropagated |= newKernel.items[j].addUniqueTo(kernels[targetKernelIndex].items);
				}
			}
			
			kernel.gotos[key] = targetKernelIndex;
		}
		
		return lookAheadsPropagated;
	}
	
	
}


//itens canonicos
function Kernel(index, items, grammar) {
	
	this.index = index;
	this.items = items;
	this.closure = this.items.slice(0);
	this.gotos = new Object();
	this.keys = [];
	
	this.equals = function(that) {
		return includeEachOtherUsingEquals(this.items, that.items);
	};
	
	this.toString = function() {
		return 'closure{' + this.items + '} = {' + this.closure + '}';
	};
}