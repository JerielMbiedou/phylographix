import * as d3 from "d3";

const diagonal = d3.link(d3.curveStepBefore)
    .x(d => d.y)
    .y(d => d.x)


const viewportPadding = 10
export default {

    drawDendrogram(data, nodeSelectionCallback) {
        const duration = 50
        const root = d3.hierarchy(data);
        const dx = 10;
        const treeWidth = root.height * 100;
        const dy = treeWidth / (root.height + 1);
        //var totalNodes = 0;
        const tree = d3.cluster().nodeSize([dx, dy]);

        // root.sort((a, b) => d3.ascending(a.data.name, b.data.name));
        tree(root);

        // Center the tree.
        let x0 = Infinity;
        let x1 = -x0;
        root.each((d) => {
            if (d.x > x1) x1 = d.x;
            if (d.x < x0) x0 = d.x;
        });

        let mostBottomPoint = root.x
        let mostRight = root.y

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

        function visit(parent, visitFn, childrenFn) {
            if (!parent) return;

            visitFn(parent);

            var children = childrenFn(parent);
            if (children) {
                var count = children.length;
                for (var i = 0; i < count; i++) {
                    visit(children[i], visitFn, childrenFn);
                }
            }
        }

        // Call visit function to establish maxLabelLength
        var maxLabelLength = 0;

        visit(data, function (d) {
            //totalNodes++;
            maxLabelLength = Math.max(d.name.length, maxLabelLength);

        }, function (d) {
            return d.children && d.children.length > 0 ? d.children : null;
        });

        const height = x1 - x0 + dx * 2;

        let div = d3.select("body").append("div")
            .attr("class", "tooltip-donut")
            .style("opacity", 0);


        const svg = d3
            .select("#dendrogram")
            .append("svg")
            .attr("viewBox", [-viewportPadding, x0 - dx, treeWidth, height + 60])
            .attr("width", treeWidth)
            // .attr("height", height)
            .attr("style", "max-width: 100%; height: fit-content !important;")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10);

        function toggleNode(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
        }

        function highlight(node) {
            d3.selectAll(".link")
                .filter(function (l) {
                    return node.ancestors().find(e => e.id === l.source.id && e !== node) && node.ancestors().find(e => e.id === l.target.id)
                })
                .style("stroke", "red")
        }

        function update(source) {
            let nodes = root.descendants();
            const links = root.links();

            // Compute the new tree layout.
            tree(root);
            let i = 0;

            // Update the links.
            const link = svg.selectAll("path.link").data(links, (d) => d.target.id);

            // Enter any new links at the parent's previous position.
            const linkEnter = link
                .enter()
                .append("path")
                .attr("class", "link")
                .attr("d", () => {
                    const o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                })
                .attr("fill", "none")
                .attr("stroke", "#888888")
                .attr("stroke-width", "1.5px")
                .on("mouseover", function (d, link) {
                    highlight(link.target)
                })
                .on("mouseout", function () {
                    d3.selectAll(".link").style("stroke", '#888888')
                });


            // Transition links to their new position.
            link.merge(linkEnter).transition().duration(duration).attr("d", diagonal);

            // Transition exiting links to the parent's new position.
            link.exit().transition().duration(duration).attr("d", () => {
                const o = {x: source.x, y: source.y};
                return diagonal({source: o, target: o});
            }).remove();

            // Update the nodes.
            const node = svg.selectAll("g.node").data(nodes, (d) => d.id || (d.id = ++i));


            // from other code
            nodes.forEach(function (d) {

                d.y = (d.data._height * (maxLabelLength)); //maxLabelLength * 10px
                // alternatively to keep a fixed scale one can set a fixed depth per level
                // Normalize for fixed-depth by commenting out below line
                // d.y = (d.depth * 500); //500px per level.
            });
            // Enter any new nodes at the parent's previous position.
            const nodeEnter = node
                .enter()
                .append("g")
                .attr("class", "node cursor-pointer")
                .attr("transform", () => `translate(${source.y},${source.x})`)
                .on("mouseover", function (event, d) {
                    nodeSelectionCallback(data, d);
                    highlight(d)
                    d3.select(this).style("fill", "red");
                    //on  ouvre les détails
                    div.transition()
                        .duration(50)
                        .style("opacity", 1);
                    setTimeout(() => {
                        div.html(document.getElementById('nodeDetailViewer').outerHTML)
                            .style("left", (event.pageX + 10) + "px")
                            .style("top", (event.pageY + 15) + "px");
                    }, 500)
                })
                .on("mouseout", function (d) {
                    d3.selectAll(".link").style("stroke", '#888888')
                    d3.select(this).style("fill", "#000");
                    nodeSelectionCallback(data, d, false);
                    div.transition()
                        .duration(50)
                        .style("opacity", 0);
                })
                .on("click", (event, d) => {
                    toggleNode(d);
                    update(d);
                });

            nodeEnter
                .append("circle")
                .attr("r", 5)
                .style("fill-opacity", 0)
                .style("stroke-opacity", 0);

            nodeEnter
                .append("text")
                .attr("dy", "0.31em")
                .attr("x", (d) => (!d.children ? 12 : -6))
                .attr("text-anchor", (d) => (!d.children ? "start" : "end"))
                .text((d) => {
                    return d.children?.length ? '' : d.data.name
                })
                .clone(true)
                .lower();

            // Transition nodes to their new position.
            const nodeUpdate = node
                .merge(nodeEnter)
                .transition()
                .duration(duration)
                .attr("transform", (d) => `translate(${d.y},${d.x})`);

            nodeUpdate.select("circle").attr("r", 5).style("fill-opacity", 1).style("stroke-opacity", 1).style("z-index", 1000);

            // Transition exiting nodes to the parent's new position.
            const nodeExit = node.exit().transition().duration(duration).remove();

            nodeExit.select("circle").attr("r", 5).style("fill-opacity", 0).style("stroke-opacity", 0);


            // Create a scale for the x-axis
            const xScale = d3.scaleLinear()
                .domain([0, 1]) // Assuming height ranges from 0 to 0.5
                .range([0, mostRight]); // Inverted range


            // Stash the old positions for transition.
            root.each((d) => {
                d.x0 = d.x;
                d.y0 = d.y;
            });

            root.each((d) => {
                d.x = xScale(d.data._height); // Adjust the x position based on height
            });

            // Create the x-axis
            const xAxis = d3.axisBottom(xScale)
                .ticks(5) // Set the number of ticks
                .tickSize(5) // Set the length of the ticks
                .tickPadding(5)// Set padding between ticks and labels
                .tickFormat(d3.format(".0%"));
            // Append a group element for the x-axis
            svg.append("g")
                .attr("class", "x-axis")
                .attr("class", "position-absolute, bottom-0")
                .attr("transform", `translate(0, ${mostBottomPoint + 10})`) // Move the axis to the bottom
                .call(xAxis);
        }

        update(root);

        return svg;
    },

};
