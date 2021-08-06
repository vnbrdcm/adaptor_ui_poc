import TypeDefintion, {Property} from "./TypeDefintions";
import {ElementDefinition} from "cytoscape";

const typeDefinition2CyImpl = (parentId: string, property: Property)
    : Array<ElementDefinition> => {

    const ret: Array<ElementDefinition> = [];
    if ("properties" in property) {

        for (const [
            name,
            prop
        ] of Object.entries(property.properties)) {

            ret.push(
                {
                    "data": {
                        "source": parentId,
                        "target": name
                    }
                },
                {
                    "data": {
                        "id": name,
                        "label": name
                    }
                },
                ...typeDefinition2CyImpl(
                    name,
                    prop
                )
            );

        }

    }

    return ret;

};

const typeDefinition2Cy = (root: string, typeDefinition: TypeDefintion)
    : Array<ElementDefinition> => {

    const ret: Array<ElementDefinition> = [];
    ret.push({
        "data": {
            "id": root,
            "label": root
        }
    });
    for (const [
        name,
        property
    ] of Object.entries(typeDefinition)) {

        ret.push(
            {
                "data": {
                    "id": name,
                    "label": name
                }
            },
            {
                "data": {
                    "source": root,
                    "target": name
                }
            },
            ...typeDefinition2CyImpl(
                name,
                property
            )
        );

    }

    return ret;

};

export default typeDefinition2Cy;
