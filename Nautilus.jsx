// Nautilus Project
// Kureichi<Kuredew> (hibikumonogatari@gmail.com)

// fix json undefined because adobe dont want to include JSON natively
#include "nautilusAssets/json2.js"

function NautilusScript(ui_ref) {
  var nautilus = {
    EXPRESSION_FOLDER: "nautilusAssets",
    mode: "text",
    effectName: "Nautilus",
    nautiFlowEffectName: "NautiFlow",
    firstPresetFileObj: null,
    secondPresetFileObj: null,
    nautiFlowPresetFileObj: null,
    version: null,
    aboutStr: null,
    applyToCompLayers: true,
    expression: {
      text: {
        defaultVariable: null,
        trackingMaskValue: null,
        trackingMask: null,
        position: null,
        positionValue: null,
        positionMask: null,
        positionMaskValue: null,
        rotation: null,
        rotationValue: null,
        rotationMask: null,
        rotationMaskValue: null,
        scale: null,
        scaleValue: null,
        scaleMask: null,
        scaleMaskValue: null,
        opacity: null,
      },
      defaultVariable: null,
      position: null,
      rotationX: null,
      rotationY: null,
      rotationZ: null,
      scale: null,
      opacity: null
    },
    icons: {
      text: null,
      comp: null,
      about: null,
      extract: null,
      apply: null,
      basedOn: null,
      remove: null
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
    replaceExpression: function(defaultVariableExpression, propertyExpression, nautilusEffectName, ownCompName, compName, nullName, effectNameList) {
      try {
        var defaultVariable = defaultVariableExpression
        if (!defaultVariable) throw new Error("Default Variable Expression is required to replace expression")

        if (nautilus.applyToCompLayers) {
          defaultVariable = defaultVariable.replace("IS_LEGACY", "false")
        } else {
          defaultVariable = defaultVariable.replace("IS_LEGACY", "true")
        }

        if (nautilusEffectName) {
          defaultVariable = defaultVariable.replace("NAUTILUS_FX_NAME", nautilusEffectName)
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

        defaultVariable = utils.replaceVersion(defaultVariable)

        var finalExp = defaultVariable.replace("PROPERTY_EXPRESSION", propertyExpression)
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
          return utils.replaceExpression(
            nautilus.expression.defaultVariable, 
            expression, 
            null, 
            ownCompName, 
            compName, 
            nullName, 
            effectNameList
          );
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
    clearExpressionFromLayer: function(layer) {
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

        posProp.expression = ""
        SclProp.expression = ""
        OpcProp.expression = ""

        if (layer.threeDLayer) {
          RotXProp.expression = ""
          RotYProp.expression = ""
          RotZProp.expression = ""
        } else {
          RotProp.expression = ""
        }
      } catch (e) {
        throw new Error("[clearExpressionFromLayer] " + e.message)
      }

    },
    createPalette: function(ui_ref) {
      try {
        nautilus.palette = (ui_ref instanceof Panel) ? ui_ref : new Window("palette", "Nautilus", undefined, {resizeable: true});
        nautilus.palette.orientation = "column"; 
        nautilus.palette.alignChildren = ["center", "center"];
        // nautilus.palette.spacing = 10
        nautilus.palette.margins = 5


        var mainPanel = nautilus.palette.add("panel", undefined, "Nautilus " + nautilus.version);
        var legacyMode = mainPanel.add("checkbox", undefined, "Legacy Mode?");
        legacyMode.value = !nautilus.applyToCompLayers;
        legacyMode.helpTip = "Activate legacy mode"

        var btnGroup = mainPanel.add("group", undefined, "ButtonGroup");
        btnGroup.orientation = "row"

        var applyButton = btnGroup.add("iconbutton", undefined, nautilus.icons.apply);
        applyButton.helpTip = "Apply Nautilus"
        var changeModeButton = btnGroup.add("iconbutton", undefined, nautilus.icons.text);
        var textModeTip = "Apply Nautilus to Text Layer"
        var compModeTip = "Apply Nautilus to Comp/Precomp Layer"
        changeModeButton.helpTip = textModeTip

        var basedOnButton = btnGroup.add("iconbutton", undefined, nautilus.icons.basedOn);
        basedOnButton.helpTip = "Change Based On text animator\n(Please note this only works for text layer)"
        var removeButton = btnGroup.add("iconbutton", undefined, nautilus.icons.remove);
        removeButton.helpTip = "Remove Nautilus from Text/Comp/Precomp Layer"

        var extractButton = btnGroup.add("iconbutton", undefined, nautilus.icons.extract);
        extractButton.helpTip = "Extract letter from text layer into PreComp"

        var helpButton = btnGroup.add("iconbutton", undefined, nautilus.icons.about);
        helpButton.helpTip = "About Nautilus"

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
        
        function resetButton(button) {
          button.active = true
          button.active = false
        }

        legacyMode.onClick = function() { 
          nautilus.applyToCompLayers = !legacyMode.value 
          if (legacyMode.value) {
            alert("This mode is deprecated! \n\nThis checkbox was previously 'Apply to layers in the selected comp,' which enabled Nautilus to apply expressions to all layers within the selected precomp/comp.\n\nBut now that mode is the default for Nautilus, and the previous default Nautilus mode is marked as deprecated and called 'legacy mode.'\n\nThis is due to performance issues, and finding layer indexes can be very difficult in that mode.\n\nIn this mode, most animation functions are broken, and only the mask path feature works (this is beneficial for those who want to use the mask path position feature without animation and don't want to use precomp).")
          }

          resetButton(this)
        }
        applyButton.onClick = function () { 
          if (nautilus.mode == "text") {
            executeFunc(applyText) 
          } else if (nautilus.mode == "comp") {
            executeFunc(applyLayer)
          }

          resetButton(this)
        }
        changeModeButton.onClick = function () { 
          var finalMode
          if (nautilus.mode == "text") {
            finalMode = "comp"
            this.helpTip = compModeTip
            basedOnButton.enabled = false
          } else if (nautilus.mode == "comp") {
            finalMode = "text"
            this.helpTip = textModeTip
            basedOnButton.enabled = true
          }

            
          this.image = nautilus.icons[finalMode]
          nautilus.mode = finalMode

          resetButton(this)
        }
        basedOnButton.onClick = function () {
          nautilus.basedOnPanel = new Window("palette", "Based On", undefined, { resizeable: true })
          nautilus.basedOnPanel.alignChildren = ["fill", "center"]

          var executeBasedOn = function(basedOnIndex) {
            try {
              changeBasedOn(basedOnIndex)
              nautilus.basedOnPanel.close()
            } catch (e) {
              handleError("[executeBasedOn] " + e.message)
            }
          }

          // Create button
          var characterButton = nautilus.basedOnPanel.add("button", undefined, "Character")
          characterButton.onClick = function () { executeBasedOn(1) }

          var characterSpacelessButton = nautilus.basedOnPanel.add("button", undefined, "Character Spaceless")
          characterSpacelessButton.onClick = function () { executeBasedOn(2) }

          var wordsButton = nautilus.basedOnPanel.add("button", undefined, "Words")
          wordsButton.onClick = function () { executeBasedOn(3) }

          var linesButton = nautilus.basedOnPanel.add("button", undefined, "Lines")
          linesButton.onClick = function () { executeBasedOn(4) }

          nautilus.basedOnPanel.add("statictext", undefined, "Dont forget to select Nautilus/NautiFlow effect first.")

          // Show window
          nautilus.basedOnPanel.center()
          nautilus.basedOnPanel.show()

          resetButton(this)
        }

        removeButton.onClick = function () { executeFunc(removeNautilus); resetButton(this) }
        extractButton.onClick = function() { executeFunc(extract); resetButton(this) }
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
    createDialog: function(title, text) {
      nautilus.dialog = new Window("dialog", title, undefined, {resizeable: true})
      nautilus.dialog.spacing = 10
      nautilus.dialog.margin = 0
      nautilus.dialog.alignChildren = ["left", "left"]

      nautilus.dialog.add("statictext", undefined, text, {multiline: true})
      var button = nautilus.dialog.add("button", undefined, "Okay")
      button.alignment = ["right", "right"]

      button.onClick = function() { nautilus.dialog.close() }

      nautilus.dialog.onResize = function() { nautilus.dialog.layout.resize() }

      nautilus.dialog.center()
      nautilus.dialog.show()
    },
    getCompItem: function() {
      var comp = app.project.activeItem;
      if (!(comp instanceof CompItem)) {
        throw new Error("[getCompItem] Please select Composition!");
      }

      return comp
    },
    getSelectedLayer: function() {
      var comp = utils.getCompItem()

      var selectedLayers = comp.selectedLayers;
      if (selectedLayers.length == 0) {
        throw new Error("[getSelectedLayer] Please select atleast 1 layer!");
      }

      return selectedLayers
    },
    isTextLayer: function(layer) {
      try {
        var dummyVar = layer.text.sourceText; 
        return true;
      } catch (e) {
        return false;
      }
    },
    // deprecated
    isNautilusNull: function(layer) {
      return layer.name.indexOf("Nautilus CTRL") !== -1
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
    getAllEffectName: function(layer, effectName) {
      var effectsArray = []
      for (var i = 1; i <= layer.numProperties; i++) {
          var prop = layer.property(i);
          if (!(prop.matchName === "ADBE Effect Parade")) { continue }

          for (var j = 1; j <= prop.numProperties; j++) {
            var effectName = prop.property(j).name
            if (effectName.indexOf(effectName) === -1) { continue }

            effectsArray.push(effectName);
          }
      }
      return effectsArray
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
      return utils.getAllEffectName(layer, nautilus.effectName)
    },
    isNautilusEffect: function(property) {
      return property.name.indexOf(nautilus.effectName) !== -1
    },
    applyNautiFLowEffect: function(layer) {
      try {
        layer.applyPreset(nautilus.nautiFlowPresetFileObj);
      } catch (e) {
        throw new Error("[applyNautiFlowEffect] " + e.message)
      }
    },
    getAllNautiFlowEffect: function(layer) {
      return utils.getAllEffectName(layer, nautilus.nautiFlowEffectName)
    },
    precomposeLayers: function(layerIndices, name, inPoint, outPoint) {
      try {
        var comp = utils.getCompItem()

        var preComp = comp.layers.precompose(
          layerIndices,
          name
        );

        preComp.duration = outPoint - inPoint
        for (var j = 1; j <= preComp.numLayers; j++) {
          preComp.layer(j).startTime -= inPoint;
        }

        comp.selectedLayers[0].startTime = inPoint;
      } catch (e) {
        throw new Error("[precomposeLayers] " + e.message)
      }

    },
  };

  var help = function() {
    try {
      utils.createDialog("About", utils.replaceVersion(nautilus.aboutStr))
    } catch (e) {
      throw new Error("[help] " + e.message)
    }
  }

  var applyLayer = function() {
    app.beginUndoGroup("Apply Nautilus");
    try {
      var comp = utils.getCompItem()

      var selectedLayers = utils.getSelectedLayer();

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
      throw new Error("[applyLayer] " + e.message)
    }

    app.endUndoGroup();
  }


  var applyText = function() {
    app.beginUndoGroup("Apply Nautilus");

    var addTextAnimator = function(name, layer, propertyType, selectorExpression, valueExpression) {
      try {
        var textProp = layer.property("ADBE Text Properties")
        var animators = textProp.property("ADBE Text Animators")
        var animatorGroup = animators.addProperty("ADBE Text Animator");
        animatorGroup.name = name

        var propGroup = animatorGroup.property("ADBE Text Animator Properties");

        if (propertyType === "position") matchName = "ADBE Text Position 3D"
        else if (propertyType === "rotation") matchName = "ADBE Text Rotation"
        else if (propertyType === "opacity") matchName = "ADBE Text Opacity"
        else if (propertyType === "scale") matchName = "ADBE Text Scale 3D"
        else if (propertyType === "tracking") matchName = "ADBE Text Tracking Amount"

        // stop if matchname not found
        if (matchName === "") {
          return
        }

        // Add Property based on PropertyType
        var valueProperty = propGroup.addProperty(matchName);

        // add expression to valueProperty if not opacity
        if (valueExpression && propertyType !== "opacity") {
          valueProperty.expression = valueExpression
        } else {
          // set value to 0 if opacity
          valueProperty.setValue(0)
        }

        var selectorGroup = animatorGroup.property("ADBE Text Selectors");
        var expSelector = selectorGroup.addProperty("ADBE Text Expressible Selector");
        
        if (selectorExpression) {
          expSelector.property(2).expression = selectorExpression
        }
      } catch (e) {
        throw new Error("[addTextAnimatorGroup] " + e.message)
      }
    }

    var getExpression = function(propertyExpression, nautilusEffectName, isPropertyValue) {
      var defaultVariable = nautilus.expression.text.defaultVariable

      if (isPropertyValue) {
        defaultVariable = "var ctrlFx = effect('" + nautilusEffectName + "');\n\nPROPERTY_EXPRESSION"
      }

      return utils.replaceExpression(
        defaultVariable,
        propertyExpression,
        nautilusEffectName,
      );
    }

    var getMaskExpression = function(propertyExpression, nautiFlowEffectName) {
      if (!propertyExpression) return ""

      return propertyExpression.replace("NAUTIFLOW_FX_NAME", nautiFlowEffectName)
    }

    try {
      var selectedLayers = utils.getSelectedLayer();
     
      for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i]
        if (!utils.isTextLayer(layer)) {
          alert("Layer '" + layer.name + "'" +  " skipped because this layer is not text layer!")
          continue
        }

        utils.applyNautilusEffect(layer)
        var nautilusEffectList = utils.getAllNautilusEffect(layer)
        var lastNautilusEffectName = nautilusEffectList[nautilusEffectList.length - 1]

        var lastNautiFlowEffectName
        var addAnimatorMaskUtil = function(name, propertyType) {
          addTextAnimator(
            name, 
            layer, 
            propertyType, 
            getMaskExpression(nautilus.expression.text[propertyType + "Mask"], lastNautiFlowEffectName), 
            nautilus.expression.text[propertyType + "MaskValue"]
          )
        }

        var addAnimatorUtil = function(name, propertyType) {
          addTextAnimator(
            name, 
            layer, 
            propertyType, 
            getExpression(nautilus.expression.text[propertyType], lastNautilusEffectName), 
            getExpression(nautilus.expression.text[propertyType + "Value"], lastNautilusEffectName, true)
          )
        }

        if (nautilusEffectList.length === 1) {
          utils.applyNautiFLowEffect(layer)
          var nautiFlowEffectList = utils.getAllNautiFlowEffect(layer)
          lastNautiFlowEffectName = nautiFlowEffectList[nautiFlowEffectList.length - 1]

          addAnimatorMaskUtil("NAUTILUS_MASK_POS", "position")
          addAnimatorMaskUtil("NAUTILUS_MASK_ROT", "rotation")
          addAnimatorMaskUtil("NAUTILUS_MASK_SCL", "scale")
          addAnimatorMaskUtil("NAUTILUS_TRACKING", "tracking")
        }

        addAnimatorUtil("NAUTILUS_POS", "position")
        addAnimatorUtil("NAUTILUS_ROT", "rotation")
        addAnimatorUtil("NAUTILUS_SCL", "scale")
        addAnimatorUtil("NAUTILUS_OPACITY", "opacity")
      }
    } catch (e) {
      throw new Error("[applyText] " + e.message)
    }

    app.executeCommand(2387);
    app.endUndoGroup();
  }

  var changeBasedOn = function(basedOnIndex) {
    app.beginUndoGroup("changeBasedOn")

    try {
      var selectedLayers = utils.getSelectedLayer()

      for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i]

        var selectedEffect = layer.selectedProperties
        if (selectedEffect.length === 0) {
          throw new Error("Please select atleast one Nautilus Effect!")
        }

        for (var j = 0; j < selectedEffect.length; j++) {
          var effect = selectedEffect[j]

          var textProp = layer.property("ADBE Text Properties")
          var animatorsGroup = textProp.property("ADBE Text Animators")

          for (var k = 1; k <= animatorsGroup.numProperties; k++) {
            var animator = animatorsGroup.property(k)
            var selectorGroup = animator.property("ADBE Text Selectors")
            var selectorExpression = selectorGroup.property("ADBE Text Expressible Selector")
            var selectorExpressionAmount = selectorExpression.property(2)

            if (selectorExpressionAmount.expression.indexOf('("' + effect.name + '")') === -1) { continue }

            var selectorExpressionBasedOn = selectorExpression.property(1)
            selectorExpressionBasedOn.setValue(basedOnIndex)
          }
        }
      }
    } catch (e) {
      throw new Error("[changeBasedOn] " + e.message)
    }
    app.endUndoGroup()
  }

  var removeNautilus = function() {
    app.beginUndoGroup("removeNautilus")

    try {
      var comp = utils.getCompItem()
      var selectedLayers = utils.getSelectedLayer()

      for (var i = 0; i < selectedLayers.length; i++) {
        var layer = selectedLayers[i]

        var selectedEffect = layer.selectedProperties
        if (selectedEffect.length === 0) {
          throw new Error("Please select atleast one Nautilus Effect!")
        }

        var effectNameToRemove = []
        for (var j = 0; j < selectedEffect.length; j++) {
          effectNameToRemove.push(selectedEffect[j].name)
        }

        
        for (var k = 0; k < effectNameToRemove.length; k++) {
          var effectName = effectNameToRemove[k]
          var effect = layer.property("ADBE Effect Parade").property(effectName);

          if (utils.isTextLayer(layer)) {
            var textProp = layer.property("ADBE Text Properties")
            var animatorsGroup = textProp.property("ADBE Text Animators")

            for (var m = animatorsGroup.numProperties; m >= 1; m--) {
              var animator = animatorsGroup.property(m)
              var selectorGroup = animator.property("ADBE Text Selectors")
              var selectorExpression = selectorGroup.property("ADBE Text Expressible Selector")
              var selectorExpressionAmount = selectorExpression.property(2)

              if (selectorExpressionAmount.expression.indexOf('("' + effect.name + '")') === -1) { continue }
              
              animator.remove()
            }

            effect.remove()
          } else if (layer.source instanceof CompItem) {
            effect.remove()

            var ctrlLayerEffectNameList = utils.getAllNautilusEffect(layer)
            var innerComp = layer.source
            for (var l = 1; l <= innerComp.numLayers; l++) {
              if (ctrlLayerEffectNameList.length === 0) {
                utils.clearExpressionFromLayer(innerComp.layer(l))
              } else {
                utils.applyExpressionToLayer(innerComp.layer(l), layer.name, comp.name, layer.name, ctrlLayerEffectNameList);
              }
            }
          }
        }
      }
    } catch (e) {
      throw new Error("[changeBasedOn] " + e.message)
    }
    app.endUndoGroup()
  }

  var extract = function() {
    app.beginUndoGroup("Extract")
    try {
      // checking if selectedLayers is valid
      var selectedLayers = utils.getSelectedLayer();
      if (selectedLayers.length > 1) {
        throw new Error("Please only select 1 layer!")
      }

      if (!utils.isTextLayer(selectedLayers[0])) {
        throw new Error("Please only select text layer!")
      }
      var textLayer = selectedLayers[0]

      // create shapes from selected text layer
      app.executeCommand(app.findMenuCommandId("Create Shapes from Text"));

      // get shape layer from Create Shapes from Text
      var comp = utils.getCompItem()
      var mainShapeLayer = comp.selectedLayers[0];
      var contents = mainShapeLayer.property("Contents");
      var shapeCount = contents.numProperties;

      // store group name reference
      var groupNames = [];
      for (var i = shapeCount; i >= 1; i--) {
          groupNames.push(contents.property(i).name);
      }

      var layerIndices = []
      // duplicate layer
      for (var j = 1; j <= groupNames.length; j++) {
          var charLayer = mainShapeLayer.duplicate();
          charLayer.name = "Char_" + groupNames[j-1] + "_" + (j);
          layerIndices.push(charLayer.index)
          
          var charContents = charLayer.property("Contents");
          
          // remove group except index group
          for (var k = charContents.numProperties; k >= 1; k--) {
              if (k === (groupNames.length - j + 1)) { continue }

              charContents.property(k).remove();
          }

          var rect = charLayer.sourceRectAtTime(comp.time, false);
          
          var centerX = rect.left + rect.width / 2;
          var centerY = rect.top + rect.height / 2;
          
          var currentAnchor = charLayer.transform.anchorPoint.value;
          var currentPos = charLayer.transform.position.value;
          
          charLayer.transform.anchorPoint.setValue([centerX, centerY]);
          
          var newPosX = currentPos[0] + (centerX - currentAnchor[0]);
          var newPosY = currentPos[1] + (centerY - currentAnchor[1]);
          
          charLayer.transform.position.setValue([newPosX, newPosY]);
      }

      // remove main shape layer
      mainShapeLayer.remove();

      // precompose extracted layers
      utils.precomposeLayers(layerIndices, textLayer.name, textLayer.inPoint, textLayer.outPoint)
    } catch (e) {
      throw new Error("[extract] " + e.message)
    }
    app.endUndoGroup()
  }

  function load() {
    try {
      nautilus.firstPresetFileObj = utils.getFileObj("Nautilus.ffx")
      nautilus.secondPresetFileObj = utils.getFileObj("Nautilus2.ffx")
      nautilus.version = utils.loadBuildInfo()["version"]
      nautilus.aboutStr = utils.readFile("about.txt")
      nautilus.expression.defaultVariable = utils.readFile("layer/defaultVariable.jsx");
      nautilus.expression.position = utils.readFile("layer/position.jsx");
      nautilus.expression.rotationX = utils.readFile("layer/rotationX.jsx");
      nautilus.expression.rotationY = utils.readFile("layer/rotationY.jsx");
      nautilus.expression.rotationZ = utils.readFile("layer/rotationZ.jsx");
      nautilus.expression.opacity = utils.readFile("layer/opacity.jsx");
      nautilus.expression.scale = utils.readFile("layer/scale.jsx");

      nautilus.nautiFlowPresetFileObj = utils.getFileObj("NautiFLow.ffx")
      nautilus.expression.text.defaultVariable = utils.readFile("text/defaultVariable.jsx")
      nautilus.expression.text.trackingMaskValue = utils.readFile("text/trackingMaskValue.jsx")
      nautilus.expression.text.trackingMask = utils.readFile("text/trackingMask.jsx")
      nautilus.expression.text.position = utils.readFile("text/position.jsx")
      nautilus.expression.text.positionValue = utils.readFile("text/positionValue.jsx")
      nautilus.expression.text.positionMask = utils.readFile("text/positionMask.jsx")
      nautilus.expression.text.positionMaskValue = utils.readFile("text/positionMaskValue.jsx")
      nautilus.expression.text.rotation = utils.readFile("text/rotation.jsx")
      nautilus.expression.text.rotationValue = utils.readFile("text/rotationValue.jsx")
      nautilus.expression.text.rotationMask = utils.readFile("text/rotationMask.jsx")
      nautilus.expression.text.rotationMaskValue = utils.readFile("text/rotationMaskValue.jsx")
      nautilus.expression.text.scale = utils.readFile("text/scale.jsx")
      nautilus.expression.text.scaleValue = utils.readFile("text/scaleValue.jsx")
      nautilus.expression.text.scaleMask = utils.readFile("text/scaleMask.jsx")
      nautilus.expression.text.scaleMaskValue = utils.readFile("text/scaleMaskValue.jsx")
      nautilus.expression.text.opacity = utils.readFile("text/opacity.jsx")

      nautilus.icons.text = utils.getFileObj("icons/text.png")
      nautilus.icons.comp = utils.getFileObj("icons/comp.png")
      nautilus.icons.about = utils.getFileObj("icons/about.png")
      nautilus.icons.extract = utils.getFileObj("icons/extract.png")
      nautilus.icons.apply = utils.getFileObj("icons/apply.png")
      nautilus.icons.basedOn = utils.getFileObj("icons/based-on.png")
      nautilus.icons.remove = utils.getFileObj("icons/remove.png")
    } catch (e) {
      throw new Error("[load] " + e.message)
    }
  }

  load()
  utils.createPalette(ui_ref);

  function handleError(msg) {
    alert("One function of Nautilus gives an Error.\n\nDetail:\n" + msg + "\n\nYou can open an issue at\nhttps://github.com/Kuredew/nautilus\nif the problem persist.");
  }
}

function handleLoadError(msg) {
  alert("There was a problem loading Nautilus into After Effects.\n\nDetail:\n" + msg + "\n\nOpen an issue at\nhttps://github.com/Kuredew/nautilus\nif the problem persist.")
}

try {
  NautilusScript(this);
} catch (e) {
  handleLoadError(e.message)
}
