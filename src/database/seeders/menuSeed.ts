const posts = [
    {
        "menu": "Inicio",
        "icon": "icono.png",
        "description": "Menú inicio",
        "name_es": "Menu inicio",
        "name_en": "Menú",
        "sub_menu": [
            {
                "cod_sub_menu":"Inicio",
                "route": "https://test.com",
                "description": "Inicio",
                "level": "2",
                "alerts": "yes",
                "name_es": "Inicio",
                "name_en": "Start",
                "logic": "a",
            },
            {
                "cod_sub_menu":"Configuración",
                "route": "https://test.com",
                "description": "Configuración",
                "level": "2",
                "alerts": "no",
                "name_es": "Configuración",
                "name_en": "Settings",
                "logic": "a",
            }
        ],
        "logic": "a"
    },
    {
        "menu": "Administración",
        "icon": "admin.png",
        "description": "Administración",
        "name_es": "Administración",
        "name_en": "Administration",
        "sub_menu": [
            {
                "cod_sub_menu":"Adelantos",
                "route": "https://test.com",
                "description": "Adelantos",
                "level": "2",
                "alerts": "yes",
                "name_es": "Adelantos",
                "name_en": "Advance",
                "logic": "a",
            },
            {
                "cod_sub_menu":"Bancos",
                "route": "https://test.com",
                "description": "Bancos",
                "level": "2",
                "alerts": "no",
                "name_es": "Bancos",
                "name_en": "Banks",
                "logic": "a",
            },
            {
                "cod_sub_menu":"Compras",
                "route": "https://test.com",
                "description": "Compras",
                "level": "2",
                "alerts": "no",
                "name_es": "Compras",
                "name_en": "Shoppings",
                "logic": "a",
            }
        ],
        "logic": "a"
    },
] 

export default posts;