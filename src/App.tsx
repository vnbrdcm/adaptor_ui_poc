import {Core, SingularData} from "cytoscape";
import React, {useCallback, useState} from "react";
import CytoscapeComponent from "react-cytoscapejs";
import {Props} from "./PropsDefinitions";
import typeDefinition2Cy from "./TypeDefintionConversion";

const JIRA = "Jira";
const RALLY = "Rally";

const App: React.FunctionComponent<Props> = ({jira, rally}: Props) => {

    const [
            cyRef,
            setCy
        ] = useState<Core | null>(null),

        elements = [
            ...typeDefinition2Cy(
                JIRA,
                jira
            ),
            ...typeDefinition2Cy(
                RALLY,
                rally
            )
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

                    /*
                     * This casting is necessary as there is a bug in lib's
                     * types definitions.
                     */
                    const selected: SingularData[] =
                    cyRef.$(":selected").jsons() as unknown as SingularData[];
                    /* eslint no-magic-numbers: ["error", { "ignore": [2] }]*/
                    // eslint-disable-next-line no-warning-comments
                    // FIXME: proper handling of user input.
                    if (selected && selected.length === 2) {

                        const [
                            an,
                            bn
                        ] = selected;
                        cyRef.add({
                            "data": {
                                "source": Object.getOwnPropertyDescriptor(
                                    an.data,
                                    "id"
                                )?.value,
                                "target": Object.getOwnPropertyDescriptor(
                                    bn.data,
                                    "id"
                                )?.value
                            },
                            "group": "edges"
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
                        "selector": ":parent",
                        "style": {
                            "background-color": "red",
                            "background-opacity": 0.333,
                            "text-halign": "center",
                            "text-valign": "top"
                        }
                    },
                    {
                        "selector": "edge",
                        "style": {
                            "line-color": "green",
                            "width": 3
                        }
                    }
                ]}
            />
        </div>);

};

export default App;
