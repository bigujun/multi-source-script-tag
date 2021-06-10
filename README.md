<!-- bigujun - 2021 -->
# Multi Source Script

This is an example of how to retry loading some script file from multiple sources, in case some of the hosts go down.

Its just a simple script that keeps appending `script` tags from an url list until one successfully loads

In my case i use this to load different apps if the client is connect to the company vpn.
try load first app `https://just-on-vpn/full-app.js`  if can't reach the file probably its outside vpn, then loads next from the list `https://public-site/basic-app.js`

# Usage

Download the file [multisrc.js](multisrc.js) to your project.



### Option A - Pass urls by attribute
 Just add atributes to the script tag starting with `src`, loads will occur in alphabetical order of attribute name.

```html
    <script src="multisrc.js" 
        src1="https://main-source/my-script.js"
        src2="https://backup-source/my-script.js"
        src3="https://just-to-be-sure/my-script.js"
        onerror="alert('Failed: Servers are unreachable!')"
    ></script>
```

### Option B - Direct calling function
direct call function and pass an array of urls

```js
    function loadOneOf(urls: string[], onerror?: () => {}): void
```

```html
<script src="multisrc.js" ></script>
<script>
    loadOneOf([
        "https://main-source/my-script.js",
        "https://backup-source/my-script.js",
        "https://just-to-be-sure/my-script.js",
    ])
</script>
```



# Utils

Some times your script will need to know from whatever Host he is pulled from, to load some other files / assets ...

Use this function in your script to get the origin

```js
function getScriptOrigin(){
    const scriptSrc = document.currentScript.getAttribute('src')
    try{
        const url = new URL(scriptSrc)
        return url.origin
    }catch(e){
        return return window.location.origin
    }
}

console.log('Pulled from:', getScriptOrigin())
```
