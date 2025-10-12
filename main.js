const { app, BrowserWindow, nativeTheme, ipcMain } = require('electron');
const path = require('path');

// 禁用安全警告
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

// 创建浏览器窗口
const createWindow = () => {
  // 根据系统主题设置初始背景色
  const backgroundColor = nativeTheme.shouldUseDarkColors ? '#121220' : '#f5f7fa';
  
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'icon.jpg'),
    frame: false, // 隐藏默认窗口边框
    backgroundColor: backgroundColor, // 根据系统主题设置背景色
    webPreferences: {
      nodeIntegration: false, // 禁用nodeIntegration以提高安全性
      contextIsolation: true, // 启用上下文隔离
      preload: path.join(__dirname, 'preload.js'), // 指定预加载脚本
      webSecurity: false, // 禁用同源策略，允许加载本地文件
      allowRunningInsecureContent: true
    }
  });

  // 加载应用的 Electron 版本 HTML
  mainWindow.loadFile('toolbox-app.html');
  
  // 移除菜单栏
  mainWindow.setMenu(null);
  
  // 禁用开发者工具自动打开
  // if (!app.isPackaged) {
  //   mainWindow.webContents.openDevTools();
  // }
  
  // 监听系统主题变化
  nativeTheme.on('updated', () => {
    // 当系统主题变化时，通知渲染进程
    mainWindow.webContents.send('system-theme-changed', nativeTheme.shouldUseDarkColors ? 'dark' : 'light');
  });
  
  // 监听窗口控制事件
  ipcMain.on('window-minimize', () => {
    mainWindow.minimize();
  });
  
  ipcMain.on('window-maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });
  
  ipcMain.on('window-close', () => {
    mainWindow.close();
  });
  
  // 监听窗口状态变化
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window-maximized');
  });
  
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-unmaximized');
  });
};

// 这段代码会等到 Electron 初始化完成后再执行
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // 在 macOS 系统中，当dock图标被点击且没有其他窗口时，通常会重新创建一个窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});