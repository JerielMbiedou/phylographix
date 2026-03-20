import {useToast} from "vue-toastification";

const toast = useToast()

export default {
    calculatePercentageFromHeight(height) {
        const referenceHeight1 = 0;
        const referenceHeight2 = 0.5;

        const diffHeight = referenceHeight2 - referenceHeight1;
        const diffHeightGiven = height - referenceHeight1;

        const ratio = diffHeightGiven / diffHeight;
        const percentage = (1 - ratio) * 100;

        return parseFloat(percentage.toFixed(2));
    }
    ,


    convertToDendrogram: function (jsonData) {
        try {
            const nodes = jsonData[0].nodes;
            const edges = jsonData[0].edges;
            const getNodeById = (id) => nodes.find((node) => node._id === id);

            const countDescendants = (nodeId) => {
                const childEdges = edges.filter((edge) => edge._from === nodeId);
                let count = childEdges.length; // Initialiser avec le nombre d'enfants directs

                for (const edge of childEdges) {
                    count += countDescendants(edge._to); // Récursivement compter les descendants
                }

                return count;
            };

            const createChildren = (parentId) => {
                const children = [];
                const childEdges = edges.filter((edge) => edge._from === parentId);

                for (const edge of childEdges) {
                    const childNode = getNodeById(edge._to);

                    let name = ''
                    if (childNode.elements) {
                        childNode.elements.forEach((element, i) => {
                            name += element.label
                            if (i < childNode.elements.length - 1) name += ' / '
                        });
                    } else {
                        name = childNode._key
                    }
                    const create_Children = createChildren(childNode._id)
                    const descendants = countDescendants(childNode._id);
                    const child = {
                        name,
                        _height: this.calculatePercentageFromHeight(childNode.height),
                        children: create_Children,
                        childCount: descendants
                    };
                    children.push(child);
                }

                return children;
            };

            const rootId = nodes.find((node) => node.root)._id;
            const rootNode = getNodeById(rootId);

            return {
                name: "root",
                _height: this.calculatePercentageFromHeight(rootNode.height),
                children: createChildren(rootId),
                childCount: nodes.length - 1
            };

        } catch (error) {
            toast.error("The loaded file has incorrect format !")
        }
    },
};
