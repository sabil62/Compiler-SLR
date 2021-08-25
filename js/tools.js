//esse arquivo contem pequenas funcoes auxiliarem que manipulam as informações das diferentes colunas das tabelas

function extend(objekt, zuper)
{
	_.extend(objekt, zuper);	
	objekt.zuper = zuper;
}

function newObject(prototype) {
	function F()
	{
		//inicia nova função vazia
	}
	F.prototype = prototype;
	return new F();
}

function includes(array1, array2) {
	for (var i in array1) {
		if (array2.indexOf(array1[i]) < 0) {
			return false;
		}
	}
	
	return true;
}

function includeEachOther(array1, array2) {
	return includes(array1, array2) && includes(array2, array1);
}

function includesUsingEquals(array1, array2) {
	for (var i in array1) {
		if (indexOfUsingEquals(array1[i], array2) < 0) {
			return false;
		}
	}
	
	return true;
}

function includeEachOtherUsingEquals(array1, array2) {
	return includesUsingEquals(array1, array2) && includesUsingEquals(array2, array1);
}

function getOrCreateArray(dictionary, key) {
	var result = dictionary[key];
	
	if (result == undefined) {
		result = [];
		dictionary[key] = result;
	}
	
	return result;
}


function trimElements(array) {
	var result = [];
	
	for (var i in array) {
		result[i] = array[i].trim();
	}
	
	return result;
}

function isElement(element, array) {
	for (var i in array) {
		if (element == array[i]) {
			return true;
		}
	}
	
	return false;
}

function addUnique(element, array) {
	if (!isElement(element, array)) {
		array.push(element);
		
		return true;
	}
	
	return false;
}

function isElementUsingEquals(element, array) {
	for (var i in array) {
		if (element.equals(array[i])) {
			return true;
		}
	}
	
	return false;
}

function addUniqueUsingEquals(element, array) {
	if (!isElementUsingEquals(element, array)) {
		array.push(element);
		
		return true;
	}
	
	return false;
}

function indexOfUsingEquals(element, array) {
	for (var i in array) {
		if (element.equals(array[i])) {
			return i;
		}
	}
	
	return -1;
}

function $element(id) {
	return document.getElementById(id);
}

function assertEquality(expected, actual) {
	if (expected != actual) {
		throw 'Erro - Esperado: ' + expected + ' porém foi recebido: ' + actual;
	}
}
	
function assertEquals(expected, actual) {
	if (!expected.equals(actual)) {
		throw 'Erro - Esperado: ' + expected + ' porém foi recebido: ' + actual;
	}
}

function resize(textInput, minimumSize) {
	textInput.size = Math.max(minimumSize, textInput.value.length);
}