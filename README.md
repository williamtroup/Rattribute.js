<h1 align="center">
Rattribute.js

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Rattribute.js%2C%20a%20free%20JavaScript%json%20converter&url=https://github.com/williamtroup/Rattribute.js&hashtags=javascript,json,html,converter)
[![npm](https://img.shields.io/badge/npmjs-v1.3.1-blue)](https://www.npmjs.com/package/rattribute.js)
[![nuget](https://img.shields.io/badge/nuget-v1.3.1-purple)](https://www.nuget.org/packages/Rattribute.js/)
[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/williamtroup/Rattribute.js/blob/main/LICENSE.txt)
[![discussions Welcome](https://img.shields.io/badge/discussions-Welcome-red)](https://github.com/williamtroup/Rattribute.js/discussions)
[![coded by William Troup](https://img.shields.io/badge/coded_by-William_Troup-yellow)](https://william-troup.com/)
</h1>

> <p align="center">❓ Rattribute.js allows you to define different HTML attributes for different viewport widths using simple data-* attributes. Whether you need to change classes, targets, ARIA attributes, or any other HTML attribute, Rattribute.js updates your elements automatically as the browser size changes — without writing responsive JavaScript.</p>
> <p align="center">v1.3.1</p>
<br />
<br />


<h1>What features does Rattribute.js have?</h1>

- 🚀 Zero dependencies and lightweight.
- 📝 Written in TypeScript with excellent editor support.
- 📱 Responsive breakpoints matching Bootstrap (`xs`–`xxl`), plus custom sizes.
- 🔄 Automatically detects new DOM elements.
- ⚙️ Public API for manual control.
- 🎯 Ignore specific elements when needed.
- 🧩 Set attribute values directly or from function calls.
<br />
<br />


<h1>What browsers are supported?</h1>

Rattribute.js works in all modern browsers, including:
- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari
- Opera
<br>
<br>


<h1>What are the most recent changes?</h1>

To see a list of all the most recent changes, click [here](docs/CHANGE_LOG.md).
<br>
<br>


<h1>How do I install Rattribute.js?</h1>

You can install the library with npm into your local modules directory using the following command:

```bash
npm install rattribute.js
```

Or, you can also use the following CDN links:

```markdown
https://cdn.jsdelivr.net/gh/williamtroup/Rattribute.js@1.3.1/dist/rattribute.min.js
```
<br>
<br>


<h1>How do I get started?</h1>

To get started using Rattribute.js, do the following steps:
<br>
<br>

### 1. Prerequisites:

Make sure you include the "DOCTYPE html" tag at the top of your HTML, as follows:

```markdown
<!DOCTYPE html>
```
<br>


### 2. Include Files:

```markdown
<script src="dist/rattribute.js"></script>
```
<br>


### 3. Setup Elements:

```markdown
<p><a href="https://www.william-troup.com/" data-rattribute-js-xs="target=_blank;class=xs-class" target="_self">Test Link XS</a></p>
<p><a href="https://www.william-troup.com/" data-rattribute-js-sm="target=_blank;class=sm-class" target="_self">Test Link SM</a></p>
<p><a href="https://www.william-troup.com/" data-rattribute-js-md="target=_blank;class=md-class" target="_self">Test Link MD</a></p>
<p><a href="https://www.william-troup.com/" data-rattribute-js-lg="target=_blank;class=lg-class" target="_self">Test Link LG</a></p>
<p><a href="https://www.william-troup.com/" data-rattribute-js-xl="target=_blank;class=xl-class" target="_self">Test Link XL</a></p>
<p><a href="https://www.william-troup.com/" data-rattribute-js-xxl="target=_blank;class=xxl-class" target="_self">Test Link XXL</a></p>
<p><a href="https://www.william-troup.com/" data-rattribute-js-xxxl="target=_blank;class=xxxl-class" target="_self">Test Link XXXL</a></p>
<p><a href="https://www.william-troup.com/" data-rattribute-js-800="target=_blank;class=800-class" data-rattribute-js-lg="target=_parent;class=lg-class" target="_self">Test Link (800, MD)</a></p>
<p><a href="https://www.william-troup.com/" data-rattribute-js-ignore="true" data-rattribute-js-600="target=_blank;class=600-class" target="_self">Test Link (600, Ignore)</a></p>
<p><a href="https://www.william-troup.com/" data-rattribute-js-ignore="false" data-rattribute-js-600="target=targetFunc()" data-rattribute-js-md="target=targetFuncWithArgs(true)" target="targetFuncWithArgs(false)">Test Link (600, From Functions)</a></p>
```

Rattribute.js automatically updates the element when the viewport crosses the configured width.

<br>


### 4. Finishing Up:

That's it! Nice and simple. Please refer to the code if you need more help (fully documented).
<br>
<br>

<h1>How do I go about customizing Rattribute.js?</h1>

To customize, and get more out of Rattribute.js, please read through the following documentation.


### 1. Public Functions:

To see a list of all the public functions available, click [here](docs/PUBLIC_FUNCTIONS.md).


### 2. Configuration:

Configuration options allow you to customize how Rattribute.js will function.  You can set them as follows:

```markdown
<script> 
    $rattribute.setConfiguration( {
        responsiveDelay: 500
    } );
</script>
```

To see a list of all the available configuration options you can use, click [here](docs/CONFIGURATION.md).