const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron');

let mainWindow = null;

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        width: 1280,
        height: 920,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        //resizable: false
    });
    mainWindow.removeMenu();

    mainWindow.loadURL(`file://${__dirname}/src/view/index.html`);
});

app.on('window-all-closed', () => {
    app.quit();
});

let formProdutoWindow = null;
ipcMain.on('abrir-form-produto', () => {
    if (formProdutoWindow == null) {
        formProdutoWindow = new BrowserWindow({
            width: 400,
            height: 450,
            alwaysOnTop: true,
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });
        formProdutoWindow.on('closed', () => {
            formProdutoWindow = null;
        });
    }
    formProdutoWindow.loadURL(`file://${__dirname}/src/view/formulario_pedidos.html`);
});

let editarProduto = null;
ipcMain.on('abrir-editar-produto', () => {
    if (editarProduto == null) {
        editarProduto = new BrowserWindow({
            width: 400,
            height: 450,
            alwaysOnTop: true,
            frame: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });
        editarProduto.on('closed', () => {
            editarProduto = null;
        });
    }
    editarProduto.loadURL(`file://${__dirname}/src/view/formulario_editar_pedidos.html`);
});

ipcMain.on('atualiza-tabela', (event) => {
    console.log('Atualizando tabela');
    mainWindow.reload();
});

ipcMain.on('fechar-form-produto', () => {
    formProdutoWindow.close();
});

ipcMain.on('fechar-editar-produto', () => {
    editarProduto.close();
});