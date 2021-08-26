//TABELA SINTATICA LR - ACTION e GOTO

//formata a tabela - HTML
function formatLRTable(lrTable) {
  var result =
    "<h3 align='center'><b>With the above information, we generate the LR Syntax Table of this grammar::</b></div><table border=\"1\" class='table table-bordered'>";
  var grammar = lrTable.grammar;
  result += "<thead>";
  result +=
    '<tr><th colspan="' +
    (1 + grammar.terminals.length + 1 + grammar.nonterminals.length) +
    '">LR Syntax Table</th></tr><tr><th rowspan="2"> State </th><th rowspan="1" colspan="' +
    (grammar.terminals.length + 1) +
    '"> Action </th><th colspan="' +
    grammar.nonterminals.length +
    '"> GoTo </th></tr>\n<tr>';

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

    result += '<tr><td style="color: black;">' + i + "</td>";

    for (var j in grammar.terminals) {
      var terminal = grammar.terminals[j];

      result += "<td>" + formatAction(state, terminal, true) + "</td>";
    }

    result += "<td>" + formatAction(state, "$", true) + "</td>";

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
  // console.log(action);
  // console.log("------------------------------");
  // // console.log(token);

  if (action == undefined) {
    return "&nbsp;";
  }

  var formattedActionElements = [];

  if (1 < action.length && isInTable) {
    // for (var i in action) {
    //   formattedActionElements.push(
    //     '<input type="radio" name="' +
    //       state.index +
    //       "_" +
    //       token +
    //       '" ' +
    //       (i == 0 ? 'checked="true"' : "") +
    //       ' onchange="parseInput();">' +
    //       formatActionElement(action[i]) +
    //       "</input>"
    //   );
    // }
    
    // let {"index": a, "*": b} = state
    // b.length = 1
    // let news = {
    //   "index":a,
    //   "*": b}
      formattedActionElements.push(
        '<input type="checkbox"  name="' +
          state.index +
          "_" +
          token +
          '" ' +
          (i == 0 ? 'checked="true"' : "") +
          ' onchange="parseInput();">' +
          formatActionElement(action[0]) +
          "</input>"
      );
    }
    // formattedActionElements.push(formatActionElement(action[0]));
   else {
    formattedActionElements.push(
      formatActionElement(chooseActionElement(state, token))
    );
    // console.log(JSON.stringify(state))
  // console.log(token)
  }

  var result = formattedActionElements.join(" / ");

  if (1 < action.length) {
    result =
      '<span style="background-color: #e64040; padding: 9px 80px 9px 18px;">' +
      result +
      "</span>";
  }

  return result;
}

function formatActionElement(actionElement) {
  return actionElement
    .toString()
    .replace("r0", '<span style="color: black; padding:"10px">Accept</span>')
    .replace(/(s|\b)([0-9]+)/g, '$1<span style="color: black;">$2</span>')
    .replace(/r([0-9]+)/g, 'r<sub style="color: black;">$1</sub>');
}
