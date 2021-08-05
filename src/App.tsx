import {Core, SingularData} from "cytoscape";
import React, {useCallback, useState} from "react";
import CytoscapeComponent from "react-cytoscapejs";

const App: React.FunctionComponent = () => {

    const [
            cyRef,
            setCy
        ] = useState<Core | null>(null),

        elements = [
            {
                "data": {
                    "id": "one",
                    "label": "Node 1"
                },
                "position": {
                    "x": 0,
                    "y": 0
                }
            },
            {
                "data": {
                    "id": "two",
                    "label": "Node 2"
                },
                "position": {
                    "x": 100,
                    "y": 0
                }
            },
            {
                "data": {
                    "label": "Edge from Node1 to Node2",
                    "source": "one",
                    "target": "two"
                }
            }
        ],

        initCy = useCallback(
            (cy) => {

                setCy(cy);

            },
            []
        ),
        onClick = useCallback(
            () => {

                if (cyRef !== null) {

                    const selected: SingularData[] =
                    cyRef.$(":selected").jsons();
                    if (selected) {

                        selected.forEach((val) => {

                            /* eslint-disable no-console */
                            console.log(Object.getOwnPropertyDescriptor(
                                val.data,
                                "id"
                            )?.value);
                            /* eslint-enable no-console */

                        });

                    }

                }

            },
            [cyRef]
        );

    return (
        <div
            onClick={onClick}
            style={{
                "display": "flex",
                "height": "600px",
                "width": "600px"
            }}
        >
            <CytoscapeComponent
                cy={initCy}
                elements={elements}
                layout={{"name": "random"}}
                style={{
                    "alignItems": "stretch",
                    "flex": 1,
                    "position": "relative"
                }}
                stylesheet={[
                    {
                        "selector": "node",
                        "style": {
                            "height": 20,
                            "width": 20
                        }
                    },
                    {
                        "selector": "edge",
                        "style": {
                            "width": 1
                        }
                    }
                ]}
            />
        </div>);

};

export default App;
