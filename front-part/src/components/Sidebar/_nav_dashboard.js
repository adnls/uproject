export default {
    items: [
        {
            title: true,
            name: 'Market',
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
            url: '/market/globalchart',
            icon: 'icon-pie-chart'
        },
        {
            name: 'MarketRank',
            url: '/market/rank',
            icon: 'icon-vector'
        },
        {
            name: 'MarketCurrency',
            url: '/market/currency',
            icon: 'fa fa-btc',
            badge: {
                variant: 'info',
                text: 'NEW'
            },
            class: 'sidebarLastElementMargin'
        },
        {
            title: true,
            name: 'Strategy',
            url: '/Strategy',
            wrapper: {            // optional wrapper object
                element: '',        // required valid HTML5 element tag
                attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
            },
            class: 'sidebarIconTitle'             // optional class names space delimited list for title item ex: "text-center"
        },
        {
            name: 'My strategies',
            url: '/Strategy',
            icon: 'icon-layers'
        }
        ,
        {
            name: 'Create',
            url: '/Strategy',
            icon: 'icon-puzzle',
            class: 'sidebarLastElementMargin'
        }
        ,
        {
            title: true,
            name: 'Profil',
            wrapper: {            // optional wrapper object
                element: '',        // required valid HTML5 element tag
                attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
            }
        },
        {
            name: 'My Profile',
            url: '/Profil',
            icon: 'icon-user',
            class: 'sidebarLastElementMargin'
        }
    ]
}
;


