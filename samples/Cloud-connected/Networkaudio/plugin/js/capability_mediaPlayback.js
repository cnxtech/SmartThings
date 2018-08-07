/*
 * Copyright (c) 2015 - 2017 Samsung Electronics Co., Ltd All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var capabilityMediaPlayback = {
	'href' : "/capability/mediaPlayback/main/0",
	'value' : "play",

	'update' : function() {
		ocfDevice.getRemoteRepresentation(this.href, this.onRepresentCallback);
	},

	'onRepresentCallback' : function(result, deviceHandle, uri, rcsJsonString) {
		scplugin.log.debug(className, arguments.callee.name, result);
		scplugin.log.debug(className, arguments.callee.name, uri);

		if (result == "OCF_OK" || result == "OCF_RESOURCE_CHANGED" || result == "OCF_RES_ALREADY_SUBSCRIBED") {
			if(rcsJsonString["modes"] === undefined) return;
			capabilityMediaPlayback.value = rcsJsonString["modes"];

			var image = document.getElementById("playbutton");
			if (this.value != "pause") {
				image.classList.remove('paused');
			} else {
				image.classList.add('paused');
			}
		}
	},

	'set' : function(value) {
		scplugin.log.debug(className, arguments.callee.name, "playback : " + value);
		var setRcsJson = {};
		setRcsJson["modes"] = value;
		ocfDevice.setRemoteRepresentation(this.href, setRcsJson, this.onRepresentCallback);
	},

	'toggle' : function() {
		if (this.value == "play" || this.value == "stop") {
			this.set("pause");
		} else {
			this.set("play");
		}
	}
}
