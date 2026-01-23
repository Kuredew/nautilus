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
    replaceExpression: function(expression, ownCompName, compName, nullName, effectNameList) {
      try {
        var defaultVariable = utils.replaceVersion(nautilus.expression.defaultVariable)

        if (nautilus.applyToCompLayers) {
          defaultVariable = defaultVariable.replace("IS_LEGACY", "false")
        } else {
          defaultVariable = defaultVariable.replace("IS_LEGACY", "true")
        }

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

        if (ownCompName) {
          defaultVariable = defaultVariable.replace("OWN_COMP_NAME", ownCompName)
        }

        var finalExp = defaultVariable.replace("PROPERTY_EXPRESSION", expression)
        return finalExp
      } catch (e) {
        throw new Error("[replaceExpression] " + e.message)
      }
    },
    loadBuildInfo: function () {
      var buildInfo = JSON.parse(utils.readFile("package.json"));

      return buildInfo
    },
    applyExpressionToLayer: function (layer, ownCompName, compName, nullName, effectNameList) {
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
          return utils.replaceExpression(expression, ownCompName, compName, nullName, effectNameList);
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
        var legacyMode = nautilus.palette.add("checkbox", undefined, "Legacy Mode?");
        legacyMode.value = !nautilus.applyToCompLayers;

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

        legacyMode.onClick = function() { 
          nautilus.applyToCompLayers = !legacyMode.value 
          if (legacyMode.value) {
            alert("This mode is deprecated! \n\nThis checkbox was previously 'Apply to layers in the selected comp,' which enabled Nautilus to apply expressions to all layers within the selected precomp/comp.\n\nBut now that mode is the default for Nautilus, and the previous default Nautilus mode is marked as deprecated and called 'legacy mode.'\n\nThis is due to performance issues, and finding layer indexes can be very difficult in that mode.\n\nIn this mode, most animation functions are broken, and only the mask path feature works (this is beneficial for those who want to use the mask path position feature without animation and don't want to use precomp).")
          }
        }
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
    // deprecated
    isNautilusNull: function(layer) {
      return layer.name.includes("Nautilus CTRL")
    },
    getNautilusCtrl: function (selectedLayers) {
      for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i]

        if (!nautilus.applyToCompLayers) {
          // deprecated
          if (!(layer.nullLayer)) { continue }
          if (!(utils.isNautilusNull(layer))) { continue }

        } else {
          if (!(layer instanceof CompItem)) {

          }
        }

        return layer
      }
    },
    // deprecated
    createNullCtrl: function(selectedLayers) {
      try {
        var comp = selectedLayers[0].containingComp

        var ctrlLayer = comp.layers.addNull();
        ctrlLayer.name = "Nautilus CTRL [" + ctrlLayer.id + "]";

        var indexArray = []
        for (var i = 0; i < selectedLayers.length; i++) {
          var layer = selectedLayers[i]
          indexArray.push(layer.index)
        }

        var lowestIndex = indexArray[0]
        for (var i = 0; i < indexArray.length; i++) {
          if (indexArray[i] < lowestIndex) {
            lowestIndex = indexArray[i]
          }
        }

        ctrlLayer.moveBefore(comp.layer(lowestIndex))
        return ctrlLayer
      } catch (e) {
        throw new Error("[createNullCtrl] " + e.message)
      }
    },
    applyNautilusEffect: function(ctrlLayer) {
      try {
        var comp = ctrlLayer.containingComp
        for (var i = 0; i < comp.selectedLayers.length; i++) {
          comp.selectedLayers[i].selected = false;
        }

        for (var i = 0; i < comp.selectedLayers.length; i++) {
          comp.selectedLayers[i].selected = false;
        }

        ctrlLayer.selected = true

        var ctrlLayerEffectNameList = utils.getAllNautilusEffect(ctrlLayer);

        if (ctrlLayerEffectNameList.length === 0 && nautilus.applyToCompLayers) {
          ctrlLayer.applyPreset(nautilus.firstPresetFileObj);
        } else {
          ctrlLayer.applyPreset(nautilus.secondPresetFileObj);
        }

        return utils.getAllNautilusEffect(ctrlLayer)
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

      var ctrlLayer
      var ctrlLayerEffectNameList
      if (!nautilus.applyToCompLayers) {
        var ctrlLayer = utils.getNautilusCtrl(selectedLayers);
        if (!ctrlLayer) {
          ctrlLayer = utils.createNullCtrl(selectedLayers)
        }

        utils.applyNautilusEffect(ctrlLayer)
        ctrlLayerEffectNameList = utils.getAllNautilusEffect(ctrlLayer)
      }

      
      for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i]

        // ignore nautilus null ctrl
        if (utils.isNautilusNull(layer)) { continue }

        if (nautilus.applyToCompLayers) {
          if (!(layer.source instanceof CompItem)) {
            alert("Layer '" + layer.name + "'" +  " skipped because this layer is not instance of preComp/Comp Layer")
            continue
          }

          ctrlLayer = layer

          utils.applyNautilusEffect(ctrlLayer)
          ctrlLayerEffectNameList = utils.getAllNautilusEffect(ctrlLayer)

          var innerComp = layer.source;
          for (var j = 1; j <= innerComp.numLayers; j++) {
            utils.applyExpressionToLayer(innerComp.layer(j), layer.name, comp.name, ctrlLayer.name, ctrlLayerEffectNameList);
          }
          continue
        }

        if (!nautilus.applyToCompLayers) {
          utils.applyExpressionToLayer(layer, null, null, ctrlLayer.name, ctrlLayerEffectNameList);
        }
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
      nautilus.version = utils.loadBuildInfo()["version"]
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
