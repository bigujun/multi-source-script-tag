'use strict'
/** bigujun - 2021 */

/**
 * Create a `<script>` tags based on urls, if occur an error appends next from the list
 * @param {string[]} urls 
 * @param {() => {}} onerror called after all urls have failed
 * @returns 
 */
function loadOneOf(urls, onerror){
    if(!Array.isArray(urls) || !urls.length)
        return
    const tryScript = (index) =>{
        const src = urls[index]
        if(!src){
            if(onerror && onerror.call)
                onerror.call()
            return
        }
        var tag = document.createElement('script');
        tag.src = src
        tag.onerror = () => tryScript(++index)
        document.head.appendChild(tag);
    }
    tryScript(0)
}

/**
 * will auto execute and check self script tag for attributes starting with `src`
 */
function autoLoadTags(){
    const tags = []
    for(const {name, value} of document.currentScript.attributes){
        if(name !== 'src' && name.startsWith('src'))
            tags.push({name, value})
    }
    const urls = tags
        .sort((a, b) => a.name >= b.name ? 1 : -1)
        .map(t => t.value)
    loadOneOf(urls, document.currentScript.onerror)
}

autoLoadTags()