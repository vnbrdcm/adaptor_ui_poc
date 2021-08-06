import { expect } from "chai";
import "mocha";
import typeDefinition2Cy from "../src/TypeDefintionConversion";
import { Type } from "../src/TypeDefintions";

describe("typeDefinition2Cy", () => {
    describe("should", () => {
        it("process type definition with no properties", () => {
            const out = typeDefinition2Cy({});
            // root element is always there
            expect(out).to.have.lengthOf(1);
        });
        it("process type definition with one simple properties", () => {
            const out = typeDefinition2Cy({
                a: {
                    type: Type.STRING
                }
            });

            expect(out).to.have.lengthOf(3);
        });
        it("process type definition with several simple properties", () => {
            const out = typeDefinition2Cy({
                a: {
                    type: Type.STRING
                },
                b: {
                    type: Type.BOOLEAN
                },
            });

            expect(out).to.have.lengthOf(5);
        });
        it("process type definition with composed properties", () => {
            const out = typeDefinition2Cy({
                a: {
                    properties: {
                        b: {
                            type: Type.STRING
                        }
                    }
                }
            });

            expect(out).to.have.lengthOf(5);
        });
    });
});