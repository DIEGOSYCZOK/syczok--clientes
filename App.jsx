import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.png";

const CLIENTES_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWqFSzzr_VpOZJjbNJu9YCFI3y605OofLcq2GgSem_bP0RfrVERRItbGsA9p_zJkJ4vdHpDRlug7R0/pub?gid=0&single=true&output=csv";
const VEHICULOS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWqFSzzr_VpOZJjbNJu9YCFI3y605OofLcq2GgSem_bP0RfrVERRItbGsA9p_zJkJ4vdHpDRlug7R0/pub?gid=436954777&single=true&output=csv";
const SERVICE_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWqFSzzr_VpOZJjbNJu9YCFI3y605OofLcq2GgSem_bP0RfrVERRItbGsA9p_zJkJ4vdHpDRlug7R0/pub?gid=2063028054&single=true&output=csv";

function csvToJson(csv) {
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const obj = {};

    headers.forEach((header, index) => {
      obj[header] = values[index]?.trim() || "";
    });

    return obj;
  });
}

export default function SyczokClientes() {
  const [telefono, setTelefono] = useState("");
  const [cliente, setCliente] = useState(null);
  const [vehiculos, setVehiculos] = useState([]);
  const [services, setServices] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  async function ingresar() {
    setLoading(true);
    setMensaje("");

    try {
      const [clientesRes, vehiculosRes, servicesRes] = await Promise.all([
        fetch(CLIENTES_URL),
        fetch(VEHICULOS_URL),
        fetch(SERVICE_URL),
      ]);

      const clientesCsv = await clientesRes.text();
      const vehiculosCsv = await vehiculosRes.text();
      const servicesCsv = await servicesRes.text();

      const clientes = csvToJson(clientesCsv);
      const vehiculosData = csvToJson(vehiculosCsv);
      const servicesData = csvToJson(servicesCsv);

      const clienteEncontrado = clientes.find(
        (c) =>
          c.TELEFONO?.replace(/\s/g, "") ===
          telefono.replace(/\s/g, "")
      );

      if (!clienteEncontrado) {
        setMensaje("Número no encontrado");
        setCliente(null);
        setVehiculos([]);
        setServices([]);
        setLoading(false);
        return;
      }

      setCliente(clienteEncontrado);

      const vehiculosCliente = vehiculosData.filter(
        (v) =>
          v.TELEFONO?.replace(/\s/g, "") ===
          telefono.replace(/\s/g, "")
      );

      setVehiculos(vehiculosCliente);

      const servicesCliente = servicesData.filter(
        (s) =>
          s.TELEFONO?.replace(/\s/g, "") ===
          telefono.replace(/\s/g, "")
      );

      setServices(servicesCliente);
    } catch (error) {
      setMensaje("Error cargando datos");
    }

    setLoading(false);
  }

  const proximoControl = useMemo(() => {
    if (!cliente) return "";

    return cliente["PROXIMO CONTROL"] || "Sin información";
  }, [cliente]);

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div style={{ maxWidth: "450px", margin: "0 auto" }}>
        <div
          style={{
            background: "#18181b",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
         <img
  src={logo}
  alt="SYCZOK"
  style={{
    width: "120px",
    marginBottom: "15px",
  }}
/>
          <h1>SYCZOK CLIENTES</h1>
          <p>Mecánica Integral</p>
        </div>

        {!cliente ? (
          <div
            style={{
              background: "#18181b",
              borderRadius: "20px",
              padding: "20px",
            }}
          >
            <p>Ingresá tu número de celular</p>

           <input
  value={telefono}
  onChange={(e) => setTelefono(e.target.value)}
  placeholder="Número de celular"
  style={{
    width: "250px",
    maxWidth: "100%",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "10px",
    display: "block",
    margin: "0 auto 10px auto",
  }}
              
            />

            <button
  onClick={ingresar}
  style={{
    width: "250px",
    maxWidth: "100%",
    padding: "12px",
    borderRadius: "10px",
    background: "red",
    color: "white",
    border: "none",
    display: "block",
    margin: "0 auto",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
  {loading ? "Cargando..." : "Ingresar ↵"}
</button>
            {mensaje && (
              <p style={{ marginTop: "15px", color: "#f87171" }}>
                {mensaje}
              </p>
            )}
          </div>
        ) : (
          <>
            <div
              style={{
                background: "#18181b",
                borderRadius: "20px",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <h2>{cliente.CLIENTE}</h2>
              <p>{cliente.OBSERVACIONES}</p>
            </div>

            <div
              style={{
                background: "#18181b",
                borderRadius: "20px",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <h2>Vehículos</h2>

              {vehiculos.map((v, index) => (
                <div
                  key={index}
                  style={{
                    background: "#27272a",
                    padding: "15px",
                    borderRadius: "10px",
                    marginTop: "10px",
                  }}
                >
                  <div>
                    <strong>{v.MARCA}</strong>
                  </div>

                  <div>Patente: {v.PATENTE}</div>
                  <div>Año: {v.AÑO}</div>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "#18181b",
                borderRadius: "20px",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <h2>Próximo Control</h2>
              <p>{proximoControl}</p>
            </div>

            <div
              style={{
                background: "#18181b",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <h2>Historial</h2>

              {services.map((s, index) => (
                <div
                  key={index}
                  style={{
                    background: "#27272a",
                    padding: "15px",
                    borderRadius: "10px",
                    marginTop: "10px",
                  }}
                >
                  <div>KMS: {s.KMS}</div>
                  <div>Aceite: {s.ACEITE}</div>
                  <div>Filtro: {s.FILTRO}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
