import {SettingsManager} from "tauri-settings";
import {SettingsSchema} from "../renderer/Settings";

export const settingsManager = new SettingsManager<SettingsSchema>(
    { // defaults
        emailprefix:'',
        emailsuffix:'',
        startupscript:''
    },
    { // options
        fileName: 'settings'
    }
)

// loads the settings if it exists
settingsManager.initialize().then(() => {
    console.log("Initialized")
})