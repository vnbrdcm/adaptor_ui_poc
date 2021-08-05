import { Core, SingularData } from 'cytoscape';
import React, { useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

export default function App() {
    const [count, setCount] = useState(0);
    const [cyRef, setCy] = useState<Core | null>(null);
    const elements = [
        { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
        { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
        { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
    ];

    return <div onClick={() => {
        if (cyRef != null) {
            const selected: SingularData[] = cyRef.$(':selected').jsons();
            //const selected = cyRef.$(':selected').jsons().map((el) => JSON.parse(el));
            if (selected) {
                selected.forEach((val) => console.log(Object.getOwnPropertyDescriptor(val.data, "id")?.value));
            }
        }
    }} style={{ display: 'flex', width: '600px', height: '600px' }}>
        <CytoscapeComponent cy={(cy) => {setCy(cy)}} layout={{ name: 'random' }} stylesheet={[
            {
                selector: 'node',
                style: {
                    width: 20,
                    height: 20,
                }
            },
            {
                selector: 'edge',
                style: {
                    width: 1
                }
            }
        ]} elements={elements} style={{
            position: "relative",
            flex: 1,
            alignItems: "stretch"
        }} />
    </div>;
}
