import React, {useCallback, useReducer} from "react";
import {Connection, Type, TypesMapper} from "@krjakbrjak/poc";
import ReactDOM from "react-dom";

const ADD_CONNECTION = "add_connection";

interface State {
    mapping: Array<Connection>;
}

interface Action {
    type: string;
    connection: Connection;
}

const initialState: State = {"mapping": []};

const reducer = (state: State, action: Action): State => {

    switch (action.type) {

    case ADD_CONNECTION:
        return {
            "mapping": [
                ...state.mapping,
                action.connection
            ]
        };
    default:
        throw new Error();

    }

};

const TestApp: React.FunctionComponent = () => {

    const [
        state,
        dispatcher
    ] = useReducer(
        reducer,
        initialState
    );

    const updateMapping = useCallback(
        (nodes: Array<string>) => {


            /* eslint no-magic-numbers: ["error", { "ignore": [2] }]*/
            // eslint-disable-next-line no-warning-comments
            // FIXME: proper handling of user input.
            if (nodes && nodes.length === 2) {

                const [
                    an,
                    bn
                ] = nodes;

                dispatcher({
                    "connection": {
                        "firstId": an,
                        "lastId": bn
                    },
                    "type": ADD_CONNECTION
                });

            }

        },
        []
    );

    return (
        <TypesMapper
            jira={
                {
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
                }
            }
            mapping={state.mapping}
            onNodesSelected={updateMapping}
            rally={
                {
                    "a*": {
                        "properties": {
                            "b*": {
                                "type": Type.STRING
                            },
                            "c*": {
                                "type": Type.FLOAT32
                            }
                        }
                    },
                    "d*": {
                        "type": Type.FLOAT32
                    }
                }
            }
        />
    );

};

ReactDOM.render(
    <TestApp />,
    document.getElementById("root")
);
