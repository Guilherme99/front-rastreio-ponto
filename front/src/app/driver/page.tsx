import { RouteModel } from "@/utils/models";
import { MapDriver } from "./MapDriver";
import { StartRouteForm } from "./StartRouteForm";

export async function getRoutes() {
  "use server";
  const response = await fetch(`${process.env.NEST_API_URL}/routes`, {
    cache: "force-cache",
    next: {
      tags: ["routes"],
    },
  });
  return response.json();
}

export async function DriverPage() {
  const routes = await getRoutes();

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-1/3 p-2 h-full w-full">
        <h4 className="text-3xl text-contrast mb-2">Inicie uma rota</h4>

        <div className="flex flex-col">
          <StartRouteForm>
            <select
              id="route_id"
              name="route_id"
              className="mb-2 p-2 border rounded bg-default text-contrast"
            >
              <option value={""} key={"0"}>
                Selecione uma rota
              </option>
              {routes.map((route: RouteModel) => (
                <option value={route.id} key={route.id}>
                  {route.name}
                </option>
              ))}
            </select>
            <button
              style={{ width: "100%" }}
              className="bg-main text-primary p-2 rounded text-xl font-bold"
            >
              Iniciar a viagem
            </button>
          </StartRouteForm>
        </div>
      </div>
      <div className="w-100 flex-col h-screen ">
        <MapDriver routeIdElementId="route_id" />
      </div>
    </div>
  );
}

export default DriverPage;

// export async function DriverPage() {
//     const routes = await getRoutes();
//     return (
//       <div className="flex flex-col w-full h-full">
//         <div className="w-1/3 p-2 h-full w-full">
//           <h4 className="text-3xl text-contrast mb-2">Inicie uma rota</h4>

//           <div className="flex flex-col">
//             <form action="" className="flex flex-col space-y-4">
//               <select
//                 name="route"
//                 className="mb-2 p-2 border rounded bg-default text-contrast"
//               >
//                 {routes.map((route) => (
//                   <option value={route.id} key={route.id}>
//                     {route.name}
//                   </option>
//                 ))}
//               </select>
//               <button
//                 style={{ width: "100%" }}
//                 className="bg-main text-primary p-2 rounded text-xl font-bold"
//               >
//                 Iniciar a viagem
//               </button>
//             </form>
//           </div>
//         </div>
//         <div className="w-100 flex-col h-screen ">
//           <MapDriver />
//         </div>
//       </div>
//     );
//   }
