import * as d3 from "d3";
import eventBus from "@/eventBus";

function calculateInvertScale(scale) {
    if (scale == 1) return 1
    if(scale<1) return -20/9 * scale + 29/9;
    if (scale>1) return  -9/20 * scale + 29/20;
}

export default {

    handleNodeSelection(data, node, opened = true) {
        eventBus.$emit('node_selected', node, opened)
    },

    // Zooming and Panning
    enableZoomAndPan(svg) {
        const zoom = d3.zoom().on("zoom", (event) => {
            svg.attr("transform", event.transform);
        });

        svg.call(zoom);
    },

    disableZoomAndPan(svg) {
        // Remove any existing zoom behavior
        const zoom = d3.zoom().on("zoom", null);
        svg.call(zoom);
    },

    zoomIn(svg) {
        const g = d3.select('g')
        g.transition().duration(200).call(this.zoomBehavior(g).scaleBy, 1.2);
    },

    zoomOut(svg) {
        const g = d3.select('g')
        g.transition().duration(200).call(this.zoomBehavior(g).scaleBy, 0.8);
    },

    reCenter(svg, htmlSVG) {
        const g = d3.select('g')
        g.transition().duration(200).call(this.zoomBehavior(g).scaleTo, 1);


        g.transition().duration(200).call(this.zoomBehavior(g).translateTo, 0.5 * htmlSVG.getAttribute("width"), 0.5 * htmlSVG.getAttribute("height"));
    },

    zoomBehavior: (g) => d3.zoom().scaleExtent([0.1, 3]).on("zoom", function () {
        g.attr("transform", d3.zoomTransform(this));
        // g.attr("transform", event?.toElement?.__zoom || event.transform);
    }),

    centerNode(source, g, viewerWidth, viewerHeight, duration, updateCursor = false) {
        const scale = d3.zoomTransform(g.node()).k;
        const x = -source.y0;
        const y = -source.x0;
        const transformedX = x * scale + viewerWidth / 2;
        const transformedY = y * scale + viewerHeight / 2;

        const transformValue = g.attr("transform") || ''
        var match = transformValue.match(/translate\(([^,]+),([^)]+)\)/);
        var currentTranslateX = match ? parseFloat(match[1]) : 0;
        var currentTranslateY = match ? parseFloat(match[2]) : 0;
        console.log('les coor', source)
        g.transition()
            .duration(duration)
            .attr("transform", `translate(${transformedX}, ${transformedY}) scale(${scale})`);

        if (updateCursor) setTimeout(() => {
            const transformEndValue = g.attr("transform") || ''
            var match = transformEndValue.match(/translate\(([^,]+),([^)]+)\)/);
            var NextTranslateX = match ? parseFloat(match[1]) : 0;
            var NextTranslateY = match ? parseFloat(match[2]) : 0;
            console.log('vars:', NextTranslateX, NextTranslateY)
            console.log('vars:', currentTranslateX, currentTranslateY)
            const move = {
                x: NextTranslateX - currentTranslateX,
                y: NextTranslateY - currentTranslateY,
            }
            // return { transformedX, transformedY, scale }
            this.moveOverviewCursor(move, scale)
        }, duration + 100)
        // interactions.zoomBehavior(g).scaleTo(g, scale);
        // interactions.zoomBehavior(g).translateTo(g, transformedX, transformedY);
    },

    moveOverviewCursor: (moveVector, scale) => {

        scale = moveVector?.k ? moveVector?.k :
                scale ? scale : null
        console.log('the move: ',  moveVector.k)
        const cursor = d3.select("#dendrogramcontext rect")
        const cursorOptions = {
            w: cursor.attr('width'),
            h: cursor.attr('height'),
            x: cursor.attr('x'),
            y: cursor.attr('y'),
        }
        const detailOptions = {
            w: document.getElementById('dendrogram').offsetWidth,
            h: document.getElementById('dendrogram').offsetHeight,
        }
        const newX = cursorOptions.x  -(moveVector?.x) * (cursorOptions.w / detailOptions.w)
        const newY =cursorOptions.y  -(moveVector?.y) * (cursorOptions.h / detailOptions.h)

        scale = calculateInvertScale(scale)

        // scale = k - scale
 
        console.log('on a : ', scale)
        cursor.attr("x", newX);
        cursor.attr("y", newY);

        if(scale) {
            cursor.transition()
                    .duration(200)
                    .attr("transform", `scale(${scale})`);
        }

        // cursor.transition()
        //     .duration(200)
        //     .attr("transform", `translate(${newX}, ${newY})`);
        // console.log('cursor: ', cursorOptions)
        // console.log('detail: ', detailOptions)
        // console.log('vars:', moveVector, scale)
        // console.log('move:', newX, newY)
    },

    highlight: (node) => {
        d3.selectAll(".link")
            .filter(function (l) {
                return node.ancestors().find(e => e.id === l.source.id && e !== node) && node.ancestors().find(e => e.id === l.target.id)
            })
            .style("stroke", "#22c55e")
    },

    toggleChildren(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else if (d._children) {
            d.children = d._children;
            d._children = null;
        }
        return d;
    },

    visit(parent, visitFn, childrenFn) {
        if (!parent) return;

        visitFn(parent);

        let children = childrenFn(parent);
        if (children) {
            let count = children.length;
            for (let i = 0; i < count; i++) {
                this.visit(children[i], visitFn, childrenFn);
            }
        }
    },

    searchTree(node, targetValue) {
        if (node.data.name === targetValue) {
            return node; // Found the node
        } else if (node.children) {
            // Recursively search children
            for (const child of node.children) {
                const result = this.searchTree(child, targetValue);
                if (result) {
                    return result; // Node found in a child subtree
                }
            }
        }
        return null; // Node not found in this subtree
    }

};

