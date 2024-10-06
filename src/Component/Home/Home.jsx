import React, { useEffect, useState } from "react";
import EChartsReact from "echarts-for-react";

const Home = () => {
  const [socket, setSocket] = useState(null);
  const [response, setResponse] = useState(null);
  const [tempData, setTempData] = useState([]);
  const [timeData, setTimeData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://wttr.in/Paris?format=%C+%t");
    setSocket(ws);

    ws.onopen = () => {
      console.log("Connexion WebSocket établie");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setResponse(data);
      if (data && data.main && data.main.temp) {
        const currentTemp = data.main.temp;
        const currentTime = new Date().toLocaleTimeString();
        setTempData((prev) => [...prev, currentTemp]);
        setTimeData((prev) => [...prev, currentTime]);
      }
    };

    ws.onclose = () => {
      console.log("Connexion WebSocket fermée");
    };

    ws.onerror = (error) => {
      console.error("Erreur WebSocket:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const tempOption = {
    title: { text: "Évolution de la température", left: "center" },
    tooltip: { trigger: "axis" },
    legend: { data: ["Température"], bottom: "10%", left: "center" },
    xAxis: { type: "category", data: timeData },
    yAxis: { type: "value", axisLabel: { formatter: "{value} °C" } },
    series: [
      {
        name: "Température",
        data: tempData,
        type: "line",
        smooth: true,
        color: "#ff4500",
      },
    ],
  };

  const barOption = {
    title: { text: "Répartition des données météo", left: "center" },
    tooltip: {},
    legend: {
      data: ["Température", "Humidité", "Pression"],
      bottom: "10%",
      left: "center",
    },
    xAxis: { type: "category", data: ["Température", "Humidité", "Pression"] },
    yAxis: { type: "value" },
    series: [
      {
        name: "Valeur",
        type: "bar",
        data: response
          ? [response.main.temp, response.main.humidity, response.main.pressure]
          : [0, 0, 0],
        color: "#3e95cd",
      },
    ],
  };

  const pieOption = {
    title: {
      text: "Répartition des données météo",
      left: "center",
      top: "center",
    },
    tooltip: { trigger: "item" },
    legend: { orient: "vertical", left: "left" },
    series: [
      {
        name: "Données Météo",
        type: "pie",
        radius: "50%",
        data: [
          { value: response ? response.main.temp : 0, name: "Température" },
          { value: response ? response.main.humidity : 0, name: "Humidité" },
          { value: response ? response.main.pressure : 0, name: "Pression" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Tableau de Bord Météo
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            Température en temps réel
          </h3>
          <EChartsReact option={tempOption} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            Répartition des données météo
          </h3>
          <EChartsReact option={barOption} />
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            Distribution des paramètres météo
          </h3>
          <EChartsReact option={pieOption} />
        </div>
      </div>
    </div>
  );
};

export default Home;

// import React, { useEffect, useState } from "react";
// import EChartsReact from "echarts-for-react";

// const Home = () => {
//   const [socket, setSocket] = useState(null);
//   const [response, setResponse] = useState(null); // Les données JSON reçues
//   const [tempData, setTempData] = useState([]); // Historique des températures
//   const [timeData, setTimeData] = useState([]); // Horodatage des mesures

//   useEffect(() => {
//     const ws = new WebSocket("ws://wttr.in/Paris?format=%C+%t");
//     setSocket(ws);

//     ws.onopen = () => {
//       console.log("Connexion WebSocket établie");
//     };

//     ws.onmessage = (event) => {
//       console.log("Message reçu du serveur WebSocket:", event.data);
//       const data = JSON.parse(event.data);
//       setResponse(data); // Mémoriser les données complètes reçues

//       // Mise à jour des séries de données pour le graphique
//       if (data && data.main && data.main.temp) {
//         const currentTemp = data.main.temp;
//         const currentTime = new Date().toLocaleTimeString();
//         console.log("Température actuelle:", currentTemp);
//         console.log("Horodatage:", currentTime);
//         setTempData((prevTempData) => [...prevTempData, currentTemp]);
//         setTimeData((prevTimeData) => [...prevTimeData, currentTime]);
//       } else {
//         console.log("Données météo invalides ou manquantes:", data);
//       }
//     };

//     ws.onclose = () => {
//       console.log("Connexion WebSocket fermée");
//     };

//     ws.onerror = (error) => {
//       console.error("Erreur WebSocket:", error);
//     };

//     return () => {
//       console.log("Fermeture du WebSocket");
//       ws.close();
//     };
//   }, []);

//   // Configuration du graphique en courbes (Température)
//   const tempOption = {
//     title: {
//       text: "Évolution de la température",
//       left: "center",
//     },
//     tooltip: {
//       trigger: "axis",
//     },
//     legend: {
//       data: ["Température"],
//       bottom: "10%",
//       left: "center",
//     },
//     xAxis: {
//       type: "category",
//       data: timeData, // Horodatages
//     },
//     yAxis: {
//       type: "value",
//       axisLabel: {
//         formatter: "{value} °C",
//       },
//     },
//     series: [
//       {
//         name: "Température",
//         data: tempData, // Températures
//         type: "line",
//         smooth: true,
//         color: "#ff4500",
//       },
//     ],
//   };

//   // Configuration du graphique en barres (Autres données météo)
//   const barOption = {
//     title: {
//       text: "Répartition des données météo",
//       left: "center",
//     },
//     tooltip: {},
//     legend: {
//       data: ["Température", "Humidité", "Pression"],
//       bottom: "10%",
//       left: "center",
//     },
//     xAxis: {
//       type: "category",
//       data: ["Température", "Humidité", "Pression"],
//     },
//     yAxis: {
//       type: "value",
//     },
//     series: [
//       {
//         name: "Valeur",
//         type: "bar",
//         data: response
//           ? [response.main.temp, response.main.humidity, response.main.pressure]
//           : [0, 0, 0], // Si les données ne sont pas encore chargées
//         color: "#3e95cd",
//       },
//     ],
//   };

//   // Configuration du graphique circulaire (Diagramme à secteurs)
//   const pieOption = {
//     title: {
//       text: "Répartition des données météo",
//       left: "center",
//       top: "center",
//     },
//     tooltip: {
//       trigger: "item",
//     },
//     legend: {
//       orient: "vertical",
//       left: "left",
//     },
//     series: [
//       {
//         name: "Données Météo",
//         type: "pie",
//         radius: "50%",
//         data: [
//           { value: response ? response.main.temp : 0, name: "Température" },
//           { value: response ? response.main.humidity : 0, name: "Humidité" },
//           { value: response ? response.main.pressure : 0, name: "Pression" },
//         ],
//         emphasis: {
//           itemStyle: {
//             shadowBlur: 10,
//             shadowOffsetX: 0,
//             shadowColor: "rgba(0, 0, 0, 0.5)",
//           },
//         },
//       },
//     ],
//   };

//   return (
//     <div className="p-6 bg-gray-100">
//       <h1 className="text-2xl font-bold mb-6">Page d'Accueil</h1>

//       {/* Graphique de température */}
//       <h3 className="text-xl font-semibold mb-4">Température en temps réel</h3>
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <EChartsReact option={tempOption} />
//       </div>

//       {/* Graphique en barres */}
//       <h3 className="text-xl font-semibold mb-4">
//         Répartition des données météo
//       </h3>
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <EChartsReact option={barOption} />
//       </div>

//       {/* Graphique circulaire */}
//       <h3 className="text-xl font-semibold mb-4">
//         Distribution des paramètres météo
//       </h3>
//       <div className="bg-white p-4 rounded shadow">
//         <EChartsReact option={pieOption} />
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React, { useEffect, useState } from "react";
// import EChartsReact from "echarts-for-react";

// const Home = () => {
//   const [socket, setSocket] = useState(null);
//   const [response, setResponse] = useState(null); // Les données JSON reçues
//   const [tempData, setTempData] = useState([]); // Historique des températures
//   const [timeData, setTimeData] = useState([]); // Horodatage des mesures

//   useEffect(() => {
//     const ws = new WebSocket("ws://wttr.in/Paris?format=%C+%t");
//     setSocket(ws);

//     ws.onopen = () => {
//       console.log("Connexion WebSocket établie");
//     };

//     ws.onmessage = (event) => {
//       console.log("Message reçu du serveur WebSocket:", event.data);
//       const data = JSON.parse(event.data);
//       setResponse(data); // Mémoriser les données complètes reçues

//       // Mise à jour des séries de données pour le graphique
//       if (data && data.main && data.main.temp) {
//         const currentTemp = data.main.temp;
//         const currentTime = new Date().toLocaleTimeString();
//         console.log("Température actuelle:", currentTemp);
//         console.log("Horodatage:", currentTime);
//         setTempData((prevTempData) => [...prevTempData, currentTemp]);
//         setTimeData((prevTimeData) => [...prevTimeData, currentTime]);
//       } else {
//         console.log("Données météo invalides ou manquantes:", data);
//       }
//     };

//     ws.onclose = () => {
//       console.log("Connexion WebSocket fermée");
//     };

//     ws.onerror = (error) => {
//       console.error("Erreur WebSocket:", error);
//     };

//     return () => {
//       console.log("Fermeture du WebSocket");
//       ws.close();
//     };
//   }, []);

//   // Configuration du graphique en courbes (Température)
//   const tempOption = {
//     title: {
//       text: "Évolution de la température",
//     },
//     xAxis: {
//       type: "category",
//       data: timeData, // Horodatages
//     },
//     yAxis: {
//       type: "value",
//       axisLabel: {
//         formatter: "{value} °C",
//       },
//     },
//     series: [
//       {
//         data: tempData, // Températures
//         type: "line",
//         smooth: true,
//       },
//     ],
//   };

//   // Configuration du graphique en barres (Autres données météo)
//   const barOption = {
//     title: {
//       text: "Répartition des données météo",
//     },
//     tooltip: {},
//     xAxis: {
//       type: "category",
//       data: ["Température", "Humidité", "Pression"],
//     },
//     yAxis: {
//       type: "value",
//     },
//     series: [
//       {
//         name: "Valeur",
//         type: "bar",
//         data: response
//           ? [response.main.temp, response.main.humidity, response.main.pressure]
//           : [0, 0, 0], // Si les données ne sont pas encore chargées
//       },
//     ],
//   };

//   return (
//     <div className="p-6 bg-gray-100">
//       <h1 className="text-2xl font-bold mb-6">Page d'Accueil</h1>
//       <h3 className="text-xl font-semibold mb-4">Température en temps réel</h3>
//       <div className="bg-white p-4 rounded shadow mb-6">
//         <EChartsReact option={tempOption} />
//       </div>

//       <h3 className="text-xl font-semibold mb-4">Données météo actuelles</h3>
//       <div className="bg-white p-4 rounded shadow">
//         <EChartsReact option={barOption} />
//       </div>
//     </div>
//   );
// };

// export default Home;
