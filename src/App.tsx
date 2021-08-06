import {Core, SingularData} from "cytoscape";
import React, {useCallback, useState} from "react";
import CytoscapeComponent from "react-cytoscapejs";
import {Type} from "./TypeDefintions";
import typeDefinition2Cy from "./TypeDefintionConversion";

const App: React.FunctionComponent = () => {

    const [
            cyRef,
            setCy
        ] = useState<Core | null>(null),

        elements = typeDefinition2Cy({
            "a": {
                "properties": {
                    "b": {
                        "type": Type.STRING
                    },
                    "c": {
                        "type": Type.FLOAT32
                    }
                }
            },
            "d": {
                "type": Type.FLOAT32
            }
        }),

        initCy = useCallback(
            (cy) => {

                setCy(cy);

            },
            []
        ),
        onClick = useCallback(
            () => {

                if (cyRef !== null) {

                    /*
                     * This casting is necessary as there is a bug in lib's
                     * types definitions.
                     */
                    const selected: SingularData[] =
                    cyRef.$(":selected").jsons() as unknown as SingularData[];
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
                            "label": "data(id)",
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
