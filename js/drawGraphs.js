function drawGraph(dataForGraph, stateGraph) {
  // console.log(formatItems(dataForGraph[1].closure));
  // console.log(dataForGraph[3].gotos);
  // console.log(dataForGraph.length);
  console.log(stateGraph);

  var data = [];

  var data = dataForGraph.map((c, index) => {
    label: dataForGraph[index];
  });

  for (let index = 0; index < dataForGraph.length; index++) {
    data[index] = {
      id: index,
      label: formatItems(dataForGraph[index].closure),
    };
  }
  console.log(data);

  var nodes = new vis.DataSet(
    data
    // { id: 0, label: "Node 0\nj" },
    // { id: 1, label: "Node 1" },
    // { id: 2, label: "Node 2" },
    // { id: 3, label: "Node 3" },
    // { id: 4, label: "Node 4" },
    // { id: 5, label: "Node 5" },
    // { id: 6, label: "Node 6" },
    // { id: 7, label: "Node 7" },
    // { id: 8, label: "Node 8" },
  );

  var eddge = [];
  for (let index = 0; index < dataForGraph.length; index++) {
    // eddge[index] = {
    //   from: index,
    //   to: index + 1,
    // };
    var nable = [];
    for (let key in dataForGraph[index].gotos) {
      nable.push({ id: key, value: dataForGraph[index].gotos[key] });
    }
    if (nable.length === 0) {
      eddge[index] = {
        from: index,
        to: index,
      };
    } else {
      for (let i = 0; i < nable.length; i++) {
        eddge[index] = {
          from: index,
          to: nable[i].value,
          label: nable[i].id,
        };
      }
    }
    console.log(nable);
  }

  // eddge[index] = {
  //   from: index,
  //   to: index + 1,
  // };

  //   console.log(dataForGraph[4].gotos);
  console.log(eddge);
  // create an array with edges
  var edges = new vis.DataSet(
    eddge
    // { from: 0, to: 1, label: "0-1" },
    // { from: 1, to: 9, label: "0-1" },
    // { from: 0, to: 2, label: "0-2" },
    // { from: 2, to: 3 },
    // { from: 3, to: 4 },
    // { from: 3, to: 5 },
    // { from: 3, to: 6 },
    // { from: 4, to: 7 },
    // { from: 5, to: 8 },
    // { from: 7, to: 9 },
    // { from: 8, to: 11 },
  );

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
        direction: "UD", // UD, DU, LR, RL
        sortMethod: "directed", // hubsize, directed
        shakeTowards: "roots", // roots, leaves
      },
    },
    nodes: {
      color: "#ffffff",
      fixed: false,
      font: "12px arial black",
      scaling: {
        label: true,
      },
      shadow: true,
      shape: "box",
      margin: 20,
    },
    edges: {
      arrows: "to",
      color: "black",
      scaling: {
        label: true,
      },
      shadow: true,
    },
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
      itemIsFinal ? '<span style="color: black;">' + item + "</span>" : item
    );
  }
  return formattedItems.join("; ");
}
