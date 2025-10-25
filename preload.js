const { contextBridge, ipcRenderer } = require('electron');
const si = require('systeminformation');
const fs = require('fs');
const path = require('path');

contextBridge.exposeInMainWorld('electronAPI', {
  minimizeWindow: () => ipcRenderer.send('window-minimize'),
  maximizeWindow: () => ipcRenderer.send('window-maximize'),
  closeWindow: () => ipcRenderer.send('window-close'),
  onWindowMaximized: (callback) => ipcRenderer.on('window-maximized', callback),
  onWindowUnmaximized: (callback) => ipcRenderer.on('window-unmaximized', callback),
  // 添加获取系统信息的函数
  getSystemInfo: async () => {
    try {
      // 获取各种系统信息
      const osInfo = await si.osInfo();
      const cpuInfo = await si.cpu();
      const memoryInfo = await si.mem();
      const graphicsInfo = await si.graphics();
      const diskInfo = await si.diskLayout();
      const networkInfo = await si.networkInterfaces();
      const biosInfo = await si.bios();
      const baseboardInfo = await si.baseboard();
      const chassisInfo = await si.chassis();
      
      return {
        os: osInfo,
        cpu: cpuInfo,
        memory: memoryInfo,
        graphics: graphicsInfo,
        disk: diskInfo,
        network: networkInfo,
        bios: biosInfo,
        baseboard: baseboardInfo,
        chassis: chassisInfo
      };
    } catch (error) {
      console.error('获取系统信息失败:', error);
      return null;
    }
  },
  // 添加Cookie文件操作函数
  saveCookieFile: (data) => {
    try {
      const cookiePath = path.join(__dirname, 'Cookie.json');
      fs.writeFileSync(cookiePath, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('保存Cookie文件失败:', error);
      return false;
    }
  },
  getCookieFile: () => {
    try {
      const cookiePath = path.join(__dirname, 'Cookie.json');
      if (fs.existsSync(cookiePath)) {
        const data = fs.readFileSync(cookiePath, 'utf8');
        return JSON.parse(data);
      }
      return {};
    } catch (error) {
      console.error('读取Cookie文件失败:', error);
      return {};
    }
  }
});