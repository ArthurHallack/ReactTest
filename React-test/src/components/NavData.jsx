import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons"
import { faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import { faGears } from "@fortawesome/free-solid-svg-icons";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";

export const NavData = [
    {   
        id: "1",
        title: "Home",
        icon: <FontAwesomeIcon icon={faHouseChimney} />,
        link: "/Home"
    },

    {
        id: "2",
        title: "Usuario",
        icon: <FontAwesomeIcon icon={faUser} />
    },

    {
        id:"3",
        title: "Cadastro",
        icon: <FontAwesomeIcon icon={faUserGroup} />
    },

    {   
        id: "4",
        title: "Tabelas",
        icon: <FontAwesomeIcon icon={faTableList} />
    },

    {
        id: "5",
        title: "Graficos",
        icon: <FontAwesomeIcon icon={faChartPie} />
    },

    {
        id: "6",
        title: "Configurações",
        icon: <FontAwesomeIcon icon={faGears} />
    }
]


export const NavData2 = [
    {
        id: "1",
        title: "Pais"
    },

    {
        id: "2",
        title: "Municipio"
    },

    {
        id: "3",
        title: "Aeroporto"
    }
]