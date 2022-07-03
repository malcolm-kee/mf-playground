const { execSync } = require('child_process');
const open = require('open');

/**
 *
 * @param {string} url
 * @returns
 */
function startBrowserProcess(url) {
  const shouldTryOpenChromiumWithAppleScript = process.platform === 'darwin';

  if (shouldTryOpenChromiumWithAppleScript) {
    // Will use the first open browser found from list
    const supportedChromiumBrowsers = [
      'Google Chrome Canary',
      'Google Chrome',
      'Microsoft Edge',
      'Brave Browser',
      'Vivaldi',
      'Chromium',
    ];

    for (let chromiumBrowser of supportedChromiumBrowsers) {
      try {
        // Try our best to reuse existing tab
        // on OSX Chromium-based browser with AppleScript
        execSync('ps cax | grep "' + chromiumBrowser + '"');
        execSync(
          'osascript openChrome.applescript "' + encodeURI(url) + '" "' + chromiumBrowser + '"',
          {
            cwd: __dirname,
            stdio: 'ignore',
          }
        );
        return true;
      } catch (err) {
        // Ignore errors.
      }
    }
  }

  // Fallback to open
  // (It will always open new tab)
  try {
    var options = {
      wait: false,
      url: true,
    };
    open(url, options).catch(() => {}); // Prevent `unhandledRejection` error.
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Reads the BROWSER environment variable and decides what to do with it. Returns
 * true if it opened a browser or ran a node.js script, otherwise false.
 */
exports.openBrowser = startBrowserProcess;
