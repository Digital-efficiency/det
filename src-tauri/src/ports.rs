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

#[tauri::command]
pub fn kill_process(identifier: &str) {
  if cfg!(target_os = "windows") {
    Command::new("cmd")
      .args(&["/C", &format!("taskkill /pid {} /T /F", identifier)])
      .output()
      .expect("failed to kill process");
  } else {
    Command::new("sh")
      .args(&["-c", &format!("kill -9 {}", identifier)])
      .output()
      .expect("failed to kill process");
  }
}

#[cfg(test)]
mod tests {
  use super::*;
  use std::process::Command;
  use std::thread;
  use std::time::Duration;

  #[test]
  fn test_get_open_ports() {
    let ports = get_open_ports();
    assert!(!ports.is_empty(), "应返回至少一个开放端口");
  }

  #[test]
  fn test_kill_process() {
    // 创建一个子进程
    let child = Command::new("timeout") // 在 Unix 系统上使用 sleep，Windows 上可以使用 timeout
      .arg("10") // 让进程睡眠 10 秒
      .spawn()
      .expect("无法启动子进程");

    // 等待一小段时间以确保进程已启动
    thread::sleep(Duration::from_millis(500));

    // 获取子进程的 PID
    let pid = child.id().to_string();

    // 杀死进程
    kill_process(&pid);

    // 检查进程是否仍然存在
    let result = Command::new("tasklist") // 在 Unix 系统上使用 ps，Windows 上可以使用 tasklist
      .arg("-p")
      .arg(&pid)
      .output()
      .expect("无法检查进程");

    assert!(result.stdout.is_empty(), "进程应已被杀死");
  }
}