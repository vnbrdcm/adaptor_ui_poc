import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const elements = [
            { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
            { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
            { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }
        ];

        return <CytoscapeComponent layout={{ name: 'random' }} stylesheet={[
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
                    width: 1,
                    shape: 'arrow'
                }
            }
        ]} elements={elements} style={{ width: '600px', height: '600px' }} />;
    }
}
