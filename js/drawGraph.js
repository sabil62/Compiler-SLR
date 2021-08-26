function drawGraph(dataForGraph) {

    let nodeArr = []
    let edgeArr = []

    for (let i = 0; i < dataForGraph.length; i++){
        let tempLabel = formatItems(dataForGraph[i].closure)
        tempLabel.replace(/;/g, '\n')
        let tempObj = {
            id: dataForGraph[i].index,
            label: tempLabel
        }
        nodeArr.push(tempObj)
    }


    var nodes = new vis.DataSet(nodeArr);

    // create an array with edges
    for (let i = 0; i < dataForGraph.length; i++){
        for (const goto in dataForGraph[i].gotos) {
            let tempObj = {
                from: dataForGraph[i].index,
                to: dataForGraph[i].gotos[goto],
                label: goto
            }
            edgeArr.push(tempObj)
        }
    }
    var edges = new vis.DataSet(edgeArr);

    // create a network
    var container = document.getElementById("mynetwork");
    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options = {
        layout: {
            hierarchical: {
                enabled: true,
                levelSeparation: 150,
                nodeSpacing: 100,
                treeSpacing: 200,
                parentCentralization: true,
                direction: 'UD',        // UD, DU, LR, RL
                sortMethod: 'directed',  // hubsize, directed
                shakeTowards: 'roots'  // roots, leaves
            }
        },
        nodes: {
            color: '#ffffff',
            fixed: false,
            font: '20px arial black',
            scaling: {
                label: true
            },
            shadow: true,
            shape: 'box',
            margin: 20
        },
        edges: {
            arrows: 'to',
            color: 'black',
            scaling: {
                label: true,
            },
            shadow: true,
        }
    };
    var network = new vis.Network(container, data, options);
}



//formata os itens da tabela
function formatItems(items) {
    var formattedItems = [];
    for (var i in items) {
        var item = items[i];
        var itemIsFinal =
            item.dotIndex == item.rule.development.length ||
            EPSILON == item.rule.development[0];
        formattedItems.push(
            // itemIsFinal ? '<span style="color: black;">' + item + "</span>" : item
            item
        );
    }
    return formattedItems.join("; ");
}

