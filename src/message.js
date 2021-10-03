#!/usr/bin/env node

// dijkstra

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
});

let links = []
let resultingNodes = []; // this represents best value for node

function getLinkFromInput(line) {
    let link = line.split('-');
    let tmp = link[1].split(":");
    link[1] = tmp[0];
    link[2] = tmp[1];

    link = link.map(function (d) {
        return d.trim();
    })
    return link;
}

function compareTimeSpent(a, b) {
    return a[1] - b[1];
}

rl.on('line', function (line) {
    let link = getLinkFromInput(line);
    links.push(link);
})

function removeLinkFromLinks(i) {
    links.splice(i, 1);
}

function getNextNodesForName(sName, iTimeSpent) {
    let nodes = [];
    for (let i = 0; i < links.length; i++) {

        if (links[i][0] === sName) {
            let link = [];
            link.push(links[i][1]);
            link.push(parseInt(links[i][2]) + iTimeSpent);
            //todo if new node(link) is not better then dont push it
            if(!bAlreadyProcessed(link)){
                nodes.push(link);
            }
            if(bNodeHasLesserValue(link)){
                replaceNodeValue(link);
            }
        }

        if (links[i][1] === sName) {
            let link = [];
            link.push(links[i][0]);
            link.push(parseInt(links[i][2]) + iTimeSpent);
            //todo if new node(link) is not better then dont push it
            if(!bAlreadyProcessed(link)){
                nodes.push(link);
            }
            if(bNodeHasLesserValue(link)){
                replaceNodeValue(link);
            }
        }
    }
    return nodes;
}

function replaceNodeValue(node){
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

rl.on('close', (input) => {
    let nodes = [["Vy", 0]];
    resultingNodes.push(nodes[0]);

    while (nodes.length > 0) {

        let node = nodes.shift();
        let newNodes = getNextNodesForName(node[0], node[1]);

        nodes = nodes.concat(newNodes);

        resultingNodes = resultingNodes.concat(newNodes);

        nodes.sort(compareTimeSpent);
    }

    resultingNodes.sort(compareTimeSpent);
    resultingNodes.forEach(function(resultNode){
        console.log(resultNode[0] +": " + resultNode[1]);
    })
});