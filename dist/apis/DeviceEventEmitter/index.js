var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var DeviceEventEmitter=function(){function DeviceEventEmitter(){_classCallCheck(this,DeviceEventEmitter);this.eventList={ccc:[]};}_createClass(DeviceEventEmitter,[{key:"addListener",value:function addListener(eventName,fn){if(this.eventList[eventName]){this.eventList[eventName].push(fn);}else{this.eventList[eventName]=[fn];}}},{key:"removeListener",value:function removeListener(eventName,fn){if(this.eventList[eventName]){for(var i in this.eventList[eventName]){if(this.eventList[eventName][i]===fn){this.eventList[eventName].splice(i,1);return;}}}}},{key:"removeAllListeners",value:function removeAllListeners(eventName){delete this.eventList[eventName];}},{key:"emit",value:function emit(eventName,data){if(this.eventList[eventName]){this.eventList[eventName].map(function(event){return event(data);});}}}]);return DeviceEventEmitter;}();var DeviceEventEmitter_=new DeviceEventEmitter();module.exports=DeviceEventEmitter_;