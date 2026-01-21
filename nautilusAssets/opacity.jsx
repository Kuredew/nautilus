// For Opacity
var ctrlOpacityStrength = ctrlFx("Opacity Strength").valueAtTime(time - delay);

// calculate percent value
// var ctrlOpacity = layerV * (ctrlOpacityStrength / 100);

layerValue = layerValue - (100 - ctrlOpacityStrength)