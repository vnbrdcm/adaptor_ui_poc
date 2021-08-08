import {Core, SingularData} from "cytoscape";
import React, {useCallback, useState} from "react";
import CytoscapeComponent from "react-cytoscapejs";
import {Props} from "./PropsDefinitions";
import typeDefinition2Cy from "./TypeDefintionConversion";

const JIRA = "Jira";
const RALLY = "Rally";

const TypesMapper: React.FunctionComponent<Props> = ({
    jira,
    rally,
    mapping,
    onNodesSelected
}: Props) => {

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
            ),
            ...mapping.map((connection) => ({
                "data": {
                    "source": connection.firstId,
                    "target": connection.lastId
                }
            }))

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
                    if (onNodesSelected) {

                        onNodesSelected(selected.
                            map((value) => Object.getOwnPropertyDescriptor(
                                value.data,
                                "id"
                            )?.value));

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

export default TypesMapper;
