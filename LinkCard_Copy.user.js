// ==UserScript==
// @name        LinkCard Copy
// @namespace        http://tampermonkey.net/
// @version        0.2
// @description        ウェブページ掲載のリンクカードのHTMLコードをコピーする　「Ctrk+右Click」
// @author        Ameblo User
// @match        https://ameblo.jp/*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=ameba.jp
// @noframes
// @grant        none
// @updateURL        https://github.com/personwritep/LinkCard_Copy/raw/main/LinkCard_Copy.user.js
// @downloadURL        https://github.com/personwritep/LinkCard_Copy/raw/main/LinkCard_Copy.user.js
// ==/UserScript==


menu_set();

function menu_set(){
    let SVG_cp=
        '<svg class="svg_cp" viewBox="0 0 16 16">'+
        '<path d="M0 6.8C0 5.8 .8 5 1.8 5h1.5a0.8 .8 0 0 1 0 1.5h-1.5a0.3 .3 0 0 '+
        '0-0.3 .3v7.5c0 .138.112.25.25.25h7.5a0.3 .3 0 0 0 0.3-0.3v-1.5a0.8 .8 0 '+
        '0 1 1.5 0v1.5A1.8 1.8 0 0 1 9.3 16h-7.5A1.8 1.8 0 0 1 0 14.3Z"></path>'+
        '<path d="M5 1.8C5 0.8 5.8 0 6.8 0h7.5C15.2 0 16 0.8 16 1.8v7.5A1.8 1.8 0'+
        ' 0 1 14.3 11h-7.5A1.8 1.8 0 0 1 5 9.3Zm1.8-0.3a0.3 .3 0 0 0-0.3 .3v7.5c0'+
        ' .138.112.25.25.25h7.5a0.3 .3 0 0 0 0.3-0.3v-7.5a0.3 .3 0 0 0-0.3-0.3Z">'+
        '</path></svg>';

    let sw=
        '<div class="lc_copy"><span>Copied</span>'+ SVG_cp +'</div>'+
        '<style>'+
        '.lc_copy { font: bold 16px Meiryo; position: absolute; display: none; '+
        'padding: 3px 8px 1px; text-align: right; '+
        'border: 1px solid #fff; border-radius: 4px; color: #fff; background: #0288d1; '+
        'box-shadow: 4px 4px 2px -2px rgba(0, 0, 0, 0.5); cursor: pointer; } '+
        '.lc_copy:hover { background: #1565c0; } '+
        '.svg_cp { width: 20px; height: 16px; vertical-align: -2px; fill: #fff; margin-left: 8px; }'+
        '</style>';

    if(!document.querySelector('.lc_copy')){
        document.body.insertAdjacentHTML('beforeend', sw); }}



document.addEventListener('contextmenu', function(event){
    let body=document.body;
    let zoom_f=window.getComputedStyle(body).getPropertyValue('zoom');
    if(!zoom_f){
        zoom_f=1; } // 拡大ツールがない環境の場合

    let lc_copy=document.querySelector('.lc_copy');
    if(lc_copy){
        let elem=document.elementFromPoint(event.clientX, event.clientY);
        if(elem){
            let card_root=elem.closest('.ogpCard_root');
            if(card_root){ // リンクカードの場合
                if(event.ctrlKey){
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    lc_copy.style.display='block';
                    lc_copy.style.left=(event.pageX)/zoom_f +"px";
                    lc_copy.style.top=((event.pageY)/zoom_f -34) +"px";

                    get_copy(card_root, lc_copy); }

                else{ //「Ctrl」キーを押さない場合
                    lc_copy.style.display='none'; }}

            else{ // リンクカード以外を右Clickした場合
                lc_copy.style.display='none'; }

        }} // if(lc_copy)
});



function get_copy(card, sw){
    let sw_span=sw.querySelector('span');
    if (navigator.clipboard){
        navigator.clipboard.writeText(card.outerHTML)
        setTimeout(()=>{
            sw.style.display='none';
        }, 1500 );
    }} // get_copy()
