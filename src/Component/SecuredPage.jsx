import React, { useEffect, useState } from "react";
import EChartsReact from "echarts-for-react";

const SecuredPage = () => {
  const [socket, setSocket] = useState(null);
  const [response, setResponse] = useState(null); // Les données JSON reçues
  const [tempData, setTempData] = useState([]); // Historique des températures
  const [timeData, setTimeData] = useState([]); // Horodatage des mesures

  useEffect(() => {
    const ws = new WebSocket("ws://wttr.in/Paris?format=%C+%t");
    setSocket(ws);

    ws.onopen = () => {
      console.log("Connexion WebSocket établie");
    };

    ws.onmessage = (event) => {
      console.log("Message reçu du serveur WebSocket:", event.data);
      const data = JSON.parse(event.data);
      setResponse(data); // Mémoriser les données complètes reçues

      // Mise à jour des séries de données pour le graphique
      if (data && data.main && data.main.temp) {
        const currentTemp = data.main.temp;
        const currentTime = new Date().toLocaleTimeString();
        console.log("Température actuelle:", currentTemp);
        console.log("Horodatage:", currentTime);
        setTempData((prevTempData) => [...prevTempData, currentTemp]);
        setTimeData((prevTimeData) => [...prevTimeData, currentTime]);
      } else {
        console.log("Données météo invalides ou manquantes:", data);
      }
    };

    ws.onclose = () => {
      console.log("Connexion WebSocket fermée");
    };

    ws.onerror = (error) => {
      console.error("Erreur WebSocket:", error);
    };

    return () => {
      console.log("Fermeture du WebSocket");
      ws.close();
    };
  }, []);

  // Configuration du graphique en courbes (Température)
  const tempOption = {
    title: {
      text: "Évolution de la température",
    },
    xAxis: {
      type: "category",
      data: timeData, // Horodatages
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} °C",
      },
    },
    series: [
      {
        data: tempData, // Températures
        type: "line",
        smooth: true,
      },
    ],
  };

  // Configuration du graphique en barres (Autres données météo)
  const barOption = {
    title: {
      text: "Répartition des données météo",
    },
    tooltip: {},
    xAxis: {
      type: "category",
      data: ["Température", "Humidité", "Pression"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Valeur",
        type: "bar",
        data: response
          ? [response.main.temp, response.main.humidity, response.main.pressure]
          : [0, 0, 0], // Si les données ne sont pas encore chargées
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">WebSocket Client avec Météo</h1>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">
          Température en temps réel
        </h3>
        <div className="bg-white p-4 rounded shadow">
          <EChartsReact option={tempOption} />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Données météo actuelles</h3>
        <div className="bg-white p-4 rounded shadow">
          <EChartsReact option={barOption} />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">
          Données reçues du serveur :
        </h3>
        <pre className="bg-white p-4 rounded shadow">
          {response
            ? JSON.stringify(response, null, 2)
            : "Aucune donnée reçue pour l'instant"}
        </pre>
      </div>
    </div>
  );
};

export default SecuredPage;

// import React, { useEffect, useState } from "react";
// import EChartsReact from "echarts-for-react";

// const SecuredPage = () => {
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
//     <div>
//       <h1>WebSocket Client avec Météo</h1>

//       <div>
//         <h3>Température en temps réel</h3>
//         <EChartsReact option={tempOption} />
//       </div>

//       <div>
//         <h3>Données météo actuelles</h3>
//         <EChartsReact option={barOption} />
//       </div>

//       <div>
//         <h3>Données reçues du serveur :</h3>
//         <p>
//           {response
//             ? JSON.stringify(response)
//             : "Aucune donnée reçue pour l'instant"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SecuredPage;
