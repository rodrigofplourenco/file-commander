<h1>File Commander</h1>
<p>An application that allows you to execute filesystem events through command.txt file.</p>
<p>I've made this project in order to learn deeply about the fs module of Node.js</p>

<h2>Setup</h2>
<p><code>npm install</code></p>
<p><code>npm run start</code></p>

<h2>Commands (just replace %tag% with whatever you want in command.txt)</h2>
<p><code>create the file %path%</code></p>
<p><code>delete the file %path%</code></p>
<p><code>rename the file %oldPath% to %newPath%</code></p>
<p><code>add to the file %path%: %text%</code></p>

<h2>Warnings</h2>
<p>It only supports one command at a time</p>
<p>You can add multiple lines in add to the file command</p>
<p>Rename command can also be used to MOVE files</p>
<p>Add to file command can also be used to CREATE files with content</p>
