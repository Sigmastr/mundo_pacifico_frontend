import "./App.css";
import {
  Button,
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
function App() {
  const [region, setRegion] = React.useState([]);
  const [regionSeleccionada, setRegionSeleccionada] = React.useState("");
  const [provincia, setProvincia] = React.useState([]);
  const [provinciaSeleccionada, setProvinciaSeleccionada] = React.useState("");
  const [ciudad, setCiudad] = React.useState([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = React.useState("");
  const [calle, setCalle] = React.useState([]);

  const handleChange = (event) => {
    setRegionSeleccionada(event.target.value);
    setProvinciaSeleccionada("");
    setCiudadSeleccionada("");
    setCiudad([]);
    setProvincia([]);
  };

  const handleChange2 = (event) => {
    setProvinciaSeleccionada(event.target.value);

    setCiudadSeleccionada("");
  };
  const handleChange3 = (event) => {
    setCiudadSeleccionada(event.target.value);
  };
  const filtrar = () => {
    obtenerCalles();
  };

  const obtenerCalles = () => {
    try {
      fetch(`http://127.0.0.1:8000/api/calle/conditional`, {
        method: "POST",
        body: JSON.stringify({
          id_region: regionSeleccionada,
          id_provincia: provinciaSeleccionada,
          id_ciudad: ciudadSeleccionada,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        res.json().then((data) => {
          setCalle(data);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  const obtenerRegiones = () => {
    fetch(`http://127.0.0.1:8000/api/region/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRegion(data);
      });
  };
  const obtenerProvincia = (id) => {
    //console.log(data);
    fetch(`http://127.0.0.1:8000/api/provincia/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respuesta) => respuesta.json())
      .then((data) => {
        setProvincia(data);
      });
  };

  const obtenerCiudad = (id) => {
    fetch(`http://127.0.0.1:8000/api/ciudad/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respuesta) => respuesta.json())
      .then((data) => {
        setCiudad(data);
      });
  };

  // const obtenerCalles = (id) => {
  //   fetch(`http://127.0.0.1:8000/api/calle/get/${id}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((respuesta) => respuesta.json())
  //     .then((data) => {
  //       setCalle(data);
  //     });
  // };

  React.useEffect(() => {
    obtenerRegiones();
  }, []);
  React.useEffect(() => {
    obtenerProvincia(regionSeleccionada);
    // obtenerCallesProvincias(regionSeleccionada);
  }, [regionSeleccionada]);

  React.useEffect(() => {
    obtenerCiudad(provinciaSeleccionada);
  }, [provinciaSeleccionada]);

  const columns = [{ field: "nombre", headerName: "Nombre", width: 400 }];

  return (
    <div className="App">
      <div className="contenedor-principal">
        <div className="formulario">
          {/* falta filtrar con un botón, puede ser solo con región o region y provicia o las 3 */}

          <Card style={{ width: "60%", marginLeft: "5%" }}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Región
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={regionSeleccionada}
                onChange={handleChange}
                label="Región"
              >
                <MenuItem value="">
                  <em>Seleccione Región</em>
                </MenuItem>
                {region.map((e) => {
                  return (
                    <MenuItem key={e.id} value={e.id}>
                      {e.nombre}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Provincia
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={provinciaSeleccionada}
                onChange={handleChange2}
                label="Provincia"
              >
                <MenuItem value="">
                  <em>Seleccione una Provincia</em>
                </MenuItem>
                {provincia.map((e) => {
                  return (
                    <MenuItem key={e.id} value={e.id}>
                      {e.nombre}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Ciudad
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={ciudadSeleccionada}
                onChange={handleChange3}
                label="Ciudad"
              >
                <MenuItem value="">
                  <em>Selecciona una Ciudad</em>
                </MenuItem>
                {ciudad.map((e) => {
                  return (
                    <MenuItem key={e.id} value={e.id}>
                      {e.nombre}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              style={{ marginTop: "3%" }}
              onClick={filtrar}
            >
              Filtrar
            </Button>
          </Card>
          <div className="grilla" style={{ marginTop: "1%" }}>
            <Card
              style={{
                height: 400,
                width: "60%",
                marginLeft: "5%",
              }}
            >
              <DataGrid rows={calle} columns={columns} pageSize={10} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
