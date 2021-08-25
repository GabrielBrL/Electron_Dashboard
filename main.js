const {app, BrowserWindow} = require('electron');

let mainWindow = null;

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        width:1280,
        height:920
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);

});