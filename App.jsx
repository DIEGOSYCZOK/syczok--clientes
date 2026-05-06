import { useMemo, useState } from "react";

const VEHICULOS = [
  { marca: "Toyota", patente: "AB123CD", kilometraje: "98.500 km" },
  { marca: "Volkswagen", patente: "AC456EF", kilometraje: "74.200 km" },
];

const HISTORIAL = [
  "10/03/2026 · Cambio de aceite y filtros · 98.500 km",
  "15/12/2025 · Cambio de pastillas de freno · 91.200 km",
];

export default function SyczokPrototype() {
  const [telefono, setTelefono] = useState("");
  const [ingreso, setIngreso] = useState(false);
  const vehiculo = useMemo(() => VEHICULOS[0], []);

  return (
    <div
      style={{
        background: "black",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div
          style={{
            background: "#18181b",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          <h1>SYCZOK CLIENTES</h1>
          <p>Mecánica Integral</p>
        </div>

        {!ingreso ? (
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
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "10px",
                border: "none",
              }}
            />

            <button
              onClick={() => setIngreso(true)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                background: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Ingresar
            </button>
          </div>
        ) : (
          <>
            <div
              style={{
                background: "#18181b",
                borderRadius: "20px",
                padding: "20px",
                marginTop: "20px",
              }}
            >
              <h2>Vehículos asociados</h2>

              {VEHICULOS.map((v) => (
                <div
                  key={v.patente}
                  style={{
                    background: "#27272a",
                    padding: "15px",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <div>
                    {v.marca} · {v.patente}
                  </div>

                  <div>{v.kilometraje}</div>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "#18181b",
                borderRadius: "20px",
                padding: "20px",
                marginTop: "20px",
              }}
            >
              <h2>Próximo control</h2>

              <p>
                {vehiculo.patente} · 105.000 km o 15/08/2026
              </p>
            </div>

            <div
              style={{
                background: "#18181b",
                borderRadius: "20px",
                padding: "20px",
                marginTop: "20px",
              }}
            >
              <h2>Historial</h2>

              {HISTORIAL.map((item) => (
                <div
                  key={item}
                  style={{
                    background: "#27272a",
                    padding: "15px",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
