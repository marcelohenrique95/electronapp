import { app, BrowserWindow, Tray, Menu, screen, Notification, autoUpdater, dialog } from 'electron';
import * as path from 'path';
import * as url2 from 'url';
const http = require('http');
const logger = require('electron-log');
const electron = require('electron');
const ipc = electron.ipcMain;
const {shell} = require('electron');
const Datastore = require('nedb');
const db = new Datastore({ filename: 'data.db', autoload: true });
var os = require('os');
//var userProxyModel: ProxyModel;

// this should be placed at top of main.js to handle setup events quickly
if (handleSquirrelEvent(app)) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
}

//Usando 30% da memoria total do usuario.
  console.log(os.totalmem());
  var memory = os.totalmem();
  var percent = memory / 3;
  app.commandLine.appendSwitch('js-flags', '--max-old-space-size=' + percent);

  /**
   * Usando 50% da memoria disponivel do usuario.
   * var memory = os.freemem();
   * var percent = memory / 5;
   * app.commandLine.appendSwitch('js-flags', '--max-old-space-size=' + percent);
   */

//set proxy
app.commandLine.appendSwitch('proxy-serve', '');
//let proxy = userProxyModel.ip +':'+ userProxyModel.port;


require('update-electron-app')()

// Definir diretório, nome e extensão para o arquivo de log
logger.transports.file.resolvePath = () => path.join(__dirname, './log.txt');
// Configurar padrão de log no console
logger.transports.console.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}]';


// Initialize remote module
require('@electron/remote/main').initialize();

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

//let ses = win.webContents.session;
//ses.setDownloadPath(app.getPath('downloads'));
//ses.setProxy({proxyRules: proxy});

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,  // false if you want to run 2e2 test with Spectron
      enableRemoteModule: true // true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
    },
  });



  if (serve) {

    win.webContents.openDevTools();
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });

    win.loadURL('http://localhost:4200');


  } else {

    //win.webContents.session.setProxy({proxyRules:"https://192.168.0.1:8080"},function() {
    //});
    win.loadURL(url2.format({pathname: path.join(__dirname, '/dist/index.html'),protocol: 'file:', slashes: true }));

  }

  let tray = null;
  win.on('minimize', function (event) {
    event.preventDefault();
    win.hide();
    tray = createTray();

});

  win.on('restore', function (event) {
    win.show();
    tray.destroy();
});

function createTray() {
  let appIcon = new Tray(path.join(__dirname, "/img/tivit-log.jpg"));
  const contextMenu = Menu.buildFromTemplate([
      {
          label: 'Abrir', click: function () {
            win.show();
          }
      },
      {
          label: 'Fechar', click: function () {
             /// app.isQuiting = true;
              app.quit();
          }
      }
  ]);

  appIcon.on('double-click', function (event) {
    win.show();
  });
  appIcon.setToolTip('EDI CLIENT');
  appIcon.setContextMenu(contextMenu);
  return appIcon;
}
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

  ipc.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
  });

} catch (e) {
  // Catch Error
  // throw e;
}


ipc.on('insert-nedb', function (event, args) {
    db.insert(args[0], function (err, newrec) {
      logger.info('----inserindo registro----');
    });

});

ipc.on('findonebyentity-nedb', function (event, args) {
  let entityNameValue = args[0];
  db.findOne({ entityName:  entityNameValue}, function (err, docs) {
    logger.info('-buscando registros- entityname = '+ entityNameValue);
    logger.info(docs);
    event.returnValue= docs;
  });
});

ipc.on('update-nedb', function (event, args) {
  let entityNameValue = args[0];
  db.update({entityName: entityNameValue},args[1],{}, function (err, numReplaced) {
    logger.info('-ATUALIZANDO REGISTRO-')
  });
});

ipc.on('remove-nedb', function (event, args) {
  let entityNameValue = args[0]
  db.remove({entityName: entityNameValue},{}, function (err, numRemoved){

  });
});

ipc.on('show-notification', function (event, args) {
  // Para chamar o método show-notification:
  // this._electronService.ipcRenderer.send('show-notification', ['Título da notificação', 'Corpo da notificação']);
  let titulo = args[0];
  let corpo = args[1];
  new Notification({
    title: titulo,
    body: corpo,
    icon: path.join(__dirname, "/img/tivit-log.jpg"),
  }).show();
});

/**
 *
//executar arquivos .bat(windows) e .sh(linux);

var os = process.platform;

if ( os == 'win32') {
  shell.openPath('D:\\ARRRR---\\file.bat');
} else {
  shell.openPath('D:\\ARRRR---\\file.sh');
}
 */


//executar electron via linha de comando.

function checkIfCalledViaCLI(args){
	if(args && args.length > 1){
		return true;
	}
	return false;
}

app.on('ready', () => {
	let isCalledViaCLI = checkIfCalledViaCLI(process.argv);

	if(isCalledViaCLI) {
		win = new BrowserWindow({ show: false, width: 0, height: 0});
	} else {
		win = new BrowserWindow({ show: true, width: 1050, height: 600});
	}

	win.once('ready-to-show', () => {
		if(isCalledViaCLI) {
			win.hide();
		} else {
			win.show();
			win.maximize();
		}
	})
});

//auto-update for client.

const server = 'https://github.com/Collareda/electron-client-update.git';
const url = `${server}/update/${process.platform}/${app.getVersion()}`

autoUpdater.setFeedURL({ url })

setInterval(() => {
  autoUpdater.checkForUpdates()
}, 6000000)

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A nova versão foi baixada com sucesso. Reinicie o aplicativo para aplicar a atualização.'
  }

  dialog.showMessageBox(dialogOpts).then((returnValue) => {
    if (returnValue.response === 0) autoUpdater.quitAndInstall()
  })
})

autoUpdater.on('error', message => {
  console.error('Erro ao atualizar o aplicativo')
  console.error(message)
})

//create .exe

function handleSquirrelEvent(application) {
  if (process.argv.length === 1) {
      return false;
  }

  const ChildProcess = require('child_process');
  const path = require('path');

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
      let spawnedProcess, error;

      try {
          spawnedProcess = ChildProcess.spawn(command, args, {
              detached: true
          });
      } catch (error) {}

      return spawnedProcess;
  };

  const spawnUpdate = function(args) {
      return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
      case '--squirrel-install':
      case '--squirrel-updated':
          // Optionally do things such as:
          // - Add your .exe to the PATH
          // - Write to the registry for things like file associations and
          //   explorer context menus

          // Install desktop and start menu shortcuts
          spawnUpdate(['--createShortcut', exeName]);

          setTimeout(application.quit, 1000);
          return true;

      case '--squirrel-uninstall':
          // Undo anything you did in the --squirrel-install and
          // --squirrel-updated handlers

          // Remove desktop and start menu shortcuts
          spawnUpdate(['--removeShortcut', exeName]);

          setTimeout(application.quit, 1000);
          return true;

      case '--squirrel-obsolete':
          // This is called on the outgoing version of your app before
          // we update to the new version - it's the opposite of
          // --squirrel-updated

          application.quit();
          return true;
  }
};

