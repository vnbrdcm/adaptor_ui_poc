import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import {Type} from "./TypeDefintions";

ReactDOM.render(
    <App
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
    />,
    document.getElementById("root")
);
