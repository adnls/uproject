export default {
    items: [
        {
            title: true,
            name: 'Charts',
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
            name: 'Global Chart',
            url: '/dashboard',
            icon: 'icon-pie-chart',
            children: [
                {
                    name: 'Font Awesome',
                    url: '/icons/font-awesome',
                    icon: 'icon-star',
                    badge: {
                        variant: 'secondary',
                        text: '4.7'
                    }
                },
                {
                    name: 'Simple Line Icons',
                    url: '/icons/simple-line-icons',
                    icon: 'icon-star'
                }
            ]
        }
        ,
        {
            name: 'Other Chart',
            url: '/dashboard',
            icon: 'icon-vector'
        }
        ,
        {
            title: true,
            name: 'Infos',
            wrapper: {            // optional wrapper object
                element: '',        // required valid HTML5 element tag
                attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
            }
            ,
            class: ''             // optional class names space delimited list for title item ex: "text-center"
        }
        ,
        {
            name: 'Bliblibli',
            url: '/dashboard',
            icon: 'icon-umbrella'
        }
        ,
        {
            name: 'Bloubloublou',
            url: '/dashboard',
            icon: 'icon-pin'
        }
        ,
        {
            name: 'Currency',
            url: '/dashboard',
            icon: 'icon-puzzle',
            badge: {
                variant: 'info',
                text: 'NEW'
            }
        }
        ,
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


