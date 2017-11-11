export default {
    items: [
        {
            title: true,
            name: 'My Profile',
            wrapper: {            // optional wrapper object
                element: '',        // required valid HTML5 element tag
                attributes: {
                    style: {
                        backgorundColor: "#33444c"
                    }
                }        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
            },
            class: ''             // optional class names space delimited list for title item ex: "text-center"
        },
        {
            title: true,
            name: 'Settings',
            wrapper: {            // optional wrapper object
                element: '',        // required valid HTML5 element tag
                attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
            }
            ,
            class: ''             // optional class names space delimited list for title item ex: "text-center"
        }
        ,
        {
            name: 'Random Settings',
            url: '/dashboard',
            icon: 'icon-settings'
        }
    ]
}
;


