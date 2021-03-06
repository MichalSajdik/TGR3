#!/usr/bin/env node

// Bellmanův–Fordův algoritmus

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
});

let links = []

function getLinkFromInput(line) {
    let link = line.split(':');
    let tmp = link[1].split(",");

    link = link.map(function (d) {
        return d.trim();
    })

    tmp = tmp.map(function (d) {
        return d.trim();
    })

    let addValueBecauseOfPlusSign = 0;


    for (let i = 0; i < tmp.length; i++) {
        let modifiedLink = [];
        if (link[0].includes("+")) {
            modifiedLink.push(link[0].substring(0, link[0].length - 1));
            addValueBecauseOfPlusSign = 1;
        } else {
            modifiedLink.push(link[0]);
        }

        modifiedLink.push(tmp[i].substring(0, tmp[i].indexOf("(")));
        modifiedLink.push(parseInt(tmp[i].substring(tmp[i].indexOf("(") + 1, tmp[i].indexOf(")"))) + addValueBecauseOfPlusSign);
        links.push(modifiedLink);
    }
}

function compareTimeSpent(a, b) {
    return a[1] - b[1];
}

rl.on('line', function (line) {
    getLinkFromInput(line);
})

function nodesListIncludesFirstNodeInLink(nodeList, link) {

    for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i] === link[0]) {
            return true;
        }
    }
    return false;

}

function nodesListIncludesSecondNodeInLink(nodeList, link) {
    for (let i = 0; i < nodeList.length; i++) {
        if (nodeList[i] === link[1]) {
            return true;
        }
    }
    return false;
}

function getUniqueNodes() {
    let nodeList = [];
    links.forEach(function (link) {

        let first = nodesListIncludesFirstNodeInLink(nodeList, link);
        let second = nodesListIncludesSecondNodeInLink(nodeList, link);
        if (!first) {
            nodeList.push(link[0]);
        }
        if (!second) {
            nodeList.push(link[1]);
        }

    });
    return nodeList;
}

function removeLinkFromLinks(i) {
    links.splice(i, 1);
}

function bellman(nodes, edges, source) {
    let distances = {};
    let parents = {};
    for (var i = 0; i < nodes.length; i += 1) {
        distances[nodes[i]] = Infinity;
        parents[nodes[i]] = null;
    }
    distances[source] = 0;

    for (i = 0; i < nodes.length - 1; i += 1) {
        for (var j = 0; j < edges.length; j += 1) {
            let tmp = edges[j];
            if (distances[tmp[0]] + (tmp[2] * (-1)) < distances[tmp[1]]) {
                distances[tmp[1]] = distances[tmp[0]] + (tmp[2] * (-1));
                parents[tmp[1]] = tmp[0];
            }
        }
    }
    return {parents: parents, distances: distances};
}

function replaceNodeValue(node) {
    for (let i = 0; i < resultingNodes.length; i++) {
        if (resultingNodes[i][0] === node[0]) {
            resultingNodes[i][1] = node[1];
        }
    }
}

function bAlreadyProcessed(node) {
    for (let i = 0; i < resultingNodes.length; i++) {
        if (resultingNodes[i][0] === node[0]) {
            return true;
        }
    }
    return false;
}

function bNodeHasLesserValue(node) {
    for (let i = 0; i < resultingNodes.length; i++) {
        if (resultingNodes[i][0] === node[0] && resultingNodes[i][1] > node[1]) {
            return true;
        }
    }
    return false;
}

function removeNodeWithName(sName) {
    for (let i = 0; i < resultingNodes.length; i++) {
        if (resultingNodes[i][0] === sName) {
            resultingNodes[i].pop();
            return;
        }
    }
}

function getStringResult(parents, node) {

    if (node === links[0][0]) {
        return node;
    }

    return getStringResult(parents, parents[node]) + " -> " + node;

}

rl.on('close', (input) => {

    let uniqueNodes = getUniqueNodes();

    let bellmanResult = bellman(uniqueNodes, links, links[0][0]);
    let finishingNode = links[links.length - 1][0];

    let stringResult = getStringResult(bellmanResult.parents, finishingNode);

    console.log(stringResult + ": " + bellmanResult.distances[finishingNode] * -1)


});