const fs = require('fs');
const path = './frontend/src/components/ErrorBoundary.jsx';
let content = fs.readFileSync(path, 'utf8');

// The render method currently likely returns a fallback UI.
// Let's inject {this.state.error && this.state.error.message} into it.

const target = 'The application encountered an unexpected error. Don\'t worry, your offline data is safe.';
const replacement = `The application encountered an unexpected error. Don't worry, your offline data is safe.
              <br/><br/>
              <strong className="text-red-400 font-mono text-xs text-left block p-2 bg-slate-900 rounded break-all">
                {this.state.error && this.state.error.toString()}
                <br/>
                {this.state.error && this.state.error.stack}
              </strong>`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(path, content, 'utf8');
  console.log("Patched ErrorBoundary successfully");
} else {
  console.log("Target not found in ErrorBoundary");
}
