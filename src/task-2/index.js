const fs = require('fs');
const os = require('os');
const { execSync } = require('child_process');
const path = require('path');

function getProcessInfo() {
  try {
    const processInfo = execSync(getCommandBasedOnOS()).toString();
    
    process.stdout.write('\x1Bc');
    process.stdout.write(processInfo);

    return processInfo;
  } catch (error) {
    console.error('Error getting process info:', error);
  }
}

function logProcessInfo() {
  const processInfo = getProcessInfo();
  const logData = `${Date.now()} : ${processInfo}\r`;

  try {
    fs.appendFileSync(path.join(__dirname, 'activityMonitor.log'), logData);
  } catch (error) {
    console.error('Error writing to log file:', error);
  }
}

function getCommandBasedOnOS() {
  switch (os.type()) {
    case 'Linux':
      return `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`;
    case 'Darwin':
      return `ps -axo pid, pcpu, pmem, comm -r | awk '{print $4, $2, $3}' | head -n 1`;
    case 'Windows_NT':
      return `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`;
    default:
      console.log('Unsupported OS');
      process.exit(1);
  }
}

setInterval(getProcessInfo, 100);
setInterval(logProcessInfo, 60000);