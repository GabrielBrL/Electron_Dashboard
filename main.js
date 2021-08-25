const {app, BrowserWindow} = require('electron');

let mainWindow = null;

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        width:1000,
        height:800,
        resizable: false
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);

});