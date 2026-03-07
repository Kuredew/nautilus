import { nautilus } from "../state"
import { replaceVersion } from "./string"

// defaultVariableExpression, propertyExpression, nautilusEffectName, ownCompName, compName, nullName, effectNameList
export function replaceExpression(config) {
  try {
    const template = config.template
    if (!template) throw new Error("Template Expression is required to replace expression")

    let expression = template
    if (nautilus.applyToCompLayers) {
      expression = expression.replace("IS_LEGACY", "false")
    } else {
      expression = expression.replace("IS_LEGACY", "true")
    }
    if (config.nautilusEffectName) {
      expression = expression.replace("NAUTILUS_FX_NAME", config.nautilusEffectName)
    }
    if (config.compName) {
      expression = expression.replace("thisComp", 'comp("' + config.compName + '")');
    }
    if (config.nullName) {
      expression = expression.replace("NULL_LAYER_NAME", config.nullName)
    }
    if (config.effectNameList) {
      let finalListStr = "["
      config.effectNameList.map((effectName, index) => {
        finalListStr += '"' + effectName + '"'
        if (index !== config.effectNameList.length - 1) {
          finalListStr += ", "
        }
      })

      finalListStr += "]"

      expression = expression.replace("NAUTILUS_FX_NAME_LIST", finalListStr);
    }
    if (config.ownCompName) {
      defaultVariable = expression.replace("OWN_COMP_NAME", config.ownCompName)
    }

    expression = replaceVersion(expression)
    expression = expression.replace("PROPERTY_EXPRESSION", config.propertyExpression)

    return expression
  } catch (e) {
    throw new Error("[replaceExpression] " + e.message)
  }
}


