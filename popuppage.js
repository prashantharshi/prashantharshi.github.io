
(function () {
    $(document).ready(function () {
        var a = 3;
        // var url = window.localStorage.getItem("popurl");
        try {
            function getCookie(cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1);
                    if (c.indexOf(name) == 0)
                        return c.substring(name.length, c.length);
                }
                return "";
            }
            var url = decodeURIComponent(getCookie("url"));
            window.location.href = url;

            var expired = new Date(today.getTime() - 24 * 3600 * 1000); // less 24 hours

            function deleteCookie(name) {
                document.cookie = name + "=null; path=/; expires=" + expired.toGMTString();
            }
            deleteCookie("url");
        } catch (ex) {
            console.log(ex.message);
        }
       
    });
})();
