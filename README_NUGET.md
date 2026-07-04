# Rattribute.js v1.3.0

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Rattribute.js%2C%20a%20free%20JavaScript%json%20converter&url=https://github.com/williamtroup/Rattribute.js&hashtags=javascript,json,html,converter)
[![npm](https://img.shields.io/badge/npmjs-v1.3.0-blue)](https://www.npmjs.com/package/rattribute.js)
[![nuget](https://img.shields.io/badge/nuget-v1.3.0-purple)](https://www.nuget.org/packages/Rattribute.js/)
[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/williamtroup/Rattribute.js/blob/main/LICENSE.txt)
[![discussions Welcome](https://img.shields.io/badge/discussions-Welcome-red)](https://github.com/williamtroup/Rattribute.js/discussions)
[![coded by William Troup](https://img.shields.io/badge/coded_by-William_Troup-yellow)](https://william-troup.com/)

> ❓ A JavaScript library that generates responsive attribute setters for any HTML element.


## What features does Rattribute.js have?

- 😏 Zero-dependencies and extremely lightweight!
- 🦾 Written in TypeScript, allowing greater support for React, Angular, and other libraries!
- 💻 Full API available via public functions.
- ⭐ Default sizes consistent with Bootstrap: xs, sm, md, lg, xl, xxl, along with extra xxxl.
- 🌈 Set your own custom size attributes!
- 🎥 Toggling responsiveness on/off support.
- 📃 Auto fetch support (when HTML is added via 3rd party libraries).
- ☑️ Set up which elements to ignore.
- 🔨 Set attribute values from function calls!


## What browsers are supported?

All modern browsers (such as Google Chrome, FireFox, and Opera) are fully supported.


## What are the most recent changes?

To see a list of all the most recent changes, click [here](docs/CHANGE_LOG.md).


## How do I install Rattribute.js?

You can install the library with npm into your local modules directory using the following command:

```markdown
npm install rattribute.js
```

Or, you can also use the following CDN links:

```markdown
https://cdn.jsdelivr.net/gh/williamtroup/Rattribute.js@1.3.0/dist/rattribute.min.js
```


## How do I get started?

To get started using Rattribute.js, do the following steps:

### 1. Prerequisites:

Make sure you include the "DOCTYPE html" tag at the top of your HTML, as follows:

```markdown
<!DOCTYPE html>
```

### 2. Include Files:

```markdown
<script src="dist/rattribute.js"></script>
```

### 3. Setup Elements

```markdown
<p><a href="https://www.william-troup.com/" data-rattribute-js-xs="target=_blank;class=xs-class" target="_self">Test Link XS</a></p>
<p><a href="https://www.william-troup.com/" data-rattribute-js-sm="target=_blank;class=sm-class" target="_self">Test Link SM</a></p>
<p><a href="https://www.william-troup.com/" data-rattribute-js-md="target=_blank;class=md-class" target="_self">Test Link MD</a></p>
<p><a href="https://www.william-troup.com/" data-rattribute-js-lg="target=_blank;class=lg-class" target="_self">Test Link LG</a></p>
<p><a href="https://www.william-troup.com/" data-rattribute-js-xl="target=_blank;class=xl-class" target="_self">Test Link XL</a></p>
<p><a href="https://www.william-troup.com/" data-rattribute-js-xxl="target=_blank;class=xxl-class" target="_self">Test Link XXL</a></p>
<p><a href="https://www.william-troup.com/" data-rattribute-js-xxxl="target=_blank;class=xxxl-class" target="_self">Test Link XXXL</a></p>
<p><a href="https://www.william-troup.com/" data-rattribute-js-800="target=_blank;class=800-class" data-rattribute-js-lg="target=_parent;class=lg-class" target="_self">Test Link (800, MD)</a></p>
<p><a href="https://www.william-troup.com/" data-rattribute-js-600="target=_blank;class=600-class" data-rattribute-js-ignore="true" target="_self">Test Link (600, Ignore)</a></p>
<p><a href="https://www.william-troup.com/" data-rattribute-js-600="target=targetFunc()" data-rattribute-js-md="target=targetFuncWithArgs(true)" target="targetFuncWithArgs(false)">Test Link (600, From Functions)</a></p>
```


### 4. Finishing Up:

That's it! Nice and simple. Please refer to the code if you need more help (fully documented).


## How do I go about customizing Rattribute.js?

To customize, and get more out of Rattribute.js, please read through the following documentation.


### 5. Configuration:

Configuration options allow you to customize how Rattribute.js will function.  You can set them as follows:

```markdown
<script> 
    $rattribute.setConfiguration( {
        responsiveDelay: 500
    } );
</script>
```