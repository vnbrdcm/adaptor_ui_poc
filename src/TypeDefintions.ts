export enum Type {
    BOOLEAN = "boolean",
    STRING = "string",
    TIMESTAMP = "timestamp",
    FLOAT32 = "float32",
    FLOAT64 = "float64",
    INT8 = "int8",
    UINT8 = "uint8",
    INT16 = "int16",
    UINT16 = "uint16",
    INT32 = "int32",
    UINT32 = "uint32",
}

export type SimpleProperty = {
    type: Type;
};

export type ComposedProperty = {
    properties: {
        [key: string]: Property;
    }
};

export type Property = SimpleProperty | ComposedProperty;

interface TypeDefintion {
    [key: string]: Property;
}

export default TypeDefintion;
