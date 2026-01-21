// Nautilus 1.0.0
// Kureichi<Kuredew> (hibikumonogatari@gmail.com)

// fix json undefined because adobe dont want to include JSON natively
#include "nautilusAssets/json2.js"

function NautilusScript(ui_ref) {
  var nautilus = {
    EXPRESSION_FOLDER: "nautilusAssets",
    effectName: "Nautilus",
    firstPresetFileObj: null,
    secondPresetFileObj: null,
    version: null,
    aboutStr: null,
    applyToCompLayers: true,
    expression: {
      defaultVariable: null,
      position: null,
      rotationX: null,
      rotationY: null,
      rotationZ: null,
      scale: null,
      opacity: null
    },
    palette: null
  };

  var utils = {
    getPathToNautilusFolder: function () {
      var folderObj = new Folder((new File($.fileName).parent).fsName + "/" + nautilus.EXPRESSION_FOLDER);
      return folderObj;
    },
    getFileObj: function (fileName) {
      var folderObj = utils.getPathToNautilusFolder();
      var fileObj = new File(folderObj.fsName + "/" + fileName)
      if (!fileObj.exists) {
        throw new Error("[getFileObj] File '" + fileName + "' is not exists in '" + nautilus.EXPRESSION_FOLDER + "' folder, please install Nautilus correctly!")
      }

      return fileObj
    },
    readFile: function(fileName) {
      var code
      var fileObj
      try {
        var fileObj = utils.getFileObj(fileName)
      } catch (e) {
        throw new Error("[readFile] " + e.message)
      }

      try {
          fileObj.open("r");
          code = fileObj.read();
      } catch (e) {
          throw new Error("[readFile] I couldn't read the nautilus expression file: " + e);
      } finally {
          fileObj.close();
      }

      return code;
    },
    replaceVersion: function(str) {
      return str.replace("VERSION", nautilus.version)
    },
    replaceExpression: function(expression, compName, nullName, effectNameList) {
      try {
        var defaultVariable = utils.replaceVersion(nautilus.expression.defaultVariable)
        if (compName) {
          defaultVariable = defaultVariable.replace("thisComp", 'comp("' + compName + '")');
        }

        if (nullName) {
          defaultVariable = defaultVariable.replace("NULL_LAYER_NAME", nullName)
        }

        if (effectNameList) {
          var finalListStr = "["
          for (var i = 0; i < effectNameList.length; i++) {
            var effectName = effectNameList[i]

            finalListStr += '"' + effectName + '"'
            if (i === (effectNameList.length - 1)) { 
              finalListStr += "]"

              break
            }
            finalListStr += ", "
          }

          defaultVariable = defaultVariable.replace("NAUTILUS_FX_NAME_LIST", finalListStr);
        }

        var finalExp = defaultVariable.replace("PROPERTY_EXPRESSION", expression)
        return finalExp
      } catch (e) {
        throw new Error("[replaceExpression] " + e.message)
      }
    },
    loadBuildInfo: function () {
      var buildInfo = JSON.parse(utils.readFile("build_info.json"));

      return buildInfo
    },
    applyExpressionToLayer: function (layer, compName, nullName, effectNameList) {
      try {
        var trProp = layer.property("Transform")

        var posProp = trProp.property("Position");
        posProp.dimensionSeparated = false;

        var RotProp = trProp.property("Rotation");
        var RotXProp = trProp.property("X Rotation");
        var RotYProp = trProp.property("Y Rotation");
        var RotZProp = trProp.property("Z Rotation");
        var SclProp = trProp.property("Scale");
        var OpcProp = trProp.property("Opacity"); 

        var executeReplaceExpression = function(expression) {
          return utils.replaceExpression(expression, compName, nullName, effectNameList);
        }

        posProp.expression = executeReplaceExpression(nautilus.expression.position)
        SclProp.expression = executeReplaceExpression(nautilus.expression.scale)
        OpcProp.expression = executeReplaceExpression(nautilus.expression.opacity)

        if (layer.threeDLayer) {
          RotXProp.expression = executeReplaceExpression(nautilus.expression.rotationX)
          RotYProp.expression = executeReplaceExpression(nautilus.expression.rotationY)
          RotZProp.expression = executeReplaceExpression(nautilus.expression.rotationZ)
        } else {
          RotProp.expression = executeReplaceExpression(nautilus.expression.rotationZ)
        }
      } catch (e) {
        throw new Error("[applyExpressionToLayer] " + e.message)
      }
    },
    createPalette: function(ui_ref) {
      try {
        nautilus.palette = (ui_ref instanceof Panel) ? ui_ref : new Window("palette", "Nautilus", undefined, {resizeable: true});
        nautilus.palette.orientation = "column"; 
        nautilus.palette.alignChildren = ["center", "center"];

        nautilus.palette.add("statictext", undefined, "Nautilus " + nautilus.version);
        var applyToCompLayers = nautilus.palette.add("checkbox", undefined, "Apply to layers in the selected comp");
        applyToCompLayers.value = nautilus.applyToCompLayers;

        var btnGroup = nautilus.palette.add("group", undefined, "ButtonGroup");

        var applyButton = btnGroup.add("button", undefined, "Apply Nautilus!");
        var helpButton = btnGroup.add("button", undefined, "?");

        nautilus.palette.onResizing = nautilus.palette.onResize = function() {
          nautilus.palette.layout.resize();
        };

        function executeFunc(func) {
          try {
            func();
          } catch (e) {
            handleError("[execute] " + e.message);
          }
        }

        applyToCompLayers.onClick = function() { nautilus.applyToCompLayers = applyToCompLayers.value }
        applyButton.onClick = function () { executeFunc(applyNautilus) }
        helpButton.onClick = function() { executeFunc(help) }

        if (nautilus.palette instanceof Window) {
          nautilus.palette.center();
          nautilus.palette.show();
        } else {
          nautilus.palette.layout.layout(true);
          nautilus.palette.layout.resize();
        }
      } catch (e) {
        throw new Error("[createPalette] " + e.message)
      }
    },
    isNautilusNull: function(layer) {
      return layer.name.includes("Nautilus CTRL")
    },
    getNautilusNull: function (selectedLayers) {
      for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i]

        if (!(layer.nullLayer)) { continue }
        if (!(utils.isNautilusNull(layer))) { continue }

        return layer
      }
    },
    applyNautilusEffect: function(ctrlNullLayer, isFirst) {
      try {
        var comp = ctrlNullLayer.containingComp
        for (var i = 0; i < comp.selectedLayers.length; i++) {
          comp.selectedLayers[i].selected = false;
        }

        for (var i = 0; i < comp.selectedLayers.length; i++) {
          comp.selectedLayers[i].selected = false;
        }

        ctrlNullLayer.selected = true

        if (isFirst) {
          ctrlNullLayer.applyPreset(nautilus.firstPresetFileObj);
        } else {
          ctrlNullLayer.applyPreset(nautilus.secondPresetFileObj);
        }
      } catch (e) {
        throw new Error("[applyNautilusEffect] " + e.message)
      }
    },
    getAllNautilusEffect: function(layer) {
      var effectsArray = []
      for (var i = 1; i <= layer.numProperties; i++) {
          var prop = layer.property(i);
          if (!(prop.matchName === "ADBE Effect Parade")) { continue }

          for (var j = 1; j <= prop.numProperties; j++) {
            var effectName = prop.property(j).name
            if (!effectName.includes(nautilus.effectName)) { continue }

            effectsArray.push(effectName);
          }
      }
      return effectsArray
    }
  };

  var help = function() {
    try {
      alert(utils.replaceVersion(nautilus.aboutStr))
    } catch (e) {
      throw new Error("[help] " + e.message)
    }
  }

  var applyNautilus = function() {
    app.beginUndoGroup("Apply Nautilus");
    try {
      var comp = app.project.activeItem;
      if (!(comp instanceof CompItem)) {
        throw new Error("Please select Composition!");
      }

      var selectedLayers = comp.selectedLayers;
      if (selectedLayers.length == 0) {
        throw new Error("Please select atleast 1 layer/CompLayer!");
      }

      var ctrlNull = utils.getNautilusNull(selectedLayers);
      if (!ctrlNull) {
        ctrlNull = comp.layers.addNull();
        ctrlNull.name = "Nautilus CTRL [" + ctrlNull.id + "]";
        utils.applyNautilusEffect(ctrlNull, true)
      } else {
        utils.applyNautilusEffect(ctrlNull, false)
      }

      var ctrlNullEffectNameList = utils.getAllNautilusEffect(ctrlNull);
      
      for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i]

        // ignore nautilus null ctrl
        if (utils.isNautilusNull(layer)) { continue }

        if (layer.source instanceof CompItem && nautilus.applyToCompLayers) {
          var innerComp = layer.source;
          for (var j = 1; j <= innerComp.numLayers; j++) {
            utils.applyExpressionToLayer(innerComp.layer(j), comp.name, ctrlNull.name, ctrlNullEffectNameList);
          }
          continue
        }

        utils.applyExpressionToLayer(layer, null, ctrlNull.name, ctrlNullEffectNameList);
      }
    } catch (e) {
      throw new Error("[applyNautilus] " + e.message)
    }

    app.endUndoGroup();
  }

  function load() {
    try {
      nautilus.firstPresetFileObj = utils.getFileObj("Nautilus.ffx")
      nautilus.secondPresetFileObj = utils.getFileObj("Nautilus2.ffx")
      nautilus.version = utils.loadBuildInfo()["nautilusVersion"]
      nautilus.aboutStr = utils.readFile("about.txt")
      nautilus.expression.defaultVariable = utils.readFile("defaultVariable.jsx");
      nautilus.expression.position = utils.readFile("position.jsx");
      nautilus.expression.rotationX = utils.readFile("rotationX.jsx");
      nautilus.expression.rotationY = utils.readFile("rotationY.jsx");
      nautilus.expression.rotationZ = utils.readFile("rotationZ.jsx");
      nautilus.expression.opacity = utils.readFile("opacity.jsx");
      nautilus.expression.scale = utils.readFile("scale.jsx");
    } catch (e) {
      throw new Error("[load] " + e.message)
    }
  }

  load()
  utils.createPalette(ui_ref);
}

function handleError(msg) {
  alert("Nautilus encountered Error! : \n" + msg + "\n\n" + "if you have a problem, please let me know by contacting me on instagram (@zeanlost)  \n\nNautilus is made by Kureichi");
}

try {
  NautilusScript(this);
} catch (e) {
  handleError(e.message)
}