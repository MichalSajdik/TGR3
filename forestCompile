#!/usr/bin/env node

// Floydův–Warshallův

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
});

let links = []

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

function nodesListIncludesNodeInLink(nodeList, link) {
    if (nodesListIncludesFirstNodeInLink(nodeList, link) || nodesListIncludesSecondNodeInLink(nodeList, link)) {
        return true;
    }
    return false;
}

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

// getUniqueRoutes function is from from https://stackoverflow.com/questions/37579994/generate-permutations-of-javascript-array
// not a graph function so it should be okey to use it
function getUniqueRoutes(xs) {
    let ret = [];
    for (let i = 0; i < xs.length; i = i + 1) {
        let rest = getUniqueRoutes(xs.slice(0, i).concat(xs.slice(i + 1)));

        if (!rest.length) {
            ret.push([xs[i]])
        } else {
            for (let j = 0; j < rest.length; j = j + 1) {
                ret.push([xs[i]].concat(rest[j]))
            }
        }
    }
    return ret;
}

function traverseRoute(uniqueRoute) {
    let value = 0;
    for (let j = 0; j < uniqueRoute.length - 1; j++) {
        for (let i = 0; i < links.length; i++) {
            if (links[i][0] === uniqueRoute[j] && links[i][1] === uniqueRoute[j + 1]) {
                value += parseInt(links[i][2]);
            }

            if (links[i][1] === uniqueRoute[j] && links[i][0] === uniqueRoute[j + 1]) {
                value += parseInt(links[i][2]);
            }
        }
    }

    return value;
}

let routes = [];

function getRoutesFromLinks() {
    for (let i = 0; i < links.length; i++) {
        let route = [];
        route.push(links[i][0]);
        route.push(links[i][1]);
        routes.push(route);
    }
}

rl.on('close', (input) => {

    let nodeList = getUniqueNodes();
    getRoutesFromLinks();

    let uniqueRoutes = getUniqueRoutes(nodeList);

    let valueList = [];

    for (let i = 0; i < uniqueRoutes.length; i++) {
        uniqueRoutes[i].value = traverseRoute(uniqueRoutes[i])
    }

    uniqueRoutes.sort(function(a, b) {
        return a.value - b.value;
    })

    let finalString = uniqueRoutes[0][0];

    for(let i = 1 ; i < uniqueRoutes[0].length ; i++){
        finalString += " -> " + uniqueRoutes[0][i];
    }
    finalString += ": " + uniqueRoutes[0].value;
    console.log(finalString)
});