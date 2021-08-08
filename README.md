# Object mapper (UI)

Quickly map fields of one type to another.

<img src=screencast.gif width=400 height=300 />

## Type definitions

The type of the object is defined by its `type` field (if it is a simple type) or its `properties` field (if it is a nested type). See [TypeDefinitions.ts](src/TypeDefintions.ts) for more details.

Examples of type defintions:

1. Simple type
```
{
    "type": "string",
}
```
2. Nested type
```
{
    "properties": {
        "field_1": {
            "type": "boolean"
        },
        "field_2": {
            "properties": {
                "field_3": {
                    "type": "int32"
                }
            }
        }
    }
}
```

## Usage

See [demo](https://github.com/vnbrdcm/adaptor_ui_poc/tree/VNI-readme/demo) subproject for the details.

## Run development server
```
npm install
npm run start-dev-server -- --config webpack.config.js
```