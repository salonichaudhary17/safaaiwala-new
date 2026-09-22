const fs = require('fs');
const path = './frontend/src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

const targetStr = `                <button
                  onClick={() => handleLangChange('mr')}
                  className={\`px-2.5 py-1 rounded-lg text-xs font-black transition \${
                    lang === 'mr' ? 'bg-white text-emerald-900 shadow' : 'text-emerald-200 hover:text-white'
                  }\`}
                >
                  मराठी
                </button>
              </div>`;

const replaceStr = `                <button
                  onClick={() => handleLangChange('mr')}
                  className={\`px-2.5 py-1 rounded-lg text-xs font-black transition \${
                    lang === 'mr' ? 'bg-white text-emerald-900 shadow' : 'text-emerald-200 hover:text-white'
                  }\`}
                >
                  मराठी
                </button>
                <select
                  onChange={(e) => handleLangChange(e.target.value)}
                  value={['en', 'hi', 'mr'].includes(lang) ? '' : lang}
                  className="bg-emerald-800 text-emerald-100 text-xs font-black px-2 py-1 rounded-lg outline-none border-none ml-1 appearance-none"
                >
                  <option value="" disabled>More...</option>
                  <option value="bn">বাংলা</option>
                  <option value="gu">ગુજરાતી</option>
                  <option value="kn">ಕನ್ನಡ</option>
                  <option value="te">తెలుగు</option>
                  <option value="ta">தமிழ்</option>
                </select>
              </div>`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, replaceStr);
  fs.writeFileSync(path, content, 'utf8');
  console.log("Patched App.jsx lang toggle");
} else {
  console.log("Could not find lang toggle target in App.jsx");
}
