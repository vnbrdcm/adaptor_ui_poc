import TypeDefintion from "./TypeDefintions";

export type NodesSelectedCb = (ids: Array<string>) => void;

export interface Connection {
    firstId: string;
    lastId: string;
}

export interface Props {
    jira: TypeDefintion;
    rally: TypeDefintion;
    mapping: Array<Connection>;
    onNodesSelected?: NodesSelectedCb;
}
