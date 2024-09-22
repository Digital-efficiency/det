use std::process::Command;
use std::str;

#[tauri::command]
pub fn get_open_ports() -> Vec<(String, String, String)> {
  let output = if cfg!(target_os = "windows") {
    Command::new("cmd")
      .args(&["/C", "netstat -ano | findstr LISTENING"])
      .output()
      .expect("failed to get ports")
  } else {
    Command::new("sh")
      .args(&["-c", "lsof -iTCP -sTCP:LISTEN -P -n"])
      .output()
      .expect("failed to get ports")
  };

  let output_str = str::from_utf8(&output.stdout).unwrap();
  let mut ports_info = Vec::new();
  let mut seen_ports = std::collections::HashSet::new();

  for line in output_str.lines() {
    let parts: Vec<&str> = line.split_whitespace().collect();
    if cfg!(target_os = "windows") {
      if parts.len() >= 4 {
        let port = parts[1].split(':').last().unwrap_or("");
        let pid = parts[4];
        if seen_ports.insert(port.to_string()) {
          ports_info.push((port.to_string(), pid.to_string(), "LISTENING".to_string()));
        }
      }
    } else {
      if parts.len() >= 9 {
        let pid = parts[1].to_string();
        let port = parts[8].split(':').last().unwrap_or("");
        if seen_ports.insert(port.to_string()) {
          ports_info.push((port.to_string(), pid, "LISTENING".to_string()));
        }
      }
    }
  }

  ports_info.sort_by(|a, b| a.0.parse::<u16>().unwrap_or(0).cmp(&b.0.parse::<u16>().unwrap_or(0)));
  ports_info
}
