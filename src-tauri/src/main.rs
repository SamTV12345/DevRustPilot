#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use jsonwebtoken::{Algorithm, decode, DecodingKey, Validation};
use jsonwebtoken::jwk::Jwk;
use reqwest;
use serde::Deserialize;
use serde::Serialize;
use serde_json::{from_str, Value};

#[derive(Serialize, Deserialize)]
pub struct  JwkStatus{
    pub status: bool,
    pub message: String,
    pub error: bool
}

#[tauri::command]
fn verify_certificate(url: &str, token: &str)->JwkStatus{
    let jwk_url = reqwest::blocking::get(url);
    return match jwk_url {
        Ok(jwk)=>{
            let custom_jwk_set = jwk.json::<CustomJwkSet>();
            if custom_jwk_set.is_err(){
                return JwkStatus{
                    status: false,
                    message: custom_jwk_set.err().unwrap().to_string(),
                    error: true
                }
            }
            let custom_jwk = custom_jwk_set.unwrap();
            let response = custom_jwk.clone().keys.into_iter().filter(|x| {
                x.alg.eq(&"RS256")
            }).collect::<Vec<CustomJwk>>();
            let custom_jwk = response.get(0).expect("Your jwk set needs to have RS256");
            let jwk_string = serde_json::to_string(&custom_jwk).unwrap();
            let jwk = from_str::<Jwk>(&*jwk_string).unwrap();
            let key = DecodingKey::from_jwk(&jwk).unwrap();
            let validation = Validation::new(Algorithm::RS256);
            let decoding_result = decode::<Value>(&token, &key, &validation);

            match decoding_result {
                Ok(_)=>{
                    JwkStatus{
                        status: true,
                        message: "Token is valid".to_string(),
                        error: false
                    }
                },
                Err(e)=>{
                    JwkStatus{
                        status: false,
                        message: e.to_string(),
                        error: true
                    }
                }
            }
        },
        Err(e)=>{
            JwkStatus{
                status: false,
                message: e.to_string(),
                error: true
            }
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CustomJwkSet {
    pub(crate) keys: Vec<CustomJwk>,
}


#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct CustomJwk{
    pub kid: String,
    pub kty: String,
    pub alg: String,
    #[serde(rename = "use")]
    pub use_: String,
    pub n: String,
    pub e: String,
}



fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![verify_certificate])
        .plugin(tauri_plugin_sql::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
