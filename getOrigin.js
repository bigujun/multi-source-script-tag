/** bigujun - 2021 */

function getScriptOrigin(){
    const scriptSrc = document.currentScript.getAttribute('src')
    try{
        const url = new URL(scriptSrc)
        return url.origin
    }catch(e){
        return window.location.origin
    }
}

alert('Hello from ' + getScriptOrigin())