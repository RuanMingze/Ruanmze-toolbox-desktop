# 阮铭泽工具箱源码

这是一个功能丰富的Windows桌面应用程序，包含天气查询、计算器、编程工具、系统知识等实用功能。

## 项目结构

- `main.js` - Electron主进程入口文件
- `preload.js` - 预加载脚本，用于安全地暴露Node.js API给渲染进程
- `toolbox-app.html` - 主应用程序界面
- `login.html` - 登录页面
- `register.html` - 注册页面
- `oauth-callback.html` - OAuth回调页面
- `package.json` - 项目配置和依赖
- `users.json` - 用户数据存储文件
- `Cookie.json` - Cookie数据存储文件
- `resources/` - 资源文件目录
  - `configures.xml` - 配置文件
  - `custom_configures.xml` - 自定义配置文件
  - `design_res_app_icon.png` - 应用图标
  - `logo.ico` - Logo图标
  - `uninst.ico` - 卸载图标

## 构建和运行

### 开发环境运行
```bash
npx electron .
```

### 打包应用
```bash
npx electron-builder --win --x64
```

## 功能特性

- 天气预报查询
- 日历功能
- 科学计算器
- 编程工具和资源
- 系统知识查询
- 实用网站推荐
- 主题切换（浅色/深色模式）
- 多语言支持（中文/英文）
- 用户账户系统
- 本地数据存储
- 自定义窗口控制（最小化、最大化、关闭）

## 系统要求

- Windows 7/8/10/11操作系统

## 技术栈

- Electron
- JavaScript
- HTML/CSS
- systeminformation库

## 版本信息

- 版本: v0.0.1-beta2
- 开发者: 阮铭泽
- 发布日期: 2025年10月

## 技术支持

如遇到问题，请联系开发者或查看在线文档（docs.ruanm.com）(暂时未完成，到时后后缀可能改为.cn、.top或.xyz)
官网: https://www.ruanm.com (暂时未完成，到时后后缀可能改为.cn、.top或.xyz)

## v0.0.1-beta1.5 更新公告
- 添加了Ai功能，配置API后可以使用Ai进行对话（我暂时没有API，无法测试功能）
- 添加了逆向（反编译）模块，具体内容你懂的
- 安装包界面退化了...因为Installer Studio的VIP到期了，暂时不想续费

## v0.0.1-beta3 更新预告
- 添加非常多工具和推荐网站
- 支持更多自定义设置
- 显示当前节日弹窗（有动画）
