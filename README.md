# Fimage

<img src="https://raw.githubusercontent.com/onfuns/fimage/master/screenshots/1.png" width="350"/>

<img src="https://raw.githubusercontent.com/onfuns/fimage/master/screenshots/2.png" width="350"/>

<img src="https://raw.githubusercontent.com/onfuns/fimage/master/screenshots/3.png" width="350"/>

### 开发

```
npm run start
npm run electron
```

> 注意：electron 在 windows 系统调试开发时不能用管理员模式运行，否则会禁用拖拽文件功能。

### 编译

```
npm run package:mac
npm run package:win
```

因设备不全，`windows`系统暂时只提供打包流程，未测试软件实际功能。

`Mac`系统构建`exe`文件时需要下载`wine`、`winCodeSign`等文件，自动下载失败时可以手动下载，然后解压放到`~/Library/Caches/electron-builder`即可
