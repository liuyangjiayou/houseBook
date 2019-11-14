

let domFn = {
    $hasClass(ele, cls){
        cls = cls || '';
        if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
        return new RegExp(' ' + cls + ' ').test(' ' + ele.className + ' ');
    },
    $siblings(ele) {
        var a = [];
        var p = ele.parentNode.children;
        for(var i =0,pl= p.length;i<pl;i++) {
            if(p[i] !== ele) a.push(p[i]);
        }
        return a;
    },
    $addClass(ele, cls) {
        if (!domFn.$hasClass(ele, cls)) {
            ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
        }
    },
    $removeClass(ele, cls) {
        if (domFn.$hasClass(ele, cls)) {
          var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
          while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
          }
          ele.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    }
}
export default{
    install(Vue){
        Vue.prototype.$hasClass = domFn.$hasClass
        Vue.prototype.$siblings = domFn.$siblings
        Vue.prototype.$addClass = domFn.$addClass
        Vue.prototype.$removeClass = domFn.$removeClass
    }
}