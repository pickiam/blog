var name = 'windowsName';
var a = {
    name: 'aname',
    fn: function () {
        console.log(this.name)
    }
}
var f = a.fn;
f(); 