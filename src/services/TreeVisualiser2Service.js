import * as d3 from "d3";
import interactions from "./TreeInteractionService"
import eventBus from "@/eventBus";

const diagonal = d3.link(d3.curveStepBefore)
    .x(d => d.y)
    .y(d => d.x)

export default {

    drawDendrogram(treeData, nodeSelectionCallback) {
        const root = d3.hierarchy(treeData, (d) => d.children);
        const overviewRoot = d3.hierarchy(treeData, (d) => d.children);
        let maxLabelLength = 0;
        let i = 0;
        let duration = 750;
        let viewerWidth = document.getElementById('dendrogram').offsetWidth;
        let viewerHeight = document.getElementById('dendrogram').offsetHeight;
        let overviewWidth = document.getElementById('dendrogramcontext').offsetWidth;
        let overviewHeight = document.getElementById('dendrogramcontext').offsetHeight;
        let overviewCursorHeight = 60
        const overviewCursorWidth = (overviewCursorHeight * viewerWidth) / viewerHeight
        const overviewScale = (overviewCursorWidth / viewerWidth, overviewCursorHeight / viewerHeight)
        let myTree = d3.cluster().size([viewerHeight, viewerWidth]);
        let myViewerTree = d3.cluster().size([overviewHeight, overviewWidth]);

        root.x0 = viewerHeight / 2;
        root.y0 = viewerWidth / 2;


        myTree(root)
        myViewerTree(overviewRoot)

        let mostBottomPoint = root.x
        let mostRight = root.y

        // Call visit function to establish maxLabelLength 
        interactions.visit(treeData, function (d) {

            maxLabelLength = Math.max(d.name.length, maxLabelLength);

        }, function (d) {
            return d.children && d.children.length > 0 ? d.children : null;
        });

        const svg = d3.select("#dendrogram")
            .append("svg")
            .attr("width", viewerWidth)
            .attr("height", viewerHeight)
            .attr("class", "overlay")

        const overviewSVG = d3.select("#dendrogramcontext")
            .append("svg")
            .attr("width", overviewWidth)
            .attr("height", overviewHeight)
            .attr("class", "overlay cursor-pointer")

        const overviewCursor = overviewSVG.append("rect")
            .attr("width", overviewCursorWidth)
            .attr("height", overviewCursorHeight)
            // .attr("x", (overviewWidth / 2))
            // .attr("y", (overviewHeight / 2))
            .attr("fill", "rgba(194,208,234,0.4)");

        overviewSVG.on("click", function (event) {
            const mouseX = event.offsetX;
            const mouseY = event.offsetY;
            const move = {
                x0: overviewCursor.attr('x'),
                y0: overviewCursor.attr('y'),
                new_x: (mouseX - overviewCursorWidth) + (overviewCursorWidth / 2),
                new_y: (mouseY - overviewCursorHeight) + (overviewCursorHeight / 2),
            }
            overviewCursor.attr("x", move.new_x);
            overviewCursor.attr("y", move.new_y);

            const transformValue = g.attr("transform") || ''
            var match = transformValue.match(/translate\(([^,]+),([^)]+)\)/);
            console.log('les valeurs: ', transformValue)
            var currentTranslateX = match ? parseFloat(match[1]) : 0;
            var currentTranslateY = match ? parseFloat(match[2]) : 0;
            const newTranslationX = (move.new_x - move.x0) * (viewerWidth / overviewCursorWidth);
            const newTranslationY = (move.new_y - move.y0) * (viewerHeight / overviewCursorHeight);
            const currentFocusTranslateState = {
                x: -(d3.zoomTransform(g.node()).x + newTranslationX) + currentTranslateX,
                y: -(d3.zoomTransform(g.node()).y + newTranslationY) + currentTranslateY
            }
            g.transition()
                .duration(duration / 2)
                .attr("transform", `translate(${currentFocusTranslateState.x}, ${currentFocusTranslateState.y})`);
        });

        const g = svg.append("g");
        svg.call(interactions.zoomBehavior(g));
        update(root);

        const overview_g = overviewSVG.append("g");
        overviewSVG.call(interactions.zoomBehavior(overview_g));
        overview_g.transition()
                    .duration(duration / 2)
                    .attr("transform", `translate(0, 0) scale(${overviewScale})`);
        overviewSVG.on(".zoom", null);

        updateOverview(overviewRoot);

        function update(source) {
            let levelWidth = [1];
            let childCount = function (level, n) {

                if (n.children && n.children.length > 0) {
                    if (levelWidth.length <= level + 1) levelWidth.push(0);

                    levelWidth[level + 1] += n.children.length;
                    n.children.forEach(function (d) {
                        childCount(level + 1, d);
                    });
                }
            };
            childCount(0, root);
            let newHeight = d3.max(levelWidth) * 100; 
            myTree = d3.cluster().size([newHeight, viewerWidth]);
            
            const nodes = myTree(root).descendants();
            const links = myTree(root).links();
            nodes.forEach(function (d) {

                d.y = (d.data._height * (maxLabelLength)); 
           
            });

            // Select all nodes and bind the data
            const nodeSelection = g
                .selectAll(".node")
                .data(nodes, (d) => d.id || (d.id = ++i));

            // Enter: Create new nodes with circles and text
            const nodeEnter = nodeSelection
                .enter()
                .append("g")
                .attr("class", "node")
                .attr("transform", () => `translate(${source.y0},${source.x0})`)
                .on("mouseover", function (event, d) {
                    interactions.highlight(d)
                    d3.select(this).style("fill", "#22c55e");
                    nodeSelectionCallback(treeData, d);

                })
                .on("mouseout", function (d) {
                    nodeSelectionCallback(treeData, d, false);
                    d3.selectAll(".link").style("stroke", '#ccc')
                    d3.select(this).style("fill", "#000");

                })
                .on("click", click)
                .on('dblclick', function (event, d) {
                    nodeSelectionCallback(treeData, d);
                })
            ;

            nodeEnter.append("circle")
                .attr("class", "nodeCircle")
                .attr("r", 0) 
                .style("fill", d => (d._children ? "lightsteelblue" : "#fff"));

            nodeEnter.append("text")
                .attr("x", () => (10))
                .attr("text-anchor", () => ("start"))
                .attr("class", "nodeText")
                .text(d => (d.children ? "" : d.data.name))
                .style("fill-opacity", 0)
                .attr("dy", "0.31em")
                .clone(true)
                .lower();


            // Update: Update existing nodes
            const nodeUpdate = nodeEnter.merge(nodeSelection).transition()
                .duration(duration)
                .attr("transform", d => `translate(${d.y},${d.x})`);

            nodeUpdate.select("circle.nodeCircle")
                .attr("r", 4.5)
                .style("fill", d => (d._children ? "#22c55e" : "#fff"));

            nodeUpdate.select("text.nodeText")
                .style("fill-opacity", 1);

            // Exit: Remove nodes that are no longer needed
            const nodeExit = nodeSelection.exit().transition()
                .duration(duration)
                .attr("transform", () => `translate(${source.y},${source.x})`)
                .remove();

            nodeExit.select("circle.nodeCircle")
                .attr("r", 0);

            nodeExit.select("text.nodeText")
                .style("fill-opacity", 0);

            // Select all links and bind the data
            const linkSelection = g
                .selectAll(".link")
                .data(links, d => d.target.id);

            // Enter: Create new links using paths
            linkSelection.enter()
                .insert("path", "g")
                .attr("class", "link")
                .attr("d", d => {
                    return diagonal({source: d.source, target: d.target});
                })
            ;

            // Update: Update existing links
            linkSelection.merge(linkSelection).transition()
                .duration(duration)
                .attr("d", diagonal);

            // Exit: Remove links that are no longer needed
            linkSelection.exit().transition()
                .duration(duration)
                .attr("d", d => {
                    const o = {x: d.source.x, y: d.source.y}; 

                    return diagonal({source, target: o});
                })
                .remove();


            // Stash old positions
            nodes.forEach(d => {
                d.y = d.data._height * (maxLabelLength);
                d.x0 = d.x;
                d.y0 = d.y;
            });

            root.each((d) => {
                mostBottomPoint = d.x > mostBottomPoint ? d.x : mostBottomPoint
                mostRight = d.y > mostRight ? d.y : mostRight
                let children = d.children;

                if (children) {
                    const minY = d3.min(d.children, (c) => c.y);
                    const maxY = d3.max(d.children, (c) => c.y);
                    const maxX = d3.max(d.children, (c) => c.x);
                    mostBottomPoint = maxX > mostBottomPoint ? maxX : mostBottomPoint
                    mostRight = maxY > mostRight ? maxY : mostRight

                    d.children.forEach((c) => {
                        mostBottomPoint = c.x > mostBottomPoint ? c.x : mostBottomPoint
                        mostRight = c.y > mostRight ? c.y : mostRight
                        if (c.children) {
                            c.y = minY;
                        }
                    });
                }
            });

            // Create a scale for the x-axis
            const xScale = d3.scaleLinear()
                .domain([0, 1]) // Assuming height ranges from 0 to 0.5
                .range([0, mostRight]); // Inverted range

            // Create the x-axis
            const xAxis = d3.axisBottom(xScale)
                .ticks(5) 
                .tickSize(5) 
                .tickPadding(5)
                .tickFormat(d3.format(".0%"));
            // Append a group element for the x-axis
            g.append("g")
                .attr("class", "x-axis")
                .attr("class", "position-absolute, bottom-0")
                .attr("transform", `translate(0, ${mostBottomPoint + 10})`) 
                .call(xAxis);

        }

        function updateOverview(source) {
          
            let levelWidth = [1];
            let childCount = function (level, n) {

                if (n.children && n.children.length > 0) {
                    if (levelWidth.length <= level + 1) levelWidth.push(0);

                    levelWidth[level + 1] += n.children.length;
                    n.children.forEach(function (d) {
                        childCount(level + 1, d);
                    });
                }
            };
            childCount(0, overviewRoot);
            let newHeight = d3.max(levelWidth) * 100; 
            myViewerTree = d3.cluster().size([newHeight, overviewWidth]);
    
            const nodes = myViewerTree(overviewRoot).descendants();
            const links = myViewerTree(overviewRoot).links();
            nodes.forEach(function (d) {

                d.y = (d.data._height * (maxLabelLength)); 
                
            });

            // Select all nodes and bind the data
            const nodeSelection = overview_g
                .selectAll(".node")
                .data(nodes, (d) => d.id || (d.id = ++i));

            // Enter: Create new nodes with circles and text
            const nodeEnter = nodeSelection
                .enter()
                .append("g")
                .attr("class", "node")
                .attr("transform", () => `translate(${source.y0},${source.x0})`)
                .on("mouseover", function (event, d) {
                    interactions.highlight(d)
                    d3.select(this).style("fill", "#22c55e");
                })
                .on("mouseout", function () {
                    d3.selectAll(".link").style("stroke", '#ccc')
                    d3.select(this).style("fill", "#000");

                })
            ;

            nodeEnter.append("circle")
                .attr("class", "nodeCircle")
                .attr("r", 0) // Start with 0 radius
                .style("fill", d => (d._children ? "lightsteelblue" : "#fff"));

            nodeEnter.append("text")
                .attr("x", () => (10))
                .attr("text-anchor", () => ("start"))
                .attr("class", "nodeText")
                .text(d => (d.children ? "" : d.data.name))
                .style("fill-opacity", 0)
                .attr("dy", "0.31em")

                .clone(true)
                .lower();


            // Update: Update existing nodes
            const nodeUpdate = nodeEnter.merge(nodeSelection).transition()
                .duration(duration)
                .attr("transform", d => `translate(${d.y},${d.x})`);

            nodeUpdate.select("circle.nodeCircle")
                .attr("r", 4.5)
                .style("fill", d => (d._children ? "#22c55e" : "#fff"));

            nodeUpdate.select("text.nodeText")
                .style("fill-opacity", 1);

            // Exit: Remove nodes that are no longer needed
            const nodeExit = nodeSelection.exit().transition()
                .duration(duration)
                .attr("transform", () => `translate(${source.y},${source.x})`)
                .remove();

            nodeExit.select("circle.nodeCircle")
                .attr("r", 0);

            nodeExit.select("text.nodeText")
                .style("fill-opacity", 0);

            // Select all links and bind the data
            const linkSelection = overview_g
                .selectAll(".link")
                .data(links, d => d.target.id);

            // Enter: Create new links using paths
            linkSelection.enter()
                .insert("path", "g")
                .attr("class", "link-overview")
                .attr("d", d => {
                    return diagonal({source: d.source, target: d.target});
                })
            ;

            // Update: Update existing links
            linkSelection.merge(linkSelection).transition()
                .duration(duration)
                .attr("d", diagonal);

            // Exit: Remove links that are no longer needed
            linkSelection.exit().transition()
                .duration(duration)
                .attr("d", d => {
                    const o = {x: d.source.x, y: d.source.y}; 

                    return diagonal({source, target: o});
                })
                .remove();


            // Stash old positions
            nodes.forEach(d => {
                d.y = d.data._height * (maxLabelLength);
                d.x0 = d.x;
                d.y0 = d.y;
            });


        }

        // Function to center node when clicked/dropped so node doesn't get lost when collapsing/moving with large amount of children.

        function click(event, d) {
            if (event.defaultPrevented) return; 
            interactions.toggleChildren(d);
            interactions.highlight(d)
            update(d);
            interactions.centerNode(d, g, viewerWidth, viewerHeight, duration, true);
        }

        eventBus.$on("search_node_selected", (searchKey) => {
            const node = interactions.searchTree(root, searchKey)
            if (node) {
                d3.selectAll(".link").style("stroke", '#ccc')

                nodeSelectionCallback(treeData, node);
                interactions.highlight(node)
                update(node);
                interactions.centerNode(node, g, viewerWidth, viewerHeight, duration);
            } else {
                console.log('not found')
            }
        });


        // Call the update function to initialize the layout
        update(root);
        updateOverview(overviewRoot);

        // interactions.centerNode(root, g, viewerWidth, viewerHeight, duration);
    }
}
