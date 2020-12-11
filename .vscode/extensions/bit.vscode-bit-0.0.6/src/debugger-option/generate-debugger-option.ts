import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { launchJSON } from './launch';
import { settingsJSON } from './settings';

export function generateDebuggerOption() {
  // @ts-ignore
  const rootPath = vscode.workspace.workspaceFolders[0].name;
  const VSCODE_FOLDER = '.vscode';
  const LAUNCH_FILE = 'launch.json';
  const SETTINGS_FILE = 'settings.json';

  vscode.window.showInformationMessage(`rootPath is: ${rootPath}`);

  if (fs.existsSync(`${rootPath}/${VSCODE_FOLDER}`)) {
    vscode.window.showInformationMessage('.vscode directory exists.');
    if (fs.existsSync(`${rootPath}/${VSCODE_FOLDER}/${LAUNCH_FILE}`)) {
      const localLaunchFile = JSON.parse(
        fs
          .readFileSync(path.join(rootPath, `${VSCODE_FOLDER}/${LAUNCH_FILE}`))
          .toString()
      );
      const localLaunchConfig: Array<any> = localLaunchFile.configurations;
      const newLaunchConfig = localLaunchConfig.concat(
        launchJSON.configurations
      );
      localLaunchFile.configurations = newLaunchConfig;
      fs.writeFile(
        path.join(rootPath, `${VSCODE_FOLDER}/${LAUNCH_FILE}`),
        JSON.stringify(localLaunchFile, null, 2),
        (err: any) => {
          if (err) {
            return vscode.window.showErrorMessage(
              'Failed to modify the lanch file!'
            );
          }
          vscode.window.showInformationMessage(
            'vscode launch file has been modified!'
          );
        }
      );
    }
    if (fs.existsSync(`${rootPath}/${VSCODE_FOLDER}/${SETTINGS_FILE}`)) {
      const localSettingsFile = JSON.parse(
        fs
          .readFileSync(
            path.join(rootPath, `${VSCODE_FOLDER}/${SETTINGS_FILE}`)
          )
          .toString()
      );
      if (
        localSettingsFile.hasOwnProperty('debug.javascript.usePreview') &&
        localSettingsFile['debug.javascript.usePreview'] === true
      ) {
        vscode.window.showInformationMessage(
          'debug.javascript.usePreview in settings file need to be false'
        );
      } else {
        const newSettingsConfig = {
          ...localSettingsFile,
          ...settingsJSON,
        };
        fs.writeFile(
          path.join(rootPath, `${VSCODE_FOLDER}/${SETTINGS_FILE}`),
          JSON.stringify(newSettingsConfig, null, 2),
          (err: any) => {
            if (err) {
              return vscode.window.showErrorMessage(
                'Failed to modify the settings file!'
              );
            }
            vscode.window.showInformationMessage(
              'vscode settings file has been modified!'
            );
          }
        );
      }
    }
  } else {
    fs.mkdir(`${rootPath}/${VSCODE_FOLDER}`, {}, (err: any) => {
      if (err) {
        throw err;
      }
      fs.writeFile(
        path.join(rootPath, `${VSCODE_FOLDER}/${LAUNCH_FILE}`),
        JSON.stringify(launchJSON, null, 2),
        (err: any) => {
          if (err) {
            return vscode.window.showErrorMessage('Failed to create files!');
          }
          vscode.window.showInformationMessage(
            'vscode launch file has been created!'
          );
        }
      );
      fs.writeFile(
        path.join(rootPath, `${VSCODE_FOLDER}/${SETTINGS_FILE}`),
        JSON.stringify(settingsJSON, null, 2),
        (err: any) => {
          if (err) {
            return vscode.window.showErrorMessage('Failed to create files!');
          }
          vscode.window.showInformationMessage(
            'vscode settings file has been created!'
          );
        }
      );
    });
  }
}
