// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod ports;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![ports::get_open_ports, ports::kill_process])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
