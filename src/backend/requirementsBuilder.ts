import { ModuleRequirements, GeneralRequirements, Requirements } from "../types";
import * as generalRequirementsData from "../../scripts/data/generalRequirements.json" assert {type: "json"};

export function buildRequirements(moduleRequirements: ModuleRequirements): Requirements {
    console.log(generalRequirementsData)
    var requirements: Requirements = {} as Requirements;
    var generalRequirements: GeneralRequirements = {} as GeneralRequirements;
    
    // Check if module is an Engineering module
    if (moduleRequirements.moduleName.includes("ENGINEERING")) {
        // Loop through generalRequirementsData and find the correct
        // generalRequirements object for the given Engineering module
        for (const item of generalRequirementsData) {
            if (item.moduleName === moduleRequirements.moduleName) {
                generalRequirements = item;
            }
        }
    } else {
        // If not an Engineering module, set generalRequirements to first 
        // item in generalRequirementsData, which is the "General" module
        generalRequirements = generalRequirementsData[0];
    }

    requirements.moduleRequirements = moduleRequirements;
    requirements.generalRequirements = generalRequirements;

    return requirements;
}